import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
    const [riyadhTime, setRiyadhTime] = useState('');

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
        <footer className="bg-[#000000] text-white pt-16 pb-8 relative">
            {/* Dynamic Background Accent */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-blueprint opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

                    {/* LEFT: Identity */}
                    <div className="lg:col-span-5 flex flex-col items-start justify-between">
                        <div>
                            <Logo mode="dark" className=" mb-10" />
                            <p className="text-white/40 text-sm leading-relaxed max-w-sm font-light">
                                Engineering immersive exhibition experiences from Riyadh to the world. We transform empty volumes into high-performance brand environments.
                            </p>
                        </div>

                        <div className="mt-12 flex items-center gap-4 bg-white/[0.03] border border-white/5 px-5 py-2.5 rounded-full backdrop-blur-sm">
                            <span className="type-label text-[8px] tracking-[0.3em] text-white/40">TIME:  {riyadhTime}</span>
                        </div>
                    </div>

                    {/* RIGHT: Navigation & Action */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 lg:gap-8 pt-4">

                        {/* Column 1: Archive */}
                        <div className="col-span-1">
                            <h4 className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] mb-8">Archive</h4>
                            <ul className="flex flex-col gap-4">
                                {links.explore.map(link => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-[12px] font-medium text-white/50 hover:text-white transition-all duration-300">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2: Connect */}
                        <div className="col-span-1">
                            <h4 className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] mb-8">Connect</h4>
                            <ul className="flex flex-col gap-4">
                                {links.socials.map(link => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-[12px] font-medium text-white/50 hover:text-white transition-all duration-300">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: The Call to Action */}
                        <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-8 lg:gap-10">
                            <div>
                                <h4 className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] mb-6">Location</h4>
                                <div className="flex flex-col gap-3">
                                    <p className="text-[13px] text-white/80 leading-relaxed font-light tracking-tight">
                                        3842, Al tabaq<br />
                                        <span className="text-[13px] text-white/80  font-light">Riyadh, Saudi Arabia</span>
                                    </p>
                                    <div className="flex items-center gap-3 group/phone">
                                        {/* <div className="w-1.5 h-1.5 rounded-full bg-[#F58220]/40 group-hover/phone:scale-125 transition-transform" /> */}
                                        <p className="text-[12px] font-light text-white/60 hover:text-[#F58220] transition-all duration-300 tracking-wider">Phone: </p>
                                        <a href="tel:+966536032067" className="text-[12px] font-light text-white/60 hover:text-[#F58220] transition-all duration-300 tracking-wider">
                                            +966 53 603 2067
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <a href="#contact" className="group flex items-center gap-4 bg-white/[0.03] border border-white/10 px-6 py-3 rounded-full hover:bg-[#F58220] hover:border-[#F58220] transition-all duration-500">
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
                    </div>
                </div>

                {/* Global Signature Line */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-1 text-center md:text-left">
                        <p className="text-[11px] text-white/30 font-black uppercase mb-1">© 2026 NEXHIBIT ARABIA</p>
                        <p className="text-[10px] text-white/30 font-medium ">All rights reserved.</p>
                    </div>

                    <div className="h-[1px] flex-1 bg-white/5 hidden md:block mx-12" />

                    <p className="type-label text-[9px] text-white/30 tracking-[0.3em] font-light">
                        Designed & Built by <a href="https://trowcode.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#F58220] font-bold transition-all duration-300 border-b border-white/10 pb-0.5">TROWCODE</a>.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
