import React, { useEffect, useState, useCallback, Suspense, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { MotionContext } from './context/MotionContext';
import { ReactLenis, useLenis } from 'lenis/react';
// Core Components
import Hero from './components/Hero';
import Belief from './components/Belief';
import Process from './components/Process';
import PathSection from './components/PathSection';
import Portfolio from './components/Portfolio';
import WhatWeDo from './components/WhatWeDo';
import MissionVision from './components/MissionVision';
import SustainabilityV2 from './components/SustainabilityV2';
import Invitation from './components/Invitation';
import CustomCursor from './components/CustomCursor';
import FullPortfolio from './components/FullPortfolio';
import TrustedBy from './components/TrustedBy';

// New Extracted Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import gsap from 'gsap';

// Transition Overlay Component
const TransitionWipe: React.FC<{ active: boolean; onComplete?: () => void }> = ({ active, onComplete }) => {
  const wipeRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useGSAP(() => {
    if (active) {
      const tl = gsap.timeline();

      tl.set(wipeRef.current, { x: '-100%', display: 'block' })
        .to(wipeRef.current, {
          x: '0%',
          duration: 0.5,
          ease: "power3.in"
        })
        .call(() => {
          if (onCompleteRef.current) onCompleteRef.current();
        })
        .to(wipeRef.current, {
          x: '100%',
          duration: 0.5,
          ease: "power3.out",
          delay: 0.2
        })
        .set(wipeRef.current, { display: 'none' });

      return () => {
        tl.kill();
      };
    }
  }, [active]);

  return (
    <div
      ref={wipeRef}
      className={`fixed inset-0 z-[9999] bg-[#F58220] hidden ${active ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ willChange: 'transform' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 border-2 border-white/20 rounded-full animate-ping" />
      </div>
    </div>
  );
};

const LandingPage: React.FC<{
  onViewAll: () => void;
  onCinematicJump: (id: string) => void;
}> = ({ onViewAll, onCinematicJump }) => {
  return (
    <main className="relative z-10">
      <Hero onExplore={onViewAll} onContactJump={() => onCinematicJump('contact')} />
      <div id="about" className="relative z-10 bg-white">
        <Belief />
      </div>
      <TrustedBy />
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
        <Portfolio onViewAll={onViewAll} />
      </div>
      <div id="identity" className="relative z-50">
        <MissionVision />
      </div>
      <div id="sustainability" className="relative z-50">
        <SustainabilityV2 />
      </div>
      <Invitation />
    </main>
  );
};

// This internal component handles the actual jump using Lenis to bypass smooth scrolling
const CinematicJumpHandler: React.FC<{
  targetId: string | null;
  onJumpComplete: () => void;
  trigger: boolean;
}> = ({ targetId, onJumpComplete, trigger }) => {
  const lenis = useLenis();

  useEffect(() => {
    if (trigger && targetId) {
      // Clean targetId if it still has a hash prefix
      const cleanId = targetId.includes('#') ? targetId.split('#').pop() : targetId;

      const attemptJump = () => {
        if (!cleanId) return false;
        const el = document.getElementById(cleanId);
        if (el) {
          if (lenis) lenis.stop();

          // Force layout recalculation for accuracy
          const targetScroll = el.getBoundingClientRect().top + window.pageYOffset;

          window.scrollTo({
            top: targetScroll,
            left: 0,
            behavior: 'instant' as ScrollBehavior
          });

          if (lenis) lenis.start();
          onJumpComplete();
          return true;
        }
        return false;
      };

      if (!attemptJump()) {
        const interval = setInterval(() => {
          if (attemptJump()) clearInterval(interval);
        }, 50);
        setTimeout(() => {
          clearInterval(interval);
          onJumpComplete();
        }, 1500);
      }
    }
  }, [trigger, targetId, lenis, onJumpComplete]);

  return null;
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingJump, setPendingJump] = useState<string | null>(null);
  const [shouldJumpNow, setShouldJumpNow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleCinematicJump = useCallback((target: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPendingJump(target);
    setShouldJumpNow(false);
  }, [isTransitioning]);

  const handleWipeMidpoint = useCallback(() => {
    if (!pendingJump) return;

    if (pendingJump.startsWith('/')) {
      // Cross-page: navigate to the path
      navigate(pendingJump);
      // Wait for mount
      setShouldJumpNow(true);
    } else {
      // In-page
      setShouldJumpNow(true);
    }
  }, [pendingJump, navigate]);

  const handleFinalizeJump = useCallback(() => {
    setPendingJump(null);
    setShouldJumpNow(false);
    // Let the panel finish sliding away before allowing interaction
    setTimeout(() => setIsTransitioning(false), 200);
  }, []);

  // Handle Hash Navigation on Initial Load or Redirect back to home
  const lenis = useLenis();
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const targetId = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          if (lenis) lenis.stop();
          window.scrollTo({
            top: el.offsetTop,
            left: 0,
            behavior: 'instant' as ScrollBehavior
          });
          if (lenis) lenis.start();
        }
      }, 100); // slight delay to ensure DOM is ready
    }
  }, [location.pathname, location.hash, lenis]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

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

    if (location.pathname === '/') {
      ['about', 'services', 'path', 'process', 'works', 'identity'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [location.pathname]);

  const navLinks = [
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Works', id: 'works' },
    { name: 'Portfolio', id: 'portfolio-link' },
  ];

  const handlePortfolioView = useCallback(() => {
    navigate('/portfolio');
  }, [navigate]);

  return (
    <MotionContext.Provider value={{ scrollY: 0, mouse: { x: 0, y: 0 } }}>
      <ReactLenis root options={{ lerp: 0.12, wheelMultiplier: 1.1, smoothWheel: true }}>
        <div
          className="min-h-screen bg-white text-[#1c1c1b] selection:bg-[#F58220] selection:text-white font-sans"
          onTouchStart={() => { }}
        >
          <CustomCursor />
          <TransitionWipe active={isTransitioning} onComplete={handleWipeMidpoint} />
          <CinematicJumpHandler
            targetId={pendingJump}
            trigger={shouldJumpNow}
            onJumpComplete={handleFinalizeJump}
          />

          <Navbar
            isScrolled={isScrolled}
            navLinks={navLinks}
            activeSection={activeSection}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            onExplorePortfolio={handlePortfolioView}
            onCinematicJump={handleCinematicJump}
          />

          <div className="relative bg-white min-h-screen">
            <Routes>
              <Route path="/" element={
                <LandingPage onViewAll={handlePortfolioView} onCinematicJump={handleCinematicJump} />
              } />
              <Route path="/portfolio" element={<FullPortfolio onBack={() => navigate(-1)} />} />
            </Routes>
          </div>

          <Footer onCinematicJump={handleCinematicJump} />
        </div>
      </ReactLenis>
    </MotionContext.Provider>
  );
};

export default App;
