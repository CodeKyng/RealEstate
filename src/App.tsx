import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import { AuthProvider } from "@/contexts/AuthContext"
import Home from "./pages/Home"
import Subscribe from "./pages/Subscribe"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Listings from "./pages/Listings"
import ListingDetail from "./pages/ListingDetail"
import CreateListing from "./pages/CreateListing"
import Dashboard from "./pages/Dashboard"
import Admin from "./pages/Admin"

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        404
      </p>
      <h1 className="text-4xl font-bold">Page not found</h1>
      <Link
        to="/"
        className="rounded-full bg-primary px-5 py-2 text-primary-foreground"
      >
        Back to Home
      </Link>
    </main>
  )
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
