'use client';

import {
	createCheckoutSession,
	Metadata,
} from '@/actions/createCheckoutSession';
import AddToBasketButtton from '@/components/AddToBasketButtton';
import { Button } from '@/components/ui/button';
import { imageUrl } from '@/lib/utils';
import { useBasketStore } from '@/store';
import { SignInButton, useAuth, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function BasketPage() {
	const groupedItems = useBasketStore((state) => state.getGroupedItems());
	const { isSignedIn } = useAuth();
	const { user } = useUser();
	const router = useRouter();

	const [isClient, setIsClient] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	if (groupedItems.length === 0) {
		return (
			<div className='container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]'>
				<h1 className='text-2xl font-bold mb-4 text-foreground/80'>
					Your Basket
				</h1>
				<p className='text-foreground/60 text-lg'>Your basket is empty</p>
			</div>
		);
	}

	const handleCheckout = async () => {
		if (!isSignedIn) return;
		setIsLoading(true);

		try {
			const metadata: Metadata = {
				orderNumber: crypto.randomUUID(),
				customerName: user?.fullName ?? 'Unknown',
				customerEmail: user?.primaryEmailAddress?.emailAddress ?? 'Unknown',
				clerkUserId: user?.id as string,
			};

			const checkoutUrl = await createCheckoutSession(
				groupedItems,
				metadata,
			);

			if (checkoutUrl) {
				window.location.href = checkoutUrl;
			}
		} catch (error: any) {
			toast.error('Something went wrong', {
				description: error.message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='container mx-auto p-4 max-w-full min-h-screen'>
			<h1 className='text-2xl font-bold mb-4'>Your Basket</h1>
			<div className='flex flex-col lg:flex-row gap-8'>
				<div className='flex-grow'>
					{groupedItems?.map((item) => (
						<div
							key={item.product._id}
							className='mb-4 p-4 border rounded flex items-center justify-between'>
							<div className='flex items-center cursor-pointer flex-1 min-w-0'>
								<div
									className='relative size-20 sm:size-24 flex-shrink-0 mr-4'
									onClick={() =>
										router.push(
											`/product/${item.product.slug?.current}`,
										)
									}>
									{item.product.image && (
										<Image
											src={imageUrl(item.product.image).url()}
											alt={item.product.name ?? 'Product Image'}
											className='object-cover rounded-xl w-full h-full'
											fill
										/>
									)}
								</div>
								<div className='min-w-0'>
									<h2 className='text-lg sm:text-xl font-semibold truncate'>
										{item.product.name}
									</h2>
									<p className='text-sm sm:text-base'>
										$
										{(
											(item.product.price ?? 0) * item.quantity
										).toFixed(2)}
									</p>
								</div>
							</div>

							<div className='flex items-center ml-4 flex-shrink-0'>
								<AddToBasketButtton product={item.product} />
							</div>
						</div>
					))}
				</div>
				<div className='w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-background p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto'>
					<h3 className='text-xl font-semibold'>Order Summary</h3>
					<div className='mt-4 space-y-2 mb-4'>
						<p className='flex justify-between'>
							<span>Items:</span>
							<span>
								{groupedItems.reduce(
									(total, item) => total + item.quantity,
									0,
								)}
							</span>
						</p>
						<p className='flex justify-between text-2xl font-bold border-t pt-2'>
							<span>Total:</span>
							<span>
								${useBasketStore.getState().getTotalPrice().toFixed(2)}
							</span>
						</p>
					</div>

					{isSignedIn ? (
						<Button
							onClick={handleCheckout}
							disabled={isLoading}
							className='w-full'>
							{isLoading ? 'Processing...' : 'Checkout'}
						</Button>
					) : (
						<SignInButton mode='modal'>
							<Button>Sign in to checkout</Button>
						</SignInButton>
					)}

					{/* <div className='h-64 lg:h-0'>for mobile</div> */}
				</div>
			</div>
		</div>
	);
}
