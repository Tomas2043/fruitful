import { FormValues } from "@/app/sign-in/page";
import { authClient } from "@/lib/auth-client";

export const signInAction = async (values: FormValues) => {
	try {
		if (!values.email || !values.password) {
			return { success: false, message: "Email and password are required" }
		}

		const { data, error } = await authClient.signIn.email({
			email: values.email,
			password: values.password,
		})

		if (error) {
			return { success: false, message: error.message }
		}

		return { success: true, message: "Successfully signed in" }
	} catch (error) {
		console.error(error)
		return { success: false, message: "Error occurred during sign in" }
	}
}
