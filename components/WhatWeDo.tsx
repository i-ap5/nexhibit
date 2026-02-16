
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const services = [
    {
        title: "Event Management",
        desc: "Seamless production of corporate galas, product launches, and grand-scale brand experiences.",
        image: "https://images.unsplash.com/photo-1540575861501-7ad0582373f2?q=80&w=2070&auto=format&fit=crop",
        className: "md:col-span-2 md:row-span-2"
    },
    {
        title: "Exhibition Stand Builder",
        desc: "Architectural excellence in bespoke stall design and structural fabrication.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        title: "Indoor & Outdoor Branding",
        desc: "Transforming spaces through large-scale structural graphics and environmental identity.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-2"
    },
    {
        title: "Display Stand Manufacturer",
        desc: "Bespoke retail fixtures and product showcases engineered for maximum visibility.",
        image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        title: "Signages",
        desc: "Premium wayfinding systems and 3D luminous brand markers for commercial spaces.",
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop",
        className: "md:col-span-2 md:row-span-1"
    },
    {
        title: "Media Production",
        desc: "Cinematic storytelling and immersive digital content for high-impact brand narratives.",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop",
        className: "md:col-span-1 md:row-span-1"
    }
];

const WhatWeDo: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".service-card", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <section id="what-we-do" className="bg-[#000000] py-24 lg:py-48 overflow-hidden" ref={containerRef}>
            <div className="container mx-auto px-6 lg:px-24">

                {/* Header */}
                <div className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <span className="type-label text-[#F58220] block mb-6">Capabilities</span>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.85] uppercase">
                            What We <br /> <span className="text-white/20">Deliver.</span>
                        </h2>
                    </div>
                    <p className="text-white/40 text-lg md:text-xl font-light max-w-sm leading-relaxed mb-4">
                        A comprehensive suite of production services to elevate your brand's physical presence in the global market.
                    </p>
                </div>

                {/* Interactive Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[250px]">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className={`service-card group relative overflow-hidden bg-[#141413] border border-white/5 transition-all duration-700 hover:border-[#F58220]/30 hover:shadow-2xl hover:shadow-[#F58220]/5 ${service.className}`}
                        >
                            {/* Image Background (Revealed on Hover) */}
                            <div className="absolute inset-0 z-0 transition-transform duration-1000 scale-110 group-hover:scale-100">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/20 to-transparent opacity-80" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 w-full h-full p-8 flex flex-col justify-end">
                                <span className="type-label text-[8px] text-[#F58220] mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    Service 0{i + 1}
                                </span>

                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    {service.title}
                                </h3>

                                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 delay-100">
                                    <p className="text-white/60 text-sm font-light leading-relaxed max-w-[280px]">
                                        {service.desc}
                                    </p>
                                </div>

                                {/* Arrow Icon */}
                                <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-[2]" >
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

export default WhatWeDo;
