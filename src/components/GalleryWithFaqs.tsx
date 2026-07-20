import { useState, useEffect } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

// 1. IMPORT ALL IMAGES
import kitchen1 from "../assets/Image (44).png";
import kitchen2 from "../assets/Image (43).png";
import kitchen3 from "../assets/Image (42).png";
import kitchen4 from "../assets/Image (41).png";
import kitchen5 from "../assets/Image (40).png";
import kitchen6 from "../assets/Image (39).png";
import kitchen7 from "../assets/Image (38).png";
import kitchen8 from "../assets/Image (37).png";
import kitchen9 from "../assets/Image (36).png";
import kitchen10 from "../assets/Image (35).png"; // fixed dup
import kitchen11 from "../assets/Image (34).png"; // fixed dup
import Header from "./Header";
import SerenaFooter from "./Footer";

const categories = ["Outlook", "Park", "Bedroom", "Rooftop", "Playground", "Kitchen", "Bathroom", "Family room", "Clubhouse", "Gym"];

const kitchenImages = [
  { id: 1, src: kitchen1, label: "Pavo Heights - Type A", desc: "Potential kitchen with superior finishes, designed with both style and function" },
  { id: 2, src: kitchen2 },
  { id: 3, src: kitchen3 },
  { id: 4, src: kitchen4 },
  { id: 5, src: kitchen5 },
  { id: 6, src: kitchen6 },
  { id: 7, src: kitchen7 },
  { id: 8, src: kitchen8 },
  { id: 9, src: kitchen9 },
  { id: 10, src: kitchen10 },
  { id: 11, src: kitchen11 },
];

const faqs = [
  {
    q: "Are the furniture and decorations in the gallery included in the purchase?",
    a: `The standard purchase includes the house structure and built-in features only. Furniture and decorations shown in the gallery are for illustration purposes and not part of the purchase.
However, we do offer optional furnishing packages if you would like a move-in-ready home. These packages typically include:
Living Room : Sofa set, coffee table, TV cabinet, lighting fixtures.
Dining Area : Dining table, chairs, accent decor.
Bedrooms : Beds, wardrobes, side tables, bedding options.
Kitchen & Pantry : Extra storage units, selected appliances, bar stools (depending on package).
Decorations : Wall art, rugs, and accessories to complete the look.
This way, you can either fully personalize your interiors or choose from our curated packages for added convenience.`
  },
  { q: "Will the property I purchase look exactly like the gallery images?", a: "Gallery images are representative. Actual finishes may vary slightly depending on your selected unit and package." },
  { q: "Can I visit a show unit to see the interiors in person?", a: "Yes, you can schedule a private tour with our sales team to see our show units." },
  { q: "Can I request changes to the kitchen, bedroom, or living room layouts?", a: "Certain layout modifications are available during the pre-construction phase. Contact our team for details." },
  { q: "Do you provide different design themes for the interiors?", a: "Yes, we offer 3 curated design themes: Modern, Classic, and Minimalist." },
];

export default function GalleryWithFAQ() {
  const [activeTab, setActiveTab] = useState("Kitchen");
  const [openFAQ, setOpenFAQ] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // only 5 images on mobile, all on desktop
  const imagesToShow = isMobile ? kitchenImages.slice(0, 5) : kitchenImages;

  return (
    <div className="bg-white">
        <Header/>
      {/* Gallery Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Title + Filter */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-medium text-black">Our gallery</h2>
              <p className="text-sm text-gray-500 mt-2 max-w-md">
                Explore our community charm with elegant homes and amenities, perfect for your family's comfort.
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <label className="text-xs text-gray-500">Clusters</label>
              <div className="relative mt-1">
                <select className="appearance-none w-48 border-gray-200 px-3 py-2 text-sm pr-8 focus:outline-none">
                  <option>All clusters</option>
                  <option>Cluster A</option>
                  <option>Cluster B</option>
                </select>
                <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="overflow-x-auto mb-8">
            <div className="flex gap-2 min-w-max border-b border-gray-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-3 text-sm whitespace-nowrap ${
                    activeTab === cat 
                      ? "border-b-2 border-black font-medium text-black" 
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Gallery - 3 columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {imagesToShow.map((img) => (  // <-- use imagesToShow here
              <div key={img.id} className="break-inside-avoid relative group">
                <img 
                  src={img.src}
                  alt="Gallery image" 
                  className="w-full object-cover rounded-sm"
                />
                {img.label && (
                  <div className="absolute top-3 left-3 bg-white px-3 py-1 text-xs font-medium shadow-sm">
                    {img.label}
                  </div>
                )}
                {img.desc && (
                  <div className="absolute bottom-3 left-3 right-3 bg-black/50 text-white p-3 text-xs">
                    {img.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-16 bg-gray-50">
        <div className="mx-auto max-w-3xl">
          <h3 className="text-2xl sm:text-3xl font-medium text-center text-black mb-10">
            FAQs after our <br /> customer sees gallery
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200"> {/* added border */}
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}
                  className="w-full flex justify-between items-center p-5 text-left"
                >
                  <span className="text-sm font-medium text-black">{faq.q}</span>
                  {openFAQ === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
                {openFAQ === i && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <SerenaFooter/>
    </div>
  );
}
