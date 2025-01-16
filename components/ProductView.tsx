import { Category, Product } from '@/sanity.types';
import CategorySelector from './CategorySelector';
import ProductGrid from './ProductGrid';

interface ProductViewProps {
	products: Product[];
	categories: Category[];
}

export default function ProductView({
	products,
	categories,
}: ProductViewProps) {
	return (
		<div className='flex flex-col'>
			{/* categories */}
			<div className='w-full sm:w-[200px]'>
				<CategorySelector categories={categories} />
			</div>

			{/* products */}
			<div className='flex-1'>
				<div>
					<ProductGrid products={products} />
				</div>
			</div>
		</div>
	);
}
