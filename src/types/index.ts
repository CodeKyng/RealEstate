export type UserRole = "user" | "landlord" | "admin"

export type ListingStatus = "pending" | "approved" | "rejected" | "rented" | "sold"

export type PropertyType =
  | "apartment"
  | "house"
  | "condo"
  | "townhouse"
  | "studio"
  | "land"
  | "commercial"

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  role: UserRole
  isBanned: boolean
  phone?: string
  createdAt: number
  updatedAt: number
}

export interface ListingAddress {
  street: string
  city: string
  state: string
  country: string
  zip?: string
  lat?: number
  lng?: number
}

export interface Listing {
  id: string
  ownerId: string
  ownerName: string
  title: string
  description: string
  price: number
  currency: string
  propertyType: PropertyType
  bedrooms: number
  bathrooms: number
  area: number
  areaUnit: "sqft" | "sqm"
  address: ListingAddress
  images: string[]
  amenities: string[]
  status: ListingStatus
  rejectionReason?: string
  createdAt: number
  updatedAt: number
  approvedAt?: number
  approvedBy?: string
}

export type ReportTargetType = "listing" | "user"
export type ReportStatus = "open" | "resolved" | "dismissed"

export interface Report {
  id: string
  reporterId: string
  reporterName: string
  targetType: ReportTargetType
  targetId: string
  reason: string
  description: string
  status: ReportStatus
  createdAt: number
  resolvedAt?: number
  resolvedBy?: string
  resolutionNote?: string
}

export interface ListingFilters {
  query?: string
  city?: string
  propertyType?: PropertyType | ""
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  status?: ListingStatus
}
