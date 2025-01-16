import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const saleType = defineType({
	name: 'sale',
	title: 'sale',
	type: 'document',
	icon: TagIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Sales Description',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'discountAmount',
			title: 'Discount Amount',
			type: 'number',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'couponCode',
			title: 'Coupon Code',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'validFrom',
			title: 'Valid From',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'validUntil',
			title: 'Valid Until',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
			description: 'If the sale is active or not',
			initialValue: true,
		}),
	],

	preview: {
		select: {
			title: 'title',
			discountAmount: 'discountAmount',
			couponCode: 'couponCode',
			isActive: 'isActive',
		},
		prepare(select) {
			const { title, discountAmount, couponCode, isActive } = select;
			const status = isActive ? 'Active' : 'Inactive';

			return {
				title,
				subtitle: `${discountAmount}% off -Code: ${couponCode} - ${status}`,
			};
		},
	},
});
