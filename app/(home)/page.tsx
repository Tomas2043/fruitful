import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Check, ChevronRight, FolderGit2, LayoutDashboard, ScrollText } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";


export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers()
	});

	return (
		<main className="flex h-screen w-full 2xl:px-56 xl:px-32 lg:px-16 md:px-8 sm:px-4 px-4">
			<section className="w-full h-screen flex justify-between gap-4 items-center">
				<div className="grid grid-cols-1 gap-4 w-full">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
						Track calories, <br /> achieve your {" "}
						<span className="relative inline-block">
							health
							<svg
								className="absolute left-0 w-full h-8 text-destructive/40 -bottom-1 -z-10"
								style={{ top: "40%" }}
								viewBox="0 0 100 20"
								preserveAspectRatio="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M0,10 C30,2 70,18 100,10 L100,20 L0,20 Z" fill="currentColor" />
							</svg>
						</span>{" "}
						goals
					</h1>
					<p className="text-md">Monitor your nutrition, set goals, and transform your health <br />
						with our intuitive calorie tracking app. Simple, effective, and personalized.</p>
					{!session ? (
						<div className="grid grid-cols-2 gap-4 w-fit">
							<Button variant={"outline"} asChild>
								<Link href={"#how-it-works"}>
									<ScrollText /> See how it works
								</Link>
							</Button>
							<Button className="flex items-center" asChild>
								<Link href={"/sign-up"}>
									Start now <ChevronRight />
								</Link>
							</Button>
						</div>
					) : (
						<div className="grid grid-cols-2 gap-4 w-fit">
							<Button variant={"outline"} asChild>
								<Link href={"#how-it-works"}>
									<ScrollText /> See how it works
								</Link>
							</Button>
							<Button className="flex items-center" asChild>
								<Link href={"/dashboard"}>
									<LayoutDashboard /> Dashboard
								</Link>
							</Button>
						</div>
					)}
					<div className="flex items-center gap-6">
						<p className="text-sm font-medium flex gap-2 items-center">
							<Check className="size-5 text-green-700" />
							No credit card needed
						</p>
						<p className="text-sm font-medium flex gap-2 items-center">
							<FolderGit2 className="size-5 text-sky-700" />
							Open-Source
						</p>
					</div>
				</div>
				<div className="flex justify-end w-full">
					<img
						src="https://qhjpefeayuucuga9.public.blob.vercel-storage.com/default-image-v5Xp9osc2mYGDNFOYvXvdiP2OaJ1oB"
						alt="Becky"
						className="rounded-2xl h-[600px]"
					/>
				</div>
			</section>
		</main>
	);
}
