import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';


interface LinkProps {
	href: string;
	className?: string;
	children: React.ReactNode;
}

const NavLink: React.FC<LinkProps> = ({ href, className, children }) => {
	return (
		<Link href={href} className={cn("hover:underline  underline-offset-2 font-medium", className)}>
			{children}
		</Link>
	);
};

export default NavLink;
