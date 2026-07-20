import { useState } from "react";
import image2 from '../assets/Image (22).png'

type FacilityItem = {
  title: string;
  description: string;
  image: string; // now required for all
};

type Cluster = {
  name: string;
  facilities: FacilityItem[];
};

const clusters: Cluster[] = [
  {
    name: "Liora estate",
    facilities: [
      {
        title: "Infinity Swimming Pool",
        description: "A stylish pool that blends seamlessly with the horizon, offering breathtaking scenic views. It's designed for both relaxation and leisure swims, creating a good serene atmosphere where you can unwind and enjoy moments of tranquility.",
        image: image2
      },
      {
        title: "Residents' Lounge & Coffee Corner",
        description: "A cozy space to work, meet neighbors, and grab your morning coffee with free wifi and comfortable seating.",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80"
      },
      {
        title: "Children's Creative Playground",
        description: "Safe play area with modern equipment designed to spark creativity and imagination for kids of all ages.",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80"
      },
      {
        title: "Private Jogging Loop",
        description: "800m landscaped jogging track exclusive to Liora estate residents, surrounded by greenery.",
        image: "https://images.unsplash.com/photo-1571008882574-571d4e8efa12?w=1200&q=80"
      },
    ],
  },
  {
    name: "Nava heights",
    facilities: [
      { title: "Sky Deck Viewing Terrace", description: "360 panoramic views of the city skyline, perfect for sunset gatherings and events.", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80" },
      { title: "Rooftop Yoga & Wellness Area", description: "Morning yoga sessions with instructors overlooking the skyline in a peaceful setting.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80" },
      { title: "Indoor Gym & Fitness Studio", description: "Fully equipped gym with personal trainers, cardio zone, and group classes.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80" },
      { title: "BBQ & Outdoor Dining Pavilion", description: "Covered pavilion with grills and tables for weekend family barbecues.", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80" },
    ],
  },
  {
    name: "Aruna residence",
    facilities: [
      { title: "Central Playground with Smart Play Equipment", description: "Interactive play equipment with safety sensors and app integration for parents.", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80" },
      { title: "Multipurpose Community Hall", description: "Host birthdays, meetings, and events with full AV support and flexible seating.", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80" },
      { title: "Mini Market & Daily Needs Kiosk", description: "24/7 convenience store for groceries, snacks, and daily essentials.", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9d?w=1200&q=80" },
      { title: "Cycling Track", description: "Dedicated 1.2km cycling lane around the cluster perimeter with lighting.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80" },
    ],
  },
  {
    name: "Velora park",
    facilities: [
      { title: "Basketball Court", description: "Full-size FIBA standard court with night lighting for evening games.", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80" },
      { title: "Skate & Roller Park", description: "Concrete park with ramps, rails, and bowls for all skill levels.", image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80" },
      { title: "Open Green Amphitheater", description: "Outdoor venue for concerts, movies, and community events under the stars.", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80" },
      { title: "Community Garden Plots", description: "Rent your own plot and grow vegetables and herbs in a shared green space.", image: "https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=1200&q=80" },
    ],
  },
  {
    name: "Seraya grove",
    facilities: [
      { title: "Exclusive Clubhouse", description: "Members-only lounge with pool table, library, bar, and event spaces.", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80" },
      { title: "Reading Pavilion & Library Corner", description: "Quiet space with curated books, fast wifi, and comfortable seating.", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80" },
      { title: "Pet-Friendly Park", description: "Off-leash dog park with agility equipment, shade, and washing station.", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200&q=80" },
      { title: "Outdoor Swimming Pool with Kids' Splash Area", description: "Resort-style pool with shallow area for kids, cabanas, and lounge chairs.", image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1200&q=80" },
    ],
  },
];

export default function ExclusiveFacilities() {
  const [openCluster, setOpenCluster] = useState(0);
  const [openFacility, setOpenFacility] = useState(0); // first one open by default

  return (
    <section className="w-full bg-[#fafafa] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-10 md:mb-14 gap-4">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-black">
            Exclusive facilities <br /> in each cluster
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-sm md:text-right">
            Every cluster is thoughtfully designed with its own set of facilities, ensuring comfort and convenience for residents in every neighborhood
          </p>
        </div>

        {/* Clusters List */}
        <div className="space-y-5">
          {clusters.map((cluster, cIndex) => (
            <div key={cluster.name} className="bg-white shadow-sm border border-slate-100 p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* Left: Cluster Name */}
                <h3 className="text-xl md:text-2xl font-medium text-black">
                  {cluster.name}
                </h3>

                {/* Right: Facilities Accordion */}
                <div className="border border-slate-200 divide-y divide-slate-200">
                  {cluster.facilities.map((facility, fIndex) => {
                    const isOpen = openCluster === cIndex && openFacility === fIndex;
                    return (
                      <div key={facility.title}>
                        <button
                          onClick={() => {
                            setOpenCluster(cIndex);
                            setOpenFacility(isOpen ? -1 : fIndex);
                          }}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                        >
                          <span className="text-sm md:text-base font-medium text-black pr-4">
                            {facility.title}
                          </span>
                          <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-slate-100 text-slate-600 text-sm">
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>

                        {/* Content with Image - now for ALL */}
                        {isOpen && (
                          <div className="px-4 pb-5 animate-fadeIn">
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                              {facility.description}
                            </p>
                            <div className="w-full h-48 md:h-56 rounded overflow-hidden">
                              <img
                                src={facility.image}
                                alt={facility.title}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}