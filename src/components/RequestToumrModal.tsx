import { useMemo, useState } from "react";
import { Calendar, Clock, ChevronDown, X } from "lucide-react";

type CalendarDay = {
  date: number;
  inCurrentMonth: boolean;
  key: string;
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildCalendarGrid(year: number, month: number): CalendarDay[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const startWeekday = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: CalendarDay[] = [];

  // Leading days from previous month
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({
      date: daysInPrevMonth - i,
      inCurrentMonth: false,
      key: `prev-${daysInPrevMonth - i}`,
    });
  }

  // Days in current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: d, inCurrentMonth: true, key: `cur-${d}` });
  }

  // Trailing days to complete the final week
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ date: nextDay, inCurrentMonth: false, key: `next-${nextDay}` });
    nextDay++;
  }

  return cells;
}

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const clusters = ["Liora estate", "Nava heights", "Aruna residence", "Velora park", "Seraya grove"];
const propertyTypes = ["Aruna Type-A", "Aruna Type-B", "Aruna Type-C"];
const units = ["Unit 101", "Unit 102", "Unit 201", "Unit 202"];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  cluster: string;
  propertyType: string;
  unit: string;
  note: string;
  preferredTime: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  cluster: "",
  propertyType: "",
  unit: "",
  note: "",
  preferredTime: "",
};

type RequestTourModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function RequestTourModal({ open, onClose }: RequestTourModalProps) {
  const today = useMemo(() => new Date(), []);
  const [step, setStep] = useState<"date" | "form">("date");
  const [selectedDate, setSelectedDate] = useState<number | null>(20);
  const [form, setForm] = useState<FormState>(initialForm);

  const grid = useMemo(
    () => buildCalendarGrid(today.getFullYear(), today.getMonth()),
    [today]
  );

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log({ selectedDate, ...form });
    onClose();
    // Hook this up to your booking/API logic
  };

  const progressPercent = step === "date" ? 0 : 100;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl rounded-2xl bg-white p-6 shadow-lg sm:p-8" onClick={(e)=>e.stopPropagation()}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Request tour</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 transition-colors hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress bar — mobile only */}
        <div className="mb-8 md:hidden">
          <div className="h-1 w-full rounded-full bg-slate-200">
            <div
              className="h-1 rounded-full bg-slate-900 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs font-medium text-slate-600">
            <span>Select date &amp; time</span>
            <span>Fill the form</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Date & time panel */}
          <div className={`${step === "date" ? "block" : "hidden"} md:block`}>
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Calendar size={18} />
              Select date
            </div>

            <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-slate-500">
              {weekdays.map((day) => (
                <span key={day} className="py-2">
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
              {grid.map((cell) => {
                const isSelected =
                  cell.inCurrentMonth && cell.date === selectedDate;
                return (
                  <button
                    key={cell.key}
                    disabled={!cell.inCurrentMonth}
                    onClick={() => setSelectedDate(cell.date)}
                    className={`mx-auto flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                      !cell.inCurrentMonth
                        ? "text-slate-300"
                        : isSelected
                        ? "bg-[#3a3f2e] text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {String(cell.date).padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Clock size={18} />
              Select time
            </div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Preferred time
            </label>
            <div className="relative">
              <select
                value={form.preferredTime}
                onChange={(e) => updateField("preferredTime", e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="">Select time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>

            {/* Next button — mobile only */}
            <button
              onClick={() => setStep("form")}
              className="mt-8 w-full rounded-lg bg-[#3a3f2e] py-3 text-sm font-medium text-white transition-colors hover:bg-[#2e3224] md:hidden"
            >
              Next
            </button>
          </div>

          {/* Form panel */}
          <div className={`${step === "form" ? "block" : "hidden"} md:block`}>
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone number
                </label>
                <div className="flex gap-2">
                  <div className="relative">
                    <select className="h-full appearance-none rounded-lg border border-slate-300 bg-white py-3 pl-3 pr-8 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400">
                      <option>🇺🇸 +1</option>
                      <option>🇳🇬 +234</option>
                      <option>🇬🇧 +44</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                  </div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Enter your number"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Cluster
                </label>
                <div className="relative">
                  <select
                    value={form.cluster}
                    onChange={(e) => updateField("cluster", e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
                  >
                    <option value="">Select cluster</option>
                    {clusters.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Property type
                  </label>
                  <div className="relative">
                    <select
                      value={form.propertyType}
                      onChange={(e) => updateField("propertyType", e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-8 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="">Select type</option>
                      {propertyTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Unit
                  </label>
                  <div className="relative">
                    <select
                      value={form.unit}
                      onChange={(e) => updateField("unit", e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-8 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="">Select unit</option>
                      {units.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Note
                </label>
                <textarea
                  value={form.note}
                  onChange={(e) => updateField("note", e.target.value)}
                  placeholder="Enter message"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            </div>

            {/* Footer buttons */}
            <div className="mt-8 flex items-center justify-between gap-4 md:justify-end">
              <button
                onClick={() => setStep("date")}
                className="rounded-lg px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-lg bg-[#3a3f2e] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2e3224]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}