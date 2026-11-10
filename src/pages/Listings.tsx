import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Search, SlidersHorizontal } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { ListingCard } from "@/components/listings/ListingCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getListings, PROPERTY_TYPES } from "@/lib/listings"
import type { Listing, ListingFilters, PropertyType } from "@/types"
import Footer from "@/components/templates/Footer"

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<ListingFilters>({
    query: searchParams.get("q") ?? "",
    city: searchParams.get("city") ?? "",
    propertyType: (searchParams.get("type") as PropertyType) || "",
    minPrice: searchParams.get("min") ? Number(searchParams.get("min")) : undefined,
    maxPrice: searchParams.get("max") ? Number(searchParams.get("max")) : undefined,
    bedrooms: searchParams.get("beds") ? Number(searchParams.get("beds")) : undefined,
  })

  const load = async () => {
    setLoading(true)
    try {
      const data = await getListings(filters)
      setListings(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (filters.query) params.set("q", filters.query)
    if (filters.city) params.set("city", filters.city)
    if (filters.propertyType) params.set("type", filters.propertyType)
    if (filters.minPrice) params.set("min", String(filters.minPrice))
    if (filters.maxPrice) params.set("max", String(filters.maxPrice))
    if (filters.bedrooms) params.set("beds", String(filters.bedrooms))
    setSearchParams(params)
    load()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold sm:text-3xl">Find your next home</h1>
          <p className="text-muted-foreground">
            {loading ? "Searching..." : `${listings.length} homes available`}
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-4 flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Location or keyword
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="City, address, or keyword"
                value={filters.query ?? ""}
                onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              />
            </div>
          </div>
          <div className="w-full sm:w-40">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Type</label>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              value={filters.propertyType ?? ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  propertyType: e.target.value as PropertyType | "",
                }))
              }
            >
              <option value="">Any</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-28">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Beds</label>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              value={filters.bedrooms ?? ""}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  bedrooms: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
          <Button onClick={applyFilters} className="w-full sm:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="hidden sm:flex"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="mb-6 flex flex-wrap gap-4 rounded-xl border bg-card p-4">
            <div>
              <label className="mb-1 block text-xs font-medium">Min price</label>
              <Input
                type="number"
                placeholder="0"
                className="w-32"
                value={filters.minPrice ?? ""}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    minPrice: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">Max price</label>
              <Input
                type="number"
                placeholder="Any"
                className="w-32"
                value={filters.maxPrice ?? ""}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    maxPrice: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">City</label>
              <Input
                placeholder="Lagos"
                className="w-40"
                value={filters.city ?? ""}
                onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={applyFilters}>Apply</Button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium">No listings found</p>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
