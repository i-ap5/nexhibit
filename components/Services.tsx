
import React, { useEffect, useRef, useState } from 'react';

const capabilities = [
  { 
    title: "Stall Design & Strategy", 
    desc: "Merging brand architecture with exhibition floor logic to create award-winning bespoke stalls." 
  },
  { 
    title: "3D Digital Prototyping", 
    desc: "High-fidelity digital twins that allow you to walk through your pavilion before fabrication begins." 
  },
  { 
    title: "Custom Fabrication", 
    desc: "Masterful production of custom exhibition elements using high-grade, sustainable materials in our own facilities." 
  },
  { 
    title: "Deployment & Logistics", 
    desc: "Seamless white-glove transport and technical installation at major centers across Riyadh, Dubai, and beyond." 
  },
  { 
    title: "On-site Supervision", 
    desc: "Total on-floor project management. We handle every technical detail during the live show hours." 
  }
];

const CapabilityItem = ({ item, index, activeIndex }: { item: typeof capabilities[0], index: number, activeIndex: number }) => {
  const isActive = index === activeIndex;
  
  return (
    <div 
      className={`py-20 lg:py-32 border-b border-white/5 transition-all duration-1000 flex flex-col gap-6
        ${isActive ? 'opacity-100 translate-x-4' : 'opacity-10'}`}
    >
      <div className="flex items-center gap-6">
        <span className={`type-label text-[10px] font-black transition-colors duration-700 ${isActive ? 'text-[#F58220]' : 'text-white/20'}`}>
          0{index + 1}
        </span>
        <h3 className="text-3xl md:text-6xl font-extrabold tracking-tighter text-white leading-none">
          {item.title}
        </h3>
      </div>
      <p className={`text-lg md:text-xl font-light leading-relaxed max-w-xl pl-12 md:pl-20 transition-all duration-700 delay-100 ${isActive ? 'text-white/60' : 'text-transparent'}`}>
        {item.desc}
      </p>
      
      <div className={`mt-8 h-[1px] bg-[#F58220] transition-all duration-1000 ease-out ${isActive ? 'w-40' : 'w-0'}`} />
    </div>
  );
};

const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemsRef.current.map((item, index) => {
      if (!item) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveIndex(index);
            }
          });
        },
        {
          root: null,
          threshold: [0.1, 0.5, 0.9],
          rootMargin: "-20% 0px -20% 0px"
        }
      );
      
      observer.observe(item);
      return observer;
    });

    return () => {
      observers.forEach(o => o?.disconnect());
    };
  }, []);

  return (
    <section id="services" className="bg-[#030405] relative">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
          
          {/* Sticky Left Sidebar - Header stays still while user scrolls */}
          <div className="lg:col-span-5 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center py-20 lg:py-0 z-20">
             <div className="transition-all duration-700">
               <span className="type-label text-[#F58220] block mb-10">Technical Suite</span>
               <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-[0.85] mb-12">
                 Precision <br /> <span className="text-white/20">Stall Builds.</span>
               </h2>
               <p className="text-white/40 font-light text-lg lg:text-xl max-w-sm leading-relaxed">
                 We are specialists in high-end exhibition stalls. Every technical service is executed with the precision of architectural masters.
               </p>
               
               <div className="mt-16 flex items-center gap-6">
                  <div className="flex flex-col gap-2">
                    {capabilities.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 transition-all duration-500 rounded-full ${i === activeIndex ? 'w-12 bg-[#F58220]' : 'w-4 bg-white/10'}`} 
                      />
                    ))}
                  </div>
                  <span className="type-label text-[9px] text-white/20">Scroll to Explore</span>
               </div>
             </div>
          </div>
          
          {/* Scrollable Right Content - The list that moves while the page stays */}
          <div ref={containerRef} className="lg:col-span-7 flex flex-col pb-[30vh]">
            {capabilities.map((item, i) => (
              <div 
                key={i} 
                ref={(el) => { if (el) itemsRef.current[i] = el; }}
                className="w-full"
              >
                <CapabilityItem 
                  item={item} 
                  index={i} 
                  activeIndex={activeIndex} 
                />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Services;
