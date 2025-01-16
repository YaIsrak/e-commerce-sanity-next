import Header from '@/components/layout/Header';
import { SanityLive } from '@/sanity/lib/live';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
	title: 'Khena-Khata Store',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider dynamic>
			<Header />
			<main>{children}</main>

			{/* to fetch live data from Sanity */}
			<SanityLive />
		</ClerkProvider>
	);
}
