
import React from 'react';

const Promise: React.FC = () => {
  return (
    <section className="py-40 bg-black relative overflow-hidden">
      <div className="container mx-auto px-10 lg:px-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative p-16 glass-card border-[#F58220]/20 bg-[#F58220]/[0.02]">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#F58220] flex items-center justify-center font-bold text-black text-xl">!</div>
            <h2 className="text-5xl font-bold text-white uppercase mb-10 tracking-tighter">Our Promise.</h2>
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-10">
              With <span className="text-[#F58220] font-medium">NEXHIBIT ARABIA</span>, you're choosing more than a service provider—you're partnering with a dedicated team that transforms ideas into remarkable realities.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-8 h-[2px] bg-[#D9EA85]" />
                <span className="text-white font-semibold italic text-lg uppercase tracking-tight">We don’t just meet expectations — We exceed them.</span>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="text-5xl lg:text-7xl font-bold text-white uppercase mb-10 tracking-tighter leading-tight">
              Let’s Build <br /><span className="text-[#D9EA85] italic font-medium">Something Extraordinary.</span>
            </h3>
            <p className="text-gray-400 text-xl font-light mb-12 max-w-lg mx-auto lg:mx-0">
              Whether it’s a trade show, a conference, or a brand showcase, we’re ready to turn your vision into a powerful, immersive experience.
            </p>
            <button className="px-16 py-6 border-2 border-white text-white font-bold text-[10px] tracking-[0.6em] uppercase hover:bg-white hover:text-black transition-all">
              Initiate Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promise;
