import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

// Stripe webhook handler for post-payment processing
export async function POST(request: Request) {
  try {
    const stripe = getStripe();

    // No Stripe credentials configured yet (budget-gated pre-launch build).
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payments are not live yet', code: 'payments_not_live' },
        { status: 503 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event;

    // Verify webhook signature if secret is configured
    if (process.env.STRIPE_WEBHOOK_SECRET && signature) {
      try {
        event = stripe.webhooks.constructEvent(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } else {
      // In dev mode, parse without verification
      event = JSON.parse(body);
      console.log('Webhook received (unverified — set STRIPE_WEBHOOK_SECRET in production):', event.type);
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('Payment succeeded! Session:', session.id);
        console.log('Customer email:', session.customer_details?.email);
        console.log('Shipping address:', session.shipping_details?.address);
        
        // In production: save order to database, trigger fulfillment, send confirmation email
        // For now, we log the successful payment
        break;
      }
      
      case 'checkout.session.expired': {
        console.log('Checkout session expired:', event.data.object.id);
        break;
      }

      case 'payment_intent.succeeded': {
        console.log('Payment intent succeeded:', event.data.object.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// For webhook body parsing in App Router, we use the raw request body via request.text() above
// No additional config needed for App Router route handlers
