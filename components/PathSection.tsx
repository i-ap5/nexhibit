
import React, { useEffect, useRef, useState } from 'react';

const PathSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      setActiveStep(progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      phase: "01 // DREAM",
      hook: "Every experience begins as a dream.",
      desc: "An idea shaped by imagination, ambition, and purpose. We explore the boundaries of what's possible."
    },
    {
      phase: "02 // DESIGN",
      hook: "Vision becomes form.",
      desc: "Precision engineering meets visual excellence. We design every detail digitally to ensure absolute control."
    },
    {
      phase: "03 // DEFINE",
      hook: "Reality Defined.",
      desc: "From the first technical sketch to the final spotlight, we bring your brand to its physical peak."
    }
  ];

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#030405]">
      <div className="sticky top-0 h-screen w-full flex items-center px-6 lg:px-24 overflow-hidden">
        
        {/* Technical Sidebar Indicator - Hidden on Mobile */}
        <div className="hidden lg:flex flex-col justify-center h-full border-l border-white/5 pr-12 gap-24 relative z-20">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className="flex items-center gap-6 group cursor-pointer transition-all duration-500"
              onClick={() => window.scrollTo({ top: window.innerHeight * (i * 1.2 + 1), behavior: 'smooth' })}
            >
              <div className={`w-2 h-2 rounded-sm rotate-45 transition-all duration-500 ${i === activeStep ? 'bg-[#F58220] scale-150' : 'bg-white/10'}`} />
              <span className={`type-label transition-all duration-500 ${i === activeStep ? 'text-white opacity-100' : 'text-white/20'}`}>Step 0{i + 1}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 lg:pl-24 relative z-10">
           <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="flex items-center gap-4 mb-10">
                 <span className="type-label text-[#F58220] opacity-60">
                   {steps[activeStep].phase}
                 </span>
                 <div className="flex-1 h-[1px] bg-white/5 hidden lg:block" />
              </div>
              
              <h3 className="text-[clamp(2.2rem,7vw,4.5rem)] font-bold text-white mb-8 tracking-tighter leading-[1] transition-all duration-700">
                {steps[activeStep].hook}
              </h3>
              
              <p className="text-white/30 text-lg md:text-xl font-light leading-relaxed max-w-xl transition-all duration-700 border-white/10 lg:border-l-2 lg:pl-10">
                {steps[activeStep].desc}
              </p>
           </div>
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.2]">
           <div className="w-full h-full bg-blueprint" />
           <div 
            className="absolute top-1/2 right-0 w-[40vw] h-[40vw] border border-[#F58220]/10 rounded-full blur-3xl transition-transform duration-1000"
            style={{ transform: `translate(20%, -50%) scale(${1 + activeStep * 0.2})` }}
           />
        </div>
      </div>
    </section>
  );
};

export default PathSection;
