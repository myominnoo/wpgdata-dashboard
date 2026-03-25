import Hero from "@/components/Hero";
import { Database, MapPin } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      {/* Geometric grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.09) 0%, transparent 70%)",
        }}
      />

      {/* ── Decorative corner accent ── */}
      <div className="pointer-events-none absolute top-0 right-0 w-85 h-85 opacity-30">
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
      <nav className="relative flex items-center justify-between py-6 mx-auto w-full max-w-7xl">
        {/* Left side */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-yellow-300 border border-yellow-900">
            <Database className="w-4 h-4 text-yellow-900" />
          </div>
          <span className="tracking-wider text-sm font-mono font-bold uppercase text-yellow-900">
            WPG Open Data Catalogue
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5 text-yellow-500 text-sm tracking-widest uppercase font-mono">
          <MapPin className="w-6 h-6" />
          <span>Winnipeg, MB</span>
        </div>
      </nav>

      {/* Hero section */}
      <Hero />
    </main>
  );
}
