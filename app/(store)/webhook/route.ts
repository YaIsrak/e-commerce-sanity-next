import { Metadata } from '@/actions/createCheckoutSession';
import stripe from '@/lib/stripe';
import { backendClient } from '@/sanity/lib/backendClient';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
	const body = await req.text();
	const headersList = await headers();
	const sig = headersList.get('stripe-signature');

	if (!sig)
		return NextResponse.json(
			{ error: 'Missing Stripe Signature' },
			{ status: 400 },
		);

	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

	if (!webhookSecret)
		return NextResponse.json(
			{ error: 'Missing Stripe Webhook Secret' },
			{ status: 400 },
		);

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
	} catch (error) {
		console.error('Webhook signature verification failed.', error);
		return NextResponse.json(
			{ error: 'Webhook signature verification failed' },
			{ status: 400 },
		);
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session;

		try {
			const order = await createOrderSanity(session);

			// eslint-disable-next-line no-console
			console.log('Order created successfully', order);
		} catch (error) {
			console.error('Error processing checkout session', error);
			return NextResponse.json(
				{ error: 'Error processing checkout session' },
				{ status: 400 },
			);
		}
	}

	return NextResponse.json({ received: true });
}

async function createOrderSanity(session: Stripe.Checkout.Session) {
	const {
		id,
		amount_total,
		currency,
		metadata,
		payment_intent,
		customer,
		total_details,
	} = session;

	if (!metadata) {
		throw new Error('Metadata is null');
	}
	const { orderNumber, customerName, customerEmail, clerkUserId } =
		metadata as unknown as Metadata;

	const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
		id,
		{
			expand: ['data.price.product'],
		},
	);

	const sanityProducts = lineItemsWithProduct.data.map((item) => ({
		_key: crypto.randomUUID(),
		product: {
			_type: 'reference',
			_ref: (item.price?.product as Stripe.Product)?.metadata?.id,
		},
		quantity: item.quantity || 0,
	}));

	const order = await backendClient.create({
		_type: 'order',
		orderNumber,
		stripeCheckoutSessionId: id,
		stripePaymentIntentId: payment_intent,
		customerName,
		stripeCustomerId: customer,
		clerkUserId,
		email: customerEmail,
		currency,
		amountDiscount: total_details?.amount_discount
			? total_details.amount_discount / 100
			: 0,
		products: sanityProducts,
		totalPrice: amount_total ? amount_total / 100 : 0,
		status: 'paid',
		address: '--',
		orderDate: new Date().toISOString(),
	});

	return order;
}
