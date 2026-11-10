import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth"
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"
import { auth, db, googleProvider } from "@/lib/firebase"
import type { UserProfile, UserRole } from "@/types"

interface AuthContextValue {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  isAdmin: boolean
  isLandlord: boolean
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  promoteToLandlord: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

async function ensureUserProfile(user: User): Promise<UserProfile> {
  const ref = doc(db, "users", user.uid)
  const snap = await getDoc(ref)

  if (snap.exists()) {
    return snap.data() as UserProfile
  }

  const profile: UserProfile = {
    uid: user.uid,
    email: user.email ?? "",
    displayName: user.displayName ?? "User",
    photoURL: user.photoURL ?? undefined,
    role: "user",
    isBanned: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  await setDoc(ref, {
    ...profile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return profile
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = async () => {
    if (!auth.currentUser) {
      setProfile(null)
      return
    }
    const p = await ensureUserProfile(auth.currentUser)
    setProfile(p)
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        try {
          const p = await ensureUserProfile(firebaseUser)
          setProfile(p)
        } catch (err) {
          console.error("Failed to load profile", err)
          setProfile(null)
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const signUp = async (email: string, password: string, displayName: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName })
    await ensureUserProfile(cred.user)
  }

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    await ensureUserProfile(result.user)
  }

  const logout = async () => {
    await signOut(auth)
    setProfile(null)
  }

  const promoteToLandlord = async () => {
    if (!user || !profile) return
    if (profile.role === "admin" || profile.role === "landlord") return

    const ref = doc(db, "users", user.uid)
    await updateDoc(ref, {
      role: "landlord" as UserRole,
      updatedAt: Date.now(),
    })
    setProfile({ ...profile, role: "landlord", updatedAt: Date.now() })
  }

  const value: AuthContextValue = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === "admin",
    isLandlord: profile?.role === "landlord" || profile?.role === "admin",
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    promoteToLandlord,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
