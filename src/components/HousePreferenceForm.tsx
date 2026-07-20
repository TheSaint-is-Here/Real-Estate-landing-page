import { useState } from "react";
import { Home, Search, ChevronDown } from "lucide-react";

type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-800">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </div>
  );
}

export default function HousePreferenceForm() {
  const [cluster, setCluster] = useState("Ardenia park");
  const [priceRange, setPriceRange] = useState("$85,000 - $120,000");
  const [bedroom, setBedroom] = useState("3");
  const [address, setAddress] = useState("");

  const clusters = ["Ardenia park", "Willow creek", "Maple ridge", "Cedar hollow"];
  const priceRanges = [
    "$85,000 - $120,000",
    "$120,000 - $180,000",
    "$180,000 - $250,000",
    "$250,000+",
  ];
  const bedrooms = ["1", "2", "3", "4", "5+"];

  const handleShowResult = () => {
    console.log({ cluster, priceRange, bedroom, address });
    // Hook this up to your search/filter logic
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center p-6">
      <div className="w-full max-w-3xl rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-slate-200 px-6 py-5">
          <Home size={20} className="text-slate-900" />
          <h1 className="text-lg font-semibold text-slate-900">
            Find your house preference
          </h1>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 gap-6 px-6 py-6 sm:grid-cols-3">
          <SelectField
            label="Cluster"
            value={cluster}
            options={clusters}
            onChange={setCluster}
          />
          <SelectField
            label="Price range"
            value={priceRange}
            options={priceRanges}
            onChange={setPriceRange}
          />
          <SelectField
            label="Bedroom"
            value={bedroom}
            options={bedrooms}
            onChange={setBedroom}
          />
        </div>

        {/* Address + Submit */}
        <div className="grid grid-cols-1 gap-6 px-6 pb-6 sm:grid-cols-3">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-sm font-semibold text-slate-800">Address</label>
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={handleShowResult}
              className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Show the result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
