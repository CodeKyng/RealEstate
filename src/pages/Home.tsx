import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import HeroImg from "../assets/HeroImg.png"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import look from "../assets/look.png"
import room1 from "../assets/room1.png"
import room2 from "../assets/room2.png"
import room3 from "../assets/room3.png"
import room4 from "../assets/room4.png"
import Footer from "@/components/templates/Footer"
import { Navbar } from "@/components/Navbar"

function Home() {
  return (
    <>
      <Navbar />
      <div className="relative min-h-[600px] w-full bg-[url('/src/assets/hero.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/50">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 p-4 pt-16 sm:p-8 md:flex-row">
            <div className="flex w-full flex-col items-center justify-center md:w-1/2">
              <h1 className="m-4 text-center text-3xl font-bold text-[#fcfcfc] sm:text-4xl md:text-5xl">
                Find your next home on HavenHub
              </h1>
              <p className="mb-6 max-w-md text-center text-[#fcfcfc]/90">
                Browse thousands of rentals and homes for sale. List your property
                and become a landlord in minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/listings"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black hover:bg-white/90"
                >
                  <Search className="h-5 w-5" />
                  Browse homes
                </Link>
                <Link
                  to="/create-listing"
                  className="inline-flex h-10 items-center rounded-full border border-white px-5 text-sm font-medium text-white hover:bg-white/10"
                >
                  List your property
                </Link>
              </div>
            </div>
            <img
              src={HeroImg}
              alt="Hero Image"
              className="w-full max-w-xl md:w-1/2"
            />
          </div>
        </div>
      </div>

      <div className="border-b bg-card">
        <div className="mx-auto flex max-w-4xl flex-col items-stretch gap-3 p-4 sm:flex-row sm:items-center">
          <Input
            placeholder="City or keyword (e.g. Lagos, Lekki)"
            className="flex-1"
            id="home-search"
          />
          <Button
            onClick={() => {
              const input = document.getElementById("home-search") as HTMLInputElement
              const q = input?.value?.trim()
              window.location.href = q
                ? `/listings?q=${encodeURIComponent(q)}`
                : "/listings"
            }}
          >
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </div>

      <div className="mx-auto flex min-h-[600px] w-full max-w-7xl flex-col items-center justify-center gap-8 p-6 md:flex-row">
        <img
          src={HeroImg}
          alt="Hero Image"
          className="w-full max-w-xl md:w-1/2"
        />
        <div className="w-full md:w-1/2">
          <h1 className="w-full text-3xl font-bold">
            Your one-stop destination for homes
          </h1>
          <p className="mt-3 text-muted-foreground">
            Welcome to HavenHub. Whether you&apos;re looking for a rental apartment
            or ready to list your property, we make it simple. Create an account,
            post your first listing, and automatically become a landlord.
          </p>
          <Link
            to="/listings"
            className="mt-6 inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80"
          >
            Explore listings
          </Link>
        </div>
      </div>

      <div className="mb-4 flex min-h-[400px] w-full flex-col items-center justify-center bg-[url('/src/assets/community.png')] bg-cover bg-center bg-no-repeat p-4">
        <h1 className="m-6 text-center text-3xl font-bold text-[#fcfcfc]">
          Find Your Community
        </h1>
        <div className="flex w-full max-w-3xl flex-col items-stretch justify-center gap-4 rounded-2xl bg-accent p-4 sm:p-6 md:h-[90px] md:flex-row md:items-center">
          <div>
            <p className="text-xl font-bold">Project Type</p>
            <p>Apartment</p>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div>
            <p className="text-xl font-bold">Location</p>
            <p>Lagos</p>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div>
            <p className="text-xl font-bold">Max Price</p>
            <p>For Rent</p>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <Link
            to="/listings"
            className="flex items-center gap-2 bg-[#222222] p-2 text-[#fcfcfc]"
          >
            <Search />
            <p>Search</p>
          </Link>
        </div>
      </div>

      <div className="mx-auto flex min-h-[600px] w-full max-w-7xl flex-col items-center justify-center gap-8 p-6 md:flex-row">
        <div className="flex w-full flex-col items-center justify-center gap-4 md:w-2/3">
          <h1 className="text-center text-3xl font-bold sm:text-4xl">
            Your One-Stop Shop for Rental Homes
          </h1>
          <p className="text-center text-muted-foreground">
            From cozy studios to family houses — browse verified listings,
            contact landlords directly, and find a place that feels like home.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <img src={room1} alt="room1" className="w-[150px] rounded-lg" />
            <img src={room2} alt="room2" className="w-[150px] rounded-lg" />
            <img src={room3} alt="room3" className="w-[150px] rounded-lg" />
            <img src={room4} alt="room4" className="w-[150px] rounded-lg" />
          </div>
          <Link
            to="/listings"
            className="mt-2 inline-flex h-9 items-center rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
          >
            View all homes
          </Link>
        </div>
        <img
          src={look}
          alt="look"
          className="max-h-[500px] w-full object-cover md:h-full md:w-1/3"
        />
      </div>

      <div className="mx-auto flex min-h-[400px] w-full max-w-7xl flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-center text-3xl font-bold sm:text-4xl">
          Become a landlord today
        </h1>
        <p className="max-w-xl text-center text-muted-foreground">
          Create a free account, post your first property, and you&apos;ll
          automatically get landlord access. Listings are reviewed by our team
          before going live.
        </p>
        <Link
          to="/create-listing"
          className="inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          List a property
        </Link>
      </div>

      <Footer />
    </>
  )
}

export default Home
