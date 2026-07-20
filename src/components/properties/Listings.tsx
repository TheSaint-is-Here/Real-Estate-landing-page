import React, { useState } from "react";
import {
  Ruler,
  Building2,
  BedDouble,
  Bath,
  Car,
  Layers,
  Calendar,
  Rotate3d,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import image8 from '../../assets/Image (8).png'
import image9 from '../../assets/Image (9).png'
import image10 from '../../assets/Image (10).png'

type Spec = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

type HomeType = {
  id: string;
  name: string;
  unitsAvailable: number;
  description: string;
  specs: Spec[];
  images: string[];
};

const homeTypes: HomeType[] = [
  {
    id: "aruna-type-a",
    name: "Aruna Type-A",
    unitsAvailable: 12,
    description:
      "Compact & efficient living – minimalist housing for practical young families.",
    specs: [
      { icon: <Ruler size={16} />, label: "Land area", value: "2,000 ft²" },
      { icon: <Building2 size={16} />, label: "Building Area", value: "1,200 ft²" },
      { icon: <BedDouble size={16} />, label: "Bedrooms", value: "3 bedrooms" },
      { icon: <Bath size={16} />, label: "Bathrooms", value: "2 bathroom" },
      { icon: <Car size={16} />, label: "Carport", value: "For 1 car" },
      { icon: <Layers size={16} />, label: "Floors", value: "2 floors" },
    ],
    images: [
      image8,
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80",
    ],
  },

  {
    id: "aruna-type-b",
    name: "Aruna Type-B",
    unitsAvailable: 8,
    description:
      "Spacious & stylish living – perfect for growing families who need more room and modern comfort.",
    specs: [
      { icon: <Ruler size={16} />, label: "Land area", value: "2,500 ft²" },
      { icon: <Building2 size={16} />, label: "Building Area", value: "1,600 ft²" },
      { icon: <BedDouble size={16} />, label: "Bedrooms", value: "4 bedrooms" },
      { icon: <Bath size={16} />, label: "Bathrooms", value: "3 bathrooms" },
      { icon: <Car size={16} />, label: "Carport", value: "For 2 car" },
      { icon: <Layers size={16} />, label: "Floors", value: "2 floors" },
    ],
    images: [
      image9,
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80",
    ],
  },
  {
    id: "aruna-type-c",
    name: "Aruna Type-C",
    unitsAvailable: 12,
    description:
      "Compact & efficient living – minimalist housing for practical young families.",
    specs: [
      { icon: <Ruler size={16} />, label: "Land area", value: "2,000 ft²" },
      { icon: <Building2 size={16} />, label: "Building Area", value: "1,200 ft²" },
      { icon: <BedDouble size={16} />, label: "Bedrooms", value: "3 bedrooms" },
      { icon: <Bath size={16} />, label: "Bathrooms", value: "2 bathroom" },
      { icon: <Car size={16} />, label: "Carport", value: "For 1 car" },
      { icon: <Layers size={16} />, label: "Floors", value: "2 floors" },
    ],
    images: [
      image10,
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80",
    ],
  },
];

function HomeTypeCard({ homeType }: { homeType: HomeType }) {
  const [activeImage, setActiveImage] = useState(0);

  const goPrev = () =>
    setActiveImage((i) => (i - 1 + homeType.images.length) % homeType.images.length);
  const goNext = () =>
    setActiveImage((i) => (i + 1) % homeType.images.length);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
      {/* Details */}
      <div>
        <div className="mb-1 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold text-slate-900">
            {homeType.name}
          </h3>
          <span className="whitespace-nowrap text-sm font-medium text-amber-700">
            {homeType.unitsAvailable} Unit available
          </span>
        </div>

        <p className="mb-8 max-w-sm text-sm leading-relaxed text-slate-500">
          {homeType.description}
        </p>

        <dl className="mb-8 flex flex-col gap-4">
          {homeType.specs.map((spec, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <dt className="flex items-center gap-3 text-slate-600">
                <span className="text-slate-400">{spec.icon}</span>
                {spec.label}
              </dt>
              <dd className="font-medium text-slate-900">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-6">
          <Link to="/RequestTourModal"> <button className="flex items-center gap-2 rounded-md bg-[#3a3f2e] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2e3224]">
            <Calendar size={16} />
            Schedule tour
          </button> </Link>
          <Link to="/arunaresidence">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900">
              <Rotate3d size={16} />
              Preview 360°
            </button>
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <div>
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={homeType.images[activeImage]}
            alt={`${homeType.name} preview`}
            className="h-72 w-full object-cover sm:h-96"
          />
          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 backdrop-blur transition-colors hover:bg-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 backdrop-blur transition-colors hover:bg-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-3 grid grid-cols-6 gap-2">
          {homeType.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`overflow-hidden rounded-md border-2 transition-colors ${activeImage === i ? "border-slate-900" : "border-transparent"
                }`}
            >
              <img
                src={img}
                alt={`${homeType.name} thumbnail ${i + 1}`}
                className="h-14 w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Listings() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
            Available
            <br />
            home types
          </h2>
          <p className="max-w-xs text-sm text-slate-500">
            Find the type of house that suits your needs in this cluster, use
            the 360° preview for a better experience, here the types:
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {homeTypes.map((homeType) => (
            <HomeTypeCard key={homeType.id} homeType={homeType} />
          ))}
        </div>
      </div>
    </div>
  );
}