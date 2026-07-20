import { useState, useEffect, useRef } from "react";
import groundplan from '../../assets/Image (17).png'
import familyroom  from '../../assets/Image (18).png'

// ─── types ────────────────────────────────────────────────────────────────────
interface Room {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface Hotspot {
  id: string;
  label: string;
  x: string;
  y: string;
  targetRoom: number;
  icon: string;
}

// ─── data ─────────────────────────────────────────────────────────────────────
const ROOMS: Room[] = [
  {
    id: 1,
    name: "Bedroom",
    description: "Private and bright sleeping space for rest",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=85",
  },
  {
    id: 2,
    name: "Kitchen",
    description: "Functional modern kitchen for cooking",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=85",
  },
  {
    id: 3,
    name: "Family room",
    description: "Spacious living area for gathering",
    image: familyroom,
  },
  {
    id: 4,
    name: "Dining area",
    description: "Cozy dining spot for meals",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=85",
  },
  {
    id: 5,
    name: "Sliding door",
    description: "Wide access to fresh air and light",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85",
  },
  {
    id: 6,
    name: "Balcony",
    description: "Relaxing outdoor corner with view",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=85",
  },
];

const HOTSPOTS_BY_ROOM: Record<number, Hotspot[]> = {
  1: [
    { id: "h1", label: "Family room", x: "55%", y: "60%", targetRoom: 3, icon: "⌂" },
    { id: "h2", label: "Balcony",      x: "78%", y: "48%", targetRoom: 6, icon: "↗" },
  ],
  2: [
    { id: "h1", label: "Family room", x: "60%", y: "55%", targetRoom: 3, icon: "⌂" },
    { id: "h2", label: "Dining area", x: "30%", y: "62%", targetRoom: 4, icon: "⌂" },
  ],
  3: [
    { id: "h1",      label: "Kitchen",     x: "18%", y: "65%", targetRoom: 2, icon: "↙" },
    { id: "h2",      label: "Bathroom",    x: "35%", y: "80%", targetRoom: 5, icon: "↙" },
    { id: "h3",      label: "Front yard",  x: "58%", y: "78%", targetRoom: 6, icon: "↓" },
    { id: "tooltip", label: "Family room", x: "48%", y: "50%", targetRoom: 3, icon: "⌂" },
  ],
  4: [
    { id: "h1", label: "Family room", x: "50%", y: "60%", targetRoom: 3, icon: "⌂" },
    { id: "h2", label: "Kitchen",     x: "20%", y: "55%", targetRoom: 2, icon: "↙" },
  ],
  5: [
    { id: "h1", label: "Family room", x: "60%", y: "65%", targetRoom: 3, icon: "⌂" },
    { id: "h2", label: "Balcony",     x: "80%", y: "50%", targetRoom: 6, icon: "↗" },
  ],
  6: [
    { id: "h1", label: "Family room", x: "45%", y: "70%", targetRoom: 3, icon: "⌂" },
    { id: "h2", label: "Bedroom",     x: "70%", y: "55%", targetRoom: 1, icon: "↗" },
  ],
};

// ─── sub-components ────────────────────────────────────────────────────────────

function HotspotButton({ hotspot, onClick }: { hotspot: Hotspot; onClick: () => void }) {
  const isTooltip = hotspot.id === "tooltip";

  if (isTooltip) {
    return (
      <div
        className="absolute flex flex-col items-start gap-1 cursor-pointer group z-10"
        style={{ left: hotspot.x, top: hotspot.y, transform: "translate(-50%, -50%)" }}
        onClick={onClick}
      >
        <div className="bg-white rounded-xl shadow-lg px-4 py-3 mb-2 min-w-[200px] border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-400 text-sm">⌂</span>
            <span className="text-xs text-gray-400">Family room</span>
          </div>
          <p className="text-sm font-semibold text-gray-900">A comfortable place to relax with family</p>
        </div>
        <div className="mx-auto w-4 h-4 rounded-full bg-gray-900 border-2 border-white shadow-md" />
      </div>
    );
  }

  return (
    <div
      className="absolute flex flex-col items-center gap-1 cursor-pointer group z-10"
      style={{ left: hotspot.x, top: hotspot.y, transform: "translate(-50%, -50%)" }}
      onClick={onClick}
    >
      <span className="text-white text-xs font-medium drop-shadow-md opacity-90 group-hover:opacity-100">
        {hotspot.label}
      </span>
      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white/35 transition-all shadow-md">
        <span className="text-white text-sm">{hotspot.icon}</span>
      </div>
    </div>
  );
}

// ─── main component ────────────────────────────────────────────────────────────

export default function Preview360() {
  const [activeRoom, setActiveRoom]       = useState<number>(3);
  const [floorTab, setFloorTab]           = useState<"Ground floor" | "Upper floor">("Ground floor");
  const [floorDropOpen, setFloorDropOpen] = useState(false);

  const floorDropRef = useRef<HTMLDivElement>(null);

  // Close floor dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (floorDropRef.current && !floorDropRef.current.contains(e.target as Node)) {
        setFloorDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const room     = ROOMS.find((r) => r.id === activeRoom)!;
  const hotspots = HOTSPOTS_BY_ROOM[activeRoom] ?? [];

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden font-sans">
      
      {/* ═══ Panoramic viewer (Spans full view now) ═════════════════════════════════════ */}
      <div className="flex-1 relative overflow-hidden">

        {/* Background image */}
        <img
          src={room.image}
          alt={room.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          style={{ filter: "brightness(0.92)" }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />

        {/* ── Transparent header overlaid on image ── */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/70 overflow-hidden">
            <span className="hover:text-white cursor-pointer truncate">All clusters</span>
            <span className="text-white/40">/</span>
            <span className="hover:text-white cursor-pointer truncate">Aruna residence</span>
            <span className="text-white/40">/</span>
            <span className="hover:text-white cursor-pointer truncate">Type-A</span>
            <span className="text-white/40">/</span>
            <span className="bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs whitespace-nowrap border border-white/20">
              360 preview
            </span>
          </nav>

          {/* Centered logo */}
          <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 hidden md:block">
            <div className="w-6 h-6 border-2 border-white/80 rounded flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-white/80 rounded-sm" />
            </div>
            <span className="text-white font-semibold text-base tracking-wide drop-shadow-md">Serenia</span>
          </div>

          {/* Right: floor & room selector dropdown */}
          <div ref={floorDropRef} className="relative">
            <button
              onClick={() => setFloorDropOpen((v) => !v)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              {floorTab}
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`transition-transform duration-200 ${floorDropOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {floorDropOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[220px] z-50">
                <img src={groundplan} alt="" />
                {/* Floor tabs inside dropdown */}
                <div className="flex border-b border-gray-100">
                  {(["Ground floor", "Upper floor"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFloorTab(tab)}
                      className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                        floorTab === tab
                          ? "text-gray-900 border-b-2 border-gray-900"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {/* Room list layout inside selector */}
                {ROOMS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => { setActiveRoom(r.id); setFloorDropOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                      activeRoom === r.id ? "bg-gray-50" : ""
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                        activeRoom === r.id
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {r.id}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${activeRoom === r.id ? "text-gray-900" : "text-gray-600"}`}>
                        {r.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{r.description}</p>
                    </div>
                    {activeRoom === r.id && (
                      <svg className="ml-auto flex-shrink-0 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Hotspot buttons */}
        {hotspots.map((hs) => (
          <HotspotButton
            key={hs.id}
            hotspot={hs}
            onClick={() => setActiveRoom(hs.targetRoom)}
          />
        ))}

        {/* Current room label — bottom left */}
        <div className="absolute bottom-6 left-6 text-white z-10">
          <p className="text-xs text-white/60 mb-0.5 uppercase tracking-widest">Now viewing</p>
          <p className="text-lg font-bold drop-shadow-md">{room.name}</p>
          <p className="text-sm text-white/70">{room.description}</p>
        </div>

        {/* 360 badge — bottom right of viewer */}
        <div className="absolute bottom-6 right-6 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full z-10">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
          </svg>
          360°
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}