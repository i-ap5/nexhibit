
import React, { useEffect, useRef, useState } from 'react';

const Belief: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-full bg-stone-50 flex items-center py-32 md:py-48 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 lg:p-24 text-black/[0.02] font-extrabold text-[20vw] leading-none pointer-events-none select-none tracking-tighter hidden lg:block">
        Stalls
      </div>

      <div className="container mx-auto px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
        <div className="lg:col-span-5 flex flex-col justify-between py-4">
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="type-label text-[#F58220] block mb-8">Specialized Expertise</span>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-tighter leading-[0.95] text-[#1c1c1b]">
              Exhibition Stalls <br /> <span className="font-extralight text-[#F58220]">that command attention.</span>
            </h2>
          </div>

          <div className={`hidden lg:block w-[1px] h-32 bg-black/5 mt-20 transition-all duration-[1.5s] delay-500 ${visible ? 'scale-y-100' : 'scale-y-0'}`} />
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="max-w-2xl space-y-10">
            <h3 className={`text-2xl md:text-3xl font-light leading-tight text-black/80 transition-all duration-[1.2s] delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              The standard for <span className="text-[#F58220] font-bold">bespoke trade show presence.</span>
            </h3>

            <p className={`text-black/40 text-lg md:text-xl font-light leading-relaxed transition-all duration-[1.2s] delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              We don't just build stands; we create brand landmarks. From small-scale custom exhibition stalls to massive country pavilions, our technical engineering ensures your brand is the centerpiece of the exhibition floor.
            </p>

            <div className={`pt-12 transition-all duration-1000 delay-800 ${visible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-6 opacity-30">
                <div className="w-16 h-[1px] bg-[#F58220]" />
                <span className="type-label text-black/40 text-[10px]">
                  Crafted for the spotlight
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Belief;
