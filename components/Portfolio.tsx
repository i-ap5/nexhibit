
import React, { useState } from 'react';

const projects = [
  { 
    id: '01', 
    name: 'STC Connectivity Stall', 
    venue: 'LEAP 24 // Riyadh', 
    type: 'Bespoke Exhibition Stall',
    img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600' 
  },
  { 
    id: '02', 
    name: 'AROYA Cruise Pavilion', 
    venue: 'Maritime Vision // Jeddah', 
    type: 'Luxury Brand Pavilion',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1600' 
  },
  { 
    id: '03', 
    name: 'NEOM Tech Hub', 
    venue: 'Vision 2030 // Tabuk', 
    type: 'Technical Immersive Stand',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600' 
  }
];

const Portfolio: React.FC = () => {
  const [index, setIndex] = useState(0);

  return (
    <section className="relative h-screen bg-black overflow-hidden flex items-center group">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <img 
          src={projects[index].img} 
          className="w-full h-full object-cover grayscale opacity-30 transition-all duration-[2s] ease-in-out scale-110 group-hover:scale-100"
          alt={projects[index].name}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black z-20" />
      </div>

      <div className="container mx-auto px-6 lg:px-24 z-30 h-full flex flex-col justify-center">
        <div className="max-w-4xl text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
            <span className="type-label text-[#F58220]">Signature Builds</span>
            <div className="h-[1px] w-16 bg-[#F58220]/60 hidden lg:block" />
          </div>

          <h2 className="text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold text-white tracking-tighter leading-[0.85] mb-12 transition-all duration-1000">
            {projects[index].name}
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <div className="flex flex-col items-center lg:items-start">
              <span className="type-label text-white/30 mb-2">Venue</span>
              <span className="text-white/80 font-semibold text-lg tracking-tight">{projects[index].venue}</span>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <span className="type-label text-white/30 mb-2">Stall Category</span>
              <span className="text-[#F58220] font-black text-xs uppercase tracking-[0.2em] bg-white/5 px-4 py-1 border border-white/5">
                {projects[index].type}
              </span>
            </div>
            
            <div className="flex gap-3 pt-8 lg:pt-0">
              {projects.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setIndex(i)}
                  className={`h-1.5 transition-all duration-500 rounded-none ${i === index ? 'w-24 bg-[#F58220]' : 'w-8 bg-white/10'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-12 bottom-12 hidden lg:flex items-center gap-6 opacity-30 hover:opacity-100 transition-opacity cursor-pointer group/link">
        <div className="text-right">
          <span className="type-label text-[10px] block mb-1">View Project Details</span>
          <span className="text-[8px] font-bold text-white/30 uppercase tracking-[0.3em]">Technical Case Study</span>
        </div>
        <div className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center group-hover/link:border-[#F58220] transition-all">
          <div className="w-2 h-2 bg-white group-hover/link:bg-[#F58220] transition-colors" />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
