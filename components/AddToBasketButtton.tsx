'use client';

import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types';
import { useBasketStore } from '@/store';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function AddToBasketButtton({
	product,
	disabled,
}: {
	product: Product;
	disabled?: boolean;
}) {
	const { addItem, removeItem, getItemCount } = useBasketStore();
	const itemCount = getItemCount(product._id);

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return (
		<div className='flex items-center justify-center space-x-4'>
			<Button
				onClick={() => removeItem(product._id)}
				disabled={itemCount === 0 || disabled}
				size='icon'
				className={cn(
					'rounded-full',

					itemCount === 0
						? 'bg-background/40 cursor-not-allowed'
						: 'bg-background/60 hover:bg-background/30',
				)}>
				<span
					className={cn(
						'text-xl font-bold',
						itemCount === 0 ? 'text-foreground/40' : 'text-foreground/60',
					)}>
					<Minus className='size-4' />
				</span>
			</Button>
			<span className='text-center font-semibold'>{itemCount}</span>

			<Button
				onClick={() => addItem(product)}
				size='icon'
				className={cn(
					'rounded-full ',
					disabled
						? 'bg-primary/40 cursor-not-allowed'
						: 'bg-primary hover:bg-primary/80',
				)}
				disabled={disabled}>
				<span
					className={cn(
						'text-xl font-bold',
						itemCount === 0 ? 'text-background/40' : 'text-background',
					)}>
					<Plus className='size-4' />
				</span>
			</Button>
		</div>
	);
}
