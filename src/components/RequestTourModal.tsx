import React, { useMemo, useState } from "react";
import { CalendarDays, Clock, X, ChevronDown } from "lucide-react";

/**
 * Serenia — Request Tour Modal
 * Stack: React + TypeScript + Tailwind + daisyUI + lucide-react
 *
 * Usage:
 *   const [open, setOpen] = useState(false);
 *   <button onClick={() => setOpen(true)}>Request tour</button>
 *   <RequestTourModal open={open} onClose={() => setOpen(false)} />
 *
 * Pure client-side state — opens as an overlay on the current page,
 * no route change or new page load.
 */

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const timeSlots = [
  "08:00 am - 10:00 am",
  "09:00 am - 11:00 am",
  "10:00 am - 12:00 pm",
  "01:00 pm - 03:00 pm",
  "03:00 pm - 05:00 pm",
];

const clusters = ["Liora estate", "Nava heights", "Aruna residence", "Velora park", "Seraya grove"];
const propertyTypes = ["Type A", "Type B", "Type C"];
const units = ["A-18", "B-20", "C-11", "D-05"];

type CalendarDay = {
  date: number;
  inCurrentMonth: boolean;
  key: string;
};

function buildCalendar(year: number, month: number): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days: CalendarDay[] = [];

  // Leading days from previous month
  for (let i = startWeekday - 1; i >= 0; i--) {
    days.push({
      date: daysInPrevMonth - i,
      inCurrentMonth: false,
      key: `prev-${daysInPrevMonth - i}`,
    });
  }

  // Days in current month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: d, inCurrentMonth: true, key: `cur-${d}` });
  }

  // Trailing days from next month to fill full weeks
  let nextDay = 1;
  while (days.length % 7 !== 0) {
    days.push({ date: nextDay, inCurrentMonth: false, key: `next-${nextDay}` });
    nextDay++;
  }

  return days;
}

export default function RequestTourModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const today = useMemo(() => new Date(), []);
  const [viewYear] = useState(today.getFullYear());
  const [viewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<number>(today.getDate());
  const [selectedTime, setSelectedTime] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [cluster, setCluster] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [unit, setUnit] = useState("");
  const [note, setNote] = useState("");

  const days = useMemo(() => buildCalendar(viewYear, viewMonth), [viewYear, viewMonth]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire this up to your API call — data is already collected in state above.
    console.log({
      selectedDate,
      selectedTime,
      fullName,
      email,
      phone: `${countryCode}${phone}`,
      cluster,
      propertyType,
      unit,
      note,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Request tour</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-x-10 gap-y-6">
          {/* Left column: calendar + time */}
          <div>
            <div className="flex items-center gap-2 font-medium text-sm mb-4">
              <CalendarDays className="w-4 h-4" />
              Select date
            </div>

            <div className="grid grid-cols-7 text-center text-xs text-base-content/50 mb-2">
              {WEEKDAYS.map((w) => (
                <div key={w}>{w}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
              {days.map((day) => {
                const isSelected = day.inCurrentMonth && day.date === selectedDate;
                return (
                  <button
                    type="button"
                    key={day.key}
                    disabled={!day.inCurrentMonth}
                    onClick={() => setSelectedDate(day.date)}
                    className={`w-9 h-9 mx-auto rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-neutral text-neutral-content font-medium"
                        : day.inCurrentMonth
                        ? "hover:bg-base-200 text-base-content"
                        : "text-base-content/25 cursor-default"
                    }`}
                  >
                    {String(day.date).padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 font-medium text-sm mt-8 mb-4">
              <Clock className="w-4 h-4" />
              Select time
            </div>

            <label className="text-sm text-base-content/70 mb-1.5 block">Preferred time</label>
            <div className="relative">
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="select select-bordered w-full font-normal appearance-none"
              >
                <option value="" disabled>
                  Select time
                </option>
                {timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/40" />
            </div>
          </div>

          {/* Right column: form fields */}
          <div className="space-y-5">
            <div>
              <label className="text-sm mb-1.5 block">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                className="input input-bordered w-full font-normal"
              />
            </div>

            <div>
              <label className="text-sm mb-1.5 block">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered w-full font-normal"
              />
            </div>

            <div>
              <label className="text-sm mb-1.5 block">Phone number</label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="select select-bordered w-24 font-normal"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+234">🇳🇬 +234</option>
                  <option value="+91">🇮🇳 +91</option>
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your number"
                  className="input input-bordered w-full font-normal"
                />
              </div>
            </div>

            <div>
              <label className="text-sm mb-1.5 block">Cluster</label>
              <div className="relative">
                <select
                  value={cluster}
                  onChange={(e) => setCluster(e.target.value)}
                  className="select select-bordered w-full font-normal appearance-none"
                >
                  <option value="" disabled>
                    Select cluster
                  </option>
                  {clusters.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/40" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1.5 block">Property type</label>
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="select select-bordered w-full font-normal appearance-none"
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/40" />
                </div>
              </div>

              <div>
                <label className="text-sm mb-1.5 block">Unit</label>
                <div className="relative">
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="select select-bordered w-full font-normal appearance-none"
                  >
                    <option value="" disabled>
                      Select unit
                    </option>
                    {units.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/40" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm mb-1.5 block">Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter message"
                rows={4}
                className="textarea textarea-bordered w-full font-normal resize-none"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="btn btn-neutral">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}