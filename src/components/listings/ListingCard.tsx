import { Link } from "react-router-dom"
import { Bed, Bath, Maximize, MapPin } from "lucide-react"
import type { Listing } from "@/types"

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
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {showStatus && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize backdrop-blur-md ${
              listing.status === "approved"
                ? "bg-emerald-500/90 text-white"
                : listing.status === "pending"
                  ? "bg-amber-400/90 text-amber-950"
                  : listing.status === "rejected"
                    ? "bg-red-500/90 text-white"
                    : "bg-white/90 text-foreground"
            }`}
          >
            {listing.status}
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-lg bg-card/95 px-2.5 py-1 text-sm font-semibold shadow-sm backdrop-blur">
          {formatPrice(listing.price, listing.currency)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 font-semibold tracking-tight group-hover:text-primary">
          {listing.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {listing.address.city}, {listing.address.state}
          </span>
        </p>
        <div className="mt-auto flex items-center gap-3 border-t pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5" /> {listing.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" /> {listing.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" /> {listing.area} {listing.areaUnit}
          </span>
          <span className="ml-auto capitalize">{listing.propertyType}</span>
        </div>
      </div>
    </Link>
  )
}
