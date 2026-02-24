
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Belief: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".belief-reveal",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate counter numbers in belief section
    const numbers = gsap.utils.toArray<HTMLElement>('.belief-counter-number');
    numbers.forEach((num) => {
      const target = parseFloat(num.getAttribute('data-target') || '0');
      gsap.fromTo(num,
        { innerHTML: "0" },
        {
          innerHTML: target,
          duration: 2.5,
          ease: "power3.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="section-full bg-stone-50 flex items-center py-24 md:py-48 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 lg:p-24 text-black/[0.02] font-extrabold text-[20vw] leading-none pointer-events-none select-none tracking-tighter hidden lg:block">
        Stalls
      </div>

      <div className="container mx-auto px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
        <div className="lg:col-span-5 flex flex-col justify-between py-4">
          <div className="belief-reveal outline-none focus:ring-0" onClick={() => { }} onTouchStart={() => { }} tabIndex={0}>
            <span className="type-label text-[#F58220] block mb-8">Specialized Expertise</span>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-tighter leading-[0.95] text-[#1c1c1b]">
              Exhibition Stalls <br /> <span className="font-extralight text-[#F58220]">that command attention.</span>
            </h2>
          </div>

          {/* <div className="hidden lg:block w-[1px] h-32 bg-black/5 mt-20 belief-reveal origin-top" /> */}
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="max-w-2xl space-y-10">
            <div className="space-y-6">
              <h3 className="belief-reveal text-2xl md:text-3xl font-light leading-tight text-black/80 outline-none focus:ring-0" onClick={() => { }} onTouchStart={() => { }} tabIndex={0}>
                The standard for <span className="text-[#F58220] font-bold">bespoke trade show presence.</span>
              </h3>

              <p className="belief-reveal text-black/40 text-lg md:text-xl font-light leading-relaxed outline-none focus:ring-0" onClick={() => { }} onTouchStart={() => { }} tabIndex={0}>
                We don't just build stands; we create brand landmarks. From small-scale custom exhibition stalls to massive country pavilions, our technical engineering ensures your brand is the centerpiece of the exhibition floor.
              </p>
            </div>

            {/* Stats Row integrated into Belief */}
            <div className="belief-reveal pt-6 grid grid-cols-3 gap-4 md:gap-8 border-t border-black/5 pt-8">
              {/* Stat 1 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline text-3xl sm:text-4xl lg:text-5xl font-light text-[#1c1c1b] tracking-tight">
                  <span className="belief-counter-number font-normal" data-target="100">0</span>
                  <span className="text-[#F58220] text-xl sm:text-3xl">+</span>
                </div>
                <span className="text-[9px] sm:text-[11px] font-medium text-black/40 uppercase tracking-widest break-words pr-2">Clients / Year</span>
              </div>
              {/* Stat 2 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline text-3xl sm:text-4xl lg:text-5xl font-light text-[#1c1c1b] tracking-tight">
                  <span className="belief-counter-number font-normal" data-target="150">0</span>
                  <span className="text-[#F58220] text-xl sm:text-3xl">+</span>
                </div>
                <span className="text-[9px] sm:text-[11px] font-medium text-black/40 uppercase tracking-widest break-words pr-2">Projects / Year</span>
              </div>
              {/* Stat 3 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline text-3xl sm:text-4xl lg:text-5xl font-light text-[#1c1c1b] tracking-tight">
                  <span className="belief-counter-number font-normal" data-target="15">0</span>
                  <span className="text-[#F58220] text-xl sm:text-3xl">+</span>
                </div>
                <span className="text-[9px] sm:text-[11px] font-medium text-black/40 uppercase tracking-widest break-words pr-2">Years Exp.</span>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default Belief;
