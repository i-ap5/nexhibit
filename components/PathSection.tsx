import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PathSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]); // New Ref for icons

  const steps = [
    {
      phase: "01 // DREAM",
      hook: "Everything begins as a dream.",
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

  useGSAP(() => {
    if (!containerRef.current) return;

    const getInd = (i: number) => {
      const el = indicatorsRef.current[i];
      return {
        dot: el?.querySelector('.indicator-dot'),
        text: el?.querySelector('.indicator-text')
      };
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1,
      }
    });

    // --- INITIAL STATE ---
    // Text
    gsap.set(stepsRef.current, { autoAlpha: 0, y: 50 });
    gsap.set(stepsRef.current[0], { autoAlpha: 1, y: 0 }); // FORCE Step 1 Visible
    gsap.set(iconsRef.current, { autoAlpha: 0, scale: 0.8 });

    // 2. Indicators (All Inactive first, lines hidden)
    indicatorsRef.current.forEach((el) => {
      if (el) {
        gsap.set(el.querySelector('.indicator-dot'), { backgroundColor: 'rgba(255,255,255,0.1)', scale: 1, rotate: 45, borderWidth: 0, borderColor: 'transparent' });
        gsap.set(el.querySelector('.indicator-text'), { opacity: 0.2, x: 0, color: 'rgba(255,255,255,0.4)' });
        gsap.set(el.querySelector('.indicator-line-fill'), { height: '0%' }); // Reset fill
      }
    });

    // 3. SET STEP 1 ACTIVE
    gsap.set(stepsRef.current[0], { autoAlpha: 1, y: 0 });
    gsap.set(iconsRef.current[0], { autoAlpha: 1, scale: 1 });
    const ind0 = getInd(0);
    gsap.set(ind0.dot, { backgroundColor: '#F58220', scale: 1.5, rotate: 135, borderWidth: 1, borderColor: '#fff' });
    gsap.set(ind0.text, { opacity: 1, x: 10, color: '#fff' });


    // --- TIMELINE SEQUENCE ---

    // 0. Hold Step 1 for a bit
    timeline.to({}, { duration: 0.5 })

      // 1. Transition S1 -> S2
      // Exit Step 1 Content & Icon
      .to([stepsRef.current[0], iconsRef.current[0]], { autoAlpha: 0, y: -50, scale: 0.9, duration: 2, ease: "power2.inOut" }, "s1-exit")
      // Deactivate Indicator 1
      .to(getInd(0).dot, { backgroundColor: 'rgba(255,255,255,0.1)', scale: 1, rotate: 45, borderWidth: 0, borderColor: 'transparent', duration: 2 }, "s1-exit")
      .to(getInd(0).text, { opacity: 0.2, x: 0, color: 'rgba(255,255,255,0.4)', duration: 2 }, "s1-exit")
      // Activate Indicator 1's line-fill (connecting to next)
      .to(indicatorsRef.current[0]?.querySelector('.indicator-line-fill'), { height: '100%', duration: 2, ease: 'none' }, "s1-exit")

      // Enter Step 2 Content & Icon (Overlapping slightly or clean break)
      .to([stepsRef.current[1], iconsRef.current[1]], { autoAlpha: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, ">-0.5")
      // Activate Indicator 2
      .to(getInd(1).dot, { backgroundColor: '#F58220', scale: 1.5, rotate: 135, borderWidth: 1, borderColor: '#fff', duration: 2 }, "<")
      .to(getInd(1).text, { opacity: 1, x: 10, color: '#fff', duration: 2 }, "<")

      // 2. Transition S2 -> S3
      // Exit Step 2 Content & Icon
      .to([stepsRef.current[1], iconsRef.current[1]], { autoAlpha: 0, y: -50, scale: 0.9, duration: 2, ease: "power2.inOut" }, ">+0.5")
      // Deactivate Indicator 2
      .to(getInd(1).dot, { backgroundColor: 'rgba(255,255,255,0.1)', scale: 1, rotate: 45, borderWidth: 0, borderColor: 'transparent', duration: 2 }, "<")
      .to(getInd(1).text, { opacity: 0.2, x: 0, color: 'rgba(255,255,255,0.4)', duration: 2 }, "<")
      // Activate Indicator 2's line-fill (connecting to next)
      .to(indicatorsRef.current[1]?.querySelector('.indicator-line-fill'), { height: '100%', duration: 2, ease: 'none' }, "<")

      // Enter Step 3 Content & Icon
      .to([stepsRef.current[2], iconsRef.current[2]], { autoAlpha: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, ">-0.5")
      // Activate Indicator 3
      .to(getInd(2).dot, { backgroundColor: '#F58220', scale: 1.5, rotate: 135, borderWidth: 1, borderColor: '#fff', duration: 2 }, "<")
      .to(getInd(2).text, { opacity: 1, x: 10, color: '#fff', duration: 2 }, "<")

      // Hold Step 3
      .to({}, { duration: 2 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="process" className="relative h-screen w-full bg-black text-white overflow-hidden flex items-center">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px] opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#F58220] rounded-full blur-[150px] opacity-[0.05]" />

        {/* --- Right Side Visuals (Distinct Per Step) --- */}
        <div className="absolute right-[-10%] md:right-[5%] top-1/2 -translate-y-1/2 w-[400px] h-[400px]">

          {/* Icon 1: DREAM (Abstract/Organic) */}
          <div ref={(el) => { if (el) iconsRef.current[0] = el }} className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-30 animate-pulse">
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="5" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              <path d="M100,20 Q130,50 150,80 T180,120 T150,160 T100,180 T50,160 T20,120 T50,80 T100,20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" filter="url(#glow)">
                <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M100,20 Q130,50 150,80 T180,120 T150,160 T100,180 T50,160 T20,120 T50,80 T100,20; M100,30 Q140,60 160,90 T170,130 T140,170 T100,170 T60,170 T30,130 T40,90 T100,30; M100,20 Q130,50 150,80 T180,120 T150,160 T100,180 T50,160 T20,120 T50,80 T100,20" />
              </path>
              <circle cx="100" cy="100" r="20" fill="#F58220" opacity="0.5" filter="url(#glow)" />
            </svg>
          </div>

          {/* Icon 2: DESIGN (Geometric/Blueprint) */}
          <div ref={(el) => { if (el) iconsRef.current[1] = el }} className="absolute inset-0 flex items-center justify-center opacity-0">
            <div className="w-64 h-64 border border-[#F58220]/30 relative animate-[spin_20s_linear_infinite]">
              <div className="absolute inset-0 border border-white/20 rotate-45" />
              <div className="absolute inset-4 border border-white/10" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#F58220]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#F58220]" />
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#F58220]" />
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#F58220]" />
            </div>
          </div>

          {/* Icon 3: DEFINE (Solid/Structure) */}
          <div ref={(el) => { if (el) iconsRef.current[2] = el }} className="absolute inset-0 flex items-center justify-center opacity-0">
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-40">
              <path d="M50,150 L100,50 L150,150 Z" fill="none" stroke="#F58220" strokeWidth="2" />
              <path d="M50,150 L100,120 L150,150" fill="none" stroke="white" strokeWidth="1" />
              <line x1="100" y1="50" x2="100" y2="120" stroke="white" strokeWidth="1" />
              <circle cx="100" cy="50" r="4" fill="white" />
              <rect x="40" y="150" width="120" height="10" fill="white" fillOpacity="0.1" />
            </svg>
          </div>

        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-24 h-full flex items-center relative z-10">

        {/* Technical Sidebar Indicator */}
        <div className="hidden lg:flex flex-col justify-center h-full pr-12 gap-0 w-48 shrink-0 relative">
          {steps.map((_, i) => (
            <div
              key={i}
              ref={(el) => { indicatorsRef.current[i] = el }}
              className="flex items-center gap-6 group cursor-pointer relative py-12"
              onClick={() => {
                const scrollY = (containerRef.current?.offsetTop || 0) + (window.innerHeight * i);
                window.scrollTo({ top: scrollY, behavior: 'smooth' });
              }}
            >
              {/* Dot Wrapper */}
              <div className="relative z-10 w-5 h-5 flex items-center justify-center">
                <div className="indicator-dot w-2 h-2 rounded-sm bg-white/20 rotate-45 transition-all duration-500 border border-transparent" />
              </div>

              {/* Connecting Line (Only for first 2 steps) */}
              {i < steps.length - 1 && (
                <div className="indicator-line absolute left-[10px] top-[60%] bottom-0 w-[1px] bg-white/10 -translate-x-1/2 z-0 overflow-hidden">
                  <div className="indicator-line-fill w-full h-0 bg-[#F58220] origin-top" />
                </div>
              )}

              <span className="indicator-text type-label text-white/20 transition-all font-bold tracking-widest">
                Step 0{i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Content Stacking Context */}
        <div className="flex-1 lg:pl-24 relative h-[60vh] w-full flex items-center justify-center lg:justify-start">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepsRef.current[i] = el }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 max-w-4xl text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                <span className="type-label text-[#F58220] tracking-[0.5em]">{step.phase}</span>
                <div className="w-16 h-[1px] bg-white/10 hidden lg:block" />
              </div>

              <h3 className="text-[clamp(2.5rem,6vw,5rem)] font-bold mb-6 tracking-tighter leading-[0.95] text-white">
                {step.hook}
              </h3>

              <p className="text-white/60 text-lg md:text-2xl font-light leading-relaxed max-w-2xl border-white/10 lg:border-l-2 lg:pl-8 mx-auto lg:mx-0">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default PathSection;
