import { cn, forematCurrency } from '@/lib/utils';
import { MY_ORDERS_QUERYResult } from '@/sanity.types';
import OrderItemCard from './OrderItemCard';

export default function OrderCard({
	order,
}: {
	order: MY_ORDERS_QUERYResult[0];
}) {
	return (
		<div className='bg-background border border-foreground/20 rounded-xl overflow-hidden'>
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
								? new Date(order.orderDate).toLocaleDateString()
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
							{forematCurrency(order.totalPrice ?? 0, order.currency)}
						</p>
					</div>
				</div>

				{order.amountDiscount ? (
					<div className='mt-4 p-3 sm:p-4 bg-red-40 rounded-xl'>
						<p className='text-red-600 font-medium mb-1 text-sm sm:text-base'>
							Discount Applied{' '}
							{forematCurrency(order.amountDiscount, order.currency)}
						</p>
						<p className='text-sm text-foreground/60'>
							Original Subtotal:{' '}
							{forematCurrency(
								(order.totalPrice ?? 0) - order.amountDiscount,
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
					{order.products?.map((product) =>
						product.product && 'name' in product.product ? (
							<OrderItemCard
								key={product._key}
								product={product.product}
								quantity={product.quantity as number}
								currency={order.currency as string}
							/>
						) : null,
					)}
				</div>
			</div>
		</div>
	);
}
