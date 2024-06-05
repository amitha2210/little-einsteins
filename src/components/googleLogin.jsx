import { signIn } from "@/utils/auth"
 
export default function googleLogin() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/" })
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  )
} 