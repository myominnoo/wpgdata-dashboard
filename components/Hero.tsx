import { ArrowUpRight, BarChart3 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 md:pt-28 md:pb-36 text-center mx-auto w-full max-w-7xl">
      <div className="mb-8 inline-flex items-center gap-2 border border-yellow-400 bg-gray-200 text-yellow-900 px-4 py-1.5 rounded-full text-xs tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Usage Analytics Platform
      </div>

      {/* main heading */}
      <h1 className="max-w-4xl text-yellow-900 leading-[1.08] mb-6 font-syne text-[clamp(2.6rem,6vw,5rem)] font-bold tracking-tight">
        Winnipeg&rsquo;s Open Data,{" "}
        <span
          style={{
            WebkitTextStroke: "1.5px #FFBE32",
            color: "transparent",
          }}
        >
          Illuminated!
        </span>
      </h1>

      {/* description */}
      <p className="max-w-2xl text-yellow-500 leading-relaxed mb-4 font-mono font-light">
        The City of Winnipeg publishes hundreds of datasets through its Open
        Data Catalogue — everything from transit schedules to property
        assessments. This platform tracks how those datasets are discovered,
        accessed, and used over time, turning raw catalogue metadata into clear,
        interactive insights.
      </p>

      <p className="max-w-xl text-yellow-900 text-sm leading-relaxed mb-12 font-mono">
        Built by{" "}
        <a
          href="https://myominnoo.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-900 hover:text-yellow-600 transition-colors inline-flex items-center gap-1 underline underline-offset-4 decoration-yellow-500"
        >
          Myo Minn Oo
          <ArrowUpRight className="w-3 h-3" />
        </a>{" "}
        <br />
        using Next.js, TypeScript, and Vercel.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button>
          <Link href="/dashboard" className="">
            Stats Dashboard
            <ArrowUpRight />
          </Link>
        </Button>

        <Button>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
