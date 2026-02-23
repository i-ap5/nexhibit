import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    // Initial state: hidden until interaction
    gsap.set(cursorRef.current, { opacity: 0 });

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Using quickTo for the highest performance tracking (zero-lag direct DOM updates)
      gsap.to(cursorRef.current, {
        x,
        y,
        duration: 0.1, // Very small duration for "softness" without lag
        opacity: 1,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('button, a, .interactive, .clickable, .sust-card, .group')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
    >
      {/* Optimized Simple Ring Cursor */}
      <div className={`
        w-5 h-5 border border-white/60 rounded-full transition-all duration-300 ease-out
        ${isHovering ? 'scale-[1.8] border-[#F58220] bg-[#F58220]/5' : 'scale-100'}
      `} />
    </div>
  );
};

export default CustomCursor;
