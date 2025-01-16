import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';

export const getAllProducts = async () => {
	const ALL_PRODUCTS_QUERY = defineQuery(`
        *[
            _type == "product"
        ] | order(name asc)
    `);

	try {
		const product = await sanityFetch({
			query: ALL_PRODUCTS_QUERY,
		});

		return product.data || [];
	} catch (error) {
		console.error('Error fetching all products', error);
		return [];
	}
};

export const searchProductsByName = async (searchParam: string) => {
	const PRODUCT_SEARCH_QUERY = defineQuery(`
		*[
			_type == "product"
			&& name match $searchParam
		] | order(name asc)
	`);

	try {
		const product = await sanityFetch({
			query: PRODUCT_SEARCH_QUERY,
			params: {
				searchParam: `${searchParam}*`,
			},
		});

		return product.data || [];
	} catch (error) {
		console.error('Error fetching products by name', error);
		return [];
	}
};

export const getProductBySlug = async (slug: string) => {
	const PRODUCT_BY_ID_QUERY = defineQuery(`
		*[_type == "product" && slug.current == $slug][0]
	`);

	try {
		const product = await sanityFetch({
			query: PRODUCT_BY_ID_QUERY,
			params: {
				slug,
			},
		});

		return product.data || null;
	} catch (error) {
		console.error('Error fetching all products', error);
		return null;
	}
};
