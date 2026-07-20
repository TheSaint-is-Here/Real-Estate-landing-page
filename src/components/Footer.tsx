import { useState } from "react";
import { Square } from "lucide-react";
import pico1 from "../assets/Image (1).png";

type LinkColumn = {
  heading: string;
  links: string[];
};

const linkColumns: LinkColumn[] = [
  {
    heading: "COMPANY",
    links: ["About us", "Careers", "Press & Media", "Opportunity"],
  },
  {
    heading: "SERVICES",
    links: ["Property listings", "Progress tracking", "Virtual tours", "Consultation"],
  },
  {
    heading: "RESOURCES",
    links: ["Blog & articles", "FAQs", "Guide & Tutorials", "Help Center"],
  },
  {
    heading: "LEGAL",
    links: ["Privacy Policy", "Terms & Conditions", "Cookie policy", "Disclaimer"],
  },
  {
    heading: "LEGAL",
    links: ["Privacy Policy", "Terms & Conditions", "Cookie policy", "Disclaimer"],
  },
];

export default function SerenaFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribe:", email);
    // Hook this up to your newsletter/API logic
  };

  return (
    <footer className="bg-black text-white">
      {/* CTA section */}
      <div className="relative overflow-hidden px-8 pt-16 pb-24 sm:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="max-w-md text-4xl font-medium leading-tight sm:text-5xl">
              Create rare moments with your family now
            </h2>

            <div className="mt-8 flex  flex-col sm:flex sm:flex-row gap-4">
              <button className="rounded-md bg-white px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100 ">
                Schedule a tour
              </button>
              <button className="rounded-md bg-white/15 px-6 py-3 font-medium text-white transition-colors hover:bg-white/25">
                View clusters
              </button>
            </div>
          </div>

          {/* Image with decorative hatch shape behind it */}
          <div className="relative flex items-start justify-center md:justify-end">
            <div className="absolute right-8 top-0 h-full w-32 border border-white/30 bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,rgba(255,255,255,0.15)_6px,rgba(255,255,255,0.15)_7px)] sm:w-40" />
            <img
              src={pico1}
              alt="Serenia homes"
              className="relative z-10 h-64 w-full max-w-md rounded-sm object-cover sm:h-80 hidden md:block"
            />
          </div>
        </div>
      </div>

      {/* Brand / contact / subscribe */}
      <div className="border-t border-white/10 px-8 py-12 sm:px-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Square size={22} strokeWidth={2} />
              <span className="text-xl font-semibold">Apexuiom-Homes</span>
            </div>
            <p className="text-sm text-white/70">Apexuiom-Homessupport@serenia.com</p>
            <p className="mt-2 text-sm text-white/70">(+1) 345 - 3345 - 005</p>
          </div>

          <div className="w-full max-w-md">
            <h3 className="mb-4 text-xl font-medium">
              Subscribe to get the latest information from us
            </h3>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-md border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                onClick={handleSubscribe}
                className="whitespace-nowrap rounded-md bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="border-t border-white/10 px-8 py-12 sm:px-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {linkColumns.map((col, i) => (
            <div key={i}>
              <h4 className="mb-4 text-xs font-semibold tracking-wide text-white/50">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-medium text-white/90 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}