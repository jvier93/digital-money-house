import React from "react";

const HeroSection = () => {
  return (
    <section role="region" aria-label="hero" className="">
      <div className="w-1/2 space-y-4 px-4 pt-10 pb-28 md:w-2/3 md:px-10 md:pt-20 xl:w-1/3 xl:px-20">
        <p className="text-2xl text-white md:text-4xl xl:text-7xl">
          De ahora en adelante, haces mas con tu dinero
        </p>
        <h1 className="text-accent before:bg-accent relative py-4 text-xl before:absolute before:top-0 before:left-0 before:h-1 before:w-[20%] before:content-[''] md:py-0 md:text-3xl md:before:h-0 md:before:w-0 md:before:bg-transparent md:before:content-[''] xl:text-6xl">
          Tu nueva{" "}
          <span className="block font-semibold md:inline">
            billetera virtual
          </span>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
