
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const OrganicCore = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.002;
    mesh.current.rotation.z += 0.001;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={mesh}>
        <sphereGeometry args={[2.5, 128, 128]} />
        <MeshDistortMaterial
          color="#F58220"
          speed={2.5}
          distort={0.4}
          radius={1}
          emissive="#F58220"
          emissiveIntensity={0.1}
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <sphereGeometry args={[3.8, 32, 32]} />
        <meshBasicMaterial color="white" wireframe transparent opacity={0.01} />
      </mesh>
    </Float>
  );
};

const Hero: React.FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center bg-[#030405] overflow-hidden px-6 lg:px-24">
      <div className="absolute inset-0 z-0 bg-blueprint opacity-[0.25]" />
      
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[3, 0, 10]} fov={40} />
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 5, 5]} intensity={200} color="#F58220" />
          <OrganicCore />
        </Canvas>
      </div>

      <div className="z-20 max-w-screen-xl w-full mx-auto relative flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className={`transition-all duration-[1s] ease-out ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="flex items-center gap-4 justify-center lg:justify-start">
            <div className="w-2 h-2 bg-[#F58220] rounded-full animate-pulse" />
            <span className="type-label text-white/50">
              Exhibition Stall Architects & Fabricators
            </span>
          </div>
        </div>
        
        <h1 className={`type-heading text-[clamp(2.5rem,10vw,6.5rem)] font-extrabold text-white mt-10 mb-8 leading-[0.85] transition-all duration-[1.2s] delay-200 ease-out ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          Sculpting your <br />
          <span className="font-extralight italic text-[#F58220]">Brand Identity.</span>
        </h1>

        <div className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 transition-all duration-[1s] delay-500 ease-out ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-16 h-[1px] bg-[#F58220]/60 hidden lg:block" />
          <p className="font-medium text-white/40 tracking-[0.05em] text-sm lg:text-xl max-w-xl">
            We are the visionary creators behind the world's most innovative exhibition stalls and brand pavilions.
          </p>
        </div>
      </div>

      <div className={`absolute bottom-12 left-1/2 lg:left-24 -translate-x-1/2 lg:translate-x-0 flex items-center gap-4 transition-all duration-1000 delay-1000 ${active ? 'opacity-30' : 'opacity-0'}`}>
        <span className="type-label whitespace-nowrap text-[9px] font-bold">Discover Stalls</span>
        <div className="w-16 h-[1px] bg-white origin-left" />
      </div>
    </section>
  );
};

export default Hero;
