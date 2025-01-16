import EidSale from '@/components/EidSale';
import ProductView from '@/components/ProductView';
import { getAllCategories } from '@/sanity/lib/getAllCategories';
import { getAllProducts } from '@/sanity/lib/getAllProducts';

export default async function Storepage() {
	const products = await getAllProducts();
	const categories = await getAllCategories();

	return (
		<div>
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
