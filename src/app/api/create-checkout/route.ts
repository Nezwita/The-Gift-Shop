import { NextResponse } from 'next/server';
import { stripe, formatAmountForStripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { items, successUrl, cancelUrl } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Build Stripe line items from cart items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: `From ${item.city}${item.variant ? ` — ${item.variant}` : ''}`,
          images: item.image ? [item.image] : [],
        },
        unit_amount: formatAmountForStripe(item.price),
      },
      quantity: item.quantity || 1,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'GB', 'FR', 'IT', 'DE', 'ES', 'CN', 'JP', 'CA', 'AU'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1500, currency: 'usd' },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 3500, currency: 'usd' },
            display_name: 'Express Courier',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 4 },
            },
          },
        },
      ],
      metadata: {
        items: JSON.stringify(items.map((i: any) => ({ name: i.name, city: i.city, variant: i.variant }))),
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
