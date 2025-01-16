import ProductGrid from '@/components/ProductGrid';
import { getProductByCategory } from '@/sanity/lib/products/getAllProducts';
import { notFound } from 'next/navigation';

export default async function CategoriesPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	if (!slug) return notFound();

	const products = await getProductByCategory(slug);

	if (products.length === 0)
		return (
			<div className='flex flex-col items-center min-h-screen justify-center bg-background space-y-2 p-4'>
				<p className='text-7xl'>🥺</p>
				<h1 className='text-3xl font-bold text-center'>
					No products found for: {slug}
				</h1>
				<p className='text-muted-foreground text-center'>
					Try searching for something else
				</p>
			</div>
		);

	return (
		<div className='flex flex-col items-center min-h-screen bg-background space-y-2 p-4'>
			<div className='p-8 rounded-xl w-full max-w-4xl'>
				<h1 className='text-3xl font-bold mb-6 text-center'>
					{slug
						.split('-')
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' ')}
				</h1>
				<ProductGrid products={products} />
			</div>
		</div>
	);
}
