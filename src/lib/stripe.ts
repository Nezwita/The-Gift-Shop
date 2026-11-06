import Stripe from 'stripe';

/**
 * Resolve the server-side Stripe secret key.
 *
 * Returns null when payments are not configured (missing key, or the
 * placeholder value that ships in .env.local). Callers must treat null as
 * "payments are not live yet" and respond with a friendly state instead of
 * crashing or returning a 500.
 */
export function getStripeSecretKey(): string | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  // Placeholder keys from the sample .env file are not real credentials.
  if (key.startsWith('sk_test_placeholder') || key === 'sk_test_xxx') return null;
  return key;
}

/** True only when a real-looking Stripe secret key is present. */
export function isStripeConfigured(): boolean {
  return getStripeSecretKey() !== null;
}

let cachedClient: Stripe | null = null;

/**
 * Lazily create the Stripe client so importing this module never throws when
 * Stripe is not configured (which is the case for the current budget-gated
 * pre-launch build).
 */
export function getStripe(): Stripe | null {
  const key = getStripeSecretKey();
  if (!key) return null;
  if (!cachedClient) {
    // No apiVersion pin: the SDK uses the version it was built against.
    cachedClient = new Stripe(key, { typescript: true });
  }
  return cachedClient;
}

// Product price mapping — these are placeholder IDs until marketer finalizes the "Launch 15" list
// Once Stripe products/prices are created in the dashboard, replace these values
export const PLACEHOLDER_PRICE_IDS: Record<string, string> = {
  // New York
  'Statue of Liberty Replica': 'price_placeholder_ny_liberty',
  'New York Style Bagels Gift Box': 'price_placeholder_ny_bagels',
  'Broadway Show Ticket Voucher': 'price_placeholder_ny_broadway',
  'Manhattan Skyline Art Print': 'price_placeholder_ny_skyline',
  'Greenwich Village Leather Journal': 'price_placeholder_ny_journal',
  // Paris
  'Ladurée Macaron Collection': 'price_placeholder_paris_macaron',
  'Eiffel Tower Miniature': 'price_placeholder_paris_eiffel',
  'Parisian Perfume Sampler': 'price_placeholder_paris_perfume',
  'Seine River Painting Set': 'price_placeholder_paris_seine',
  'French Beret & Scarf Set': 'price_placeholder_paris_beret',
  // Tokyo
  'Matcha Tea Ceremony Set': 'price_placeholder_tokyo_matcha',
  'Japanese Calligraphy Kit': 'price_placeholder_tokyo_calligraphy',
  'Vintage Kimono Fabric': 'price_placeholder_tokyo_kimono',
  'Tokyo Skyline Woodblock Print': 'price_placeholder_tokyo_print',
  'Sakura Sake Set': 'price_placeholder_tokyo_sake',
  // San Francisco
  'Napa Valley Wine Gift Set': 'price_placeholder_sf_wine',
  // London
  'Fortnum & Mason Tea Selection': 'price_placeholder_london_tea',
  // Rome
  'Roman Leather Passport Holder': 'price_placeholder_rome_leather',
  'Murano Glass Vase': 'price_placeholder_rome_murano',
  'Tuscan Olive Oil Collection': 'price_placeholder_rome_olive',
  // Shanghai
  'Ming Dynasty Style Tea Set': 'price_placeholder_shanghai_tea',
  'Silk Embroidery Art': 'price_placeholder_shanghai_silk',
};

/**
 * Get a price ID for a given product name.
 * Falls back to a generic placeholder if not found.
 */
export function getPriceId(productName: string): string {
  return PLACEHOLDER_PRICE_IDS[productName] || 'price_placeholder_generic';
}

/**
 * Format amount for Stripe (convert dollars to cents)
 */
export function formatAmountForStripe(amountInDollars: number): number {
  return Math.round(amountInDollars * 100);
}
