import { Link, useNavigate } from "react-router-dom"
import {
  Home,
  Search,
  PlusCircle,
  LayoutDashboard,
  Shield,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { user, profile, isAdmin, isLandlord, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const linkClass =
    "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-15 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6" style={{ height: "3.75rem" }}>
        <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/25">
            <Home className="h-4 w-4" />
          </span>
          <span className="text-base">HavenHub</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          <Link to="/listings" className={linkClass}>
            <Search className="h-4 w-4" />
            Browse
          </Link>
          {user && (
            <>
              <Link to="/create-listing" className={linkClass}>
                <PlusCircle className="h-4 w-4" />
                List
              </Link>
              <Link to="/dashboard" className={linkClass}>
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              {isAdmin && (
                <Link to="/admin" className={linkClass}>
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <div className="mr-1 flex items-center gap-2 rounded-full border bg-card px-3 py-1.5">
                <span className="max-w-[120px] truncate text-sm font-medium">
                  {profile?.displayName ?? user.email}
                </span>
                {(isLandlord || isAdmin) && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    {profile?.role}
                  </span>
                )}
              </div>
              <Button variant="outline" size="sm" className="rounded-lg" onClick={handleLogout}>
                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClass}>
                Log in
              </Link>
              <Link
                to="/signup"
                className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-colors hover:bg-primary/90"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t bg-background px-4 py-3 md:hidden">
          <div className="flex flex-col gap-0.5">
            <Link to="/listings" className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted" onClick={() => setOpen(false)}>
              Browse listings
            </Link>
            {user ? (
              <>
                <Link to="/create-listing" className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted" onClick={() => setOpen(false)}>
                  List property
                </Link>
                <Link to="/dashboard" className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted" onClick={() => setOpen(false)}>
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted" onClick={() => setOpen(false)}>
                    Admin
                  </Link>
                )}
                <button
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-destructive hover:bg-muted"
                  onClick={() => {
                    handleLogout()
                    setOpen(false)
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted" onClick={() => setOpen(false)}>
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="mt-1 rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
