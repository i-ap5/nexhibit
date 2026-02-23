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
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 pt-4">

                        {/* Column 1: Navigation */}
                        <div className="md:col-span-1">
                            <h4 className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] mb-10">Directory</h4>
                            <ul className="flex flex-col gap-6">
                                {links.explore.map(link => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-[14px] font-light text-white/50 hover:text-white transition-all duration-300">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2: Reach out - Merged Location & Connect */}
                        <div className="md:col-span-1 flex flex-col gap-12">
                            <div>
                                <h4 className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] mb-8">Reach Out</h4>
                                <div className="flex flex-col gap-6">
                                    <div className="space-y-2">
                                        <p className="text-[14px] text-white/80 leading-relaxed font-light tracking-tight">
                                            3842, Al tabaq, Riyadh 14214<br />
                                            Saudi Arabia
                                        </p>
                                        <div className="flex flex-col gap-1 pt-2">
                                            <a href="tel:+966536032067" className="text-[14px] font-light text-white/60 hover:text-[#F58220] transition-colors">
                                                +966 53 603 2067
                                            </a>
                                            <a href="mailto:info@nexhibitarabia.com" className="text-[14px] font-light text-white/60 hover:text-[#F58220] transition-colors">
                                                info@nexhibitarabia.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Social Icons Row */}
                                    <div className="flex gap-4 pt-2">
                                        <a href="https://www.instagram.com/nexhibitarabia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#F58220] hover:border-[#F58220] transition-all duration-300 group/social">
                                            <svg className="w-5 h-5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                            </svg>
                                        </a>
                                        <a href="https://www.linkedin.com/company/nexhibitarabia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#F58220] hover:border-[#F58220] transition-all duration-300 group/social">
                                            <svg className="w-5 h-5 fill-none stroke-current stroke-[8]" viewBox="0 0 100 100">
                                                <path stroke="currentColor" strokeLinejoin="round" d="M10 32h17v48H10z M18.5 22a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z M41 32h16.5v6.5c2.5-4.5 8-7.5 15-7.5 14 0 17.5 9 17.5 20V80h-17V51c0-7-2-11.5-8.5-11.5-5 0-8 3.5-9.5 7-.3 1-.5 2.5-.5 4V80H41V32z" />
                                            </svg>
                                        </a>
                                        <a href="mailto:info@nexhibitarabia.com" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#F58220] hover:border-[#F58220] transition-all duration-300 group/social">
                                            <svg className="w-5 h-5 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <a href="#contact" className="group flex items-center gap-4 bg-white/[0.03] border border-white/10 px-6 py-3 rounded-full hover:bg-[#F58220] hover:border-[#F58220] transition-all duration-500 w-fit">
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
                <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <p className="text-[13px] text-white/60 font-light tracking-tight">
                            © {new Date().getFullYear()} Nexhibit Arabia. All rights reserved.
                        </p>
                    </div>

                    <div className="hidden md:block flex-1 max-w-[100px] h-[1px] bg-white/5" />

                    <div className="flex items-center gap-2 text-[12px] text-white/40 font-light">
                        Designed & handcrafted by<a href="https://trowcode.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#F58220] font-medium transition-all duration-300 border-b border-white/10">Trowcode</a>.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
