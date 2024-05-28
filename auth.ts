import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import {API_BASE} from "@/consts/global";
import {hashPassword} from "@/lib/auth/utils";
import {signInSchema} from "@/lib/auth/schemaValidation";
import {ZodError} from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    },
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: "Username", type: "username" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    const { username, password } = await signInSchema.parseAsync(credentials)

                    // logic to hash password
                    const pwHash = hashPassword(credentials.password as string)

                    const user: any = await fetch(API_BASE + "/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                username: credentials?.username,
                                password: pwHash,
                            }
                        )
                    }).then(async (data) => {
                        console.log(data)
                        return await data.json()
                    }).catch(error => console.log("error" + error + API_BASE))


                    if (!user) {
                        //throw new Error("User not found.")
                        return null
                    }

                    // return user object with the their profile data
                    return user

                }
                catch (error) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        return null
                    }
                }
            },
        }),
    ],
})