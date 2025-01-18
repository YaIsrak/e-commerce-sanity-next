import { Product } from '@/sanity.types';
import ProductCard from './ProductCard';
import FadeIn from './ui/FadeIn';

export default function ProductGrid({ products }: { products: Product[] }) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
			{products.map((product) => (
				<FadeIn
					key={product._id}
					className='flex justify-center'>
					<ProductCard product={product} />
				</FadeIn>
			))}
		</div>
	);
}
