import image1 from '../assets/Image (24).png'
import image2 from '../assets/Image (25).png'
import image3 from '../assets/Image (26).png'
import image4 from '../assets/Image (27).png'
import image5 from '../assets/Image (28).png'
import image6 from '../assets/Image (29).png'
import image7 from '../assets/Image (30).png'
import image8 from '../assets/Image (31).png'
import image9 from '../assets/Image (32).png'
import image10 from '../assets/Image (33).png'

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  aspect: "square" | "tall" | "short" | "wide";
  showOnMobile?: boolean; // new flag
};

const galleryImages: GalleryImage[] = [
  { id: "tennis-court", src: image1, alt: "Tennis court surface", aspect: "short", showOnMobile: true },
  { id: "gym", src: image2, alt: "Indoor fitness gym with treadmills", aspect: "tall", showOnMobile: true },
  { id: "basketball", src: image3, alt: "Basketball hoop by the water", aspect: "short", showOnMobile: true },
  { id: "street-trees", src: image4, alt: "Tree-lined street", aspect: "short", showOnMobile: true },
  { id: "clubhouse-entrance", src: image5, alt: "Clubhouse entrance", aspect: "tall" },
  { id: "sky", src:image6, alt: "Open sky", aspect: "short" },
  { id: "jogging-track", src: image7, alt: "Resident jogging on a paved track", aspect: "tall" },
  { id: "volleyball-net", src: image8, alt: "Volleyball net", aspect: "short" },
  { id: "pool-loungers", src:image9, alt: "Pool with loungers", aspect: "short" },
  { id: "park-lake", src: image10, alt: "Landscaped park with lake", aspect: "tall" },
];

const aspectClass: Record<GalleryImage["aspect"], string> = {
  square: "h-48 sm:h-56",
  tall: "h-72 sm:h-96",
  short: "h-40 sm:h-48",
  wide: "h-40 sm:h-52",
};

export default function FacilitiesGallery() {
  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-16">
      {/* Heading */}
      <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
        <h2 className="mb-4 text-3xl font-medium tracking-tight text-slate-900 sm:text-5xl">
          Facilities designed
          <br />
          around your needs
        </h2>
        <p className="text-sm text-slate-500 sm:text-base">
          Discover thoughtfully planned amenities and modern facilities
          designed to support a vibrant, comfortable, and connected lifestyle
          within Serenia.
        </p>
      </div>

      {/* Masonry-style gallery */}
      <div className="mx-auto sm:mb-0 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-5 overflow-hidden">
        {galleryImages.map((img) => (
          <div 
            key={img.id} 
            className={`break-inside-avoid sm:mb-4 overflow-hidden mb-3 ${!img.showOnMobile ? 'hidden sm:block' : ''}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className={`w-full rounded-lg object-cover ${aspectClass[img.aspect]}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}