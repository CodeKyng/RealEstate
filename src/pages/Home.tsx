import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Search,
  Home as HomeIcon,
  Shield,
  Sparkles,
  MapPin,
  ArrowRight,
  Building2,
  KeyRound,
  BadgeCheck,
} from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Footer from "@/components/templates/Footer"
import room1 from "../assets/room1.png"
import room2 from "../assets/room2.png"
import room3 from "../assets/room3.png"
import room4 from "../assets/room4.png"
import scape1 from "../assets/scape1.png"
import scape2 from "../assets/scape2.png"
import scape3 from "../assets/scape3.png"

const FEATURED = [
  { img: room1, title: "Modern Lekki Flat", price: "₦2.4M", meta: "3 bd · 2 ba · Lagos" },
  { img: room2, title: "Ikoyi Waterfront", price: "₦8.1M", meta: "4 bd · 3 ba · Lagos" },
  { img: room3, title: "Abuja Studio", price: "₦900K", meta: "1 bd · 1 ba · Abuja" },
  { img: room4, title: "Victoria Island Penthouse", price: "₦12M", meta: "5 bd · 4 ba · Lagos" },
]

const STEPS = [
  {
    icon: Search,
    title: "Discover homes",
    body: "Filter by city, price, beds, and amenities. Every listing is reviewed before it goes live.",
  },
  {
    icon: KeyRound,
    title: "List in minutes",
    body: "Post your first property and you automatically become a landlord on HavenHub.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted & moderated",
    body: "Admins approve listings and handle reports so the marketplace stays clean.",
  },
]

export default function Home() {
  const [q, setQ] = useState("")
  const navigate = useNavigate()

  const search = () => {
    navigate(q.trim() ? `/listings?q=${encodeURIComponent(q.trim())}` : "/listings")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="hh-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="hh-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Nigeria&apos;s modern rental marketplace
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Find a place you&apos;ll{" "}
            <span className="bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
              actually love
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Browse verified homes, list your property in minutes, and manage everything
            from one calm dashboard.
          </p>

          {/* Search pill */}
          <div className="mt-10 w-full max-w-2xl rounded-2xl border bg-card/80 p-2 shadow-lg shadow-primary/5 backdrop-blur">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && search()}
                  placeholder="City, neighborhood, or keyword…"
                  className="h-11 border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
                />
              </div>
              <Button size="lg" className="h-11 shrink-0 rounded-xl px-6" onClick={search}>
                <Search className="mr-2 h-4 w-4" />
                Search homes
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>Popular:</span>
            {["Lagos", "Abuja", "Lekki", "Port Harcourt"].map((city) => (
              <Link
                key={city}
                to={`/listings?q=${city}`}
                className="rounded-full border bg-card px-3 py-1 transition-colors hover:border-primary/40 hover:text-primary"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6">
          {[
            { label: "Homes listed", value: "2,400+" },
            { label: "Cities", value: "18" },
            { label: "Landlords", value: "890+" },
            { label: "Avg. response", value: "< 2 hrs" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Featured homes
            </h2>
            <p className="mt-1 text-muted-foreground">
              Hand-picked listings across Nigeria
            </p>
          </div>
          <Link
            to="/listings"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((f) => (
            <Link
              key={f.title}
              to="/listings"
              className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={f.img}
                  alt={f.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold">{f.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{f.meta}</p>
                <p className="mt-2 text-lg font-semibold text-primary">{f.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bento how it works */}
      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Built for renters & landlords
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
              A clean flow from search to listing — inspired by the best modern product UIs.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Step {i + 1}
                </p>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large visual CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid overflow-hidden rounded-3xl border bg-card shadow-sm lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              <Building2 className="h-3.5 w-3.5" />
              For property owners
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">
              List your first home.{" "}
              <span className="text-primary">Become a landlord.</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Upload photos, set your price, and submit for review. Once approved,
              your listing is live for thousands of seekers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/create-listing"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                List a property
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex h-11 items-center rounded-xl border px-5 text-sm font-medium hover:bg-muted"
              >
                Create free account
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-4 sm:p-6">
            <img src={scape1} alt="" className="h-full min-h-[180px] rounded-2xl object-cover" />
            <div className="grid gap-2">
              <img src={scape2} alt="" className="h-full min-h-[90px] rounded-2xl object-cover" />
              <img src={scape3} alt="" className="h-full min-h-[90px] rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="max-w-md text-2xl font-semibold tracking-tight">
            Moderated listings. Real people. Clear roles.
          </h2>
          <p className="max-w-lg text-muted-foreground">
            Users, landlords, and admins each have the right tools — from report flows
            to approval queues — so HavenHub stays trustworthy.
          </p>
          <Link
            to="/listings"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <HomeIcon className="h-4 w-4" />
            Start browsing
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
