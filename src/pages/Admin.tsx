import { useEffect, useState } from "react"
import { Check, X, Ban, Shield, Flag } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { useAuth } from "@/contexts/AuthContext"
import { getPendingListings, updateListingStatus } from "@/lib/listings"
import { getOpenReports, resolveReport } from "@/lib/reports"
import { getAllUsers, banUser, setUserRole } from "@/lib/users"
import { Button } from "@/components/ui/button"
import type { Listing, Report, UserProfile } from "@/types"

type Tab = "listings" | "reports" | "users"

function AdminContent() {
  const { user } = useAuth()
  const [tab, setTab] = useState<Tab>("listings")
  const [pending, setPending] = useState<Listing[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const [p, r, u] = await Promise.all([
        getPendingListings(),
        getOpenReports(),
        getAllUsers(),
      ])
      setPending(p)
      setReports(r)
      setUsers(u)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleApprove = async (id: string) => {
    if (!user) return
    setActionLoading(id)
    try {
      await updateListingStatus(id, "approved", user.uid)
      setPending((prev) => prev.filter((l) => l.id !== id))
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id: string) => {
    if (!user) return
    const reason = window.prompt("Rejection reason (optional):") ?? "Does not meet guidelines"
    setActionLoading(id)
    try {
      await updateListingStatus(id, "rejected", user.uid, reason)
      setPending((prev) => prev.filter((l) => l.id !== id))
    } finally {
      setActionLoading(null)
    }
  }

  const handleResolveReport = async (id: string, status: "resolved" | "dismissed") => {
    if (!user) return
    setActionLoading(id)
    try {
      await resolveReport(id, user.uid, status)
      setReports((prev) => prev.filter((r) => r.id !== id))
    } finally {
      setActionLoading(null)
    }
  }

  const handleBan = async (uid: string, currentlyBanned: boolean) => {
    setActionLoading(uid)
    try {
      await banUser(uid, !currentlyBanned)
      setUsers((prev) =>
        prev.map((u) => (u.uid === uid ? { ...u, isBanned: !currentlyBanned } : u))
      )
    } finally {
      setActionLoading(null)
    }
  }

  const handleMakeAdmin = async (uid: string) => {
    if (!window.confirm("Grant admin role to this user?")) return
    setActionLoading(uid)
    try {
      await setUserRole(uid, "admin")
      setUsers((prev) =>
        prev.map((u) => (u.uid === uid ? { ...u, role: "admin" } : u))
      )
    } finally {
      setActionLoading(null)
    }
  }

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "listings", label: "Pending listings", count: pending.length },
    { id: "reports", label: "Reports", count: reports.length },
    { id: "users", label: "Users", count: users.length },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Admin panel</h1>
        </div>

        <div className="mb-6 flex gap-2 border-b">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              {t.count > 0 && (
                <span className="ml-1.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-xs">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            {tab === "listings" && (
              <div className="space-y-4">
                {pending.length === 0 ? (
                  <p className="py-12 text-center text-muted-foreground">
                    No pending listings
                  </p>
                ) : (
                  pending.map((l) => (
                    <div
                      key={l.id}
                      className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
                    >
                      <img
                        src={l.images?.[0] ?? "/hero.png"}
                        alt=""
                        className="h-24 w-32 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{l.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {l.address.city}, {l.address.state} · {l.ownerName} ·{" "}
                          ₦{l.price.toLocaleString()}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm">{l.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          disabled={actionLoading === l.id}
                          onClick={() => handleApprove(l.id)}
                        >
                          <Check className="mr-1 h-4 w-4" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={actionLoading === l.id}
                          onClick={() => handleReject(l.id)}
                        >
                          <X className="mr-1 h-4 w-4" /> Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === "reports" && (
              <div className="space-y-4">
                {reports.length === 0 ? (
                  <p className="py-12 text-center text-muted-foreground">No open reports</p>
                ) : (
                  reports.map((r) => (
                    <div key={r.id} className="rounded-xl border p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Flag className="h-4 w-4 text-destructive" />
                            <span className="font-medium capitalize">{r.reason}</span>
                            <span className="text-xs text-muted-foreground">
                              on {r.targetType}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Reported by {r.reporterName}
                          </p>
                          {r.description && (
                            <p className="mt-2 text-sm">{r.description}</p>
                          )}
                          <p className="mt-1 text-xs text-muted-foreground">
                            Target ID: {r.targetId}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <Button
                            size="sm"
                            disabled={actionLoading === r.id}
                            onClick={() => handleResolveReport(r.id, "resolved")}
                          >
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={actionLoading === r.id}
                            onClick={() => handleResolveReport(r.id, "dismissed")}
                          >
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === "users" && (
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Name</th>
                      <th className="px-4 py-3 text-left font-medium">Email</th>
                      <th className="px-4 py-3 text-left font-medium">Role</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.uid} className="border-b last:border-0">
                        <td className="px-4 py-3">{u.displayName}</td>
                        <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                        <td className="px-4 py-3 capitalize">{u.role}</td>
                        <td className="px-4 py-3">
                          {u.isBanned ? (
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">
                              Banned
                            </span>
                          ) : (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            {u.role !== "admin" && (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={actionLoading === u.uid}
                                onClick={() => handleMakeAdmin(u.uid)}
                              >
                                Make admin
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant={u.isBanned ? "default" : "destructive"}
                              disabled={actionLoading === u.uid || u.uid === user?.uid}
                              onClick={() => handleBan(u.uid, u.isBanned)}
                            >
                              <Ban className="mr-1 h-3.5 w-3.5" />
                              {u.isBanned ? "Unban" : "Ban"}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function Admin() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminContent />
    </ProtectedRoute>
  )
}
