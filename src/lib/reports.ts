import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore"
import { db } from "./firebase"
import type { Report, ReportStatus, ReportTargetType } from "@/types"

const reportsCol = collection(db, "reports")

export async function createReport(data: {
  reporterId: string
  reporterName: string
  targetType: ReportTargetType
  targetId: string
  reason: string
  description: string
}): Promise<string> {
  const docRef = await addDoc(reportsCol, {
    ...data,
    status: "open" as ReportStatus,
    createdAt: Date.now(),
  })
  return docRef.id
}

export async function getOpenReports(): Promise<Report[]> {
  const q = query(
    reportsCol,
    where("status", "==", "open"),
    orderBy("createdAt", "desc")
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Report)
}

export async function resolveReport(
  reportId: string,
  adminUid: string,
  status: "resolved" | "dismissed",
  note?: string
) {
  await updateDoc(doc(db, "reports", reportId), {
    status,
    resolvedAt: Date.now(),
    resolvedBy: adminUid,
    resolutionNote: note ?? "",
  })
}
