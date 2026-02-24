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
        image: "/assets/serviceAssets/eventManagement.webp"
    },
    {
        title: "Exhibition Stand Builder",
        desc: "Architectural excellence in bespoke stall design and structural fabrication.",
        image: "/assets/serviceAssets/exhibitionStand.webp"
    },
    {
        title: "Indoor & Outdoor Branding",
        desc: "Transforming spaces through large-scale structural graphics and environmental identity.",
        image: "/assets/serviceAssets/outdoorIndoorBranding.webp"
    },
    {
        title: "Display Stand Manufacturer",
        desc: "Bespoke retail fixtures and product showcases engineered for maximum visibility.",
        image: "/assets/serviceAssets/DisplayStand.webp"
    },
    {
        title: "Signages",
        desc: "Premium wayfinding systems and 3D luminous brand markers for commercial spaces.",
        image: "/assets/serviceAssets/Signages.webp"
    },
    {
        title: "Media Production",
        desc: "Cinematic storytelling and immersive digital content for high-impact brand narratives.",
        image: "/assets/serviceAssets/mediaProduction.webp"
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
        <section id="what-we-do" className="bg-[#fcfcfc] py-16 lg:pb-32 overflow-hidden" ref={containerRef}>
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
                            className="service-card group relative p-8 md:p-10 overflow-hidden bg-black border-r border-b border-white/5 transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] min-h-[320px] flex flex-col will-change-transform cursor-pointer outline-none focus:ring-0"
                            onClick={() => { }}
                            onTouchStart={() => { }}
                            tabIndex={0}
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0 z-0 pointer-events-none">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover opacity-100 grayscale scale-110 group-hover:grayscale-0 group-hover:scale-100 group-focus:grayscale-0 group-focus:scale-100 transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                                />
                                {/* Text Readability Gradient */}
                                <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex-grow" /> {/* Spacer */}

                            <div className="relative z-10 w-full text-left transition-colors duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]">
                                <span className="text-[10px] font-black text-[#F58220] mb-3 block tracking-widest transition-colors duration-[1.2s]">
                                    0{i + 1}
                                </span>

                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight transition-colors duration-[1.2s]">
                                    {service.title}
                                </h3>

                                <p className="text-white/60 text-sm md:text-xs font-light leading-relaxed max-w-[280px] group-hover:text-white/90 group-focus:text-white/90 transition-colors duration-[1.2s]">
                                    {service.desc}
                                </p>

                                {/* Arrow Icon */}
                                <div className="absolute top-0 right-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0 group-hover:border-white/40 group-focus:border-white/40 transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-white stroke-[2] transition-colors duration-[1.2s]" >
                                        <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Hover Line Highlight */}
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F58220] scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] origin-left z-20" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default React.memo(WhatWeDo);
