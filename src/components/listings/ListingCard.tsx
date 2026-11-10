import { Link } from "react-router-dom"
import { Bed, Bath, Maximize, MapPin } from "lucide-react"
import type { Listing } from "@/types"
import { Button } from "@/components/ui/button"

interface Props {
  listing: Listing
  showStatus?: boolean
}

function formatPrice(price: number, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function ListingCard({ listing, showStatus = false }: Props) {
  const image = listing.images?.[0] ?? "/hero.png"

  return (
    <Link
      to={`/listings/${listing.id}`}
      className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {showStatus && (
          <span
            className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
              listing.status === "approved"
                ? "bg-green-100 text-green-800"
                : listing.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : listing.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
            }`}
          >
            {listing.status}
          </span>
        )}
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-sm font-semibold text-white">
          {formatPrice(listing.price, listing.currency)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 font-semibold group-hover:text-primary">
          {listing.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {listing.address.city}, {listing.address.state}
        </p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" /> {listing.bedrooms} bd
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" /> {listing.bathrooms} ba
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-4 w-4" /> {listing.area} {listing.areaUnit}
          </span>
        </div>
        <p className="mt-2 text-xs capitalize text-muted-foreground">
          {listing.propertyType}
        </p>
      </div>
    </Link>
  )
}
