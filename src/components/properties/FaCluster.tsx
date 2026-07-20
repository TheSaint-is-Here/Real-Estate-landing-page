import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


type Amenity = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const amenities: Amenity[] = [
  {
    id: "landscaped-parks",
    title: "Landscaped Parks",
    description: "Green spaces with trees and walking paths.",
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
  },
  {
    id: "jogging-track",
    title: "Jogging track",
    description: "Dedicated path for running and walking.",
    image:
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80",
  },
  {
    id: "central-playground",
    title: "Central Playground",
    description: "A shared play area for children and families.",
    image:
      "https://images.unsplash.com/photo-1594808750243-42a9b3d33e88?w=800&q=80",
  },
  {
    id: "swimming-pool",
    title: "Swimming Pool",
    description: "A resort-style pool for residents to relax and unwind.",
    image:
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?w=800&q=80",
  },
  {
    id: "clubhouse",
    title: "Clubhouse & Lounge",
    description: "A shared space for gatherings, events, and community life.",
    image:
      "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&q=80",
  },
  {
    id: "fitness-center",
    title: "Fitness Center",
    description: "Fully equipped gym for residents to stay active.",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
  },
];

export default function FaCluster() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateProgress = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 32
      : 320;
    el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
    setTimeout(updateProgress, 300);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-14 sm:px-12">
      <h2 className="mb-12 text-center text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
        Facility &amp; amenities
        <br />
        in this cluster
      </h2>

      <div className="mx-auto max-w-7xl">
        {/* Card list: stacked full-width on mobile, horizontal scroll row from sm up */}
        <div
          ref={scrollRef}
          onScroll={updateProgress}
          className="flex flex-col gap-10 sm:flex-row sm:gap-8 sm:overflow-x-auto sm:scroll-smooth sm:pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {amenities.map((amenity) => (
            <div key={amenity.id} className="w-full flex-shrink-0 sm:w-72 lg:w-80">
              <h3 className="mb-1 text-xl font-semibold text-slate-900">
                {amenity.title}
              </h3>
              <p className="mb-4 text-sm text-slate-500">
                {amenity.description}
              </p>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={amenity.image}
                  alt={amenity.title}
                  className="h-64 w-full object-cover sm:h-96"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar + arrows: only shown on sm and up, where the row scrolls horizontally */}
        <div className="mt-8 hidden items-center gap-6 sm:flex">
          <div className="h-[2px] flex-1 bg-slate-200">
            <div
              className="h-[2px] bg-slate-900 transition-all"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Previous amenity"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="Next amenity"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}