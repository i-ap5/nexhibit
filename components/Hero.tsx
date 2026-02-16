
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const images = [
    '/assets/nex2.JPG',
    '/assets/nex3.JPG',
    '/assets/nex4.JPG',
    '/assets/nex5.JPG',
    '/assets/nex6.JPG',
    '/assets/nex7.JPG',
    '/assets/nex8.JPG',
    '/assets/nex9.JPG'
  ];

  // Professional "Speed Ramp" durations in milliseconds
  const durations = [800, 800, 1000, 1500, 3000, 5000, 5000, 5000];

  useEffect(() => {
    setLoaded(true);

    // --- BROWSER PRELOADING & OPTIMIZATION ---
    // Start preloading all images immediately in parallel
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
  }, [images.length]);

  useGSAP(() => {
    slidesRef.current.forEach((slide, i) => {
      if (!slide) return;
      const img = slide.querySelector('img');
      const isFast = durations[index] < 1500;

      if (i === index) {
        // --- SEAMLESS ENTRY ---
        gsap.set(slide, { zIndex: 10 }); // Bring new slide to front
        gsap.to(slide, {
          opacity: 1,
          duration: isFast ? 0.5 : 1.8,
          ease: "power2.inOut",
          overwrite: true
        });

        if (img) {
          gsap.fromTo(img,
            { scale: isFast ? 1.2 : 1.1 },
            { scale: 1, duration: (durations[index] / 1000) + 1.5, ease: "power1.out", overwrite: true }
          );
        }
      } else {
        // --- SEAMLESS EXIT (STAY UNDERNEATH) ---
        gsap.set(slide, { zIndex: 5 }); // Keep old slide just behind the new one
        gsap.to(slide, {
          opacity: 0,
          duration: isFast ? 0.7 : 2.0, // Exit SLOWER than entry for perfect overlap
          ease: "power2.inOut",
          overwrite: true,
          onComplete: () => {
            if (i !== index) gsap.set(slide, { zIndex: 0 });
          }
        });
      }
    });
  }, [index]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#080808] flex items-center">

      {/* 1. SEAMLESS IMAGE SLIDESHOW */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => { slidesRef.current[i] = el }}
            className="absolute inset-0 transition-none"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <img
              src={src}
              alt={`Exhibition Preview ${i + 1}`}
              className="w-full h-full object-cover opacity-60 grayscale"
              loading={i === 0 ? "eager" : "lazy"}
              // @ts-ignore
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
            />
          </div>
        ))}

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* 2. TEXT CONTENT SECTION (Overlay) */}
      <div className="w-full px-10 lg:pl-24 lg:pr-12 relative z-30 pt-20">

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
          <h1 className="text-[clamp(3.8rem,10vw,6.5rem)] font-black text-white leading-[0.95] tracking-tighter mb-8 shadow-black drop-shadow-lg">
            Sculpting your <br />
            Brand
            <span className="text-[#F58220] font-light"> Identity.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-lg mb-12 border-l-2 border-[#F58220] pl-6 backdrop-blur-sm bg-black/10 py-2 rounded-r-md">
            We engineer immersive exhibition experiences. Transforming empty spaces into award-winning brand environments.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="px-10 py-4 bg-[#F58220] text-white hover:bg-white hover:text-black transition-colors rounded-sm type-label text-[11px] tracking-widest shadow-xl font-bold cursor-pointer">
              Start Project
            </button>
            <button className="px-10 py-4 border border-white/20 text-white hover:border-white hover:bg-white hover:text-black transition-all rounded-sm type-label text-[11px] tracking-widest backdrop-blur-md cursor-pointer">
              View Works
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Status / Scroll Indicator */}
      <div className="absolute bottom-10 left-6 lg:left-12 flex items-center justify-between w-[calc(100%-3rem)] lg:w-[calc(100%-6rem)] z-40 pointer-events-none text-white/50 mix-blend-screen">
        <div className="flex items-center gap-4">
          <span className="type-label text-[9px] sm:hidden tracking-widest -rotate-90 origin-left translate-y-[2px]">SCROLL</span>
          <div className="sm:hidden w-[1px] h-12 bg-white/50 animate-bounce" />
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

    </section>
  );
};

export default Hero;
