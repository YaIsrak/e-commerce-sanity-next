import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode';
import ShineBorder from './ui/shine-border';

export default async function EidSale() {
	const sale = await getActiveSaleByCouponCode('EID2025');

	if (!sale?.isActive) return null;

	return (
		<ShineBorder
			color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
			borderRadius={24}
			borderWidth={8}
			className='bg-gradient-to-r from-primary to-secondary text-background px-6 py-10 mx-4 mt-2 rounded-3xl  w-full'>
			<div className='container mx-auto flex items-center justify-between'>
				<div className='flex-1'>
					<h2 className='text-3xl sm:text-5xl font-extrabold text-left mb-4'>
						🎉{sale?.title}
					</h2>
					<p className='text-left text-xl sm:text-3xl font-semibold mb-6'>
						{sale?.description}
					</p>
					<div className='flex'>
						<div className='bg-background text-foreground py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300'>
							<span className='text-base font-bold sm:text-xl'>
								Use code:{' '}
								<span className='text-red-600'>{sale.couponCode}</span>
							</span>
							<span className='ml-2 font-bold text-base sm:text-xl'>
								for {sale.discountAmount}% off
							</span>
						</div>
					</div>
				</div>
			</div>
		</ShineBorder>
	);
}
