
import React from 'react';

const Invitation: React.FC = () => {
  return (
    <section className="section-full bg-white relative overflow-hidden flex items-center justify-center py-40 md:py-60">
      <div className="absolute inset-0 bg-blueprint opacity-[0.3]" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-transparent to-white" />

      <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
        <span className="type-label text-[#F58220] opacity-40 mb-12 block">Inquiry // Project Brief</span>

        <h2 className="text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold text-[#1c1c1b] tracking-tighter mb-20 leading-[0.85]">
          Let’s design <br /><span className="italic font-extralight text-[#F58220]">your next stall.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-24 border-y border-black/5 py-12 px-6">
          <div className="flex flex-col gap-3">
            <span className="type-label text-[#F58220]/60">Headquarters</span>
            <p className="text-black/80 font-light text-lg tracking-tight">Riyadh // Jeddah // Dubai</p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="type-label text-[#F58220]/60">Direct Email</span>
            <a href="mailto:info@nexhibitarabia.com" className="text-black/80 font-light text-lg hover:text-[#F58220] transition-colors tracking-tight">info@nexhibitarabia.com</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="type-label text-[#F58220]/60">Technical Line</span>
            <p className="text-black/80 font-light text-lg tracking-tight">+966 57 097 8057</p>
          </div>
        </div>

        <button className="group relative px-16 py-6 rounded-full bg-[#1c1c1b] text-white type-label text-[10px] tracking-[0.4em] uppercase transition-all duration-500 hover:pr-24 hover:-translate-y-2 shadow-2xl overflow-hidden">
          <span className="relative z-10">Initiate Design Brief</span>

          {/* Sliding Arrow Icon */}
          <div className="absolute right-10 opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#F58220] stroke-[2.5]" >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
        </button>
      </div>
    </section>
  );
};

export default Invitation;
