import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Building2,
  BookOpen,
  Image as ImageIcon,
  Settings,
  LogOut,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  Square,
} from "lucide-react";
import door from '../assets/ChatGPT Image Sep 3, 2025, 09_33_13 AM 1.png'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ---------- Data ---------- */

const stats = [
  { label: "Total properties", value: 160, change: "8%", up: true },
  { label: "Available units", value: 120, change: "5%", up: false },
  { label: "Upcoming tours", value: 45, change: "12%", up: true },
  { label: "New request", value: 21, change: "20%", up: true },
];

const tourRequestByMonth = [
  { month: "Jan", value: 10 },
  { month: "Feb", value: 30 },
  { month: "Mar", value: 24 },
  { month: "Apr", value: 32 },
  { month: "May", value: 38 },
  { month: "Jun", value: 30 },
  { month: "Jul", value: 30 },
  { month: "Aug", value: 42 },
  { month: "Sep", value: 55 },
];

const clusters = [
  { name: "Liora estate", units: 34, percent: 28.3, color: "#e4c98a" },
  { name: "Nava heights", units: 26, percent: 21.7, color: "#d4ae5f" },
  { name: "Aruna residence", units: 22, percent: 18.3, color: "#b3873a" },
  { name: "Velora park", units: 20, percent: 16.7, color: "#8a662a" },
  { name: "Seraya grove", units: 18, percent: 15.0, color: "#5c4419" },
];

const tourRequestByCluster = [
  { name: "Liora..", value: 42 },
  { name: "Nava..", value: 36 },
  { name: "Arun..", value: 28 },
  { name: "Velor..", value: 22 },
  { name: "Sera..", value: 18 },
];

const latestRequests = [
  {
    initials: "HR",
    name: "Alex Johnson",
    location: "Liora estate • Unit A-18",
    email: "alexjohn@gmail.com",
    phone: "+1 202 555 0147",
    dateTour: "Mon, June 12, 2025",
    timeTour: "08:00 am - 10:00 am",
  },
  {
    initials: "MA",
    name: "Miya Agustine",
    location: "Aruna residence • Unit B-11",
    email: "miyaagustine@gmail.com",
    phone: "+1 202 555 0146",
    dateTour: "Mon, June 13, 2025",
    timeTour: "09:00 am - 11:00 am",
  },
];

const inquiries = { total: 240, accepted: 180, pending: 45, escalated: 15 };

const navItems = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", active: true },
  { icon: <FileText size={18} />, label: "Request lists" },
];

const propertySubItems = [
  "Liora estate",
  "Nava heights",
  "Aruna residence",
  "Velora park",
  "Seraya grove",
];

const otherNavItems = [
  { icon: <BookOpen size={18} />, label: "Blogs" },
  { icon: <ImageIcon size={18} />, label: "Gallery", link: "/DashboardPopup" },
];

/* ---------- Small building blocks ---------- */

function Logo() {
  return (
    <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
      <Square size={20} strokeWidth={2} />
      Serenia
    </div>
  );
}

function StatCard({
  label,
  value,
  change,
  up,
}: {
  label: string;
  value: number;
  change: string;
  up: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 sm:p-5">
      <p className="mb-3 text-sm text-slate-500">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          {value}
        </span>
      </div>
      <p
        className={`mt-2 text-xs font-medium ${
          up ? "text-green-600" : "text-red-500"
        }`}
      >
        {up ? "▲" : "▼"} {change} From last month
      </p>
    </div>
  );
}

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number | string }>;
  label?: string | number;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md bg-slate-900 px-3 py-2 text-xs text-white shadow-lg">
        <p className="mb-0.5 font-medium">{label}</p>
        <p>{payload[0]?.value ?? 0} Tour request</p>
      </div>
    );
  }
  return null;
}

/* ---------- Sidebar ---------- */

