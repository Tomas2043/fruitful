"use client"

import { Carrot, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpAction } from "@/actions/sign-up";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import Link from "next/link";

const formSchema = z.object({
	firstName: z.string().nonempty("First name is required"),
	lastName: z.string().nonempty("Last name is required"),
	email: z.string().email("Invalid email").nonempty("Email is required"),
	password: z.string().nonempty("Password is required")
		.regex(new RegExp(".*[A-Z].*"), "Password must contain at least one uppercase letter")
		.regex(new RegExp(".*[a-z].*"), "Password must contain at least one lowercase letter")
		.regex(new RegExp(".*[0-9].*"), "Password must contain at least one number")
		.min(8, "Password must be at least 8 characters long"),
	passwordConfirmation: z.string().nonempty("Password confirmation is required"),
	image: z.instanceof(File).optional(),
}).refine(data => data.password === data.passwordConfirmation, {
	message: "Passwords don't match",
	path: ["passwordConfirmation"]
})

export type FormValues = z.infer<typeof formSchema>;

export default function SignUp() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			image: undefined,
		}
	});

	async function onSubmit(data: FormValues) {
		setLoading(true);
		const result = await signUpAction(data);
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
					<a href="/" className="flex items-center gap-2 font-medium">
						<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<Carrot className="size-4" />
						</div>
						Fruitful
					</a>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-md pb-10">
						<Card className="z-50 rounded-md rounded-t-none p-0 border-none shadow-none">
							<CardHeader>
								<CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
								<CardDescription className="text-xs md:text-sm">
									Enter your information to create an account
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4">
									<Form {...form}>
										<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
											<div className="grid grid-cols-2 gap-4">
												<FormField
													control={form.control}
													name="firstName"
													render={({ field }) => (
														<FormItem>
															<FormLabel>First Name</FormLabel>
															<FormControl>
																<Input placeholder="Max" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name="lastName"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Last Name</FormLabel>
															<FormControl>
																<Input placeholder="Robinson" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
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
											<FormField
												control={form.control}
												name="passwordConfirmation"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Confirm Password</FormLabel>
														<FormControl>
															<Input type="password" placeholder="Confirm Password" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="image"
												render={({ field: { value, onChange, ...field } }) => (
													<FormItem>
														<FormLabel>Profile Image (optional)</FormLabel>
														<FormControl>
															<div className="grid gap-4">
																{value && (
																	<div className="relative w-16 h-16 rounded-full overflow-hidden">
																		<img
																			src={URL.createObjectURL(value)}
																			alt="Profile Image"
																			className="w-full h-full object-cover"
																		/>
																	</div>
																)}
																<div className="flex items-center gap-2">
																	<Input
																		type="file"
																		accept="image/*"
																		onChange={(e) => {
																			const file = e.target.files?.[0];
																			if (file) {
																				onChange(file);
																			}
																		}}
																		{...field}
																		className="w-full cursor-pointer"
																	/>
																	{value && (
																		<X
																			className="cursor-pointer"
																			onClick={() => onChange(undefined)}
																		/>
																	)}
																</div>
															</div>
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
													"Sign Up"
												)}
											</Button>
										</form>
									</Form>
									<div className="flex justify-center gap-1">
										<p className="text-center text-sm text-gray-500 tracking-tight">Already have an account?</p>
										<Link href={"/sign-in"} className="group text-center text-sm font-medium hover:underline underline-offset-2 tracking-tight flex items-center gap-1 transition">
											Sign In
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

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}
