import React, { useState } from "react";
import {
  Search,
  BedDouble,
  ShieldCheck,
  ShoppingBag,
  Car,
  Footprints,
  TriangleAlert,
  Navigation,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Leaf,
  Users,
} from "lucide-react";
import { Link } from 'react-router-dom';

import image2 from '../../assets/Image (2).png'
import image3 from '../../assets/Image (3).png'
import image4 from '../../assets/Image (4).png'
import image5 from '../../assets/Image (5).png'
import image6 from '../../assets/Image (6).png'


type Feature = {
  icon: React.ReactNode;
  label: string;
};

type Cluster = {
  id: string;
  tagIcon: React.ReactNode;
  tag: string;
  name: string;
  description: string;
  features: Feature[];
  price: string;
  image: string;
};

const clusters: Cluster[] = [
  {
    id: "liora-estate",
    tagIcon: <Sparkles size={14} />,
    tag: "Elegant living, redefined",
    name: "Liora estate",
    description:
      "Premium cluster with modern architecture, a private clubhouse, and 24/7 security — offering both style and peace of mind for residents.",
    features: [
      { icon: <BedDouble size={16} />, label: "3–5 Bedroom options" },
      { icon: <ShieldCheck size={16} />, label: "Private gate & 24/7 security" },
      { icon: <ShoppingBag size={16} />, label: "Near lifestyle center" },
    ],
    price: "$120,000",
    image:
      image2,
  },
  
  {
    id: "nava-heights",
    tagIcon: <Leaf size={14} />,
    tag: "Nature meets lifestyle",
    name: "Nava heights",
    description:
      "Designed for eco-living with wide open spaces, scenic jogging tracks, and elevated views that bring nature closer to home.",
    features: [
      { icon: <BedDouble size={16} />, label: "2–4 Bedroom options" },
      { icon: <Car size={16} />, label: "Wide roads & open spaces" },
      { icon: <Footprints size={16} />, label: "Scenic jogging tracks" },
    ],
    price: "$98,000",
    image:
      image5,
  },
  {
    id: "aruna-residence",
    tagIcon: <Users size={14} />,
    tag: "The modern comfort",
    name: "Aruna residence",
    description:
      "Spacious homes with minimalist design, surrounded by lush parks and playgrounds — the perfect place for families to grow and thrive.",
    features: [
      { icon: <BedDouble size={16} />, label: "2–4 Bedroom options" },
      { icon: <TriangleAlert size={16} />, label: "Family-friendly facilities" },
      { icon: <Navigation size={16} />, label: "Easy access to main boulevard" },
    ],
    price: "$85,000",
    image:
      image6,
  },
  {
    id: "liora-estate",
    tagIcon: <Sparkles size={14} />,
    tag: "Elegant living, redefined",
    name: "Liora estate",
    description:
      "Premium cluster with modern architecture, a private clubhouse, and 24/7 security — offering both style and peace of mind for residents.",
    features: [
      { icon: <BedDouble size={16} />, label: "3–5 Bedroom options" },
      { icon: <ShieldCheck size={16} />, label: "Private gate & 24/7 security" },
      { icon: <ShoppingBag size={16} />, label: "Near lifestyle center" },
    ],
    price: "$120,000",
    image:
      image3,
  },
  {
    id: "Sereya groove",
    tagIcon: <Sparkles size={14} />,
    tag: "Living with natural touch",
    name: "Liora estate",
    description:
      "Premium cluster with modern architecture, a private clubhouse, and 24/7 security — offering both style and peace of mind for residents.",
    features: [
      { icon: <BedDouble size={16} />, label: "3–5 Bedroom options" },
      { icon: <ShieldCheck size={16} />, label: "Private gate & 24/7 security" },
      { icon: <ShoppingBag size={16} />, label: "Near lifestyle center" },
    ],
    price: "$120,000",
    image:
      image4,
  },
];

export default function ClusterListing() {
  const [location, setLocation] = useState("All location");
  const [price, setPrice] = useState("All price");
  const [search, setSearch] = useState("");

  const filtered = clusters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-6 py-10 sm:px-12">
      {/* Filter bar */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span className="text-slate-500">Location :</span>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="appearance-none bg-transparent pr-6 font-medium text-slate-900 focus:outline-none"
              >
                <option>All location</option>
                <option>Ardenia park</option>
                <option>Willow creek</option>
                <option>Maple ridge</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span className="text-slate-500">Price :</span>
            <div className="relative">
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="appearance-none bg-transparent pr-6 font-medium text-slate-900 focus:outline-none"
              >
                <option>All price</option>
                <option>Under $100,000</option>
                <option>$100,000 - $150,000</option>
                <option>$150,000+</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cluster name"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
      </div>

      {/* Mapped list of clusters */}
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        {filtered.map((cluster) => (
          <div
            key={cluster.id}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={cluster.image}
                alt={cluster.name}
                className="h-72 w-full object-cover sm:h-80"
              />
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === 0 ? "w-6 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex w-fit items-center gap-2 text-sm text-yellow-500 bg-yellow-200 border  border-yellow-200  px-2 rounded-2xl">
                {cluster.tagIcon}
                {cluster.tag}
              </span>

              <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                {cluster.name}
              </h3>

              <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-500">
                {cluster.description}
              </p>

              <ul className="mb-8 flex flex-col gap-3">
                {cluster.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <span className="text-slate-500">{f.icon}</span>
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                <div>
                  <p className="mb-1 text-xs text-slate-500">Starts from</p>
                  <p className="text-xl font-semibold text-slate-900">
                    {cluster.price}
                  </p>
                </div>

               <Link 
  to="/MoreInfoOnProperties" 
  className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200"
>
  Discover
  <ArrowUpRight size={16} />
</Link>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-sm text-slate-500">
            No clusters match "{search}".
          </p>
        )}
      </div>
    </div>
  );
}