
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Process: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const processSteps = [
        {
            id: "01",
            title: "Strategic Discovery",
            subtitle: "Brief Analysis",
            desc: "We listen to your ideas and understand exactly what you need.",
            icon: (
                <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[1.5]">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <circle cx="12" cy="12" r="3" className="fill-current opacity-20" />
                </svg>
            )
        },
        {
            id: "02",
            title: "Creative Prototyping",
            subtitle: "Concept & Design",
            desc: "We create a 3D design so you can see your stand before it's built.",
            icon: (
                <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[1.5]">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
            )
        },
        {
            id: "03",
            title: "Financial Alignment",
            subtitle: "Quotation",
            desc: "You get a clear price and a simple schedule for the work.",
            icon: (
                <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[1.5]">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
            )
        },
        {
            id: "04",
            title: "Agreement & Launch",
            subtitle: "Project Confirmation",
            desc: "We sign the papers and start getting everything ready.",
            icon: (
                <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[1.5]">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            )
        },
        {
            id: "05",
            title: "Operational Delivery",
            subtitle: "Execution",
            desc: "We build your stand and set it up perfectly at the show.",
            icon: (
                <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none stroke-[1.5]">
                    <path d="M2 22h20" />
                    <path d="M12 2v20" />
                    <path d="M2 15h20" />
                    <path d="M6 5l-4 8" />
                    <path d="M18 5l4 8" />
                    <path d="M7 2h10" />
                </svg>
            )
        }
    ];

    useGSAP(() => {
        if (!containerRef.current || !scrollContainerRef.current) return;

        const container = containerRef.current;
        const scrollTrack = scrollContainerRef.current;

        // Calculate scroll length with robust start position detection
        const getScrollAmount = () => {
            const trackWidth = scrollTrack.scrollWidth;
            const parentStyle = window.getComputedStyle(scrollTrack.parentElement as Element);
            const parentPaddingLeft = parseFloat(parentStyle.paddingLeft);
            const parentLeft = (scrollTrack.parentElement as Element).getBoundingClientRect().left;

            // Initial visual left position of the track (container left + its padding)
            const startX = parentLeft + parentPaddingLeft;

            // Move left by (TotalWidth + 2*StartOffset - ViewportWidth)
            // This ensures the final card ends at the same right-padding as the start
            return -(trackWidth + (2 * startX) - window.innerWidth);
        };

        gsap.to(scrollTrack, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 0.5,
                start: "top top",
                end: () => `+=${scrollTrack.scrollWidth}`,
                invalidateOnRefresh: true,
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="process-section" className="relative w-full h-screen bg-[#000000] text-white overflow-hidden flex flex-col justify-center">

            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dm2vi7uup/image/upload/v1739814400/grid-pattern_p80g96.png')] bg-repeat" />
            </div>

            <div className="container mx-auto px-6 lg:px-24 mb-16 relative z-10 transition-transform duration-500">
                <div className="max-w-2xl">
                    <span className="type-label text-[#F58220] block mb-3 uppercase tracking-widest font-black text-[8px]">Workflow</span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.85]">
                        How we <br /> <span className="text-white/10">work.</span>
                    </h2>
                </div>
            </div>

            {/* Horizontal Scroll Track */}
            <div className="container mx-auto px-6 lg:px-24 w-full">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-2 lg:gap-3 w-max relative z-10 items-center h-auto"
                    style={{ willChange: 'transform' }}
                >
                    {processSteps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="process-card w-[280px] md:w-[320px] flex-shrink-0">
                                <div className="h-[240px] flex flex-col p-8 bg-[#141413] border border-white/5 border-t-white/10 transition-all duration-500 hover:border-[#F58220]/40 group relative overflow-hidden">
                                    {/* Watermark */}
                                    <span className="absolute top-6 right-6 text-3xl font-black text-white/5 group-hover:text-[#F58220]/10 transition-colors duration-500 select-none">
                                        {step.id}
                                    </span>

                                    {/* Icon */}
                                    <div className="w-10 h-10 text-[#F58220] mb-8 transition-transform duration-500 group-hover:scale-110">
                                        {step.icon}
                                    </div>

                                    {/* Text */}
                                    <div className="mt-auto">
                                        <span className="type-label text-white/30 tracking-[0.2em] text-[9px] mb-2 block uppercase font-bold">
                                            {step.subtitle}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/50 text-sm leading-relaxed font-light">
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* Hover Line */}
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F58220] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </div>
                            </div>

                            {/* Connection Arrow - Pulsing Architectural Arrow */}
                            {index < processSteps.length - 1 && (
                                <div className="flex-shrink-0 text-[#F58220]/30 animate-[pulse-glow_2s_ease-in-out_infinite] px-2 md:px-4">
                                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-[3]">
                                        <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Process;
