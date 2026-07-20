import { useState } from "react";
import SerenaFooter from "../Footer";
import mainimage1 from '../../assets/Main Image (1).png'
import gal1 from '../../assets/Image (11).png'
import gal2 from '../../assets/Image (12).png'
import gal3 from '../../assets/Image (13).png'
import gal4 from '../../assets/Image (16).png'
import gal5 from '../../assets/Image (17).png'
import gal6 from '../../assets/Image (18).png'
import Header from "../Header";
import { Link } from "react-router-dom";
// ─── placeholder image helpers (swap with real imports) ───────────────────────
const HERO =
  mainimage1;
const THUMBS = [
  mainimage1,
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&q=70",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&q=70",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=70",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&q=70",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&q=70",
];
const GALLERY_TABS: Record<string, string[]> = {
  Outside: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
  ],
  Bedroom: [
    gal1,
    gal2,
    gal3,
    gal4,
  ],
  Bathroom: [
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80",
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&q=80",
    "https://images.unsplash.com/photo-1620626011761-996317702149?w=400&q=80",
  ],
  Kitchen: [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80",
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&q=80",
    "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=80",
  ],
  Backyard: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&q=80",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
  ],
  "Family room": [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80",
  ],
  Street: [
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
    "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=400&q=80",
    "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400&q=80",
  ],
};
const PREVIEW_IMG =
  gal6;
const FLOORPLAN_IMG =
  gal5;

// ─── sub-components ───────────────────────────────────────────────────────────

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right max-w-[55%]">{value}</span>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl bg-white min-w-0">
      <span className="text-xl shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 truncate">{label}</p>
        <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
      </div>
    </div>
  );
}

function SectionDivider() {
  return <div className="my-6 border-t border-gray-100" />;
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center px-5 py-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <span className="text-gray-400 text-lg leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5 bg-white">{children}</div>}
    </div>
  );
}

