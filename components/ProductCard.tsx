import { cn, imageUrl } from '@/lib/utils';
import { Product } from '@/sanity.types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
	const isOutOfStock = product.stock != null && product.stock === 0;

	return (
		<Link
			href={`/product/${product.slug?.current}`}
			className={cn(
				'group flex flex-col bg-background rounded-lg border border-foreground/20 shadow-sm hover:shadow-sm transition-all duration-200 overflow-hidden',
				isOutOfStock ? 'opacity-50 cursor-not-allowed' : '',
			)}>
			{/* image */}
			<div className='relative aspect-square w-full h-full overflow-hidden'>
				{product.image && (
					<Image
						className='object-contain transition-transform duration-300 group-hover:scale-105'
						src={imageUrl(product.image).url()}
						alt={product.name || 'Product Image'}
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
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
			<div className='p-4'>
				<h2 className='text-lg font-semibold text-foreground/80 truncate'>
					{product.name}
				</h2>

				<p className='mt-2 text-sm text-foreground/60 line-clamp-2'>
					{product.description}
				</p>

				<p className='mt-2 text-lg font-bold text-foreground/90'>
					${product.price?.toFixed(2)}
				</p>
			</div>
		</Link>
	);
}
