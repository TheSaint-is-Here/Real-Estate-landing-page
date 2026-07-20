import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Users,
  Baby,
  Flag,
  ShoppingBag,
  Home,
  Footprints,
  type LucideIcon,
} from "lucide-react";

interface Amenity {
  id: string;
  name: string;
  order: string;
  tag: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

const amenities: Amenity[] = [
  {
    id: "sports",
    name: "Sports Facilities",
    order: "01",
    tag: "Active living",
    description:
      "Full-size courts and training areas designed for residents who want to keep moving, rain or shine.",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop",
    icon: Dumbbell,
  },
  {
    id: "lifestyle",
    name: "The Lifestyle Center",
    order: "02",
    tag: "Community",
    description:
      "A shared hub for events, co-working, and everyday errands, right at the heart of the cluster.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    icon: Users,
  },
  {
    id: "playground",
    name: "Children's Playground",
    order: "03",
    tag: "Family",
    description:
      "A shaded, softly surfaced play area where the youngest residents can run free in view of home.",
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=1600&auto=format&fit=crop",
    icon: Baby,
  },
  {
    id: "golf",
    name: "Golf central playground",
    order: "04",
    tag: "Signature amenity",
    description:
      "A modern residents-only swimming pool with dedicated kids' area and relaxing lounge spaces.",
    image:
      "https://images.unsplash.com/photo-1587174786622-99c9f8dc8b6e?q=80&w=1600&auto=format&fit=crop",
    icon: Flag,
  },
  {
    id: "retail",
    name: "Retail & Lifestyle Center",
    order: "05",
    tag: "Convenience",
    description:
      "Cafés, boutiques, and daily essentials a short walk from every front door.",
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1600&auto=format&fit=crop",
    icon: ShoppingBag,
  },
  {
    id: "clubhouse",
    name: "Cluster clubhouse",
    order: "06",
    tag: "Gathering",
    description:
      "A private lounge and event space reserved for residents of each cluster to host and unwind.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    icon: Home,
  },
  {
    id: "jogging",
    name: "Jogging track",
    order: "07",
    tag: "Wellness",
    description:
      "A tree-lined loop threading through the estate, built for early starts and evening wind-downs.",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1600&auto=format&fit=crop",
    icon: Footprints,
  },
];

export default function FacilityAmenities() {
  const [activeIndex, setActiveIndex] = useState(3); // Golf central playground
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const active = amenities[activeIndex];
  const Icon = active.icon;

  const select = (index: number) => {
    setActiveIndex(index);
    setDropdownOpen(false);
  };

  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + amenities.length) % amenities.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % amenities.length);

  return (
    <section className="bg-white md:bg-[#f6f5f1] px-5 py-6 md:py-12 md:px-16">
      <div className="max-w-md md:max-w-none mx-auto md:mx-0">
        {/* Header */}
        <header className="mb-4 md:mb-10 flex items-end justify-between">
          <h1 className="text-2xl md:text-6xl font-bold md:font-normal md:font-serif tracking-tight text-slate-800 md:text-neutral-900">
            Facility &amp; amenities
          </h1>
          <span className="hidden md:inline-flex items-center border border-neutral-400 text-neutral-500 uppercase tracking-widest text-xs px-4 py-1.5 rounded-full">
            Serenia Estate
          </span>
        </header>

        {/* Mobile-only dropdown */}
        <div className="relative mb-4 md:hidden">
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="w-full flex items-center justify-between border border-neutral-200 rounded-xl px-4 py-3.5 bg-white shadow-sm"
          >
            <span className="text-slate-800 text-base">{active.name}</span>
            <ChevronDown
              size={18}
              className={`text-slate-500 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden">
              {amenities.map((a, i) => (
                <li key={a.id}>
                  <button
                    onClick={() => select(i)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      i === activeIndex
                        ? "bg-neutral-100 text-slate-900 font-medium"
                        : "text-slate-600 hover:bg-neutral-50"
                    }`}
                  >
                    {a.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Content grid: stacked on mobile, split on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image panel (shared) */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px] shadow-sm md:shadow-xl">
            <img
              key={active.id}
              src={active.image}
              alt={active.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 md:from-black/80 via-black/10 to-transparent" />

            {/* Desktop-only tag pill */}
            <div className="hidden md:block absolute top-6 left-6">
              <span className="bg-white/90 text-neutral-800 font-medium px-4 py-1.5 rounded-full text-sm">
                {active.tag}
              </span>
            </div>

            {/* Desktop-only prev/next arrows */}
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-4">
              <button
                onClick={goPrev}
                aria-label="Previous amenity"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-neutral-800 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goNext}
                aria-label="Next amenity"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-neutral-800 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
              <div className="hidden md:flex items-center gap-2 mb-2 text-white/80">
                <Icon size={18} />
                <span className="text-xs uppercase tracking-widest">
                  {active.order} / {String(amenities.length).padStart(2, "0")}
                </span>
              </div>
              <h2 className="text-xl md:text-3xl font-semibold md:font-normal md:font-serif mb-1.5 md:mb-2">
                {active.name}
              </h2>
              <p className="text-sm md:text-base text-white/85 md:text-white/90 leading-snug max-w-md mb-4 md:mb-0">
                {active.description}
              </p>

              {/* Mobile-only segmented progress bar */}
              <div className="flex gap-1.5 md:hidden">
                {amenities.map((a, i) => (
                  <button
                    key={a.id}
                    onClick={() => select(i)}
                    aria-label={`Go to ${a.name}`}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i === activeIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop-only dot indicators */}
            <div className="hidden md:flex absolute bottom-4 right-6 gap-1.5">
              {amenities.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => select(i)}
                  aria-label={`Go to ${a.name}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop-only list panel */}
          <ul className="hidden md:flex flex-col justify-center divide-y divide-neutral-200">
            {amenities.map((a, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={a.id}>
                  <button
                    onClick={() => select(i)}
                    className={`w-full flex items-baseline justify-between py-5 md:py-6 text-left transition-colors ${
                      isActive
                        ? "text-neutral-900"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    <span
                      className={`font-serif tracking-tight transition-all ${
                        isActive
                          ? "text-2xl md:text-4xl font-medium"
                          : "text-lg md:text-2xl"
                      }`}
                    >
                      {a.name}
                    </span>
                    <span
                      className={`text-xs tabular-nums ${
                        isActive ? "text-[#2e4a34]" : "text-neutral-400"
                      }`}
                    >
                      {a.order}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}