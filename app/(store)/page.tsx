import { getAllProducts } from '@/sanity/lib/getAllProducts';

export default async function Storepage() {
	const products = await getAllProducts();

	return <div>Storepage</div>;
}
