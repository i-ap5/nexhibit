import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';

interface FooterProps {
    onCinematicJump?: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onCinematicJump }) => {
    const [riyadhTime, setRiyadhTime] = useState('');
    const location = useLocation();

    useEffect(() => {
        const updateTime = () => {
            const time = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Riyadh',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(new Date());
            setRiyadhTime(time);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const links = {
        explore: [
            { name: 'Services', href: '#services' },
            { name: 'Process', href: '#process' },
            { name: 'Works', href: '#works' },
            { name: 'Portfolio', href: '/portfolio' }
        ],
        socials: [
            { name: 'Instagram', href: '#' },
            { name: 'LinkedIn', href: '#' },
            { name: 'Behance', href: '#' },
            { name: 'Twitter', href: '#' }
        ]
    };

    return (
        <footer className="bg-[#000000] text-white pb-8 relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

            {/* Top National Strip */}
            <div className="w-full overflow-hidden relative z-20 pt-0 border-b border-white/5 bg-white">
                <img
                    src="/assets/strip.webp"
                    alt="National Vision Strip"
                    className="w-[300%] md:w-[150%] lg:w-full max-w-none lg:max-w-full h-auto object-left origin-left"
                />
            </div>

            {/* Dynamic Background Accent */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-30" />
            <div className="absolute inset-0 bg-blueprint opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-24 relative z-10 pt-10 md:pt-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16">

                    {/* LEFT: Identity & Action */}
                    <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start justify-start gap-1">
                        <div className="w-full">
                            <Logo mode="dark" className="mb-4 md:mb-6" />
                            <p className="text-white/60 text-[13px] md:text-sm leading-relaxed font-light mb-6 md:mb-8">
                                Engineering immersive exhibition experiences from Riyadh to the world. We transform empty volumes into high-performance brand environments.
                            </p>
                        </div>

                        <a
                            href={location.pathname === '/' ? '#contact' : '/#contact'}
                            onClick={(e) => {
                                if (location.pathname !== '/') {
                                    e.preventDefault();
                                    if (onCinematicJump) {
                                        onCinematicJump('/#contact');
                                    } else {
                                        window.location.href = '/#contact';
                                    }
                                }
                            }}
                            className="group flex items-center gap-4 bg-white/[0.03] border border-white/10 px-6 py-3 rounded-full hover:bg-[#F58220] hover:border-[#F58220] transition-all duration-500 w-fit"
                        >
                            <span className="font-light text-[14px] font-bold text-white">
                                Get in Touch
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-[2] -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </a>
                    </div>

                    {/* Spacer for wider screens */}
                    <div className="hidden lg:block lg:col-span-2"></div>

                    {/* RIGHT: Navigation & Contact */}
                    <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-12">

                        {/* Column 1: Directory */}
                        <div className="col-span-1">
                            <h4 className="text-white/40 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8">Directory</h4>
                            <ul className="flex flex-col gap-4 md:gap-5">
                                {links.explore.map(link => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-[14px] font-light text-white/70 hover:text-white transition-all duration-300">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2: Reach out */}
                        <div className="col-span-1 flex flex-col">
                            <h4 className="text-white/40 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8">Reach Out</h4>
                            <div className="flex flex-col gap-6 md:gap-8">
                                <div className="space-y-2">
                                    <p className="text-[14px] text-white/90 leading-relaxed font-light tracking-tight mb-1">
                                        3842, Al Tabaq<br />
                                        14214, Riyadh, Saudi Arabia
                                    </p>
                                    <a
                                        href="https://maps.app.goo.gl/Q8v3Tjtfg9faKeMV9?g_st=awb"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#F58220] hover:text-white transition-colors"
                                    >
                                        Get Directions
                                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5] mb-[1px]">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                    <div className="flex flex-col gap-1.5 pt-2">
                                        <a href="https://wa.me/+966536032067" target="_blank" rel="noopener noreferrer" className="text-[14px] font-light text-white/70 hover:text-[#F58220] transition-colors">
                                            +966 53 603 2067
                                        </a>
                                        <a href="mailto:info@nexhibitarabia.com" className="text-[14px] font-light text-white/70 hover:text-[#F58220] transition-colors">
                                            info@nexhibitarabia.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <a href="https://www.instagram.com/nexhibitarabia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#F58220] hover:border-[#F58220] transition-all duration-300 group/social">
                                        <svg className="w-5 h-5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                        </svg>
                                    </a>
                                    <a href="https://www.facebook.com/people/Nexhibit-Arabia-Exhibition-Events-Advertising/61588459674395/?sk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#F58220] hover:border-[#F58220] transition-all duration-300 group/social">
                                        <svg className="w-5 h-5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a href="https://x.com/nexhibitarabia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#F58220] hover:border-[#F58220] transition-all duration-300 group/social">
                                        {/* <svg className="w-4 h-4 fill-current leading-none translate-y-[1px]" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg> */}
                                        <svg
                                            className="w-4 h-4 fill-current leading-none translate-y-[1px]"
                                            viewBox="0 0 300 271"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.linkedin.com/company/nexhibitarabia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#F58220] hover:border-[#F58220] transition-all duration-300 group/social">
                                        <svg className="w-5 h-5 fill-none stroke-current stroke-[8]" viewBox="0 0 100 100">
                                            <path stroke="currentColor" strokeLinejoin="round" d="M10 32h17v48H10z M18.5 22a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z M41 32h16.5v6.5c2.5-4.5 8-7.5 15-7.5 14 0 17.5 9 17.5 20V80h-17V51c0-7-2-11.5-8.5-11.5-5 0-8 3.5-9.5 7-.3 1-.5 2.5-.5 4V80H41V32z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Presence Section - Refined to match system pattern */}
                <div className="mt-6 pt-6 border-t border-white/5">
                    <div className="flex flex-col items-center gap-6">
                        <span className="type-label text-white/30 text-[9px] tracking-[0.4em]">
                            Global Presence
                        </span>

                        <div className="flex flex-wrap justify-center gap-4 max-w-4xl px-4">
                            {[
                                { region: 'MENA', office: 'Dubai, UAE' },
                                { region: 'EU', office: 'Poznań, Poland' },
                                { region: 'UK', office: 'London, United Kingdom' },
                                { region: 'NA', office: 'North Las Vegas, USA' },
                            ].map((item) => (
                                <div
                                    key={item.office}
                                    className="flex items-center gap-3.5 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 hover:border-[#F58220]/20 transition-all duration-500 group/presence"
                                >
                                    {/* Region Identifier */}
                                    <span className="text-[10px] font-black tracking-widest text-[#F58220] uppercase">
                                        {item.region}
                                    </span>

                                    {/* Divider Dot */}
                                    <div className="w-[1px] h-3 bg-white/10" />

                                    {/* Office Text */}
                                    <span className="text-[12px] md:text-[13px] text-white/50 group-hover/presence:text-white transition-colors font-light">
                                        {item.office}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Global Signature Line */}
                <div className="mt-8 md:mt-8 pt-8 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <p className="text-[13px] text-white/80 font-light tracking-tight">
                            © {new Date().getFullYear()} Nexhibit Arabia. All rights reserved.
                        </p>
                    </div>

                    <div className="hidden md:block flex-1 max-w-[100px] h-[1px] bg-white/5" />

                    <div className="flex items-center gap-1 text-[12px] text-white/60 font-light">
                        Designed & handcrafted by<a href="https://trowcode.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#F58220] font-medium transition-all duration-300 border-b border-white/10">Trowcode</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
