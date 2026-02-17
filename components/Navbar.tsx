import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';

interface NavbarProps {
    isScrolled: boolean;
    navLinks: { name: string; id: string }[];
    activeSection: string;
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
    onExplorePortfolio: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    isScrolled,
    navLinks,
    activeSection,
    isMenuOpen,
    setIsMenuOpen,
    onExplorePortfolio,
}) => {
    const location = useLocation();
    const isLightMode = isScrolled || location.pathname === '/portfolio';

    return (
        <>
            <header className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isLightMode
                    ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.03] py-4'
                    : 'bg-transparent py-8'
                }
        pointer-events-none
      `}>
                <div className={`
                    flex items-center justify-between pointer-events-auto transition-all duration-700 ease-in-out
                    ${isLightMode ? 'container md:mx-auto px-6 lg:px-24' : 'w-full px-6 lg:px-24'}
                `}>                    <div className="flex-1 flex justify-start">
                        <Logo
                            mode={isLightMode ? 'light' : 'dark'}
                            className="transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    <nav className="hidden lg:flex flex-1 justify-center items-center gap-12">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.id === 'portfolio-link' ? '/portfolio' : (location.pathname === '/' ? `#${link.id}` : `/#${link.id}`)}
                                className={`
                  flex items-center gap-2 group/link transition-all duration-500 hover:-translate-y-0.5
                  ${isLightMode ? 'text-black/40 hover:text-black' : 'text-white/40 hover:text-white'}
                  ${activeSection === link.id ? '!opacity-100 !text-[#F58220]' : ''}
                `}
                            >
                                <span className="type-label text-[10px] font-black tracking-[0.2em]">{link.name}</span>
                            </a>
                        ))}
                    </nav>

                    <div className="flex-1 flex justify-end items-center gap-8">
                        <a
                            href="#contact"
                            className={`
              hidden sm:flex items-center gap-3 type-label px-10 py-3 rounded-full transition-all duration-500 text-[10px] font-bold tracking-wide group/btn overflow-hidden relative
              ${isLightMode
                                    ? 'bg-black text-white hover:bg-[#F58220] hover:-translate-y-1'
                                    : 'bg-white text-black hover:bg-[#F58220] hover:text-white hover:-translate-y-1 shadow-lg'
                                }
            `}>
                            <span className="relative z-10">Contact</span>
                        </a>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`flex items-center gap-3 p-2 lg:hidden transition-all duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}
                        >
                            <div className="flex flex-col gap-1.5">
                                <div className={`w-6 h-[1.5px] bg-current transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                <div className={`w-4 h-[1.5px] bg-current self-end transition-all duration-500 ${isMenuOpen ? 'opacity-0' : ''}`} />
                                <div className={`w-6 h-[1.5px] bg-current transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={`
        fixed inset-0 z-[60] bg-white/80 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden
        ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
      `}>
                <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />
                <header className="absolute top-0 left-0 w-full px-8 flex justify-between items-center h-24">
                    <Logo mode="light" className="scale-75 origin-left" />
                    <button onClick={() => setIsMenuOpen(false)} className="relative w-10 h-10 flex items-center justify-center p-2">
                        <div className="absolute w-6 h-[1px] bg-black rotate-45" />
                        <div className="absolute w-6 h-[1px] bg-black -rotate-45" />
                    </button>
                </header>

                <div className="flex flex-col justify-center h-full px-8 gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.id === 'portfolio-link' ? '/portfolio' : `#${link.id}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="group flex flex-col py-6 border-b border-black/[0.03]"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-extralight tracking-wide text-[#1c1c1b] group-hover:text-[#F58220] transition-colors">
                                    {link.name}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="absolute bottom-12 left-0 w-full px-8 flex flex-col gap-10">
                    {/* Socials or other info can go here, or just keep it clean */}
                    <div className="flex flex-col gap-4 border-t border-black/[0.05] pt-10">
                        <p className="text-[10px] text-black/40 font-black tracking-widest uppercase">Inquiries</p>
                        <a href="mailto:info@nexhibitarabia.com" className="text-lg font-light">info@nexhibitarabia.com</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
