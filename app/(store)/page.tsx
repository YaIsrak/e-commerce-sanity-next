import EidSale from '@/components/EidSale';
import ProductView from '@/components/ProductView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function Storepage() {
	const products = await getAllProducts();
	const categories = await getAllCategories();

	return (
		<div className='container mx-auto max-w-[100rem] '>
			{/* Banner of sale */}
			<EidSale />

			<div className='flex flex-col items-center min-h-screen bg-background p-4'>
				<ProductView
					products={products}
					categories={categories}
				/>
			</div>
		</div>
	);
}
