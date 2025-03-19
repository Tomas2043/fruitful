import { Carrot, ChevronRight, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import NavLink from "@/components/Link";
import { redirect } from "next/navigation";

export default async function Navbar() {
	const session = await auth.api.getSession({
		headers: await headers()
	});

	return (
		<header className="flex justify-between items-center fixed p-6 2xl:px-56 xl:px-32 lg:px-16 md:px-8 sm:px-4 px-4 w-full backdrop-blur-3xl">
			<a href="/" className="flex items-center gap-2 font-medium">
				<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
					<Carrot className="size-4" />
				</div>
				Fruitful
			</a>
			<div className="flex gap-4">
				<NavLink href={"#"}>Features</NavLink>
				<NavLink href={"#"}>How it works</NavLink>
				<NavLink href={"#"}>Testimonials</NavLink>
				<NavLink href={"#"}>Pricing</NavLink>
			</div>
			{!session ? (
				<div className="flex gap-4">
					<Button variant={"outline"} asChild>
						<Link href={"/sign-in"}>
							Sign In
						</Link>
					</Button>
					<Button asChild>
						<Link href={"/sign-up"} className="flex items-center">
							Get Started <ChevronRight />
						</Link>
					</Button>
				</div>
			) : (
				<div className="flex gap-2">
					<form action={async () => {
						"use server"
						await auth.api.signOut({
							headers: await headers()
						})
						redirect("/")
					}}>
						<Button variant={"outline"} className="flex gap-2 items-center" type="submit">
							<LogOut />
							Logout
						</Button>
					</form>
					<Button asChild>
						<Link className="no-underline flex items-center" href={"/dashboard"}>
							<LayoutDashboard />
							Dashboard
						</Link>
					</Button>
				</div>
			)}
		</header>
	)
}
