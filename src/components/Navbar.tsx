import { Link, useNavigate } from "react-router-dom"
import { Home, Search, PlusCircle, LayoutDashboard, Shield, LogOut, Menu, X } from "lucide-react"
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

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <Home className="h-5 w-5" />
          HavenHub
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/listings"
            className="inline-flex h-7 items-center gap-1 rounded-lg px-2.5 text-[0.8rem] font-medium hover:bg-muted"
          >
            <Search className="h-4 w-4" />
            Browse
          </Link>

          {user && (
            <>
              <Link
                to="/create-listing"
                className="inline-flex h-7 items-center gap-1 rounded-lg px-2.5 text-[0.8rem] font-medium hover:bg-muted"
              >
                <PlusCircle className="h-4 w-4" />
                List Property
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex h-7 items-center gap-1 rounded-lg px-2.5 text-[0.8rem] font-medium hover:bg-muted"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex h-7 items-center gap-1 rounded-lg px-2.5 text-[0.8rem] font-medium hover:bg-muted"
                >
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
              <span className="text-sm text-muted-foreground">
                {profile?.displayName ?? user.email}
                {(isLandlord || isAdmin) && (
                  <span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-xs capitalize text-primary">
                    {profile?.role}
                  </span>
                )}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex h-7 items-center rounded-lg px-2.5 text-[0.8rem] font-medium hover:bg-muted"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="inline-flex h-7 items-center rounded-lg bg-primary px-2.5 text-[0.8rem] font-medium text-primary-foreground hover:bg-primary/80"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              to="/listings"
              className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              Browse Listings
            </Link>
            {user ? (
              <>
                <Link
                  to="/create-listing"
                  className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  List Property
                </Link>
                <Link
                  to="/dashboard"
                  className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
                  onClick={() => {
                    handleLogout()
                    setOpen(false)
                  }}
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
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
