"use client"

import { Carrot, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { signInAction } from "@/actions/sign-in";
import Link from "next/link";

const formSchema = z.object({
	email: z.string().email("Invalid email").nonempty("Email is required"),
	password: z.string().nonempty("Password is required"),
})

export type FormValues = z.infer<typeof formSchema>;

export default function SignIn() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		}
	});

	async function onSubmit(data: FormValues) {
		setLoading(true);
		const result = await signInAction(data);
		if (!result.success) {
			toast.error(result.message);
			setLoading(false);
			return;
		}
		toast.success(result.message);
		router.push("/dashboard");
		setLoading(false);
	}

	return (
		<div className="grid min-h-svh lg:grid-cols-2 p-4">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link href="/" className="flex items-center gap-2 font-medium">
						<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<Carrot className="size-4" />
						</div>
						Fruitful
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-md pb-10">
						<Card className="z-50 rounded-md rounded-t-none p-0 border-none shadow-none">
							<CardHeader>
								<CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
								<CardDescription className="text-xs md:text-sm">
									Enter your email and password to sign in.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4 pb-10">
									<Form {...form}>
										<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Email</FormLabel>
														<FormControl>
															<Input placeholder="m@example.com" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="password"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Password</FormLabel>
														<FormControl>
															<Input type="password" placeholder="Password" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<Button
												type="submit"
												className="w-full h-10"
												disabled={loading}
											>
												{loading ? (
													<Loader2 size={16} className="animate-spin" />
												) : (
													"Sign In"
												)}
											</Button>
										</form>
									</Form>
									<div className="flex justify-center gap-1">
										<p className="text-center text-sm text-gray-500 tracking-tight">Don&apos;t have an account?</p>
										<Link href={"/sign-up"} className="group text-center text-sm font-medium hover:underline underline-offset-2 tracking-tight flex items-center gap-1 transition">
											Sign Up
										</Link>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<img
					src="/background.jpeg"
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover rounded-xl dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	)
}
