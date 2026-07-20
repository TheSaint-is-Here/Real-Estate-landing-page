import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  BedDouble,
  TriangleAlert,
  Navigation,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

type Feature = {
  icon: React.ReactNode;
  label: string;
};

type Community = {
  tag: string;
  name: string;
  description: string;
  features: Feature[];
  price: string;
  images: string[]; // 1. Changed to array so we can slide through them
};

const communities: Community[] = [
  {
    tag: "The modern comfort",
    name: "Aruna residence",
    description:
      "Spacious homes with minimalist design, surrounded by lush parks and playgrounds — the perfect place for families to grow and thrive",
    features: [
      { icon: <BedDouble size={18} />, label: "2–4 Bedroom options" },
      { icon: <TriangleAlert size={18} />, label: "Family-friendly facilities" },
      { icon: <Navigation size={18} />, label: "Easy access to main boulevard" },
    ],
    price: "$85,000",
    images: [ // 2. 4 different images for the 4 dots
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    ],
  },
  {
    tag: "The urban living",
    name: "Cedar heights",
    description: "Modern apartments in the city center with rooftop views and 24/7 concierge.",
    features: [
      { icon: <BedDouble size={18} />, label: "1–3 Bedroom options" },
      { icon: <TriangleAlert size={18} />, label: "Gym + Pool access" },
      { icon: <Navigation size={18} />, label: "2 min to metro station" },
    ],
    price: "$120,000",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    ],
  },
];

export default function CommunityShowcase() {
  const [communityIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0); // 3. This controls the image

  const community = communities[communityIndex];
  const slideCount = community.images.length;
  const currentImage = community.images[slideIndex]; // 4. Image now depends on slideIndex

  // 5. Arrows now change the slide, not the community
  const goPrev = () => setSlideIndex((i) => (i - 1 + slideCount) % slideCount);
  const goNext = () => setSlideIndex((i) => (i + 1) % slideCount);

  return (
    <div className="min-h-screen bg-white px-6 py-12 sm:px-12">
      <h2 className="mb-10 text-4xl  text-center font-medium tracking-tight text-slate-900 sm:text-5xl">
        Discover signature<br />communities
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={currentImage} // 7. Use slideIndex
            alt={community.name}
            className="h-105 w-full object-cover sm:h-130 transition-opacity duration-300"
            key={currentImage} // 8. Key forces React to re-render on change = smooth swap
          />
          {/* Carousel dots */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${slideIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-sm text-slate-700">
            <Users size={16} />
            {community.tag}
          </span>

          <h3 className="mb-4 text-3xl font-medium text-slate-900 sm:text-4xl">
            {community.name}
          </h3>

          <p className="mb-8 max-w-md leading-relaxed text-slate-500">
            {community.description}
          </p>

          <ul className="mb-8 flex-col gap-4">
            {community.features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700">
                <span className="text-slate-500">{f.icon}</span>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-sm text-slate-500">Starts from</p>
              <p className="text-2xl font-semibold text-slate-900">
                {community.price}
              </p>
            </div>

            <Link to="/arunaresidence" className="w-full sm:w-auto">
              <button className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-200 w-full sm:w-auto">
                Discover
                <ArrowUpRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="mx-auto mt-10 flex max-w-6xl justify-end gap-3">
        <button
          onClick={goPrev} // 9. Now changes image
          aria-label="Previous image"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goNext} // 10. Now changes image
          aria-label="Next image"
          className="flex h-11 w-11 items-center justify-center rounded-full border-slate-300 text-slate-700 transition-colors hover:bg-slate-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}