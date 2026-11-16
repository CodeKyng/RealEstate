import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PlusCircle } from "lucide-react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { ListingCard } from "@/components/listings/ListingCard"
import { useAuth } from "@/contexts/AuthContext"
import { getListingsByOwner } from "@/lib/listings"
import type { Listing } from "@/types"

function DashboardContent() {
  const { profile, isLandlord } = useAuth()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    getListingsByOwner(profile.uid)
      .then(setListings)
      .finally(() => setLoading(false))
  }, [profile])

  return (
    <DashboardLayout
      title="Dashboard"
      actions={
        <Link
          to="/create-listing"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">List a property</span>
        </Link>
      }
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Welcome back,{" "}
            <span className="font-medium text-foreground">{profile?.displayName}</span>
            {profile?.role && (
              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs capitalize text-primary">
                {profile.role}
              </span>
            )}
          </p>
        </div>

        <section>
          <h2 className="mb-4 text-lg font-semibold">
            {isLandlord ? "My listings" : "Your listings"}
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="rounded-xl border border-dashed p-12 text-center">
              <p className="mb-2 font-medium">No listings yet</p>
              <p className="mb-4 text-sm text-muted-foreground">
                Post your first property and become a landlord automatically.
              </p>
              <Link
                to="/create-listing"
                className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
              >
                Create listing
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((l) => (
                <ListingCard key={l.id} listing={l} showStatus />
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  )
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
