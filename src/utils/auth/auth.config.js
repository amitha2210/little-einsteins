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
            const isOnPlanPage = nextUrl?.pathname.startsWith("/plan")
            const isOnLoginPage = nextUrl?.pathname.startsWith("/login")
            const isOnRegisterPage = nextUrl?.pathname.startsWith("/register")
            const isOnPreferencesPage = nextUrl?.pathname.startsWith("/preferences")

            //returning false redirects to login page
            //only authenticated users can reach About page
            if (isOnPlanPage && !user) {
                return false
            }

            if (isOnPreferencesPage && !user) {
                return false
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