import { Loader } from 'lucide-react';

export default function loading() {
	return (
		<div className='flex justify-center items-center h-screen'>
			<Loader className='animate-spin' />
		</div>
	);
}
