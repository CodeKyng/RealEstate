import { doc, updateDoc, getDoc, getDocs, collection, query, orderBy } from "firebase/firestore"
import { db } from "./firebase"
import type { UserProfile, UserRole } from "@/types"

export async function banUser(uid: string, banned: boolean) {
  await updateDoc(doc(db, "users", uid), {
    isBanned: banned,
    updatedAt: Date.now(),
  })
}

export async function setUserRole(uid: string, role: UserRole) {
  await updateDoc(doc(db, "users", uid), {
    role,
    updatedAt: Date.now(),
  })
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid))
  if (!snap.exists()) return null
  return snap.data() as UserProfile
}

export async function getAllUsers(): Promise<UserProfile[]> {
  const q = query(collection(db, "users"), orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as UserProfile)
}
