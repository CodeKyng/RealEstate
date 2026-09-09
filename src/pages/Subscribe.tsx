import { Mail, Search } from "lucide-react"
import signuphero from "../assets/signuphero.png"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import look from "../assets/look.png"
import room1 from "../assets/room1.png"
import room2 from "../assets/room2.png"
import room3 from "../assets/room3.png"
import youtube from "../assets/youtube.png"
import Footer from "@/components/templates/Footer"

function Subscribe() {
  return (
    <>
      <div className="relative min-h-[600px] w-full bg-[url('/src/assets/signup.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/50">
          <div className="flex flex-wrap items-center justify-end gap-2 p-4 sm:p-6">
            <a
              href="/signup"
              className="flex w-fit rounded-full bg-[#f1f2f2] px-4 py-2 text-[#354342] transition-colors duration-300 hover:bg-[#222222] hover:text-[#fcfcfc]"
            >
              <Mail className="mr-2 inline-block" />
              Subscribe
            </a>
            <a
              href="/login"
              className="flex w-fit rounded-full bg-[#222222] px-4 py-2 text-[#fcfcfc] transition-colors duration-300 hover:bg-[#fcfcfc] hover:text-[#222222]"
            >
              LOGIN/SIGNUP
            </a>
          </div>
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 p-4 sm:p-8 md:flex-row">
            <div className="flex w-full flex-col items-center justify-center md:w-1/2">
              <h1 className="m-4 text-center text-3xl font-bold text-[#fcfcfc] sm:text-4xl md:text-5xl">
                SINGLE FAMILY RENTAL COMMUNITY COMING 2024
              </h1>
              <a
                href="#"
                className="flex items-center justify-center gap-2 text-[#fcfcfc]"
              >
                <img
                  src={youtube}
                  alt="Youtube"
                  className="h-[30px] w-[30px]"
                />
                Want to know about us
              </a>
            </div>
            <form className="m-2 flex w-full max-w-xl flex-col items-center justify-center gap-4 rounded-2xl bg-gray-400/50 p-6 text-[fcfcfc] md:w-1/2">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                  <hr />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  <hr />
                </Field>
                <Field>
                  <FieldLabel htmlFor="contact">Contact Number</FieldLabel>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="123-456-7890"
                    required
                  />
                  <hr />
                </Field>
                <Button
                  type="submit"
                  className="mt-4 w-full bg-[#222222] text-[#fcfcfc] hover:bg-[#fcfcfc] hover:text-[#222222]"
                >
                  Get Latest Update
                </Button>
              </FieldGroup>
            </form>
          </div>
        </div>
      </div>
      <div className="m-4 mx-auto flex h-[550px] w-full max-w-7xl flex-row-reverse items-center justify-center gap-8 p-6 md:flex-row">
        <img
          src={signuphero}
          alt="Hero Image"
          className="w-full max-w-xl object-cover md:h-full md:w-1/3"
        />
        <div className="w-full md:w-2/3">
          <h1 className="w-full text-3xl font-bold">
            Lorem ipsum dolor sit amet dolor sit amet
          </h1>
          <p>
            Welcome to HavenHub, your one-stop destination for all things home
            improvement,{" "}
          </p>
          <p>
            from remodeling and new home construction to home studios and shed
            structures. We are passionate about helping homeowners create the
            spaces they've always dreamed of, and we have the expertise and
            resources to make it happen
          </p>
          <div className="flex h-[110px] w-[700px] items-center gap-4">
            <img src={look} alt="look" className="h-[100px] w-[100px]" />
            <img src={look} alt="look" className="h-[100px] w-[100px]" />
            <img src={look} alt="look" className="h-[100px] w-[100px]" />
            <img src={look} alt="look" className="h-[100px] w-[100px]" />
          </div>
          <a
            href="/contact"
            className="mt-4 ml-4 flex w-fit border-2 border-[#222222] bg-[#fcfcfc] px-6 py-3 font-bold text-[#222222] transition-colors duration-300 hover:bg-[#222222] hover:text-[#fcfcfc]"
          >
            Contact Us
          </a>
        </div>
      </div>
      <div className="mx-auto flex min-h-[600px] w-full max-w-7xl flex-col items-center justify-center gap-8 p-6">
          <h1 className="text-center text-3xl font-bold sm:text-4xl">
            Remodeling and Renovation
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Tristique etiam aliquet orci
            porttitor. Viverra vel elit ultrices hac aliquet. Eu non ut
            scelerisque nisi fringilla in sed. Magna morbi ultricies at eu.
            Magna ipsum massa in pellentesque suspendisse convallis. Massa sed
            fames convallis et in ornare risus porttitor. Mauris in tincidunt eu
            eu eleifend molestie. Dolor quis pretium lectus vel viverra. Aliquet
            dictum ut et maecenas elementum.{" "}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <img src={room1} alt="room1" className="w-[270px]" />
            <img src={room2} alt="room2" className="w-[270px]" />
            <img src={room3} alt="room3" className="w-[270px]" />
          </div>
          <a
            href="/contact"
            className="m-2 border-2 border-[#222222] px-6 py-3 font-bold text-[#222222]"
          >
            Contact Us
          </a>
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
            <p>Columbus</p>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div>
            <p className="text-xl font-bold">Max Price</p>
            <p>For Rent</p>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="flex bg-[#222222] p-2 text-[#fcfcfc]">
            <Search />
            <p>Search</p>
          </div>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-[#fcfcfc]">
          Subscribe Our Newsletter
        </h1>
        <Field
          orientation="horizontal"
          className="mt-2 w-full max-w-[500px] rounded-full bg-[#fcfcfc]"
        >
          <Input type="search" placeholder="Search..." />
          <Button className="m-0 h-full rounded-r-full">Search</Button>
        </Field>
      </div>
      <div className="mx-auto flex min-h-[600px] w-full max-w-7xl flex-col items-center justify-center gap-4 p-6">
        <h1 className="flex flex-col items-center justify-center text-center text-3xl font-bold sm:text-5xl">
          Transforming Homes and Creating <br className="hidden sm:block" />
          <span>Dream Spaces</span>
        </h1>
        <div className="mt-4 flex w-full flex-col gap-4 md:flex-row">
          <div className="h-[300px] w-full bg-[url('/src/assets/scape1.png')] bg-cover bg-center bg-no-repeat md:h-[400px] md:w-1/2">
            <div className="mt-auto flex flex-col gap-2 bg-black/50 p-6 text-[#fcfcfc]">
              <h3>Lorem ipsum dolor sit amet consectetur.</h3>
              <p>
                Facilisi quisque magna praesent quisque arcu felis ornare in
              </p>
            </div>
          </div>
          <div className="flex h-[500px] w-full flex-col md:h-[400px] md:w-1/2">
            <div className="h-1/2 w-full bg-[url('/src/assets/scape2.png')] bg-cover bg-center bg-no-repeat">
              <div className="mt-auto flex flex-col gap-2 bg-black/50 p-6 text-[#fcfcfc]">
                <h3 className="text-lg font-bold">
                  Lorem ipsum dolor sit amet consectetur.
                </h3>
                <p className="text-sm">
                  Facilisi quisque magna praesent quisque arcu felis ornare in
                </p>
              </div>
            </div>
            <div className="h-1/2 w-full bg-[url('/src/assets/scape3.png')] bg-cover bg-center bg-no-repeat">
              <div className="mt-auto flex flex-col gap-2 bg-black/50 p-6 text-[#fcfcfc]">
                <h3>Lorem ipsum dolor sit amet consectetur.</h3>
                <p>
                  Facilisi quisque magna praesent quisque arcu felis ornare in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Subscribe
