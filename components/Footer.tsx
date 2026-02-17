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
            { name: 'About', href: '#about' },
            { name: 'Services', href: '#services' },
            { name: 'Process', href: '#process' },
            { name: 'Works', href: '#works' }
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
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">

                        {/* Column 1: Archive */}
                        <div>
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
                        <div>
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
                        <div className="flex flex-col items-start gap-4">
                            <h4 className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] mb-4 md:mb-8">Action</h4>
                            <a href="mailto:hello@nexhibit.sa" className="group flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#F58220] group-hover:border-[#F58220] transition-all duration-500">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white fill-none stroke-[1.5] group-hover:-rotate-45 transition-transform duration-500">
                                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span className="text-sm font-light tracking-tight text-white group-hover:translate-x-2 transition-transform duration-500">
                                    Get in Touch
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Global Signature Line */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-1 text-center md:text-left">
                        <p className="text-[10px] text-white/20 font-black tracking-[0.5em] uppercase">© 2026 Nexhibit Arabia</p>
                        <p className="text-[8px] text-white/10 font-medium tracking-[0.2em] uppercase">All rights reserved.</p>
                    </div>

                    <div className="h-[1px] flex-1 bg-white/5 hidden md:block mx-12" />

                    <p className="type-label text-[8px] text-white/30 tracking-[0.4em]">
                        Designed by Trowcode.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
