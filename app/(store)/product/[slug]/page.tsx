import AddToBasketButtton from '@/components/AddToBasketButtton';
import { getBlurData } from '@/lib/getBlurData';
import { cn, imageUrl } from '@/lib/utils';
import { getProductBySlug } from '@/sanity/lib/products/getAllProducts';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

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

	const { base64 } = await getBlurData(
		imageUrl(product.image || '')
			.height(100)
			.url(),
	);

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
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
							placeholder='blur'
							blurDataURL={base64}
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
				<div className='flex flex-col'>
					<div>
						<h1 className='text-7xl font-bold mb-4'>{product.name}</h1>
						<div className='prose max-w-none'>{product.description}</div>
						<div className='text-5xl font-semibold py-6'>
							${product.price?.toFixed(2)}
						</div>
					</div>

					<div className='mt-4'>
						<AddToBasketButtton
							product={product}
							disabled={isOutOfStock}
						/>

						<p className='text-muted-foreground/60 text-sm mt-2'>
							*Automatically will be added to your basket*
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
