import React, { useEffect, useRef, useState } from "react";
import image1 from '../assets/Image (48).png'
import image2 from '../assets/Image (49).png'
import {
  Search,
  FileText,
  Building2,
  CalendarDays,
  Globe,
  Ruler,
  BedDouble,
  Bath,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

/**
 * Serenia — Global Search Modal (Cmd+K style)
 * Stack: React + TypeScript + Tailwind + daisyUI + lucide-react
 *
 * Usage:
 *   const [open, setOpen] = useState(false);
 *   <button onClick={() => setOpen(true)}>Search anything...</button>
 *   <SearchModal open={open} onClose={() => setOpen(false)} />
 *
 * The modal is purely client-side state — nothing here triggers navigation
 * or a route change, it just overlays the current page.
 */

type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  { id: "all", label: "All (blogs, property, etc)", icon: <FileText className="w-4 h-4" /> },
  { id: "property", label: "Property only", icon: <Building2 className="w-4 h-4" /> },
  { id: "request", label: "Request only", icon: <CalendarDays className="w-4 h-4" /> },
  { id: "blogs", label: "Blogs only", icon: <Globe className="w-4 h-4" /> },
];

type Property = {
  id: string;
  name: string;
  description: string;
  image: string;
  sqft: string;
  beds: number;
  baths: number;
};

const properties: Property[] = [
  {
    id: "aruna-a",
    name: "Aruna Type-A",
    description: "Compact & efficient living — minimalist housing for practical young families.",
    image:
      image1,
    sqft: "2,000 ft2",
    beds: 3,
    baths: 2,
  },
  {
    id: "aruna-b",
    name: "Aruna Type-B",
    description: "Spacious & stylish living — perfect for growing families who need more room and modern comfort.",
    image:
      image2,
    sqft: "2,500 ft2",
    beds: 4,
    baths: 3,
  },
];

type TourRequest = {
  id: string;
  initials: string;
  color: string;
  name: string;
  cluster: string;
  unit: string;
  date: string;
  time: string;
};

const requests: TourRequest[] = [
  {
    id: "r1",
    initials: "HR",
    color: "bg-amber-100 text-amber-700",
    name: "Alex Johnson",
    cluster: "Liora estate",
    unit: "Unit A-18",
    date: "Mon, June 12, 2025",
    time: "08:00 am - 10:00 am",
  },
  {
    id: "r2",
    initials: "MA",
    color: "bg-orange-100 text-orange-700",
    name: "Miya Agustine",
    cluster: "Nava heights",
    unit: "Unit B-20",
    date: "Mon, June 13, 2025",
    time: "09:00 am - 11:00 am",
  },
  {
    id: "r3",
    initials: "LS",
    color: "bg-emerald-100 text-emerald-700",
    name: "Laura Smith",
    cluster: "Aruna residence",
    unit: "Unit C-11",
    date: "Mon, June 14, 2025",
    time: "08:00 am - 10:00 am",
  },
];

export default function DashboardPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [showAllRequests, setShowAllRequests] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the search input as soon as the modal opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Esc to close, Up/Down to move through categories — all in-page, no navigation
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const idx = categories.findIndex((c) => c.id === activeCategory);
        const nextIdx =
          e.key === "ArrowDown"
            ? Math.min(idx + 1, categories.length - 1)
            : Math.max(idx - 1, 0);
        setActiveCategory(categories[nextIdx].id);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, activeCategory, onClose]);

  if (!open) return null;

  const showProperties = activeCategory === "all" || activeCategory === "property";
  const showRequests = activeCategory === "all" || activeCategory === "request";
  const visibleRequests = showAllRequests ? requests : requests.slice(0, 3);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop — click to close, page underneath stays mounted */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden grid grid-cols-[220px_1fr] max-h-[80vh]">
        {/* Left: categories */}
        <div className="bg-base-200/50 border-r border-base-200 p-4 flex flex-col">
          <p className="text-[11px] font-medium tracking-wide text-base-content/40 px-2 mb-2">
            CATEGORIES
          </p>
          <ul className="space-y-1 flex-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-2.5 text-sm px-2.5 py-2 rounded-lg transition-colors text-left ${
                    activeCategory === cat.id
                      ? "bg-base-100 shadow-sm font-medium text-base-content"
                      : "text-base-content/60 hover:bg-base-100/60"
                  }`}
                >
                  <span className="text-base-content/50">{cat.icon}</span>
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-base-200 pt-3 mt-3 space-y-2 text-xs text-base-content/50">
            <div className="flex items-center justify-between">
              <span>Close</span>
              <kbd className="kbd kbd-sm">esc</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Navigate</span>
              <span className="flex gap-1">
                <kbd className="kbd kbd-sm">
                  <ChevronUp className="w-3 h-3" />
                </kbd>
                <kbd className="kbd kbd-sm">
                  <ChevronDown className="w-3 h-3" />
                </kbd>
              </span>
            </div>
          </div>
        </div>

        {/* Right: search + results */}
        <div className="flex flex-col min-h-0">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-base-200">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <Search className="w-4 h-4 text-base-content/40" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="grow"
                placeholder="Search anything..."
              />
            </label>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto px-5 py-4 space-y-6">
            {showProperties && (
              <div>
                <p className="text-sm font-medium mb-3">Properties</p>
                <div className="space-y-3">
                  {properties.map((p) => (
                    <button
                      key={p.id}
                      className="w-full flex gap-3 text-left border border-base-200 rounded-xl p-3 hover:border-base-300 hover:bg-base-200/30 transition-colors"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-20 h-20 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="text-xs text-base-content/60 mt-1 leading-relaxed">
                          {p.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="badge badge-sm badge-outline gap-1 font-normal">
                            <Ruler className="w-3 h-3" /> {p.sqft}
                          </span>
                          <span className="badge badge-sm badge-outline gap-1 font-normal">
                            <BedDouble className="w-3 h-3" /> {p.beds} beds
                          </span>
                          <span className="badge badge-sm badge-outline gap-1 font-normal">
                            <Bath className="w-3 h-3" /> {p.baths} bath
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showRequests && (
              <div>
                <p className="text-sm font-medium mb-3">Request</p>
                <div className="space-y-3">
                  {visibleRequests.map((r) => (
                    <button
                      key={r.id}
                      className="w-full flex items-center gap-3 text-left pb-3 border-b border-base-200 last:border-b-0 last:pb-0 hover:bg-base-200/30 rounded-lg px-1 transition-colors"
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${r.color}`}
                      >
                        {r.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{r.name}</p>
                        <p className="text-xs text-base-content/50">
                          {r.cluster} <span className="mx-1">•</span> {r.unit}
                        </p>
                      </div>
                      <div className="text-xs text-right shrink-0 hidden sm:block">
                        <p className="text-base-content/50">Date tour</p>
                        <p className="font-medium">{r.date}</p>
                      </div>
                      <div className="text-xs text-right shrink-0 hidden md:block">
                        <p className="text-base-content/50">Time tour</p>
                        <p className="font-medium">{r.time}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {!showAllRequests && requests.length > 3 && (
                  <button
                    onClick={() => setShowAllRequests(true)}
                    className="flex items-center gap-1 text-sm text-base-content/60 hover:text-base-content mt-3"
                  >
                    View {requests.length - 3} other
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}