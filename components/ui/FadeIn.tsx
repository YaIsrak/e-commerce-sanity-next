'use client';
import { AnimatePresence, motion } from 'framer-motion';

export default function FadeIn({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<AnimatePresence>
			<motion.div
				layout
				initial={{ opacity: 0.2 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className={className}>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
