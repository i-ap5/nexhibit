import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const services = [
    {
        title: "Event Management",
        desc: "Seamless production of corporate galas, product launches, and grand-scale brand experiences.",
        image: "https://images.unsplash.com/photo-1540575861501-7ad0582373f2?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Exhibition Stand Builder",
        desc: "Architectural excellence in bespoke stall design and structural fabrication.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
    },
    {
        title: "Indoor & Outdoor Branding",
        desc: "Transforming spaces through large-scale structural graphics and environmental identity.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Display Stand Manufacturer",
        desc: "Bespoke retail fixtures and product showcases engineered for maximum visibility.",
        image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Signages",
        desc: "Premium wayfinding systems and 3D luminous brand markers for commercial spaces.",
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Media Production",
        desc: "Cinematic storytelling and immersive digital content for high-impact brand narratives.",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop"
    }
];

const WhatWeDo: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Essential: Refresh ScrollTrigger when this component mounts 
        // to ensure it calculates positions correctly even if the page layout changes
        const refreshId = setTimeout(() => ScrollTrigger.refresh(), 500);

        // Initial state - ensures they start hidden
        gsap.set(".service-card", { y: 40, opacity: 0 });

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 85%",
            onEnter: () => {
                gsap.to(".service-card", {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            },
            // Fallback: If user scrolls back up, ensure they stay visible or re-animate
            onEnterBack: () => {
                gsap.to(".service-card", { opacity: 1, y: 0, overwrite: "auto" });
            }
        });

        return () => {
            clearTimeout(refreshId);
            trigger.kill();
        };
    }, { scope: containerRef });

    return (
        <section id="what-we-do" className="bg-[#fcfcfc] py-16 lg:py-24 overflow-hidden" ref={containerRef}>
            <div className="container mx-auto px-6 lg:px-24 max-w-7xl">

                {/* Header */}
                <div className="mb-10 text-left">
                    <div className="max-w-2xl">
                        <span className="type-label text-[#F58220] block mb-3 uppercase tracking-widest font-black text-[8px]">Capabilities</span>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1c1c1b] leading-[0.85]">
                            What we <br /> <span className="text-black/10">deliver.</span>
                        </h2>
                    </div>
                    <p className="text-black/40 text-sm md:text-base font-light max-w-xl mt-4 leading-relaxed">
                        A comprehensive suite of production services to elevate your brand's physical presence in the global market.
                    </p>
                </div>

                {/* Interactive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-black/5">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="service-card group relative p-8 md:p-10 overflow-hidden bg-transparent border-r border-b border-black/5 transition-all duration-700 hover:bg-white aspect-auto min-h-[220px] md:aspect-[4/3] opacity-0"
                            style={{ opacity: 0 }} // Hard fallback start state
                        >
                            {/* Image Background (Subtle Reveal on Hover) */}
                            <div className="absolute inset-0 z-0 transition-transform duration-1000 scale-110 group-hover:scale-100 pointer-events-none">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 grayscale"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 w-full h-full flex flex-col justify-end text-left">
                                <span className="text-[10px] font-black text-[#F58220] mb-4 opacity-100 transition-opacity tracking-widest">
                                    SERVICE 0{i + 1}
                                </span>

                                <h3 className="text-2xl md:text-2xl font-bold text-[#1c1c1b] mb-4 tracking-tight transition-colors group-hover:text-[#F58220]">
                                    {service.title}
                                </h3>

                                <div className="transition-all duration-500">
                                    <p className="text-black/60 text-sm md:text-xs font-light leading-relaxed max-w-[280px]">
                                        {service.desc}
                                    </p>
                                </div>

                                {/* Arrow Icon */}
                                <div className="absolute top-0 right-0 w-8 h-8 rounded-full border border-black/10 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-[#1c1c1b] stroke-[2]" >
                                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Hover Line Highlight */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F58220] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default React.memo(WhatWeDo);
