
import React, { useEffect, useRef, useState } from 'react';

const capabilities = [
  {
    title: "Event Management",
    desc: "Comprehensive production oversight for corporate galas, high-stakes product launches, and immersive brand activations.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Exhibition Stand Builder",
    desc: "Precision-engineered bespoke stalls that merge structural integrity with award-winning aesthetic presence.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    title: "Indoor & Outdoor Branding",
    desc: "Large-scale environmental graphics and structural identity systems that transform physical spaces into brand stories.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Display Stand Manufacturer",
    desc: "Bespoke retail fixtures and engineered product showcases designed for technical excellence and high visibility.",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Signages",
    desc: "Architectural 3D lettering and intelligent wayfinding systems crafted with premium materials and luminous precision.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Media Production",
    desc: "Immersive digital content and cinematic storytelling designed to anchor physical experiences in the digital realm.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop"
  }
];

const CapabilityItem = ({ item, index, activeIndices }: { item: typeof capabilities[0], index: number, activeIndices: number[] }) => {
  const isActive = activeIndices.includes(index);

  return (
    <div
      className={`py-12 border-b border-black/5 transition-all duration-700 flex flex-col gap-4
        ${isActive ? 'opacity-100' : 'opacity-10'}`}
    >
      <div className="flex items-center gap-6">
        <span className={`type-label text-[10px] font-black transition-colors duration-700 ${isActive ? 'text-[#F58220]' : 'text-black/20'}`}>
          0{index + 1}
        </span>
        <h3 className={`text-3xl md:text-5xl font-extrabold tracking-tighter transition-colors duration-700 leading-none
          ${isActive ? 'text-[#1c1c1b]' : 'text-black/20'}`}>
          {item.title}
        </h3>
      </div>
      <p className={`text-base md:text-lg font-light leading-relaxed max-w-xl pl-12 md:pl-20 transition-all duration-700 ${isActive ? 'text-black/60 max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {item.desc}
      </p>

      <div className={`h-[1px] bg-[#F58220] transition-all duration-700 ease-out ${isActive ? 'w-40 mt-4' : 'w-0'}`} />
    </div>
  );
};

const Services: React.FC = () => {
  const [activeIndices, setActiveIndices] = useState<number[]>([0]);
  const primaryIndex = activeIndices[0] ?? 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemsRef.current.map((item, index) => {
      if (!item) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              setActiveIndices(prev => prev.includes(index) ? prev : [...prev, index].sort((a, b) => a - b));
            } else {
              setActiveIndices(prev => prev.filter(i => i !== index));
            }
          });
        },
        {
          root: null,
          threshold: [0, 0.3, 0.6, 1.0],
          rootMargin: "-10% 0px -10% 0px"
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
    <section id="services" className="bg-white relative">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">

          {/* Sticky Left Sidebar - Bounded to Parent Grid */}
          <div className="lg:col-span-12 xl:col-span-5 h-fit lg:sticky lg:top-24 py-8 z-20">
            <div className="transition-all duration-1000">

              {/* Dynamic Image Window */}
              <div className="aspect-[21/9] w-full mb-6 overflow-hidden rounded-sm relative border border-black/5 bg-stone-100 group shadow-sm">
                <div className="absolute inset-0 bg-blueprint opacity-[0.03] z-10 pointer-events-none" />
                {capabilities.map((cap, i) => (
                  <img
                    key={i}
                    src={cap.image}
                    alt={cap.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${i === primaryIndex ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-105 rotate-0'}`}
                    style={{ willChange: 'opacity, transform' }}
                  />
                ))}

                {/* Visual Metadata Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex justify-end items-end z-20">
                  <span className="type-label text-[6px] text-white/30 font-mono tracking-tighter">MTRX_{primaryIndex + 1} //</span>
                </div>
              </div>

              <span className="type-label text-[#F58220] block mb-6">Core Capabilities</span>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-[#1c1c1b] leading-[0.85] mb-8">
                What we <br /> <span className="text-black/10">deliver.</span>
              </h2>
              <p className="text-black/40 font-light text-sm lg:text-base max-w-sm leading-relaxed mb-8">
                A comprehensive suite of production and management services engineered to elevate your brand's physical presence.
              </p>

              {/* Progress Indicators & Legend */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  {capabilities.map((_, i) => (
                    <div
                      key={i}
                      className={`h-[2px] transition-all duration-500 rounded-full ${activeIndices.includes(i) ? 'w-10 bg-[#F58220]' : 'w-2 bg-black/10'}`}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="type-label text-[10px] text-[#F58220] transition-all duration-500 font-black uppercase tracking-widest">
                    {capabilities[primaryIndex].title}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Right Content - Stacked Layout */}
          <div ref={containerRef} className="lg:col-span-7 flex flex-col pb-[50vh]">
            {capabilities.map((item, i) => (
              <div
                key={i}
                ref={(el) => { if (el) itemsRef.current[i] = el; }}
                className="w-full"
              >
                <CapabilityItem
                  item={item}
                  index={i}
                  activeIndices={activeIndices}
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
