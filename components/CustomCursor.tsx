import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('button, a, .interactive, .clickable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 300); // Reset after animation
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {/* The Dot Cursor */}
        <div className={`
          w-1.5 h-1.5 rounded-full transition-all duration-300
          ${isHovering ? 'bg-[#F58220] scale-[2.5]' : 'bg-white'}
        `} />

        {/* Vintage Click Splash (3 lines) */}
        <div className={`
           absolute inset-0 flex items-center justify-center pointer-events-none
           ${isClicking ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
           transition-all duration-300 ease-out
        `}>
          {/* Top Line */}
          <div className="absolute h-4 w-[0.5px] bg-[#F58220] -translate-y-5" />
          {/* Bottom Left Line */}
          <div className="absolute h-4 w-[0.5px] bg-[#F58220] translate-x-4 translate-y-3 rotate-[120deg]" />
          {/* Bottom Right Line */}
          <div className="absolute h-4 w-[0.5px] bg-[#F58220] -translate-x-4 translate-y-3 -rotate-[120deg]" />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
