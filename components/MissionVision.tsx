
import React from 'react';

const MissionVision: React.FC = () => {
  return (
    <section className="section-full bg-white border-y border-black/5 py-60">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          {/* Mission */}
          <div className="flex flex-col gap-12 group">
            <div className="flex items-center gap-6">
              <span className="text-[#F58220] font-black text-[12px] tracking-[1em] uppercase">The Mission</span>
              <div className="flex-1 h-[1px] bg-black/5 group-hover:bg-[#F58220]/20 transition-colors" />
            </div>
            <h3 className="text-4xl md:text-5xl font-extralight text-[#1c1c1b] leading-[1.1] tracking-tighter">
              Transforming <span className="font-black">Visionary Ideas</span> into Exceptional Realities.
            </h3>
            <p className="text-black/40 font-light text-xl leading-relaxed border-l border-black/10 pl-10 max-w-lg">
              We provide comprehensive design and production services that exceed expectations through precision, creativity, and excellence.
            </p>
          </div>

          {/* Vision */}
          <div className="flex flex-col gap-12 group">
            <div className="flex items-center gap-6">
              <span className="text-[#89973c] font-black text-[12px] tracking-[1em] uppercase">The Vision</span>
              <div className="flex-1 h-[1px] bg-black/5 group-hover:bg-[#89973c]/20 transition-colors" />
            </div>
            <h3 className="text-4xl md:text-5xl font-extralight text-[#1c1c1b] leading-[1.1] tracking-tighter">
              Leading the <span className="font-black">Global Standard</span> in Exhibition Excellence.
            </h3>
            <p className="text-black/40 font-light text-xl leading-relaxed border-l border-black/10 pl-10 max-w-lg">
              Our vision is to set the benchmark for extraordinary experiences that inspire and engage audiences across the world stage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
