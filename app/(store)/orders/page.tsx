import { cn, forematCurrency, imageUrl } from '@/lib/utils';
import { getMyOrders } from '@/sanity/lib/orders/getMyOrders';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
	const { userId } = await auth();

	if (!userId) {
		return redirect('/');
	}

	const orders = await getMyOrders(userId);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-foreground/5 p-4'>
			<div className='bg-background p-4 sm:p-8 rounded-2xl w-full max-w-4xl'>
				<h1 className='text-4xl font-bold text-foreground tracking-tight mb-8'>
					My Orders
				</h1>

				{orders.length === 0 ? (
					<p className='text-muted-foreground text-center'>
						You have no placed any orders yet.
					</p>
				) : (
					<div className='space-y-6 sm:space-y-8'>
						{orders.map((order) => (
							<div
								key={order._id}
								className='bg-background border border-foreground/20 rounded-xl overflow-hidden'>
								{/* Order Details */}
								<div className='p-4 sm:p-6 border-b border-foreground/20'>
									<div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4'>
										<div>
											<p className='text-sm text-muted-foreground mb-1 font-bold'>
												Order Number
											</p>
											<p className='font-mono text-sm text-green-600 break-all'>
												({order.orderNumber})
											</p>
										</div>
										<div className='sm:text-right'>
											<p className='text-sm text-muted-foreground mb-1'>
												Order date
											</p>
											<p className='font-medium'>
												{order.orderDate
													? new Date(
															order.orderDate,
														).toLocaleDateString()
													: 'N/A'}
											</p>
										</div>
									</div>
									{/* Order Items */}
									<div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center'>
										<div className='flex items-center'>
											<span className='text-sm mr-2'>Status</span>
											<span
												className={cn(
													'px-3 py-1 rounded-full text-sm ',

													order.status === 'paid'
														? 'bg-green-100 text-green-600'
														: 'bg-red-100 text-red-600',
												)}>
												{order.status}
											</span>
										</div>
										<div className='sm:text-right'>
											<p className='text-sm text-muted-foreground mb-1'>
												Total Amount
											</p>
											<p className='font-bold text-lg'>
												{forematCurrency(
													order.totalPrice ?? 0,
													order.currency,
												)}
											</p>
										</div>
									</div>

									{order.amountDiscount ? (
										<div className='mt-4 p-3 sm:p-4 bg-red-40 rounded-xl'>
											<p className='text-red-600 font-medium mb-1 text-sm sm:text-base'>
												Discount Applied{' '}
												{forematCurrency(
													order.amountDiscount,
													order.currency,
												)}
											</p>
											<p className='text-sm text-foreground/60'>
												Original Subtotal:{' '}
												{forematCurrency(
													(order.totalPrice ?? 0) -
														order.amountDiscount,
													order.currency,
												)}
											</p>
										</div>
									) : null}
								</div>

								<div className='px-4 py-3 sm:px-6 sm:py-4'>
									<p className='text-sm font-semibold text-muted-foreground mb-3 sm:mb-4'>
										Order Items
									</p>

									<div className='space-y-3 sm:space-y-4'>
										{/* order Products */}
										{order.products?.map((product) => (
											<div
												key={product._key}
												className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0'>
												<div className='flex items-center gap-3 sm:gap-4'>
													{product.product?.image && (
														<div className='relative size-14 sm:size-16 flex-shrink-0 rounded-lg overflow-hidden'>
															<Image
																src={imageUrl(
																	product.product.image,
																).url()}
																alt={
																	product.product.name ||
																	'Product Image'
																}
																fill
																className='object-cover'
															/>
														</div>
													)}
													<div>
														<p className='font-medium text-sm sm:text-base'>
															{product.product?.name}
														</p>
														<p className='text-sm text-muted-foreground'>
															Quantity:{' '}
															{product.quantity ?? 'N/A'}
														</p>
													</div>
												</div>

												<p className=' text-right font-bold'>
													{product.product?.price &&
													product.quantity
														? forematCurrency(
																product.product.price *
																	product.quantity,
																order.currency,
															)
														: 'N/A'}
												</p>
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
