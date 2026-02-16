
import React, { useEffect, useState, createContext } from 'react';
import Hero from './components/Hero';
import Belief from './components/Belief';
import PathSection from './components/PathSection';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import MissionVision from './components/MissionVision';
import Invitation from './components/Invitation';
import CustomCursor from './components/CustomCursor';

export const MotionContext = createContext<{ scrollY: number; mouse: { x: number; y: number } }>({
  scrollY: 0,
  mouse: { x: 0, y: 0 }
});

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <MotionContext.Provider value={{ scrollY, mouse }}>
      <div className="min-h-screen bg-white text-[#1c1c1b] selection:bg-[#F58220] selection:text-white font-sans scroll-smooth">
        <CustomCursor />

        <header className="fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-6 flex justify-between items-center pointer-events-none">
          {/* <div className="flex items-center gap-3 pointer-events-auto group cursor-pointer">
            <div className="w-8 h-8 border border-white/10 group-hover:border-[#F58220] transition-colors duration-500 flex items-center justify-center bg-white/5 rounded-sm">
              <span className="text-[10px] font-black tracking-tighter">NA</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-[0.2em] text-[9px] uppercase leading-none">Nexhibit</span>
              <span className="font-medium tracking-[0.1em] text-[7px] uppercase text-[#F58220]">Arabia</span>
            </div>
          </div> */}
          <div className="flex items-center gap-3 pointer-events-auto group cursor-pointer">
            {/* <div className="w-30.  h-8 border border-white/10 group-hover:border-[#F58220] transition-colors duration-500 flex items-center justify-center bg-white/5 rounded-sm overflow-hidden"> */}
            <div className="w-30.  h-12  group-hover:border-[#F58220] transition-colors duration-500 flex items-center justify-center rounded-sm overflow-hidden">

              <img
                src="/assets/nexhibit.png"
                alt="Nexhibit Arabia Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              {/* <span className="font-bold tracking-[0.2em] text-[16px] uppercase leading-none">
        Nexhibit
      </span>
      <span className="font-medium tracking-[0.1em] text-[12px] uppercase text-[#F58220]">
        Arabia
      </span> */}
            </div>
          </div>


          <nav className={`
            glass-pill px-6 py-2 flex items-center gap-8 pointer-events-auto transition-all duration-700
            ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-[-10px] opacity-0 pointer-events-none'}
            hidden md:flex
          `}>
            {['About', 'Process', 'Works', 'Capabilities'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="type-label opacity-50 hover:opacity-100 transition-opacity"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="pointer-events-auto">
            <button className="type-label border border-black/10 px-4 py-2 hover:border-[#F58220] hover:text-[#F58220] transition-all">
              Contact
            </button>
          </div>
        </header>

        <main className="relative z-10">
          <Hero />

          <div id="about">
            <Belief />
          </div>

          <div id="process">
            <PathSection />
          </div>

          <div id="works">
            <Portfolio />
          </div>

          <div id="identity">
            <MissionVision />
          </div>

          <Services />

          <Invitation />
        </main>

        <footer className="py-20 bg-stone-50 border-t border-black/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-blueprint opacity-[0.05]" />
          <div className="container mx-auto px-8 max-w-screen-xl flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 opacity-40">
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
