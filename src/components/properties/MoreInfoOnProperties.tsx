import { useState } from "react";
import propertyimage from "../../assets/Property Image.png";
import Header from "../Header";
import image7 from "../../assets/Image (7).png";
import Listings from "../properties/Listings";
import WhyChooseUs from "./WhyChooseUs";
import {
  BriefcaseBusiness,
  BusFront,
  Hospital,
  House,
} from "lucide-react";
import map from "../../assets/Map Image.png";
import FaCLuster from "./FaCluster";
import SerenaFooter from "../Footer";
import RequestBrochureModal from "../RequestBrochure"; // <-- adjust path if needed

function MoreInfoOnProperties() {
  const [openBrochure, setOpenBrochure] = useState(false);

  return (
    <>
      <div>
        <Header />

        <div>
          <img
            src={propertyimage}
            alt="property"
            className="w-screen"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-6xl mx-auto bg-white">
          {/* Left */}
          <div className="bg-white p-5">
            <div className="flex gap-1 m-5">
              <p>Clusters</p>/
              <p className="bg-gray-400 rounded-2xl w-35 px-2">
                Aruna residence
              </p>
            </div>

            <p className="text-6xl">
              Aruna <br />
              residence
            </p>

            <p>
              starts from <b>$98,000</b>
            </p>
          </div>

          {/* Right */}
          <div className="bg-gray-200">
            <div className="bg-white m-5">
              <div className="flex justify-between border-b m-5 pt-5">
                <p>Bedrooms</p>
                <p>2-4 Bedroom options</p>
              </div>

              <div className="flex justify-between border-b m-5">
                <p>Wall</p>
                <p>Lightweight bricks, plaster, paint</p>
              </div>

              <div className="flex justify-between border-b m-5">
                <p>Floor</p>
                <p>60 x 60 granite tiles</p>
              </div>

              <div className="flex justify-between border-b m-5">
                <p>Stairs</p>
                <p>Light weight Frame</p>
              </div>

              <div className="flex justify-between border-b m-5">
                <p>Door/Window</p>
                <p>Solid wood & aluminium</p>
              </div>

              <div className="flex justify-between m-5 pb-5">
                <p>Electricity Supply</p>
                <p>2200 VA</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="sm:col-span-2">
            <img
              src={image7}
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Description */}
        <div className="text-center">
          <p className="bg-yellow-200 text-yellow-500 rounded-2xl w-50 mx-auto mt-50 mb-5">
            the modern comfort
          </p>

          <p className="text-3xl">
            Aruna Residence offers modern residences
            <br />
            with an elegant touch,
            <b>
              {" "}
              designed to provide
              <br />
              maximum comfort for families. With functional
              <br />
              layouts, optimal natural lighting, and high-
              <br />
              quality materials.
            </b>
          </p>

          <button
            onClick={() => setOpenBrochure(true)}
            className="mt-8 bg-gray-500 hover:bg-[#4c5034] text-white px-8 py-3 rounded-md transition"
          >
            Request Brochure
          </button>
        </div>

        <Listings />

        <WhyChooseUs />

        <div className="flex justify-between p-5 flex-col sm:flex-row">
          <div className="p-5 flex-1">
            <p className="bg-yellow-200 text-yellow-600 w-50 rounded-2xl px-5 mt-10">
              📍 strategic location
            </p>

            <p className="text-5xl">
              Discover the
              <br />
              Aruna residence
            </p>

            <p>
              Serenia Residences, Harmony Street No. 12,
              <br />
              Selhurst, London, England
            </p>
          </div>

          <div className="bg-gray-300 p-10 flex-1">
            <div className="bg-white p-3">
              <div className="flex justify-between border-b border-dashed">
                <p>
                  <b>Greenfield International School</b>
                  <br />
                  2.1 km · 8 min drive
                </p>

                <House />
              </div>

              <div className="flex justify-between border-b border-dashed">
                <p>
                  <b>Selhurst Mall & Lifestyle Center</b>
                  <br />
                  3.4 km · 5 min drive
                </p>

                <BriefcaseBusiness />
              </div>

              <div className="flex justify-between border-b border-dashed">
                <p>
                  <b>Royal Care Hospital</b>
                  <br />
                  4.8 km · 12 min drive
                </p>

                <Hospital />
              </div>

              <div className="flex justify-between border-b border-dashed">
                <p>
                  <b>Selhurst Central Station</b>
                  <br />
                  2.7 km · 8 min drive
                </p>

                <BusFront />
              </div>
            </div>
          </div>
        </div>

        <img
          src={map}
          alt=""
          className="w-screen max-h-125"
        />

        <FaCLuster />

        <SerenaFooter />
      </div>

      {/* Popup */}
      <RequestBrochureModal
        open={openBrochure}
        onClose={() => setOpenBrochure(false)}
      />
    </>
  );
}

export default MoreInfoOnProperties;