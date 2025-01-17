import ProductGrid from '@/components/ProductGrid';
import { searchProductsByName } from '@/sanity/lib/products/getAllProducts';

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{ query: string }>;
}) {
	const { query } = await searchParams;

	const products = await searchProductsByName(query as string);

	// if no products found
	if (!query && products.length === 0) {
		return (
			<div className='flex flex-col items-center min-h-screen justify-center bg-background space-y-2 p-4'>
				<p className='text-7xl'>🥺</p>
				<h1 className='text-3xl font-bold text-center'>
					No products found for: {query}
				</h1>
				<p className='text-muted-foreground text-center'>
					Try searching for something else
				</p>
			</div>
		);
	}

	return (
		<div className='flex flex-col items-center min-h-screen bg-background space-y-2 p-4'>
			<h1 className='text-3xl font-bold mb-6 text-center'>
				search results for {query}
			</h1>
			<ProductGrid products={products} />
		</div>
	);
}
