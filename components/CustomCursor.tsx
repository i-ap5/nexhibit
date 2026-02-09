
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setTarget({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest('button, a, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth lerping for the cursor
    let frame: number;
    const lerp = () => {
      setPosition(prev => ({
        x: prev.x + (target.x - prev.x) * 0.15,
        y: prev.y + (target.y - prev.y) * 0.15
      }));
      frame = requestAnimationFrame(lerp);
    };
    frame = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
      >
        <div className={`
          rounded-full transition-all duration-500 ease-out border
          ${isHovering ? 'w-20 h-20 bg-white/10 border-white/40 scale-125' : 'w-10 h-10 border-white/20'}
        `} />
      </div>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${target.x}px, ${target.y}px) translate(-50%, -50%)`,
        }}
      >
        <div className={`
          w-2 h-2 rounded-full transition-all duration-200
          ${isHovering ? 'bg-[#F58220] scale-[3]' : 'bg-[#1c1c1b]'}
        `} />
      </div>
    </>
  );
};

export default CustomCursor;
