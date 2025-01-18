import { forematCurrency, imageUrl } from '@/lib/utils';
import { Product } from '@/sanity.types';
import Image from 'next/image';

export default function OrderItemCard({
	product,
	currency,
	quantity,
}: {
	product: Product;
	currency: string;
	quantity: number;
}) {
	return (
		<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0'>
			<div className='flex items-center gap-3 sm:gap-4'>
				{product?.image && (
					<div className='relative size-14 sm:size-16 flex-shrink-0 rounded-lg overflow-hidden'>
						<Image
							src={imageUrl(product.image).url()}
							alt={product.name || 'Product Image'}
							width={100}
							height={100}
							className='object-cover'
						/>
					</div>
				)}
				<div>
					<p className='font-medium text-sm sm:text-base'>
						{product?.name}
					</p>
					<p className='text-sm text-muted-foreground'>
						Quantity: {quantity ?? 'N/A'}
					</p>
				</div>
			</div>

			<p className=' text-right font-bold'>
				{product?.price && quantity
					? forematCurrency(product.price * quantity, currency)
					: 'N/A'}
			</p>
		</div>
	);
}
