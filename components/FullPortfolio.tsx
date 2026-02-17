
import React, { useState, useEffect } from 'react';
import { portfolioData, PortfolioItem } from '../data/portfolio';
import Logo from './Logo';

interface FullPortfolioProps {
    onBack: () => void;
}

const FullPortfolio: React.FC<FullPortfolioProps> = ({ onBack }) => {
    const [filter, setFilter] = useState<'all' | 'flagship'>('all');
    const [items, setItems] = useState<PortfolioItem[]>(portfolioData);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (filter === 'all') {
            setItems(portfolioData);
        } else {
            setItems(portfolioData.filter(item => item.isFlagship));
        }
    }, [filter]);

    return (
        <div className="min-h-screen bg-white text-[#1c1c1b] font-sans selection:bg-[#F58220] selection:text-white">

            <main className="pt-40 pb-32 px-6 lg:px-24 container mx-auto">
                {/* Header Section */}
                <div className="mb-20">
                    <div className="max-w-3xl">
                        <span className="type-label text-[#F58220] block mb-3 uppercase tracking-widest font-black text-[8px]">Archive</span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#1c1c1b] leading-[0.85]">
                            Where Ideas Take<br /><span className="text-black/10">Shape.</span>
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-12">
                        <button
                            onClick={() => setFilter('all')}
                            className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all ${filter === 'all' ? 'bg-[#1c1c1b] text-white' : 'bg-stone-50 text-black/40 hover:bg-stone-100'}`}
                        >
                            All Projects ({portfolioData.length})
                        </button>
                        <button
                            onClick={() => setFilter('flagship')}
                            className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all ${filter === 'flagship' ? 'bg-[#F58220] text-white' : 'bg-stone-50 text-black/40 hover:bg-stone-100'}`}
                        >
                            Flagship
                        </button>
                    </div>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-20">
                    {items.map((project, i) => (
                        <div key={project.id} className="group cursor-pointer">
                            {/* Card Media with Hover Text */}
                            <div className="relative aspect-[16/10] md:aspect-[4/5] overflow-hidden bg-stone-50 border border-black/[0.03]">
                                <img
                                    src={project.image}
                                    alt={project.heading}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {project.isFlagship && (
                                    <div className="absolute top-6 left-6 z-10">
                                        <span className="bg-[#F58220]/80 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                                            Flagship
                                        </span>
                                    </div>
                                )}

                                {/* Overlay Description */}
                                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-10 text-center">
                                    <p className="text-white/90 text-[13px] font-light leading-relaxed mb-6">
                                        {project.description}
                                    </p>
                                    <div className="w-8 h-[1px] bg-[#F58220] mx-auto" />
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-1.5">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#F58220] text-[10px] font-black tracking-widest">WORK {i < 9 ? `0${i + 1}` : i + 1}</span>
                                        <div className="h-[4px] w-[1px] bg-black/10" />
                                        <span className="text-[8px] font-bold text-black/30 uppercase tracking-widest">
                                            {project.date}
                                        </span>
                                    </div>
                                    <div className="h-[1px] flex-1 bg-black/5" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight group-hover:text-[#F58220] transition-colors leading-tight">
                                    {project.heading}
                                </h3>
                                <div className="flex flex-col gap-2.5 mt-3">
                                    <p className="text-black/40 text-[9px] font-black uppercase tracking-[0.2em]">{project.expo}</p>
                                    <div className="flex items-center gap-1.5 opacity-30">
                                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5]">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="text-[11px] font-medium leading-none">{project.venue}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {items.length === 0 && (
                    <div className="py-48 text-center bg-stone-50 border border-dashed border-stone-200">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">No match records found</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FullPortfolio;