function Sidebar({
  open,
  onClose,
  onLogoutClick,
}: {
  open: boolean;
  onClose: () => void;
  onLogoutClick: () => void;
}) {
  const [propertiesExpanded, setPropertiesExpanded] = useState(true);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white p-5 transition-transform md:static md:z-auto md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <button onClick={onClose} className="text-slate-400 md:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="relative mb-6">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-10 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400">
            ⌘F
          </kbd>
        </div>

        <p className="mb-2 text-xs font-semibold tracking-wide text-slate-400">
          MAIN MENU
        </p>
        <nav className="mb-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          <button
            onClick={() => setPropertiesExpanded((v) => !v)}
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            <span className="flex items-center gap-3">
              <Building2 size={18} />
              Properties
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform ${
                propertiesExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
          {propertiesExpanded && (
            <div className="ml-9 flex flex-col gap-1">
              {propertySubItems.map((item) => (
                <button
                  key={item}
                  className="rounded-lg px-3 py-2 text-left text-sm text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </nav>

        <p className="mb-2 text-xs font-semibold tracking-wide text-slate-400">
          OTHERS
        </p>
        <nav className="mb-auto flex flex-col gap-1">
          {otherNavItems.map((item) => {
            const content = (
              <>
                {item.icon}
                {item.label}
              </>
            );

            if (item.link) {
              return (
                <Link
                  key={item.label}
                  to={item.link}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                {content}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 flex flex-col gap-1 border-t border-slate-100 pt-4">
          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
            <Settings size={18} />
            Settings
          </button>
          <button
            onClick={onLogoutClick}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------- Profile dropdown ---------- */

function ProfileMenu({ onLogoutClick }: { onLogoutClick: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2"
      >
        <img
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&q=80"
          alt="Harrison Wells"
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="hidden text-sm font-medium text-slate-700 sm:inline">
          Harrison
        </span>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-3 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">
              Profile
            </span>
            <button onClick={() => setOpen(false)}>
              <X size={16} className="text-slate-400" />
            </button>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&q=80"
              alt="Harrison Wells"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Harrison Wells
              </p>
              <p className="text-xs text-slate-500">
                harrisonwells@gmail.com
              </p>
            </div>
            <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              Admin
            </span>
          </div>
          <div className="flex flex-col gap-1 border-t border-slate-100 pt-3">
            <button className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <Settings size={16} />
              Settings
            </button>
            <button className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <MessageSquare size={16} />
              Help center
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onLogoutClick();
              }}
              className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-red-500 hover:bg-red-50"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Logout confirm modal ---------- */

function LogoutModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mb-4 flex justify-end">
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>
        <img src={door} alt="door"  className="mx-auto"/>
        {/* <DoorOpen size={56} className="mx-auto mb-4 text-orange-600" strokeWidth={1.5} /> */}
        <h3 className="mb-2 text-lg font-semibold text-slate-900">
          Sure want to log out?
        </h3>
        <p className="mb-6 text-sm text-slate-500">
          Are you sure you want to log out of this account?
        </p>
         <Link to="/AuthFlow" > <button
          onClick={onConfirm}
          className="mb-3 w-full rounded-lg bg-orange-600 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-700"
        >
          Yes, log out
        </button> </Link>
        <button
          onClick={onCancel}
          className="w-full text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          No, keep here
        </button>
      </div>
    </div>
  );
}

/* ---------- Main dashboard ---------- */

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const availableUnitsTotal = useMemo(
    () => clusters.reduce((sum, c) => sum + c.units, 0),
    []
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogoutClick={() => setLogoutModalOpen(true)}
      />

      <div className="flex-1">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-600 md:hidden"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden text-slate-500 hover:text-slate-800 sm:block">
              <MessageSquare size={19} />
            </button>
            <button className="hidden text-slate-500 hover:text-slate-800 sm:block">
              <Bell size={19} />
            </button>
            <ProfileMenu onLogoutClick={() => setLogoutModalOpen(true)} />
          </div>
        </header>

        <main className="px-4 py-6 sm:px-8">
          {/* Stat cards */}
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Tour request chart + cluster breakdown */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-4 sm:p-6 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">
                  Tour request
                </h2>
                <div className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600">
                  This year
                  <ChevronDown size={12} />
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={tourRequestByMonth}>
                    <defs>
                      <linearGradient id="tourFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c9b98a" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#c9b98a" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8a7443"
                      strokeWidth={2}
                      fill="url(#tourFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">
                Available units per cluster
              </h2>
              <div className="mb-1 flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-slate-900">
                  {availableUnitsTotal}
                </span>
                <span className="text-sm text-slate-400">/160</span>
              </div>
              <p className="mb-4 text-xs text-slate-400">
                Total units of all clusters
              </p>

              <div className="mb-5 flex h-2.5 w-full overflow-hidden rounded-full">
                {clusters.map((c) => (
                  <div
                    key={c.name}
                    style={{
                      width: `${(c.units / availableUnitsTotal) * 100}%`,
                      backgroundColor: c.color,
                    }}
                  />
                ))}
              </div>

              <ul className="flex flex-col gap-3">
                {clusters.map((c) => (
                  <li
                    key={c.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2 text-slate-600">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      {c.name}
                    </span>
                    <span className="font-medium text-slate-900">
                      {c.units} · {c.percent}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Latest request + tour request bar chart + customer inquiries */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-4 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">
                Latest request
              </h2>
              <div className="flex flex-col gap-6">
                {latestRequests.map((r) => (
                  <div
                    key={r.name}
                    className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-800">
                          {r.initials}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {r.name}
                          </p>
                          <p className="text-xs text-slate-500">{r.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Phone size={15} />
                        <Mail size={15} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div>
                        <p className="mb-0.5 text-slate-400">Email address</p>
                        <p className="text-slate-700">{r.email}</p>
                      </div>
                      <div>
                        <p className="mb-0.5 text-slate-400">Phone number</p>
                        <p className="text-slate-700">{r.phone}</p>
                      </div>
                      <div>
                        <p className="mb-0.5 text-slate-400">Date tour</p>
                        <p className="text-slate-700">{r.dateTour}</p>
                      </div>
                      <div>
                        <p className="mb-0.5 text-slate-400">Time tour</p>
                        <p className="text-slate-700">{r.timeTour}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">
                Tour request
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tourRequestByCluster}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(0,0,0,0.03)" }}
                      content={({ active, payload, label }) =>
                        active && payload && payload.length ? (
                          <div className="rounded-md bg-slate-900 px-3 py-2 text-xs text-white shadow-lg">
                            <p className="mb-0.5 font-medium">{label}</p>
                            <p>{payload[0].value} Tour request</p>
                          </div>
                        ) : null
                      }
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#8a7443" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">
                Customer inquiries
              </h2>
              <div className="relative mx-auto h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Accepted", value: inquiries.accepted },
                        { name: "Pending", value: inquiries.pending },
                        { name: "Escalated", value: inquiries.escalated },
                      ]}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      <Cell fill="#5c4419" />
                      <Cell fill="#c9b98a" />
                      <Cell fill="#e5e5e5" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-slate-400">Total of</span>
                  <span className="text-xl font-semibold text-slate-900">
                    {inquiries.total} inquiries
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-slate-400">Accepted</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {inquiries.accepted}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Pending</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {inquiries.pending}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Escalated</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {inquiries.escalated}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {logoutModalOpen && (
        <LogoutModal
          onCancel={() => setLogoutModalOpen(false)}
          onConfirm={() => {
            setLogoutModalOpen(false);
            console.log("Logged out");
            // Hook this up to your actual logout/auth logic
          }}
        />
      )}
    </div>
  );
}