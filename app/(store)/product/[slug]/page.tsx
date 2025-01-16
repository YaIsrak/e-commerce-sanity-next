import { cn, imageUrl } from '@/lib/utils';
import { getProductBySlug } from '@/sanity/lib/products/getAllProducts';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) {
		return notFound();
	}

	const isOutOfStock = product.stock != null && product.stock <= 0;

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Image */}
				<div
					className={cn(
						'relative aspect-square overflow-hidden rounded-xl',
						isOutOfStock && 'opacity-50',
					)}>
					{product.image && (
						<Image
							src={imageUrl(product.image).url()}
							alt={product.name || 'Product Image'}
							fill
							className='object-contain transition-transform duration-300 hover:scale-105'
						/>
					)}

					{isOutOfStock && (
						<div className='absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-foreground/20'>
							<span className='text-background font-bold text-lg'>
								Out of Stock
							</span>
						</div>
					)}
				</div>

				{/* Product Details */}
				<div className='flex flex-col justify-between'>
					<div>
						<h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
						<div className='text-xl font-semibold mb-4'>
							${product.price?.toFixed(2)}
						</div>

						<div className='prose max-w-none mb-6'>
							{product.description}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
