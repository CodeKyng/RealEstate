import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  type QueryConstraint,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "./firebase"
import type { Listing, ListingFilters, ListingStatus, PropertyType } from "@/types"

const listingsCol = collection(db, "listings")

export async function createListing(
  data: Omit<Listing, "id" | "createdAt" | "updatedAt" | "status"> &
    { status?: ListingStatus },
  imageFiles: File[]
): Promise<string> {
  const imageUrls: string[] = []

  for (const file of imageFiles) {
    const path = `listings/${data.ownerId}/${Date.now()}_${file.name}`
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    imageUrls.push(url)
  }

  const docRef = await addDoc(listingsCol, {
    ...data,
    images: imageUrls,
    status: data.status ?? "pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    serverCreatedAt: serverTimestamp(),
  })

  return docRef.id
}

export async function updateListingStatus(
  listingId: string,
  status: ListingStatus,
  adminUid: string,
  rejectionReason?: string
) {
  const refDoc = doc(db, "listings", listingId)
  const payload: Record<string, unknown> = {
    status,
    updatedAt: Date.now(),
  }
  if (status === "approved") {
    payload.approvedAt = Date.now()
    payload.approvedBy = adminUid
    payload.rejectionReason = null
  }
  if (status === "rejected") {
    payload.rejectionReason = rejectionReason ?? "Does not meet guidelines"
  }
  await updateDoc(refDoc, payload)
}

export async function getListing(id: string): Promise<Listing | null> {
  const snap = await getDoc(doc(db, "listings", id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Listing
}

export async function getListings(
  filters: ListingFilters = {},
  max = 50
): Promise<Listing[]> {
  const constraints: QueryConstraint[] = []

  // Public browse only shows approved by default
  if (filters.status) {
    constraints.push(where("status", "==", filters.status))
  } else {
    constraints.push(where("status", "==", "approved"))
  }

  if (filters.propertyType) {
    constraints.push(where("propertyType", "==", filters.propertyType))
  }
  if (filters.city) {
    constraints.push(where("address.city", "==", filters.city))
  }
  if (filters.bedrooms !== undefined && filters.bedrooms > 0) {
    constraints.push(where("bedrooms", ">=", filters.bedrooms))
  }

  constraints.push(orderBy("createdAt", "desc"))
  constraints.push(limit(max))

  const q = query(listingsCol, ...constraints)
  const snap = await getDocs(q)

  let results = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Listing)

  // Client-side filters that are harder with single-field indexes
  if (filters.minPrice !== undefined) {
    results = results.filter((l) => l.price >= filters.minPrice!)
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter((l) => l.price <= filters.maxPrice!)
  }
  if (filters.query) {
    const qLower = filters.query.toLowerCase()
    results = results.filter(
      (l) =>
        l.title.toLowerCase().includes(qLower) ||
        l.description.toLowerCase().includes(qLower) ||
        l.address.city.toLowerCase().includes(qLower) ||
        l.address.state.toLowerCase().includes(qLower)
    )
  }
  if (filters.bathrooms !== undefined && filters.bathrooms > 0) {
    results = results.filter((l) => l.bathrooms >= filters.bathrooms!)
  }

  return results
}

export async function getListingsByOwner(ownerId: string): Promise<Listing[]> {
  const q = query(
    listingsCol,
    where("ownerId", "==", ownerId),
    orderBy("createdAt", "desc")
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Listing)
}

export async function getPendingListings(): Promise<Listing[]> {
  const q = query(
    listingsCol,
    where("status", "==", "pending"),
    orderBy("createdAt", "desc")
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Listing)
}

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "studio", label: "Studio" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
]

export const AMENITIES = [
  "Parking",
  "Air Conditioning",
  "Swimming Pool",
  "Gym",
  "Security",
  "Furnished",
  "Balcony",
  "Garden",
  "Elevator",
  "Pet Friendly",
  "Generator",
  "Water Heater",
]
