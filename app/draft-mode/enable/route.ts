import { client } from '@/sanity/lib/client';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

const token = process.env.SANITY_API_READ_TOKEN as string;

export async function GET(req: Request) {
	const { isValid, redirectTo = '/' } = await validatePreviewUrl(
		client.withConfig({ token }),
		req.url,
	);

	if (!isValid) {
		return new Response('Invalid token', { status: 404 });
	}

	(await draftMode()).enable();

	redirect(redirectTo);
}
