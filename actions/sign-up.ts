"use server"

import { FormValues } from "@/app/sign-up/page"
import { authClient } from "@/lib/auth-client"
import prisma from "@/lib/db"
import { put } from "@vercel/blob"
import bcrypt from 'bcryptjs'

export const signUpAction = async (values: FormValues) => {
	try {
		const existingEmail = await prisma.user.findUnique({
			where: {
				email: values.email
			},
		})

		if (existingEmail) {
			return { success: false, message: "Email already exists." }
		}

		const user = authClient.signUp.email({
			email: values.email,
			password: values.password,
			name: `${values.firstName} ${values.lastName}`,
			image: "https://qhjpefeayuucuga9.public.blob.vercel-storage.com/default-image-v5Xp9osc2mYGDNFOYvXvdiP2OaJ1oB",
			callbackURL: "/"
		})

		if (!user) {
			return { success: false, message: "Sign up failed" }
		}

		if (values.image) {
			const blob = await put(`${values.email}/profile.jpg`, values.image, {
				access: "public",
			})

			await prisma.user.update({
				where: {
					email: values.email
				},
				data: {
					image: blob.url
				}
			})
		}

		const hashedPassword = await bcrypt.hash(values.password, 10)

		await prisma.user.update({
			where: {
				email: values.email
			},
			data: {
				firstName: values.firstName,
				lastName: values.lastName,
				password: hashedPassword
			}
		})

		return { success: true, message: "Signed up successfully" }
	} catch (err) {
		console.error("Sign up error:", err)
		return { success: false, message: (err as Error).message }
	}
}
