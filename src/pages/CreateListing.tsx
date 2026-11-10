import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { useAuth } from "@/contexts/AuthContext"
import { createListing, PROPERTY_TYPES, AMENITIES } from "@/lib/listings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { PropertyType } from "@/types"

function CreateListingForm() {
  const { user, profile, promoteToLandlord } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [amenities, setAmenities] = useState<string[]>([])

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    currency: "NGN",
    propertyType: "apartment" as PropertyType,
    bedrooms: "1",
    bathrooms: "1",
    area: "",
    areaUnit: "sqm" as "sqm" | "sqft",
    street: "",
    city: "",
    state: "",
    country: "Nigeria",
  })

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const toggleAmenity = (a: string) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !profile) return
    setError("")
    setLoading(true)

    try {
      if (images.length === 0) {
        throw new Error("Please add at least one photo")
      }

      await createListing(
        {
          ownerId: user.uid,
          ownerName: profile.displayName,
          title: form.title,
          description: form.description,
          price: Number(form.price),
          currency: form.currency,
          propertyType: form.propertyType,
          bedrooms: Number(form.bedrooms),
          bathrooms: Number(form.bathrooms),
          area: Number(form.area),
          areaUnit: form.areaUnit,
          address: {
            street: form.street,
            city: form.city,
            state: form.state,
            country: form.country,
          },
          images: [],
          amenities,
        },
        images
      )

      // First listing → become landlord
      if (profile.role === "user") {
        await promoteToLandlord()
      }

      navigate("/dashboard")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create listing")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="mb-2 text-2xl font-bold">List your property</h1>
        <p className="mb-6 text-muted-foreground">
          Your listing will be reviewed by an admin before it goes live.
          {profile?.role === "user" && (
            <span className="mt-1 block text-sm text-primary">
              Posting your first listing will make you a landlord.
            </span>
          )}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <Input
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Spacious 3-bedroom apartment in Lekki"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              required
              rows={4}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe the property, neighborhood, and what makes it special..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Price</label>
              <Input
                required
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                placeholder="2500000"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Currency</label>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                value={form.currency}
                onChange={(e) => update("currency", e.target.value)}
              >
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Type</label>
              <select
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                value={form.propertyType}
                onChange={(e) => update("propertyType", e.target.value)}
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Beds</label>
              <Input
                type="number"
                min={0}
                value={form.bedrooms}
                onChange={(e) => update("bedrooms", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Baths</label>
              <Input
                type="number"
                min={0}
                step={0.5}
                value={form.bathrooms}
                onChange={(e) => update("bathrooms", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Area</label>
              <Input
                type="number"
                min={0}
                value={form.area}
                onChange={(e) => update("area", e.target.value)}
                placeholder="120"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Street address</label>
              <Input
                required
                value={form.street}
                onChange={(e) => update("street", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">City</label>
              <Input
                required
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="Lagos"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">State</label>
              <Input
                required
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
                placeholder="Lagos"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Country</label>
              <Input
                required
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                    amenities.includes(a)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Photos</label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files ?? []))}
            />
            {images.length > 0 && (
              <p className="mt-1 text-sm text-muted-foreground">
                {images.length} photo{images.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit for review"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default function CreateListing() {
  return (
    <ProtectedRoute>
      <CreateListingForm />
    </ProtectedRoute>
  )
}
