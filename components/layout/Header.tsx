'use client';

import { useBasketStore } from '@/store';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import Form from 'next/form';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Header() {
	const { user } = useUser();
	const itemCount = useBasketStore((state) =>
		state.items.reduce((total, item) => total + item.quantity, 0),
	);

	return (
		<header className='flex items-center justify-between flex-wrap px-4 py-2'>
			<div className='flex w-full flex-wrap justify-between items-center'>
				<Link
					href={'/'}
					className='text-2xl font-semibold text-primary hover:opacity-50 cursor-pointer mx-auto sm:mx-0'>
					KhenaKhata
				</Link>

				<Form
					action='/search'
					className='w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0'>
					<Input
						type='text'
						name='query'
						placeholder='Search for products'
						className='bg-primary/10 outline-2 rounded-xl'
					/>
				</Form>

				<div className='flex items-center space-x-2 mt-4 sm:mt-0 flex-1 sm:flex-none'>
					<Button
						asChild
						className='rounded-xl relative'>
						<Link href={'/basket'}>
							<TrolleyIcon className='size-6' />
							<span className='bg-red-500 text-white size-5 flex items-center justify-center text-xs rounded-full absolute -top-1 -right-1 font-semibold'>
								{itemCount}
							</span>
							<span>My Basket</span>
						</Link>
					</Button>

					{/* User area */}
					{user && (
						<Button
							asChild
							className='rounded-xl'>
							<Link href={'/orders'}>
								<PackageIcon className='size-6' />
								<span>My Orders</span>
							</Link>
						</Button>
					)}

					{user ? (
						<div className='flex items-center space-x-2'>
							<UserButton />

							<div className='hidden sm:block text-xs'>
								<p className='text-muted-foreground'>Welcome Back</p>
								<p className='font-bold'>{user.fullName}</p>
							</div>
						</div>
					) : (
						<SignInButton mode='modal' />
					)}
				</div>
			</div>
		</header>
	);
}
