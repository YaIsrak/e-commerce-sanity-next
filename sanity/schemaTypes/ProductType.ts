import { TrolleyIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productType = defineType({
	name: 'product',
	title: 'Product',
	type: 'document',
	icon: TrolleyIcon,
	fields: [
		defineField({
			name: 'name',
			title: 'Product name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'description',
			type: 'text',
		}),
		defineField({
			name: 'image',
			title: 'Product Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'price',
			title: 'Price',
			type: 'number',
			validation: (Rule) => Rule.required().min(0),
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
		}),
		defineField({
			name: 'stock',
			title: 'Stock',
			type: 'number',
			validation: (Rule) => Rule.required().min(0),
		}),
	],
	preview: {
		select: {
			title: 'name',
			media: 'image',
			subtitle: 'price',
		},
		prepare(select) {
			return {
				title: select.title,
				media: select.media,
				subtitle: `${select.subtitle}`,
			};
		},
	},
});
