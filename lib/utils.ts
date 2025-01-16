import { client } from '@/sanity/lib/client';
import ImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const builder = ImageUrlBuilder(client);

export function imageUrl(source: SanityImageSource) {
	return builder.image(source);
}
