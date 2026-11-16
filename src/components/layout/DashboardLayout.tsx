import { AppSidebar, DashboardTopBar } from "@/components/layout/AppSidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  actions?: React.ReactNode
}

/**
 * Shell for authenticated app pages: collapsible sidebar + content area.
 * Use this instead of the public Navbar on dashboard / admin / create-listing.
 */
export function DashboardLayout({ children, title, actions }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-svh w-full bg-background">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopBar title={title}>{actions}</DashboardTopBar>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
