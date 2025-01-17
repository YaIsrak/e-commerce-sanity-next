'use server';

import { BasketItem } from '@/store';

export interface Metadata {
	orderNumber: string;
	customerName: string;
	customerEmail: string;
	clerkUserId: string;
}

export type GroupBasketItem = {
	product: BasketItem['product'];
	quantity: number;
};

export async function createCheckoutSession(
	items: GroupBasketItem[],
	metadata: Metadata,
) {
	try {
		const itemsWithoutPrice = items.filter((item) => !item.product.price);
		if (itemsWithoutPrice.length > 0) {
			throw new Error('Items without price');
		}

		return 'https://khena-khata.vercel.app/checkout';
	} catch (error) {
		console.error('Error creating checkout session', error);
		throw error;
	}
}
