import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import LiquidEther from './LiquidEther';

const images = [
  '/assets/nexh1.webp',
  '/assets/nexh2.webp',
  '/assets/nexh3.webp',
  '/assets/nexh4.webp',
  '/assets/nexh5.webp',
  '/assets/nexh6.webp',
  '/assets/nexh7.webp',
  '/assets/nexh8.webp'
];

// Safe "Rapid Intro" speed ramp (Fast start, cinematic finish)
const durations = [600, 600, 600, 800, 3000, 5000, 5000, 5000];

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setLoaded(true);

    // --- BROWSER PRELOADING & OPTIMIZATION ---
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let timeoutId: NodeJS.Timeout;

    const runSlideshow = (currentIndex: number) => {
      timeoutId = setTimeout(() => {
        const nextIdx = (currentIndex + 1) % images.length;
        setIndex(nextIdx);
        runSlideshow(nextIdx);
      }, durations[currentIndex]);
    };

    runSlideshow(0);
    return () => clearTimeout(timeoutId);
  }, []);

  // --- INITIALIZATION (Run once) ---
  useGSAP(() => {
    slidesRef.current.forEach((slide, i) => {
      if (i === 0) {
        gsap.set(slide, { zIndex: 10, opacity: 1, display: 'block' });
      } else {
        gsap.set(slide, { zIndex: 0, opacity: 0, display: 'none' });
      }
    });
  }, []);

  // --- FLUID TRANSITION LOGIC (Butter Smooth) ---
  useGSAP(() => {
    const currentSlide = slidesRef.current[index];
    if (!currentSlide) return;

    const slideTime = durations[index];
    const isFast = slideTime < 1500;
    const transTime = (slideTime / 1000) * 0.7; // Use 70% of life for crossfade
    const isInitialLoad = !loaded && index === 0;

    // 1. Prepare Incoming (Top Layer)
    gsap.set(currentSlide, { zIndex: 20, display: 'block' });
    gsap.to(currentSlide, {
      opacity: 1,
      duration: isInitialLoad ? 0 : transTime,
      ease: "power2.inOut",
      overwrite: "auto"
    });

    // 2. Animate All Other Slides Out (Middle Layer)
    slidesRef.current.forEach((slide, i) => {
      if (i !== index && slide) {
        gsap.set(slide, { zIndex: 10 }); // Keep below current but above background
        gsap.to(slide, {
          opacity: 0,
          duration: transTime * 1.05, // Slight overlap to prevent background bleed
          ease: "power2.inOut",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(slide, { display: 'none', zIndex: 0 });
          }
        });
      }
    });

    // 3. Image Momentum (Scale)
    const imagesInSlide = currentSlide.querySelectorAll('img');
    if (imagesInSlide.length > 0) {
      gsap.fromTo(imagesInSlide,
        { scale: isFast ? 1.15 : 1.1 },
        {
          scale: 1,
          duration: (slideTime / 1000) + 1.2,
          ease: "power1.out",
          overwrite: "auto"
        }
      );
    }
  }, [index, loaded]);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[#080808] flex items-center group cursor-none md:cursor-default"
    >
      {/* BACKGROUND ANIMATION LAYER */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-60">
        <LiquidEther
          colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* 1. SEAMLESS IMAGE SLIDESHOW */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => { slidesRef.current[i] = el }}
            className="absolute inset-0 transition-none opacity-0 will-change-transform will-change-opacity pointer-events-none"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
              // Display is now managed 100% by GSAP to prevent React reconciliation conflicts
            }}
          >
            {/* Base Image (Grayscale) */}
            <img
              src={src}
              alt={`Exhibition Preview ${i + 1}`}
              className="w-full h-full object-cover opacity-60 grayscale pointer-events-none"
              loading="eager"
              // @ts-ignore
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                objectPosition: '80% 50%'
              }}
            />
          </div>
        ))}

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* 2. TEXT CONTENT SECTION (Overlay) */}
      <div className="w-full px-8 lg:px-24 relative z-30 pt-20">

        {/* Animated Entry Wrapper */}
        <div className={`transition-all duration-1000 ease-out max-w-3xl ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

          {/* Small Label */}
          <div className="flex items-center gap-3 mb-8">
            {/* <span className="w-2 h-2 bg-[#F58220] rounded-full animate-pulse" /> */}
            <span className="type-label text-white/70 tracking-[0.25em] text-[10px] font-bold uppercase">
              The Digital Gallery
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[clamp(3.4rem,10vw,6.5rem)] font-black text-white leading-[0.95] tracking-tighter mb-8 shadow-black drop-shadow-lg">
            Sculpting your <br />
            Brand
            <span className="text-[#F58220] font-light"> Identity.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-lg mb-12 border-l-2 border-[#F58220] pl-6 backdrop-blur-sm bg-black/10 py-2 rounded-r-md">
            We engineer immersive exhibition experiences. Transforming empty spaces into award-winning brand environments.
          </p>

          {/* Dual Architectural CTAs - Pure CSS Kinetic Borders */}
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start w-full">
            {/* Primary: Start project */}
            <button className="w-full sm:w-auto group relative flex items-center justify-center p-[2px] rounded-full overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-[0_20px_40px_-15px_rgba(245,130,32,0.4)] bg-white/10">
              {/* CSS Orbiting Border (White) */}
              <div className="absolute inset-[-100%] animate-[border-flow_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,white_25%,transparent_50%)]" />

              <div className="relative flex items-center justify-center gap-6 px-10 py-4 rounded-full bg-[#F58220] text-white w-full h-full z-10 overflow-hidden group-hover:bg-[#ff8e36] transition-colors duration-500">
                <span className="type-label text-[11px] font-bold tracking-[0.05em] transition-transform duration-500 group-hover:-translate-x-1">
                  Start project
                </span>
                <div className="absolute right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white stroke-[2.5]" >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Secondary: Explore works */}
            <button className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-10 py-4.5 rounded-full bg-white/5 backdrop-blur-md text-white border border-white/10 transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 shadow-lg">
              <span className="type-label text-[11px] font-bold tracking-[0.05em] transition-transform duration-500 group-hover:-translate-x-2">
                Explore works
              </span>
              <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[#F58220] stroke-[3]" >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Status / Scroll Indicator */}
      <div className="absolute bottom-10 left-6 lg:left-12 flex items-center justify-between w-[calc(100%-3rem)] lg:w-[calc(100%-6rem)] z-40 pointer-events-none text-white/50 mix-blend-screen">
        <div className="flex items-center gap-4">
          {/* <span className="type-label text-[9px] tracking-widest -rotate-90 origin-left translate-y-[2px]">SCROLL</span>
          <div className=" w-[1px] h-12 bg-white/50 animate-bounce" /> */}
        </div>

        <div className="text-right hidden md:block">
          <h3 className="text-white text-2xl font-light tracking-tighter">
            Nexhibit <span className="font-bold text-[#F58220]">Live</span>
          </h3>
          <div className="flex justify-end items-center gap-2 mt-1">
            <div className="flex gap-1.5 mr-6 h-full items-center">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 transition-all duration-300 rounded-full ${i === index ? 'w-6 bg-[#F58220]' : 'w-2 bg-white/10'}`}
                />
              ))}
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {/* <p className="text-[9px] uppercase tracking-[0.3em]">
              Cinematic Reel
            </p> */}
          </div>
        </div>
      </div>

      {/* 3. REFINED WATER RIPPLE FILTER */}
      <svg className="hidden">
        <filter id="hero-water-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="2"
            result="noise"
            seed="2"
          >
            <animate
              attributeName="baseFrequency"
              values="0.02;0.025;0.02"
              dur="12s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="40"
            style={{ scale: 'var(--ripple-scale, 40)' }}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

    </section>
  );
};

export default React.memo(Hero);
