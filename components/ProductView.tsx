import { Category, Product } from '@/sanity.types';
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
				{/* <CategorySelector categories={categories} /> */}
			</div>

			{/* products */}
			<div className='flex-1'>
				<div>
					<ProductGrid products={products} />

					<hr className='w-12 sm:w-3/4' />
				</div>
			</div>
		</div>
	);
}
