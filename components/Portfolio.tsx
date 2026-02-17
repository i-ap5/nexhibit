import React from 'react';
import { portfolioData } from '../data/portfolio';

interface PortfolioProps {
  onViewAll?: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onViewAll }) => {
  const landingProjects = portfolioData.slice(0, 6);

  return (
    <section id="works" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-24">

        {/* Header Section with Integrated Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <span className="type-label text-[#F58220] block mb-3 uppercase tracking-widest font-black text-[8px]">Work</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1c1c1b] leading-[0.85]">
              Selected <br /> <span className="text-black/10">showcases.</span>
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="group flex items-center gap-6 px-10 py-4.5 bg-[#1c1c1b] text-white rounded-full transition-all duration-300 hover:bg-[#F58220] active:scale-95 mb-4"
          >
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Archive</span>
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2 transition-transform group-hover:translate-x-1" >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-16">
          {landingProjects.map((project, i) => (
            <div key={project.id} className="group cursor-pointer">
              {/* Image Container with Hover Text */}
              <div className="relative aspect-[16/10] md:aspect-[4/5] overflow-hidden bg-stone-50 border border-black/[0.03]">
                <img
                  src={project.image}
                  alt={project.heading}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Simple Powerful Hover Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-8 text-center">
                  <p className="text-white/90 text-sm font-light leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="w-8 h-[1px] bg-[#F58220] mx-auto" />
                </div>
              </div>

              {/* Text below */}
              <div className="mt-8 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#F58220] text-[9px] font-black tracking-widest uppercase">0{i + 1}</span>
                  <span className="text-[8px] font-bold text-black/20 uppercase tracking-widest bg-black/[0.03] px-2 py-1 rounded">
                    {project.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#1c1c1b] tracking-tight group-hover:text-[#F58220] transition-colors">
                  {project.heading}
                </h3>
                <div className="flex flex-col gap-2 mt-1">
                  <p className="text-black/40 text-[10px] uppercase tracking-widest font-bold truncate">{project.expo}</p>
                  <div className="flex items-center gap-1.5 opacity-40">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5]">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[11px] font-medium leading-none">{project.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Bottom CTA for more friction-less navigation */}
        <div className="mt-24 flex justify-center">
          <button
            onClick={onViewAll}
            className="group flex flex-col items-center gap-4 transition-all duration-300"
          >
            <div className="relative w-16 h-16 rounded-full border border-black/10 flex items-center justify-center transition-all duration-500 group-hover:bg-[#F58220] group-hover:border-[#F58220]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#1c1c1b] stroke-[1.5] transition-all duration-500 group-hover:stroke-white -rotate-45 group-hover:rotate-0" >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Outer Pulse Effect */}
              <div className="absolute inset-0 rounded-full border border-[#F58220] scale-100 opacity-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700" />
            </div>

            <span className="type-label text-[10px] text-black/40 group-hover:text-black tracking-[0.2em]">
              View Full Portfolio
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
