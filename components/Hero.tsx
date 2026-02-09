
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { MotionContext } from '../App';
import * as THREE from 'three';

// 3D Model Component
const StallModel = () => {
  const { scene } = useGLTF('/assets/stall.glb');
  const group = useRef<THREE.Group>(null);
  const { mouse } = useContext(MotionContext);

  useFrame((state) => {
    if (!group.current) return;

    // Smooth idle rotation
    group.current.rotation.y += 0.002;

    // Mouse influence
    const targetRotX = mouse.y * 0.1;
    const targetRotY = mouse.x * 0.15;

    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.05;
    // We add to the auto-rotation
    group.current.rotation.y += targetRotY * 0.05;
  });

  return (
    <group ref={group} dispose={null} scale={2} position={[0, -2, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden flex flex-col justify-center px-6 lg:px-24">

      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

      <div className="container mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full pt-20">

        {/* Left: Typography */}
        <div className="lg:col-span-5 relative z-20">
          <div className={`overflow-hidden transition-all duration-1000 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[2px] bg-[#F58220]" />
              <span className="type-label text-[#F58220] tracking-[0.3em] font-bold">
                Architectural Fabrication
              </span>
            </div>
          </div>

          <h1 className={`text-[clamp(3.5rem,5vw,5.5rem)] font-black text-[#1c1c1b] leading-[0.95] tracking-tighter mb-8 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            We Don't Just <br />
            Build Stalls. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F58220] to-[#1c1c1b]">
              We Define Space.
            </span>
          </h1>

          <p className={`text-black/60 text-lg leading-relaxed max-w-md mb-10 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Nexhibit Arabia combines advanced structural engineering with brand storytelling to create immersive, award-winning pavilions.
          </p>

          <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button className="px-8 py-4 bg-[#1c1c1b] text-white type-label text-[11px] hover:bg-[#F58220] hover:scale-105 transition-all shadow-xl rounded-sm">
              Start Your Brief
            </button>
            <button className="px-8 py-4 border border-black/10 text-[#1c1c1b] type-label text-[11px] hover:border-black/30 transition-all rounded-sm bg-white/50 backdrop-blur-sm">
              View Case Studies
            </button>
          </div>
        </div>

        {/* Right: The 3D Stall Viewer */}
        <div className="lg:col-span-7 relative h-[60vh] lg:h-[80vh] w-full cursor-grab active:cursor-grabbing">
          <div className={`w-full h-full transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <Canvas shadows dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[5, 2, 8]} fov={40} />
              <ambientLight intensity={0.7} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
              <Environment preset="city" />

              <StallModel />

              <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
              <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>

            {/* 3D Label */}
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-sm border border-black/5 shadow-lg pointer-events-none">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#F58220] animate-pulse" />
                <span className="type-label text-[9px] text-black">Live 3D Render</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40">
        <div className="w-[1px] h-12 bg-[#1c1c1b] animate-bounce" />
        <span className="type-label text-[9px] tracking-widest text-[#1c1c1b]">Scroll</span>
      </div>

    </section>
  );
};

export default Hero;
