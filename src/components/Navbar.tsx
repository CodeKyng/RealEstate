import { Link, useNavigate } from "react-router-dom"
import { Home, Search, PlusCircle, LayoutDashboard, Shield, LogOut, User, Menu, X } from "lucide-react"
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
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Home className="h-5 w-5" />
          HavenHub
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/listings">
              <Search className="mr-1 h-4 w-4" />
              Browse
            </Link>
          </Button>

          {user && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/create-listing">
                  <PlusCircle className="mr-1 h-4 w-4" />
                  List Property
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-1 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              {isAdmin && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin">
                    <Shield className="mr-1 h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              )}
            </>
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {profile?.displayName ?? user.email}
                {isLandlord && (
                  <span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
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
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
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
            <Button variant="ghost" className="justify-start" asChild onClick={() => setOpen(false)}>
              <Link to="/listings">Browse Listings</Link>
            </Button>
            {user ? (
              <>
                <Button variant="ghost" className="justify-start" asChild onClick={() => setOpen(false)}>
                  <Link to="/create-listing">List Property</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild onClick={() => setOpen(false)}>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                {isAdmin && (
                  <Button variant="ghost" className="justify-start" asChild onClick={() => setOpen(false)}>
                    <Link to="/admin">Admin</Link>
                  </Button>
                )}
                <Button variant="ghost" className="justify-start" onClick={() => { handleLogout(); setOpen(false) }}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="justify-start" asChild onClick={() => setOpen(false)}>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button className="justify-start" asChild onClick={() => setOpen(false)}>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
