import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Home,
  Search,
  PlusCircle,
  LayoutDashboard,
  Shield,
  LogOut,
  Building2,
  ChevronLeft,
  ChevronRight,
  PanelLeft,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

const SIDEBAR_STORAGE_KEY = "havenhub-sidebar-collapsed"

type NavItem = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  adminOnly?: boolean
}

const mainNav: NavItem[] = [
  { title: "Browse", href: "/listings", icon: Search },
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "List property", href: "/create-listing", icon: PlusCircle },
  { title: "Admin", href: "/admin", icon: Shield, adminOnly: true },
]

export function AppSidebar() {
  const { user, profile, isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true"
    } catch {
      return false
    }
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed))
    } catch {
      /* ignore */
    }
  }, [collapsed])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const visibleNav = mainNav.filter((item) => !item.adminOnly || isAdmin)

  const isActive = (href: string) => {
    if (href === "/dashboard") return location.pathname === "/dashboard"
    return location.pathname === href || location.pathname.startsWith(href + "/")
  }

  const sidebarContent = (
    <>
      {/* Brand */}
      <div
        className={cn(
          "flex h-14 shrink-0 items-center gap-2.5 border-b border-sidebar-border px-3",
          collapsed && "justify-center px-2"
        )}
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight text-sidebar-foreground"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm shadow-sidebar-primary/25">
            <Home className="h-4 w-4" />
          </span>
          {!collapsed && <span className="text-base">HavenHub</span>}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
        <div className={cn("mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", collapsed && "sr-only")}>
          Menu
        </div>
        {visibleNav.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              to={item.href}
              title={collapsed ? item.title : undefined}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group relative flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-0"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active && "text-sidebar-primary")} />
              {!collapsed && <span className="truncate">{item.title}</span>}
              {active && !collapsed && (
                <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-sidebar-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User + actions */}
      <div className="mt-auto border-t border-sidebar-border p-2">
        {user && (
          <div
            className={cn(
              "mb-2 flex items-center gap-2.5 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-2.5 py-2",
              collapsed && "justify-center px-1.5"
            )}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/15 text-xs font-semibold text-sidebar-primary">
              {(profile?.displayName ?? user.email ?? "U").charAt(0).toUpperCase()}
            </span>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  {profile?.displayName ?? "User"}
                </p>
                <p className="truncate text-[11px] capitalize text-muted-foreground">
                  {profile?.role ?? "user"}
                </p>
              </div>
            )}
          </div>
        )}

        <div className={cn("flex gap-1", collapsed ? "flex-col items-center" : "items-center")}>
          <Button
            variant="ghost"
            size={collapsed ? "icon-sm" : "sm"}
            className={cn("text-muted-foreground hover:text-foreground", !collapsed && "flex-1 justify-start")}
            onClick={handleLogout}
            title="Log out"
          >
            <LogOut className="h-3.5 w-3.5" />
            {!collapsed && <span className="ml-1.5">Log out</span>}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden shrink-0 text-muted-foreground hover:text-foreground md:inline-flex"
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile trigger */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-3 left-3 z-40 rounded-lg shadow-sm md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <PanelLeft className="h-4 w-4" />
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl transition-transform duration-200 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-svh shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-out md:flex",
          collapsed ? "w-14" : "w-56"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}

/** Compact top bar used inside the dashboard shell (next to the sidebar). */
export function DashboardTopBar({ title, children }: { title?: string; children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 pl-10 md:pl-0">
        {title && (
          <div className="flex items-center gap-2">
            <Building2 className="hidden h-4 w-4 text-muted-foreground sm:block" />
            <h1 className="truncate text-sm font-semibold sm:text-base">{title}</h1>
          </div>
        )}
      </div>
      {children}
    </header>
  )
}
