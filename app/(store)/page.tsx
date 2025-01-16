import ProductView from '@/components/ProductView';
import { getAllCategories } from '@/sanity/lib/getAllCategories';
import { getAllProducts } from '@/sanity/lib/getAllProducts';

export default async function Storepage() {
	const products = await getAllProducts();
	const categories = await getAllCategories();

	return (
		<div>
			<ProductView
				products={products}
				categories={categories}
			/>
		</div>
	);
}
