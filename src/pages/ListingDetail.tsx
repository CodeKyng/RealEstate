import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Bed, Bath, Maximize, MapPin, Flag, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { getListing } from "@/lib/listings"
import { createReport } from "@/lib/reports"
import { useAuth } from "@/contexts/AuthContext"
import type { Listing } from "@/types"
import Footer from "@/components/templates/Footer"

function formatPrice(price: number, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>()
  const { user, profile } = useAuth()
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [reportDesc, setReportDesc] = useState("")
  const [reportMsg, setReportMsg] = useState("")

  useEffect(() => {
    if (!id) return
    getListing(id)
      .then(setListing)
      .finally(() => setLoading(false))
  }, [id])

  const handleReport = async () => {
    if (!user || !profile || !listing) return
    try {
      await createReport({
        reporterId: user.uid,
        reporterName: profile.displayName,
        targetType: "listing",
        targetId: listing.id,
        reason: reportReason,
        description: reportDesc,
      })
      setReportMsg("Report submitted. Thank you.")
      setReportOpen(false)
    } catch {
      setReportMsg("Failed to submit report.")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p>Listing not found</p>
        <Button asChild>
          <Link to="/listings">Back to listings</Link>
        </Button>
      </div>
    )
  }

  const images = listing.images?.length ? listing.images : ["/hero.png"]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/listings">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Link>
        </Button>

        {/* Image gallery */}
        <div className="mb-6 overflow-hidden rounded-xl">
          <img
            src={images[activeImage]}
            alt={listing.title}
            className="aspect-[16/9] w-full object-cover"
          />
          {images.length > 1 && (
            <div className="mt-2 flex gap-2 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 ${
                    i === activeImage ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold sm:text-3xl">{listing.title}</h1>
            <p className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {listing.address.street}, {listing.address.city},{" "}
              {listing.address.state}
            </p>

            <div className="mt-4 flex flex-wrap gap-6 text-sm">
              <span className="flex items-center gap-1.5">
                <Bed className="h-5 w-5" /> {listing.bedrooms} bedrooms
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="h-5 w-5" /> {listing.bathrooms} bathrooms
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize className="h-5 w-5" /> {listing.area} {listing.areaUnit}
              </span>
              <span className="capitalize">{listing.propertyType}</span>
            </div>

            <hr className="my-6" />

            <h2 className="mb-2 text-lg font-semibold">About this home</h2>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {listing.description}
            </p>

            {listing.amenities?.length > 0 && (
              <>
                <h2 className="mb-3 mt-6 text-lg font-semibold">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((a) => (
                    <span
                      key={a}
                      className="rounded-full bg-muted px-3 py-1 text-sm"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <div className="sticky top-20 rounded-xl border bg-card p-6 shadow-sm">
              <p className="text-3xl font-bold">
                {formatPrice(listing.price, listing.currency)}
              </p>
              <p className="text-sm text-muted-foreground">Listed by {listing.ownerName}</p>

              <Button className="mt-4 w-full" size="lg">
                Contact landlord
              </Button>

              {user && user.uid !== listing.ownerId && (
                <Button
                  variant="outline"
                  className="mt-2 w-full"
                  onClick={() => setReportOpen(true)}
                >
                  <Flag className="mr-2 h-4 w-4" /> Report listing
                </Button>
              )}

              {reportMsg && (
                <p className="mt-2 text-center text-sm text-muted-foreground">{reportMsg}</p>
              )}
            </div>
          </div>
        </div>

        {reportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-background p-6 shadow-lg">
              <h3 className="mb-4 text-lg font-semibold">Report this listing</h3>
              <div className="space-y-3">
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                >
                  <option value="">Select reason</option>
                  <option value="spam">Spam or misleading</option>
                  <option value="incorrect">Incorrect information</option>
                  <option value="scam">Suspected scam</option>
                  <option value="offensive">Offensive content</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  placeholder="Additional details..."
                  value={reportDesc}
                  onChange={(e) => setReportDesc(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setReportOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!reportReason}
                    onClick={handleReport}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
