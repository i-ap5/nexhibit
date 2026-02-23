import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Sustainability: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            ".sust-reveal",
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="sustainability" className="relative py-32 bg-[#FAF9F6] overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#3b4d36] opacity-[0.03] skew-x-12 transform origin-top-right rounded-bl-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-24 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                    {/* Left: Content */}
                    <div className="md:col-span-6 sust-reveal">
                        <span className="type-label text-[#5A6D43] block mb-4 uppercase tracking-widest font-black text-[8px]">Sustainability Commitment</span>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#1c1c1b] leading-[0.9] mb-8">
                            Building for <br /> <span className="text-black/10">tomorrow.</span>
                        </h2>
                        <p className="text-lg text-black/60 font-light leading-relaxed max-w-md mb-10">
                            We believe that high-impact environments shouldn't come at a high cost to the earth.
                            Our engineering approach prioritizes reusable structural systems, eco-conscious materials, and highly efficient logistics.
                        </p>

                        <div className="flex flex-col gap-8 border-l border-black/10 pl-8">
                            <div>
                                <h4 className="text-[11px] font-black tracking-[0.2em] uppercase mb-2 text-[#F58220]">Eco-Materials</h4>
                                <p className="text-[14px] text-black/50 font-light leading-relaxed max-w-[300px]">Strict sourcing of sustainable timber, low-VOC finishes, and premium recyclable exhibition substrates.</p>
                            </div>
                            <div>
                                <h4 className="text-[11px] font-black tracking-[0.2em] uppercase mb-2 text-[#F58220]">Modular Efficiency</h4>
                                <p className="text-[14px] text-black/50 font-light leading-relaxed max-w-[300px]">Designing reusable architectural systems that drastically reduce structural waste between events.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual */}
                    <div className="md:col-span-6 sust-reveal mt-10 md:mt-0">
                        <div className="relative aspect-[4/5] object-cover w-full rounded-2xl overflow-hidden shadow-2xl group">
                            <img
                                src="/assets/nexh2.webp"
                                alt="Sustainable Exhibition Infrastructure"
                                className="w-full h-full object-cover sepia-[0.25] hue-rotate-[-40deg] saturate-50 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                            />

                            {/* Protective Film Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1b2b22]/90 via-[#1b2b22]/20 to-transparent pointer-events-none mix-blend-multiply" />

                            {/* Floating Eco Quote */}
                            <div className="absolute bottom-6 left-6 right-6 p-8 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 shadow-xl overflow-hidden">
                                {/* Subtle animated border flow (from global styles) */}
                                <div className="absolute inset-[-100%] animate-[border-flow_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,255,255,0.2)_25%,transparent_50%)] pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#5A6D43]/20 border border-[#5A6D43]/30 mb-4 mix-blend-screen">
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-[#A5CC76] stroke-[1.5]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.5c-4-4-7-8.5-7-13A7 7 0 0112 1.5a7 7 0 017 7c0 4.5-3 9-7 13z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.5V12" />
                                        </svg>
                                    </div>
                                    <p className="text-white/90 text-sm font-light leading-relaxed">
                                        "Our footprint within the exhibition hall should be absolute. Our long-term footprint on the environment should be minimal."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sustainability;
