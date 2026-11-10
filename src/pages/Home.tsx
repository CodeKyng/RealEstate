import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Search,
  ArrowUpRight,
  MapPin,
  Bed,
  Bath,
  ChevronRight,
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
import look from "../assets/look.png"

const CITIES = [
  { name: "Lagos", count: "1.2k listings", img: scape1 },
  { name: "Abuja", count: "430 listings", img: scape2 },
  { name: "Port Harcourt", count: "210 listings", img: room3 },
  { name: "Ibadan", count: "180 listings", img: room4 },
]

const HOMES = [
  {
    img: room1,
    title: "3-bed duplex · Lekki Phase 1",
    price: "₦4,500,000",
    period: "/ year",
    beds: 3,
    baths: 3,
    tag: "New",
  },
  {
    img: room2,
    title: "Serviced flat · Ikoyi",
    price: "₦8,200,000",
    period: "/ year",
    beds: 2,
    baths: 2,
    tag: "Furnished",
  },
  {
    img: room3,
    title: "Studio · Wuse II Abuja",
    price: "₦1,100,000",
    period: "/ year",
    beds: 1,
    baths: 1,
    tag: null,
  },
]

export default function Home() {
  const [q, setQ] = useState("")
  const [tab, setTab] = useState<"rent" | "sale">("rent")
  const navigate = useNavigate()

  const go = () => {
    navigate(q.trim() ? `/listings?q=${encodeURIComponent(q.trim())}` : "/listings")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Asymmetric hero — product, not pitch deck */}
      <section className="border-b">
        <div className="mx-auto grid max-w-6xl gap-0 lg:grid-cols-12">
          {/* Left copy + search */}
          <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:col-span-5 lg:py-20">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              HavenHub · Nigeria
            </p>
            <h1 className="text-[2.35rem] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Homes you can
              <br />
              actually move into.
            </h1>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              Search verified rentals and sales. List a property and you become a
              landlord the moment it posts.
            </p>

            {/* Rent / Sale toggle */}
            <div className="mt-8 inline-flex w-fit rounded-full border bg-muted/60 p-1">
              {(["rent", "sale"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                    tab === t
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  For {t}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && go()}
                  placeholder="Area, street, estate…"
                  className="h-12 rounded-xl border-border/80 bg-card pl-9 text-[15px]"
                />
              </div>
              <Button
                size="lg"
                className="h-12 shrink-0 rounded-xl px-5"
                onClick={go}
              >
                <Search className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="text-foreground/70">Try</span>
              {["Lekki", "Yaba", "Gwarinpa", "Victoria Island"].map((c) => (
                <Link
                  key={c}
                  to={`/listings?q=${c}`}
                  className="underline-offset-4 hover:text-primary hover:underline"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — stacked property collage */}
          <div className="relative lg:col-span-7">
            <div className="grid h-full min-h-[320px] grid-cols-2 gap-2 p-4 sm:gap-3 sm:p-6 lg:min-h-[520px] lg:p-8">
              <div className="relative row-span-2 overflow-hidden rounded-2xl">
                <img
                  src={look}
                  alt="Featured home"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                    Featured · Lagos
                  </p>
                  <p className="mt-1 text-lg font-semibold leading-snug">
                    Waterfront 4-bed on Banana Island
                  </p>
                  <p className="mt-2 text-sm text-white/85">₦25M / year</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <img src={room1} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="relative overflow-hidden rounded-2xl">
                <img src={room2} alt="" className="h-full w-full object-cover" />
                <div className="absolute bottom-3 left-3 rounded-lg bg-card/95 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                  From ₦850k
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City strip — horizontal, editorial */}
      <section className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Browse by city</h2>
            <Link
              to="/listings"
              className="text-sm font-medium text-primary hover:underline"
            >
              All cities
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {CITIES.map((city) => (
              <Link
                key={city.name}
                to={`/listings?q=${city.name}`}
                className="group relative aspect-[5/3] overflow-hidden rounded-xl"
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <p className="font-semibold">{city.name}</p>
                  <p className="text-xs text-white/75">{city.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live-style listings row */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Just listed</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fresh inventory · moderated before it goes public
            </p>
          </div>
          <Link
            to="/listings"
            className="hidden items-center gap-1 text-sm font-medium text-foreground hover:text-primary sm:inline-flex"
          >
            See marketplace
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {HOMES.map((h) => (
            <Link
              key={h.title}
              to="/listings"
              className="group overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={h.img}
                  alt={h.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {h.tag && (
                  <span className="absolute left-3 top-3 rounded-md bg-card px-2 py-0.5 text-[11px] font-semibold">
                    {h.tag}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-semibold tracking-tight">{h.price}</span>
                  <span className="text-sm text-muted-foreground">{h.period}</span>
                </div>
                <p className="mt-1 text-[15px] font-medium leading-snug">{h.title}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5" /> {h.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" /> {h.baths}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Split landlord band — concrete, not fluffy */}
      <section className="border-y">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
          <div className="flex flex-col justify-center border-b px-4 py-14 sm:px-6 lg:border-b-0 lg:border-r lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              For owners
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Post once.
              <br />
              Get approved.
              <br />
              Go live.
            </h2>
            <ul className="mt-6 space-y-3 text-[15px] text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                First listing unlocks landlord access automatically
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Admin review before anything hits the public feed
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Photos, amenities, and pricing in one form
              </li>
            </ul>
            <div className="mt-8">
              <Link
                to="/create-listing"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background hover:opacity-90"
              >
                List a property
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative min-h-[280px] lg:min-h-0">
            <img
              src={scape1}
              alt="Property"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* Bottom CTA — tight */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Stop scrolling random WhatsApp groups.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Use a real marketplace — search, filter, report bad listings, and talk to
          landlords who actually posted here.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/listings"
            className="inline-flex h-11 items-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Open the marketplace
          </Link>
          <Link
            to="/signup"
            className="inline-flex h-11 items-center rounded-xl border px-6 text-sm font-medium hover:bg-muted"
          >
            Create account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
