import { NextResponse } from "next/server"

export const authConfig = {
    pages: {
        signIn: "/login"
    }, 
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
            }
            return session
        },
        authorized({ request: { nextUrl }, auth }) {
            const user = auth?.user
            const isOnAboutPage = nextUrl?.pathname.startsWith("/about")
            const isOnLoginPage = nextUrl?.pathname.startsWith("/login")
            const isOnRegisterPage = nextUrl?.pathname.startsWith("/register")

            //returning false redirects to login page
            //only authenticated users can reach About page
            if (isOnAboutPage && !user) {
                return false
                //return NextResponse.redirect(new URL("/login", nextUrl))
            }

            //only unauthenticated users can reach the login page
            if (isOnLoginPage && user) {
                return NextResponse.redirect(new URL("/", nextUrl))
            }

            if (isOnRegisterPage && user) {
                return NextResponse.redirect(new URL("/", nextUrl))
            }

            return true
        }
    }
}