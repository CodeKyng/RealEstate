import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

interface Props {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  requireLandlord?: boolean
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requireAdmin = false,
  requireLandlord = false,
}: Props) {
  const { user, profile, loading, isAdmin, isLandlord } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (profile?.isBanned) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold">Account Suspended</h1>
        <p className="text-muted-foreground">
          Your account has been banned. Contact support if you believe this is a mistake.
        </p>
      </div>
    )
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />
  }

  if (requireLandlord && !isLandlord && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
