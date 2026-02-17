import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { MotionContext } from './context/MotionContext';

// Core Components
import Hero from './components/Hero';
import Belief from './components/Belief';
import Process from './components/Process';
import PathSection from './components/PathSection';
import Portfolio from './components/Portfolio';
import WhatWeDo from './components/WhatWeDo';
import MissionVision from './components/MissionVision';
import Invitation from './components/Invitation';
import CustomCursor from './components/CustomCursor';
import FullPortfolio from './components/FullPortfolio';

// New Extracted Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const LandingPage: React.FC<{
  onViewAll: () => void;
}> = ({ onViewAll }) => {
  return (
    <main className="relative z-10">
      <Hero onExplore={onViewAll} />
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
        <Portfolio onViewAll={onViewAll} />
      </div>
      <div id="identity" className="relative z-50">
        <MissionVision />
      </div>
      <Invitation />
    </main>
  );
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Works', id: 'works' },
  ];

  const handlePortfolioView = useCallback(() => {
    navigate('/portfolio');
  }, [navigate]);

  const isPortfolioPage = location.pathname === '/portfolio';

  return (
    <MotionContext.Provider value={{ scrollY: 0, mouse: { x: 0, y: 0 } }}>
      <div className="min-h-screen bg-white text-[#1c1c1b] selection:bg-[#F58220] selection:text-white font-sans scroll-smooth">
        <CustomCursor />

        <Navbar
          isScrolled={isScrolled}
          navLinks={navLinks}
          activeSection={activeSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          onExplorePortfolio={handlePortfolioView}
        />

        <Routes>
          <Route path="/" element={
            <LandingPage onViewAll={handlePortfolioView} />
          } />
          <Route path="/portfolio" element={<FullPortfolio onBack={() => navigate(-1)} />} />
        </Routes>

        <Footer />
      </div>
    </MotionContext.Provider>
  );
};

export default App;
