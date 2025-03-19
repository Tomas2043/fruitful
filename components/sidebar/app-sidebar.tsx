"use client"

import * as React from "react"
import {
	Carrot,
	Droplets,
	Footprints,
	Scale,
	Utensils,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuButton,
	SidebarRail,
} from "@/components/ui/sidebar"
import { User } from "better-auth"
import Link from "next/link"


export function AppSidebar({ currentUser, ...props }: { currentUser: User } & React.ComponentProps<typeof Sidebar>) {
	const data = {
		user: {
			name: currentUser.name,
			email: currentUser.email,
			avatar: currentUser?.image || "/avatars/shadcn.jpg",
		},
		navMain: [
			{
				title: "Calories",
				url: "#",
				icon: Utensils,
			},
			{
				title: "Steps",
				url: "#",
				icon: Footprints,
			},
			{
				title: "Water",
				url: "#",
				icon: Droplets,
			},
			{
				title: "Weight",
				url: "#",
				icon: Scale,
			},
		],
	}

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center cursor-pointer"
					asChild
				>
					<Link href={"/"}>
						<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
							<Carrot className="size-4" />
						</div>
						<h1 className="font-semibold text-lg">Fruitful</h1>
					</Link>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
