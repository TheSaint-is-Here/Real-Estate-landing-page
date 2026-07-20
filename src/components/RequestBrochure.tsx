import { useState } from "react";
import {
  X,
  ChevronDown,
  BookOpen,
  LayoutGrid,
  FileText,
  Mail,
  MessageCircle,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BrochureRequestModal({
  open,
  onClose,
}: Props) {
  const [brochureType, setBrochureType] = useState("Full brochure");
  const [sendVia, setSendVia] = useState("Email");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-md bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl font-medium">Brochure request</h2>

          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-black" size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          {/* Name */}
          <div>
            <label className="mb-2 block font-medium">
              Full name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#646846]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">
              Email address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#646846]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block font-medium">
              Phone number
            </label>

            <div className="flex">
              <button className="flex w-24 items-center justify-center gap-2 border border-r-0 border-gray-300">
                🇺🇸 +1
                <ChevronDown size={16} />
              </button>

              <input
                placeholder="Enter your number"
                className="flex-1 border border-gray-300 px-4 py-3 outline-none focus:border-[#646846]"
              />
            </div>
          </div>

          {/* Cluster */}
          <div>
            <label className="mb-2 block font-medium">
              Cluster
            </label>

            <div className="flex items-center justify-between border border-gray-300 px-4 py-3 cursor-pointer">
              <span className="text-gray-500">
                Select cluster
              </span>

              <ChevronDown size={18} />
            </div>
          </div>

          {/* Brochure Type */}
          <div>
            <label className="mb-3 block font-medium">
              Brochure type
            </label>

            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Full brochure",
                  icon: <BookOpen size={22} />,
                },
                {
                  label: "Floorplan Only",
                  icon: <LayoutGrid size={22} />,
                },
                {
                  label: "Pricing Sheet",
                  icon: <FileText size={22} />,
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    setBrochureType(item.label)
                  }
                  className={`flex flex-col items-center justify-center gap-4 border py-6 transition ${
                    brochureType === item.label
                      ? "border-[#646846] bg-[#F7F8EF]"
                      : "border-gray-300 hover:border-[#646846]"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Send Via */}
          <div>
            <label className="mb-3 block font-medium">
              Send via
            </label>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Email",
                  icon: <Mail size={22} />,
                },
                {
                  label: "Whatsapp",
                  icon: <MessageCircle size={22} />,
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    setSendVia(item.label)
                  }
                  className={`flex flex-col items-center justify-center gap-4 border py-6 transition ${
                    sendVia === item.label
                      ? "border-[#646846] bg-[#F7F8EF]"
                      : "border-gray-300 hover:border-[#646846]"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <button
            className="w-full bg-[#646846] py-4 text-lg text-white transition hover:bg-[#52553a]"
          >
            Submit request
          </button>
        </div>
      </div>
    </div>
  );
}