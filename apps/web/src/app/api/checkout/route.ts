import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const amount = 5000; // TODO: compute from server-side pricing rules

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: 'Stripe key not configured' }, { status: 500 });
    }
    const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(key, { apiVersion: '2025-02-24.acacia' });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'gbp',
            unit_amount: amount,
            product_data: {
              name: 'Tranzr Moving Service',
              description: 'Booking checkout',
            },
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/summary`,
      metadata: {
        booking: JSON.stringify({ tier: body?.pricingTier, van: body?.van }),
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
