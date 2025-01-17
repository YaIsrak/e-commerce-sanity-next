import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation,
	stega: {
		studioUrl:
			process.env.NODE_ENV === 'production'
				? `${process.env.NEXT_PUBLIC_BASE_URL}/studio`
				: 'http://localhost:3000/studio',
	},
});
