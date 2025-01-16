import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
	name: 'category',
	title: 'Category',
	type: 'document',
	icon: TagIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			title: 'Title',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			},
			title: 'Slug',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'description',
			type: 'text',
			title: 'Description',
			validation: (Rule) => Rule.required(),
		}),
	],

	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
		},
	},
});
