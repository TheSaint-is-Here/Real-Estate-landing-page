import { ArrowUpRight, Leaf, Sofa, Trees } from "lucide-react";
// import imaage1  from '../../assets/gold-award-laurel-wreath-accessories-decoration-chandelier 1.png'
// import imaage2 from '../../assets/gold-award-laurel-wreath-accessories-decoration-chandelier 1 (3).png'
// import imaage3 from '../../assets/gold-award-laurel-wreath-accessories-decoration-chandelier 1 (2).png'

export default function WhyChooseUs() {
  const cards = [
    {
      icon: <Leaf className="text-green-400 h-8 w-8" />,
      title: "Green living environment",
      description:
        "Surrounded by landscaped parks and open spaces, offering fresh air and a healthier lifestyle.",
    },
    {
      icon: <Sofa className="text-amber-600 h-8 w-8" />,
      title: "Modern minimalist design",
      description:
        "Homes designed for comfort and functionality, blending aesthetics with practical living.",
      translateClass: "md:translate-y-16", // Staggers the middle card down
    },
    {
      icon: <Trees className="text-emerald-500 h-8 w-8" />,
      title: "Family-oriented lifestyle",
      description:
        "Safe playgrounds and community spaces that nurture connection, growth, and togetherness.",
      translateClass: "md:translate-y-32", // Staggers the last card down lower
    },
  ];

  return (
    <section className="bg-[#111111] text-white py-20 px-6 sm:px-12 min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight max-w-xl mb-16 md:mb-24 leading-tight">
          The reasons why must choose this clusters
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start pb-32">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`bg-[#1c1c1c] p-8 rounded-2xl flex flex-col justify-between min-h-80 shadow-xl border border-neutral-800/40 transition-transform duration-300 ${
                card.translateClass || ""
              }`}
            >
              {/* Card Top Content */}
              <div>
                <div className="mb-8 w-fit bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                  {card.icon}
                </div>
                <h3 className="text-xl font-medium mb-3 tracking-wide">
                  {card.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                  {card.description}
                </p>
              </div>

              {/* Action Button */}
              <button className="flex items-center gap-2 text-sm bg-neutral-800 hover:bg-neutral-700 text-neutral-200 w-fit px-4 py-2.5 rounded-lg transition-colors group">
                Learn more
                <ArrowUpRight size={16} className="text-neutral-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}