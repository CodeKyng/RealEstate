import { Link } from "react-router-dom"
import { Home } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="mb-3 flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Home className="h-4 w-4" />
              </span>
              HavenHub
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Modern marketplace for homes across Nigeria. Search, list, and manage
              with confidence.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Explore</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/listings" className="hover:text-foreground">
                  Browse homes
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="hover:text-foreground">
                  List a property
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-foreground">
                  Create account
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Account</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/login" className="hover:text-foreground">
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Company</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About</li>
              <li>Help center</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} HavenHub. All rights reserved.</p>
          <p>Built for renters & landlords</p>
        </div>
      </div>
    </footer>
  )
}
