import { Link } from "react-router-dom"
import { Home } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </span>
          HavenHub
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <div className="hh-grid absolute inset-0 opacity-20" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-primary-foreground">
          <p className="mb-2 text-sm font-medium opacity-80">Welcome back</p>
          <h2 className="max-w-md text-3xl font-semibold tracking-tight">
            Your next home is one search away.
          </h2>
          <p className="mt-3 max-w-sm text-sm opacity-80">
            Sign in to manage listings, save searches, and contact landlords.
          </p>
        </div>
      </div>
    </div>
  )
}
