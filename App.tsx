
import React, { useEffect, useState, createContext } from 'react';
import Hero from './components/Hero';
import Belief from './components/Belief';
import Process from './components/Process';
import PathSection from './components/PathSection';
import Portfolio from './components/Portfolio';
import WhatWeDo from './components/WhatWeDo';
import MissionVision from './components/MissionVision';
import Invitation from './components/Invitation';
import CustomCursor from './components/CustomCursor';
import Logo from './components/Logo';


export const MotionContext = createContext<{ scrollY: number; mouse: { x: number; y: number } }>({
  scrollY: 0,
  mouse: { x: 0, y: 0 }
});

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 60);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouse({ x, y });
    };

    // --- ACTIVE SECTION DETECTION ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    ['about', 'services', 'path', 'process', 'works', 'identity'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    // Global ScrollTrigger Refresh to fix "missing sections" on first load
    const refreshTimeout = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).gsap) {
        import('gsap/dist/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(refreshTimeout);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Works', id: 'works' },
  ];

  return (
    <MotionContext.Provider value={{ scrollY, mouse }}>
      <div className="min-h-screen bg-white text-[#1c1c1b] selection:bg-[#F58220] selection:text-white font-sans scroll-smooth">
        <CustomCursor />

        {/* --- ARCHITECTURAL RIBBON NAVBAR --- */}
        <header className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.03] py-4'
            : 'bg-transparent py-8'
          }
          pointer-events-none
        `}>
          <div className="w-full px-8 lg:px-24 flex items-center justify-between pointer-events-auto">

            <div className="flex-1 flex justify-start">
              <Logo
                mode={isScrolled ? 'light' : 'dark'}
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Centered Navigation Links */}
            <nav className="hidden lg:flex flex-1 justify-center items-center gap-12">
              {navLinks.map((link, i) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`
                    flex items-center gap-2 group/link transition-all duration-500 hover:-translate-y-0.5
                    ${isScrolled ? 'text-black/40 hover:text-black' : 'text-white/40 hover:text-white'}
                    ${activeSection === link.id ? '!opacity-100 !text-[#F58220]' : ''}
                  `}
                >
                  {/* <span className="font-mono text-[7px] font-bold text-[#F58220]/60 group-hover/link:text-[#F58220] transition-colors">Nº0{i + 1}</span> */}
                  <span className="type-label text-[10px] font-black tracking-[0.2em]">{link.name}</span>
                </a>
              ))}
            </nav>

            <div className="flex-1 flex justify-end items-center gap-8">
              <button className={`
                hidden sm:flex items-center gap-3 type-label px-10 py-3 rounded-full transition-all duration-500 text-[10px] font-bold tracking-wide group/btn overflow-hidden relative
                ${isScrolled
                  ? 'bg-black text-white hover:bg-[#F58220] hover:-translate-y-1'
                  : 'bg-white text-black hover:bg-[#F58220] hover:text-white hover:-translate-y-1 shadow-lg'
                }
              `}>
                <span className="relative z-10">Contact</span>
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-3 p-2 lg:hidden transition-all duration-500 ${isScrolled ? 'text-black' : 'text-white'}`}
              >
                <div className="flex flex-col gap-1.5">
                  <div className={`w-6 h-[1.5px] bg-current transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <div className={`w-4 h-[1.5px] bg-current self-end transition-all duration-500 ${isMenuOpen ? 'opacity-0' : ''}`} />
                  <div className={`w-6 h-[1.5px] bg-current transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* --- MINIMAL ARCHITECTURAL MOBILE MENU --- */}
        <div className={`
          fixed inset-0 z-[60] bg-white/80 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        `}>
          <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />

          <header className="absolute top-0 left-0 w-full px-8 flex justify-between items-center h-24">
            <Logo mode="light" className="scale-75 origin-left" />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="relative w-10 h-10 flex items-center justify-center p-2"
            >
              <div className="absolute w-6 h-[1px] bg-black rotate-45" />
              <div className="absolute w-6 h-[1px] bg-black -rotate-45" />
            </button>
          </header>

          <div className="flex flex-col justify-center h-full px-8 gap-1">
            {/* <span className="type-label text-[#F58220] text-[8px] mb-6 opacity-60">Director</span> */}
            {navLinks.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsMenuOpen(false)}
                className="group flex flex-col py-6 border-b border-black/[0.03]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extralight tracking-wide text-[#1c1c1b] group-hover:text-[#F58220] transition-colors">
                    {link.name}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="absolute bottom-12 left-0 w-full px-8 flex flex-col gap-10">
            <div className="flex flex-col gap-8 border-b border-black/[0.05] pb-10">
              {/* <div className="flex flex-col gap-1">
                <span className="type-label text-[7px] opacity-30 uppercase tracking-[0.2em]">Regional Office</span>
                <p className="type-label text-[9px] text-black/40">Riyadh // Kingdom of Saudi Arabia</p>
              </div> */}

              <button className="w-full py-5 rounded-full bg-black text-white type-label text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-4 group/mobile-btn overflow-hidden relative transition-all duration-500 hover:bg-[#F58220]">
                <span className="relative z-10">Explore Portfolio</span>
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.5] relative z-10 transition-transform duration-500 group-hover/mobile-btn:translate-x-2" >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/mobile-btn:animate-[shimmer_2s_infinite] pointer-events-none" />
              </button>
            </div>

            {/* <p className="type-label text-[7px] opacity-20 text-center uppercase tracking-[0.5em]">
              © 2026 Nexhibit Arabia
            </p> */}
          </div>
        </div>

        <main className="relative z-10">
          <Hero />

          <div id="about" className="relative z-10 bg-white">
            <Belief />
          </div>

          <div id="services" className="relative z-20">
            <WhatWeDo />
          </div>

          <div id="path" className="relative z-30">
            <PathSection />
          </div>

          <div id="process" className="relative z-40">
            <Process />
          </div>

          <div id="works" className="relative z-50">
            <Portfolio />
          </div>

          <div id="identity" className="relative z-50">
            <MissionVision />
          </div>

          <Invitation />
        </main>

        <footer className="py-20 bg-stone-50 border-t border-black/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-blueprint opacity-[0.05]" />
          <div className="container mx-auto px-8 max-w-screen-xl flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <Logo mode="light" className="h-8" />
              <span className="type-label">Nexhibit Arabia // Riyadh</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 opacity-30">
              <p className="type-label">Conceptual</p>
              <p className="type-label">Digital</p>
              <p className="type-label">Physical</p>
            </div>
            <p className="type-label opacity-20">© 2026 // Designed by Trowcode.</p>
          </div>
        </footer>
      </div>
    </MotionContext.Provider>
  );
};

export default App;
