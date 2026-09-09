import facebook from "../../assets/facebook.png"
import linkedin from "../../assets/linkedin.png"
import twitter from "../../assets/twitter.png"

function Footer() {
  return (
    <div className="bg-gray-950 p-6 text-[#fcfcfc]">
      <h1 className="m-4 text-xl font-bold">HavenHub</h1>
      <div className="flex flex-col justify-around gap-8 p-6 sm:flex-row">
        <div>
          <p className="max-w-xs">
            Lorem ipsum dolor sitametco nsectet ur. Ultrices diamcmm odo odio
            tellus eget. Lorem
          </p>
          <div className="m-2 flex gap-4">
            <img
              src={facebook}
              alt="Facebook"
              className="h-[30px] w-[30px] rounded-lg bg-gray-50 p-1"
            />
            <img
              src={linkedin}
              alt="LinkedIn"
              className="h-[30px] w-[30px] rounded-lg bg-gray-50 p-1"
            />
            <img
              src={twitter}
              alt="Twitter"
              className="h-[30px] w-[30px] rounded-lg bg-gray-50 p-1"
            />
          </div>
        </div>
        <div>
          <ul>
            <li>Contact US</li>
            <li>About US</li>
            <li>Help</li>
            <li>View More</li>
            <li>Customer Supports</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Our Services</li>
            <li>Our Reviews</li>
            <li>Our Team</li>
            <li>Pricing</li>
            <li>Benefits</li>
          </ul>
        </div>
      </div>
      <h1 className="m-2 text-center text-lg font-bold">
        Copyright 2023 HavenHub. All rights reserved.
      </h1>
    </div>
  )
}

export default Footer
