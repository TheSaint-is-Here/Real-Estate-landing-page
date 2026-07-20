import HousePreferenceForm from "./HousePreferenceForm";
import { Carosel } from "./Carosel";
export default function Hero() {
  return (
    <div>
      <div>
        <div className="min-h-screen bg-slate-50 mb-20">
          {/* This wrapper puts them side by side: text left, form right */}
          <div className="max-w-7xl mx-auto px-10  sm:grid sm:grid-cols-2 gap-20 items-center sm:mb-20 flex flex-col mb-[350px] ">

            {/* LEFT COLUMN: Text */}
            <div className=" sm:-mt-150">
              <p className="bg-amber-300  sm:mr-20 w-fit px-4 py-1 rounded-full sm:mb-6  mb-2 text-sm font-medium">
                🪶 Winner of the IPA 2025
              </p>

              <h1 className="text-6xl sm:font-semibold leading-tight text-slate-900">
                Timeless living
                <br />
                modern touch.
              </h1>
              <p className="text-base mt-6 -mb-10 text-slate-600 max-w-md">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. A architecto minus
                corrupti. Voluptatem, excepturi fuga.
              </p>
            </div>

            {/* RIGHT COLUMN: Form */}
            <div className="bg-gray-400 w-full" >
              <HousePreferenceForm />
            </div>

          </div>
          <Carosel />
        </div>
      </div>
    </div>
  );
}