#!/usr/bin/env bash
#
# serve-public.sh — put the real CuratedCities storefront on the team's public
# port (3000) as a detached Next.js production server.
#
# Idempotent: safe to re-run. It frees the port, rebuilds only when the build
# output is missing or older than the sources, starts the server detached
# (survives the shell / session), and waits until the NEW process answers HTTP.
#
# Usage:  ./serve-public.sh                 # build if needed, (re)start on :3000
#         FORCE_BUILD=1 ./serve-public.sh   # always rebuild first
#         PUBLIC_PORT=3001 ./serve-public.sh  # another port (rarely needed)
#
# Notes:
#  - lsof/ss/netstat are unreliable in this container, so the port owner is
#    resolved through /proc/net/tcp + /proc/<pid>/fd socket inodes instead.
#  - The variable is PUBLIC_PORT (not PORT) on purpose: PORT is exported as 80
#    in this environment and would silently bind the server to the wrong port.
#
set -euo pipefail

cd "$(dirname "$0")"

PUBLIC_PORT="${PUBLIC_PORT:-3000}"
HOST="${HOST:-0.0.0.0}"
LOG_DIR=".run"
LOG="$LOG_DIR/server.log"
BUILD_ID=".next/BUILD_ID"

mkdir -p "$LOG_DIR"

# --- helpers ----------------------------------------------------------------

# Print the pids of processes LISTENing on $PUBLIC_PORT (via /proc, no lsof).
pids_listening_on_port() {
  local port_hex inodes inode fd pid
  port_hex="$(printf '%04X' "$PUBLIC_PORT")"
  inodes="$(awk -v p=":$port_hex" '$4 == "0A" && $2 ~ p { print $10 }' \
    /proc/net/tcp /proc/net/tcp6 2>/dev/null | sort -u)"
  [ -z "$inodes" ] && return 0
  for inode in $inodes; do
    for fd in /proc/[0-9]*/fd/*; do
      [ -e "$fd" ] || continue
      if [ "$(readlink "$fd" 2>/dev/null)" = "socket:[$inode]" ]; then
        pid="${fd#/proc/}"
        echo "${pid%%/*}"
      fi
    done
  done | sort -u
}

port_is_listening() {
  local port_hex
  port_hex="$(printf '%04X' "$PUBLIC_PORT")"
  awk -v p=":$port_hex" '$4 == "0A" && $2 ~ p { found = 1 } END { exit !found }' \
    /proc/net/tcp /proc/net/tcp6 2>/dev/null
}

free_port() {
  local pids
  pids="$(pids_listening_on_port | tr '\n' ' ')"
  if [ -z "${pids// /}" ]; then
    echo "==> Port $PUBLIC_PORT is free"
    return 0
  fi
  echo "==> Freeing port $PUBLIC_PORT (pids: $pids)"
  kill $pids 2>/dev/null || true
  for _ in $(seq 1 20); do
    sleep 0.5
    port_is_listening || { echo "==> Port $PUBLIC_PORT released"; return 0; }
  done
  pids="$(pids_listening_on_port | tr '\n' ' ')"
  if [ -n "${pids// /}" ]; then
    echo "==> Port $PUBLIC_PORT still busy, SIGKILL: $pids"
    kill -9 $pids 2>/dev/null || sudo -n kill -9 $pids 2>/dev/null || true
    sleep 1
  fi
  if port_is_listening; then
    echo "!! Could not free port $PUBLIC_PORT" >&2
    exit 1
  fi
}

# --- 1. Free the port -------------------------------------------------------
free_port

# --- 2. Build if needed -----------------------------------------------------
need_build=0
if [ ! -f "$BUILD_ID" ] || [ ! -d ".next/server" ]; then
  need_build=1
elif [ "${FORCE_BUILD:-0}" = "1" ]; then
  need_build=1
elif [ -n "$(find src public next.config.ts package.json .env.local -newer "$BUILD_ID" -type f 2>/dev/null | head -n 1)" ]; then
  echo "==> Sources are newer than the last build"
  need_build=1
fi

if [ "$need_build" = "1" ]; then
  echo "==> Building production bundle (next build)"
  npm run build
else
  echo "==> Reusing existing production build ($BUILD_ID)"
fi

# --- 3. Start detached ------------------------------------------------------
echo "==> Starting Next.js on $HOST:$PUBLIC_PORT (log: $LOG)"
: > "$LOG"
setsid nohup npx next start -p "$PUBLIC_PORT" -H "$HOST" > "$LOG" 2>&1 &
SERVER_PID=$!

# --- 4. Wait for readiness of *this* process --------------------------------
for i in $(seq 1 60); do
  if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    echo "!! Server process exited during startup — log:" >&2
    tail -n 40 "$LOG" >&2 || true
    exit 1
  fi
  if grep -q "EADDRINUSE" "$LOG" 2>/dev/null; then
    echo "!! Port $PUBLIC_PORT is already in use by another process — log:" >&2
    tail -n 20 "$LOG" >&2 || true
    exit 1
  fi
  if curl -fsS -o /dev/null "http://127.0.0.1:$PUBLIC_PORT/" 2>/dev/null; then
    echo "==> Storefront is up: http://$HOST:$PUBLIC_PORT/ (ready after ${i}s, pid $SERVER_PID)"
    exit 0
  fi
  sleep 1
done

echo "!! Server did not become ready in 60s — last log lines:" >&2
tail -n 40 "$LOG" >&2 || true
exit 1
