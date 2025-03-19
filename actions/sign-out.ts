"use server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function signOut() {
	"use server"
	await auth.api.signOut({
		headers: await headers()
	})
	redirect("/")
}
