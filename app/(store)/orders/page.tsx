import OrderCard from '@/components/OrderCard';
import { getMyOrders } from '@/sanity/lib/orders/getMyOrders';
import { auth } from '@clerk/nextjs/server';
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
							<OrderCard
								order={order}
								key={order._id}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