function NearbyRow({
  name,
  dist,
  time,
  icon,
}: {
  name: string;
  dist: string;
  time: string;
  icon: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {dist} • {time}
        </p>
      </div>
      <span className="text-lg text-gray-400">{icon}</span>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function ArunaResidence() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [galleryTab, setGalleryTab] = useState("Bedroom");
  const [floorTab, setFloorTab] = useState<"Ground floor" | "Upper floor">("Ground floor");
  const [showFullDesc, setShowFullDesc] = useState(false);

  const galleryImages = GALLERY_TABS[galleryTab] ?? [];

  return (
    <div>
      <Header />      <div className="bg-gray-50 min-h-screen">
        {/* ── Hero image + thumbnails ────────────────────────────────── */}
        <div className="relative w-full bg-black">
          <img
            src={THUMBS[activeThumb] ?? HERO}
            alt="Property exterior"
            className="w-full h-80 sm:h-120 lg:h-140 object-cover opacity-95"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4 flex gap-2 overflow-x-auto hide-scrollbar bg-linear-to-t from-black/60 to-transparent">
            {THUMBS.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${activeThumb === i ? "border-white" : "border-white/30"
                  }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Page body ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-10">

            {/* ══════════ LEFT COLUMN ══════════════════════════════════ */}
            <div className="space-y-0">

              {/* Title + badge */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    Aruna – Type A
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Serenia Residences, Harmony Street No. 12, Selhurst, London, England
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  12 unit available →
                </span>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <StatCard icon="📐" label="Land & building size" value="2,000 ft²" />
                <StatCard icon="🏠" label="House style" value="Modern minimalist" />
                <StatCard icon="🏢" label="Total floor" value="Double floor" />
                <StatCard icon="🛏" label="Bedrooms" value="3 bedrooms" />
                <StatCard icon="🚿" label="Bathrooms" value="2 bathrooms" />
                <StatCard icon="🏘" label="Cluster" value="Aruna residence" />
              </div>

              <SectionDivider />

              {/* About */}
              <section>
                <h2 className="text-base font-bold text-gray-900 mb-3">About properties</h2>
                <div className={`text-sm text-gray-600 leading-relaxed space-y-3 ${!showFullDesc ? "line-clamp-4" : ""}`}>
                  <p>
                    Aruna Residence offers modern residences with minimalist designs that blend in with
                    the green surroundings, providing comfort for dynamic families. Each unit is designed
                    with an open layout that maximizes natural light and air circulation. With a spacious
                    living room that connects directly to the backyard, this house supports a healthy and
                    harmonious lifestyle.
                  </p>
                  <p>
                    The master bedroom features a private balcony, offering privacy and stunning views of
                    the green surroundings. The modern kitchen with an open-concept design makes cooking
                    more enjoyable while strengthening family bonding moments. Aruna Residence is the
                    perfect choice for young families and professionals seeking a home with a strategic
                    location.
                  </p>
                </div>
                <button
                  onClick={() => setShowFullDesc((v) => !v)}
                  className="text-xs font-semibold text-gray-900 underline mt-2"
                >
                  {showFullDesc ? "Show less" : "Read more"}
                </button>
              </section>

              <SectionDivider />

              {/* Locations */}
              <section>
                <h2 className="text-base font-bold text-gray-900 mb-4">Locations</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Map placeholder */}
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100 h-52">
                    <iframe
                      title="map"
                      className="w-full h-full"
                      loading="lazy"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-0.08%2C51.38%2C-0.06%2C51.40&layer=mapnik&marker=51.39%2C-0.07"
                    />
                  </div>
                  {/* Nearby */}
                  <div className="border border-gray-200 rounded-xl bg-white px-4 py-2">
                    <p className="text-xs text-gray-400 mb-1 pt-2">This residence is near with:</p>
                    <NearbyRow name="Greenfield International School" dist="2.1 km" time="5 min drive" icon="🏫" />
                    <NearbyRow name="Selhurst Mall & Lifestyle Center" dist="3.4 km" time="10 min drive" icon="🏬" />
                    <NearbyRow name="Royal Care Hospital" dist="4.8 km" time="12 min drive" icon="🏥" />
                    <NearbyRow name="Selhurst Central Station" dist="2.7 km" time="8 min drive" icon="🚉" />
                  </div>
                </div>
              </section>

              <SectionDivider />

              {/* Gallery */}
              <section>
                <h2 className="text-base font-bold text-gray-900 mb-4">Gallery</h2>
                {/* Tab bar */}
                <div className="flex gap-1 overflow-x-auto hide-scrollbar border-b border-gray-200 mb-4">
                  {Object.keys(GALLERY_TABS).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setGalleryTab(tab)}
                      className={`shrink-0 px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${galleryTab === tab
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {/* Gallery grid: large left + 3 right */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="row-span-3 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={galleryImages[0]}
                      alt={galleryTab}
                      className="w-full h-full object-cover min-h-60"
                    />
                  </div>
                  {galleryImages.slice(1).map((src, i) => (
                    <div key={i} className="rounded-xl overflow-hidden bg-gray-100 aspect-4/3">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </section>

              <SectionDivider />

              {/* Full specifications */}
              <section>
                <h2 className="text-base font-bold text-gray-900 mb-4">Full specifications</h2>
                <div className="space-y-3">
                  <AccordionItem title="Interior Features" defaultOpen>
                    <div className="space-y-2 pt-2">
                      {[
                        ["Flooring", "Polished 60×60 cm granite tiles throughout living and dining areas."],
                        ["Lightning", "LED fixtures with dimmable switches in living room and bedrooms."],
                        ["Appliances", "Included built-in electric stove, range hood, and sink in an open-concept kitchen."],
                        ["Design Details", "Vaulted ceiling in living area; large corner windows for ample natural light."],
                        ["Smart Elements", "Wi-Fi-enabled smart lighting control and keyless smart door lock system."],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                          <span className="text-gray-500">• {k}</span>
                          <span className="text-gray-700">: {v}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                  <AccordionItem title="Property & Layout">
                    <div className="space-y-2 pt-2">
                      {[
                        ["Total area", "2,000 ft² built-up area on a 150 m² land plot."],
                        ["Layout", "Open-plan ground floor; 3 bedrooms + study on upper floor."],
                        ["Parking", "Covered 2-car garage with EV charging point."],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                          <span className="text-gray-500">• {k}</span>
                          <span className="text-gray-700">: {v}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                  <AccordionItem title="Construction & Materials">
                    <div className="space-y-2 pt-2">
                      {[
                        ["Structure", "Reinforced concrete frame with lightweight brick infill."],
                        ["Exterior", "Plaster and Dulux weathershield paint finish."],
                        ["Roof", "Metal deck roof with insulation layer."],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                          <span className="text-gray-500">• {k}</span>
                          <span className="text-gray-700">: {v}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                  <AccordionItem title="Utilities & Green Energy">
                    <div className="space-y-2 pt-2">
                      {[
                        ["Electricity", "2,200 VA PLN supply; solar-ready conduit."],
                        ["Water", "PDAM municipal supply + 5,000 L underground tank."],
                        ["Waste", "Bio-septic tank system; rainwater harvesting pit."],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                          <span className="text-gray-500">• {k}</span>
                          <span className="text-gray-700">: {v}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                  <AccordionItem title="Community & Amenities">
                    <div className="space-y-2 pt-2">
                      {[
                        ["Security", "24-hour CCTV and roving security guard."],
                        ["Recreation", "Clubhouse, swimming pool, jogging track."],
                        ["Management", "Dedicated estate management office on site."],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                          <span className="text-gray-500">• {k}</span>
                          <span className="text-gray-700">: {v}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                </div>
              </section>

              <SectionDivider />

              {/* Floor plan */}
              <section className="pb-10">
                <h2 className="text-base font-bold text-gray-900 mb-4">Floor plan</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Left: tabs + floor plan image */}
                  <div>
                    <div className="inline-flex bg-gray-100 rounded-lg p-1 mb-4">
                      {(["Ground floor", "Upper floor"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setFloorTab(t)}
                          className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${floorTab === t
                            ? "bg-white shadow-sm text-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                      <img
                        src={FLOORPLAN_IMG}
                        alt={`${floorTab} plan`}
                        className="w-full object-contain max-h-72"
                      />
                    </div>
                  </div>
                  {/* Right: room legend */}
                  <div className="space-y-3">
                    {[
                      ["1", "Bedroom", "Private and bright sleeping space for rest"],
                      ["2", "Kitchen", "Functional modern kitchen for cooking"],
                      ["3", "Family room", "Spacious living area for gathering"],
                      ["4", "Dining area", "Cozy dining spot for meals"],
                      ["5", "Sliding door", "Wide access to fresh air and light"],
                      ["6", "Balcony", "Relaxing outdoor corner with view"],
                    ].map(([num, room, desc]) => (
                      <div key={num} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {num}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{room}</p>
                          <p className="text-xs text-gray-500">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* ══════════ RIGHT SIDEBAR ════════════════════════════════ */}
            <div className="mt-10 lg:mt-0">
              <div className="lg:sticky lg:top-6 space-y-4">

                {/* Price & payment card */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Price &amp; payment
                    </p>
                    <p className="text-3xl font-bold text-gray-900">$135,000</p>
                    <p className="text-xs text-gray-400 mt-0.5">Total Price</p>
                  </div>
                  <div className="px-5 py-3 space-y-0">
                    <SpecRow label="Monthly Installment" value="From $750 / month" />
                    <SpecRow label="Down Payment" value="Min. 20%" />
                    <SpecRow label="Loan Tenure" value="10 / 15 / 20 years" />
                    <SpecRow label="Interest Rate" value="5% fixed (first 3 years)" />
                    <SpecRow label="Payment Methods" value="Bank Transfer" />
                    <SpecRow label="Additional Fees" value="Notary, Tax, Admin" />
                    <SpecRow label="Special Offers" value="Free Legal Fee" />
                  </div>
                  <div className="px-5 pb-5 pt-2 space-y-2">
                    <button className="w-full flex items-center justify-center gap-2 bg-[#4a5e3a] hover:bg-[#3d4f30] text-white text-sm font-semibold py-3 rounded-xl transition-colors">
                      <span>📅</span> Schedule a tour
                    </button>
                    <button className="w-full border border-gray-200 text-gray-700 text-sm font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors">
                      View more detail
                    </button>
                  </div>
                </div>

                {/* 3D Preview card */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-5 pt-4 pb-2">
                    <p className="text-sm font-bold text-gray-900">3D Preview</p>
                  </div>
                  <div className="relative mx-5 mb-3 rounded-xl overflow-hidden bg-gray-100 aspect-video">
                    <img
                      src={PREVIEW_IMG}
                      alt="3D interior preview"
                      className="w-full h-full object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-end p-4 bg-linear-to-t from-black/60 to-transparent">
                      <div>
                        <p className="text-white text-sm font-bold">Great experience</p>
                        <p className="text-white/70 text-xs">Get a 3D preview with this feature before you buy it.</p>
                      </div>
                      <button className="ml-auto w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <Link to="/preview360">  <button className="w-full border border-gray-200 text-gray-700 text-sm font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors">
                      Try 360 preview
                    </button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        <SerenaFooter />
      </div>
    </div>
  );
}