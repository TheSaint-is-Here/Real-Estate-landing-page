import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import img50 from "../assets/Image (50).png";
import { Link } from "react-router-dom";

const properties = [
  { id: "01", name: "Liora estate", link: "/liora-estate" },
  { id: "02", name: "Nava heights", link: "/nava-heights" },
  { id: "03", name: "Aruna residence", link: "/MoreInfoOnProperties" },
  { id: "04", name: "Velora park", link: "/velora-park" },
  { id: "05", name: "Seraya grove", link: "/seraya-grove" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(properties[2]);

  const navigate = useNavigate();

  return (
    <nav
      className="relative z-50 flex justify-center bg-white border-b border-gray-200"
      onMouseLeave={() => setOpen(false)}
    >
      <ul className="flex items-center gap-12">
        {/* Properties */}
        <li
          onMouseEnter={() => setOpen(true)}
          className="relative"
        >
          <button className="flex items-center gap-1 h-20 text-[17px] font-medium border-b-2 border-gray-800">
            Properties
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                }`}
            />
          </button>
        </li>

        {/* Amenities */}
        <li>
          <Link to='/FacultyAndAmenities'> <button className="h-20 text-[17px] font-medium text-gray-700 hover:text-black">
            Amenities
          </button> </Link>
        </li>

        {/* Gallery */}
        <li>
          <Link to='/GalleryWithFaqs'> <button className="flex items-center gap-1 h-20 text-[17px] font-medium text-gray-700 hover:text-black">
            Gallery
            <ChevronDown size={16} />
          </button> </Link>
        </li>

        {/* Blogs */}
        <li>
        <Link to='/AuthFLow'><button className="h-20 text-[17px] font-medium text-gray-700 hover:text-black">
            Blogs
          </button> </Link> 
        </li>
      </ul>

      {/* Mega Menu */}
      <div
        onMouseEnter={() => setOpen(true)}
        className={`
          absolute
          top-full
          left-1/2
          -translate-x-1/2
          mt-px
          w-[1100px]
          bg-white
          border
          border-gray-200
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          z-[9999]
          overflow-hidden
          origin-top
          transition-all
          duration-300
          ${open
            ? "opacity-100 visible translate-y-0 scale-100"
            : "opacity-0 invisible -translate-y-2 scale-[0.98]"
          }
        `}
      >
        <div className="flex">
          {/* Left Panel */}
          <div className="w-[35%] border-r border-gray-200 bg-white">
            {properties.map((item) => (
              <button
                key={item.id}
                onMouseEnter={() => setSelected(item)}
                onClick={() => {
                  setOpen(false);
                  navigate(item.link);
                }}
                className={`w-full flex justify-between items-center px-10 py-7 border-b border-gray-100 transition-colors ${selected.id === item.id
                    ? "bg-gray-50"
                    : "hover:bg-gray-50"
                  }`}
              >
                <span
                  className={`text-2xl ${selected.id === item.id
                      ? "font-semibold"
                      : "font-normal"
                    }`}
                >
                  {item.name}
                </span>

                <span className="text-gray-400">{item.id}</span>
              </button>
            ))}
          </div>

          {/* Right Panel */}
          <div className="flex flex-1 gap-8 p-8 bg-white">
            <img
              src={img50}
              alt={selected.name}
              className="w-[380px] h-[340px] object-cover rounded"
            />

            <div className="max-w-sm">
              <h2 className="text-4xl font-semibold mb-5">
                {selected.name}
              </h2>

              <p className="text-gray-600 leading-7 mb-10">
                Spacious homes with minimalist design, surrounded by lush
                parks and playgrounds — the perfect place for families to
                grow and thrive.
              </p>

              <div className="space-y-5 text-gray-700">
                <p>🛏️ 2–4 Bedroom options</p>
                <p>🏕️ Family-friendly facilities</p>
                <p>🚗 Easy access to main boulevard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
