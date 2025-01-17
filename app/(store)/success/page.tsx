'use client';

import { Button } from '@/components/ui/button';
import { useBasketStore } from '@/store';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const orderNumber = searchParams.get('orderNumber');
	const sessionId = searchParams.get('session_id');
	const clearBasket = useBasketStore((state) => state.clearBasket);

	useEffect(() => {
		if (orderNumber) {
			clearBasket();
		}
	}, [orderNumber, clearBasket]);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-foreground/5'>
			<div className='bg-background p-12 rounded-2xl max-w-2xl w-full mx-4'>
				<div className='flex justify-center mb-8'>
					<div className='size-16 bg-green-100 rounded-full flex items-center justify-center'>
						<Check className='size-8 text-green-600' />
					</div>
				</div>

				<h1 className='text-4xl font-bold mb-6 text-center'>
					Thank you for your order!
				</h1>

				<div className='border-t border-b border-foreground/20 py-6 mb-6'>
					<p className='text-lg text-foreground/70 mb-4'>
						Your order has been successfully placed and will be delivered
						to you soon.
					</p>

					<div className='space-y-2'>
						{orderNumber && (
							<p className='text-lg items-center flex space-x-5 text-foreground/60'>
								<span>Order Number</span>
								<span className='font-mono text-sm text-green-600'>
									{orderNumber}
								</span>
							</p>
						)}

						{sessionId && (
							<p className='text-foreground/60 flex justify-between items-center space-x-5'>
								<span>Transaction ID:</span>
								<span className='font-mono text-sm'>{sessionId}</span>
							</p>
						)}
					</div>
				</div>

				<div className='space-y-4'>
					<p className='text-muted-foreground text-center'>
						A confirmation email has been sent to your email address.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button
							asChild
							variant='success'>
							<Link href={'/orders'}>View Order Details</Link>
						</Button>
						<Button
							asChild
							variant='outline'>
							<Link href={'/'}>Continue Shopping</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
