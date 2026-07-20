import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import houseImg from "../assets/Mainimage.png";
import messi from "../assets/messi.jpg";
import ronaldo from"../assets/ronaldo.jpeg";

export function Carosel() {
  // 1. loop: true so it doesn't get stuck. autoplay stops on interaction
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  // 2. useCallback so buttons don't crash before emblaApi exists
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative w-screen max-h-[300px]    -mt-[600px]">
      {/* 3. overflow-hidden is MANDATORY for Embla */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* 4. container must be flex */}
        <div className="flex touch-pan-y">
          {/* 5. each slide must be flex-[0_0_100%] = don't grow, don't shrink, 100% width */}
          <div className="flex-[0_0_100%] min-w-0">
            <img
              src={houseImg}
              alt="Modern house"
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </div>
          <div className="flex-[0_0_100%] min-w-0 bg-slate-200 h-[500px] rounded-2xl flex items-center justify-center text-2xl font-bold">
            <img src={messi} alt="fpokgmtjpoi"
             className="w-full h-full object-cover rounded-2xl" />
          </div>
          <div className="flex-[0_0_100%] min-w-0 bg-slate-300 h-[500px] rounded-2xl flex items-center justify-center text-2xl font-bold">
            <img src={ronaldo} alt="fpokgmtjpoi"
             className="w-full h-full object-cover rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md"
        onClick={scrollPrev}
        type="button"
      >
        ←
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md"
        onClick={scrollNext}
        type="button"
      >
        →
      </button>
    </div>
  )
}