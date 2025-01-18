import { getBlurData } from '@/lib/getBlurData';
import { cn, imageUrl } from '@/lib/utils';
import { Product } from '@/sanity.types';
import { StarFilledIcon } from '@sanity/icons';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductCard({ product }: { product: Product }) {
	const isOutOfStock = product.stock != null && product.stock === 0;

	const { base64 } = await getBlurData(
		imageUrl(product.image || '')
			.height(50)
			.url(),
	);

	return (
		<Link
			href={`/product/${product.slug?.current}`}
			className={cn(
				'group flex flex-col bg-background transition-all duration-200 overflow-hidden',
				isOutOfStock ? 'opacity-50 cursor-not-allowed' : '',
			)}>
			{/* image */}
			<div className='relative aspect-[3/4] rounded-2xl w-full h-full overflow-hidden'>
				{product.image && (
					<Image
						className='object-cover transition-transform duration-300 group-hover:scale-105'
						src={imageUrl(product.image).width(800).url()}
						alt={product.name || 'Product Image'}
						fill
						placeholder='blur'
						blurDataURL={base64}
					/>
				)}

				{/* if product is out of stock */}
				{isOutOfStock && (
					<div className='absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-foreground/20'>
						<span className='text-background font-bold text-lg'>
							Out of Stock
						</span>
					</div>
				)}
			</div>

			{/* product details */}
			<div className='py-2 flex justify-between'>
				<div>
					<h2 className='text-lg font-semibold text-foreground/80 truncate'>
						{product.name}
					</h2>

					<p className='text-sm text-foreground/60 line-clamp-2'>
						{product.description}
					</p>

					<p className='mt-2 text-2xl font-semibold text-foreground/90'>
						${product.price?.toFixed(2)}
					</p>
					<span className='flex items-center'>
						<StarFilledIcon className='text-yellow-400 size-6' />
						<StarFilledIcon className='text-yellow-400 size-6' />
						<StarFilledIcon className='text-yellow-400 size-6' />
						<StarFilledIcon className='text-yellow-400 size-6' />
					</span>
				</div>
				<div>
					<Heart className='size-6 text-rose-400' />
				</div>
			</div>
		</Link>
	);
}
