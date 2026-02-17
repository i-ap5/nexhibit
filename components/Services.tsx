
import React from 'react';

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

const Services: React.FC = () => {
  return (
    <section id="services" className="bg-[#fcfcfc] py-12 lg:py-16 relative">
      <div className="container mx-auto px-6 lg:px-24 max-w-7xl">

        {/* Header */}
        <div className="mb-8 text-center lg:text-left">
          <span className="type-label text-[#F58220] block mb-3 px-1 border-l-2 border-[#F58220] ml-0 inline-block uppercase tracking-widest font-black text-[8px]">Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#1c1c1b] leading-[0.85]">
            What we <br /> <span className="text-black/10">deliver.</span>
          </h2>
          <p className="text-black/40 text-sm md:text-base font-light max-w-xl mt-4 leading-relaxed">
            A comprehensive suite of production and management services engineered to elevate your brand's physical presence.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-black/5">
          {capabilities.map((item, i) => (
            <div
              key={i}
              className="group relative p-6 lg:p-8 border-r border-b border-black/5 hover:bg-white transition-all duration-500 overflow-hidden"
            >
              <div className="relative z-10 h-full flex flex-col">
                <span className="text-[9px] font-black text-[#F58220] mb-4 block tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                  0{i + 1}
                </span>

                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#1c1c1b] mb-4 leading-tight group-hover:text-[#F58220] transition-colors">
                  {item.title}
                </h3>

                <p className="text-black/50 text-sm font-light leading-relaxed mb-8">
                  {item.desc}
                </p>

                {/* Optional: Small Image Reveal on Hover or consistently present? 
                    User asked for "in a box", simple text is usually cleaner for this request. 
                    Let's add a subtle background image hint. */}
                <div className="mt-auto pt-4">
                  <div className="w-12 h-[2px] bg-black/5 group-hover:w-full group-hover:bg-[#F58220]/20 transition-all duration-700" />
                </div>
              </div>

              {/* Subtle background image hint */}
              <div className="absolute top-0 right-0 w-full h-full opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000 pointer-events-none">
                <img src={item.image} alt="" className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-[2000ms]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
