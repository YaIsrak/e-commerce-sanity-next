'use client';

import { Category } from '@/sanity.types';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export default function CategorySelector({
	categories,
}: {
	categories: Category[];
}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<string>('');
	const router = useRouter();

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className=''>
					{value
						? categories.find(
								(category) => category.slug?.current === value,
							)?.title
						: 'Filter by category...'}
					<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder='Search category...' />
					<CommandList>
						<CommandEmpty>No category found.</CommandEmpty>
						<CommandGroup>
							{categories.map((category) => (
								<CommandItem
									key={category.slug?.current}
									value={category.slug?.current}
									onSelect={(currentValue) => {
										setValue(
											currentValue === value ? '' : currentValue,
										);
										router.push(`/category/${currentValue}`);
										setOpen(false);
									}}>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === category.slug?.current
												? 'opacity-100'
												: 'opacity-0',
										)}
									/>
									{category.title}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
