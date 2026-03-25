import Hero from "@/components/Hero";
import { Database, MapPin } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="relative overflow-x-hidden mx-auto w-full max-w-7xl">
      {/* Geometric grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow — capped to 100vw */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -z-10 w-full max-w-225"
        style={{
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Decorative corner accent — hidden on mobile */}
      <div className="pointer-events-none absolute top-0 right-0 w-85 h-85 opacity-30 hidden sm:block">
        <svg
          viewBox="0 0 340 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="340"
            y1="0"
            x2="0"
            y2="340"
            stroke="#000000"
            strokeWidth="0.5"
          />
          <line
            x1="340"
            y1="40"
            x2="40"
            y2="340"
            stroke="#000000"
            strokeWidth="0.5"
          />
          <line
            x1="340"
            y1="80"
            x2="80"
            y2="340"
            stroke="#000000"
            strokeWidth="0.5"
          />
          <line
            x1="340"
            y1="120"
            x2="120"
            y2="340"
            stroke="#000000"
            strokeWidth="0.5"
          />
          <line
            x1="340"
            y1="160"
            x2="160"
            y2="340"
            stroke="#000000"
            strokeWidth="0.5"
          />
          <line
            x1="340"
            y1="200"
            x2="200"
            y2="340"
            stroke="#000000"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Nav bar */}
      <nav className="relative flex flex-col md:flex-row gap-5 items-center justify-between py-6 px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-yellow-300 border border-yellow-900">
            <Database className="w-4 h-4 text-yellow-900" />
          </div>
          <span className="tracking-wider text-sm font-mono font-bold uppercase text-yellow-900">
            WPG Open Data Catalogue
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-yellow-500 text-sm tracking-widest uppercase font-mono">
          <MapPin className="w-6 h-6" />
          <span>Winnipeg, MB</span>
        </div>
      </nav>

      <Hero />

      {/* Stats strip */}
      <div className="relative z-10 py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 max-w-2xl mx-auto">
          {[
            { value: "300+", label: "Open Datasets" },
            { value: "Free", label: "Public Access" },
            { value: "Live", label: "Usage Tracking" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-1 py-6 px-4 rounded-xl border border-yellow-900/30 bg-white/60 backdrop-blur-sm shadow-sm"
            >
              <span className="text-3xl font-extrabold font-mono text-yellow-600">
                {value}
              </span>
              <span className="text-xs uppercase tracking-widest font-mono text-yellow-900/70">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
