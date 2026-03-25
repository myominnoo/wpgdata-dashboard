import React from "react";

const Hero = () => {
  return (
    <section className="relative z-10 flex flex-col">
      <div>Usage Analytics Platform</div>
      <h1>
        Winnipeg&rsquo;s Open Data,
        <span>Illuminated.</span>
      </h1>

      {/* description */}
      <p>
        The City of Winnipeg publishes hundreds of datasets through its Open
        Data Catalogue — everything from transit schedules to property
        assessments. This platform tracks how those datasets are discovered,
        accessed, and used over time, turning raw catalogue metadata into clear,
        interactive insights.
      </p>

      <p>
        Built by <a href="https://myominnoo.github.io">Myo Minn Oo</a> using
        Next.js, TypeScript, and Vercel.
      </p>
    </section>
  );
};

export default Hero;
