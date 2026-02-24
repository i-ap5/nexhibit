import React from 'react';

const row1Logos = [
    'aramco.png', 'bosch.png', 'ey.png', 'jpMorgan.png', 'lulu.png',
    'Lumi.png', 'Made-in-China.com_logo.png', 'Nournet.png', 'Poongsan_Logo.png',
    'Saudi-Ceramics.png', 'taajeer.png', 'toshiba.png', 'siafa.png',
    'Zharawi.png', 'Hennissy.png', 'alrajhi.jpg'
];

const row2Logos = [
    'ADS.png', 'CYG.png', 'H.png', 'Leboo.png', 'MYANDE_CORPMEMBER_LOGO.png',
    'Tibox-1.png', '_.png', 'bahce.png', 'ha.png', 'kortrong.png',
    'sette.png', 'silqfi-logo.png', 'spire.png', 'sunket-logo.png',
    'vitzro.png', 'vontron.png'
];

const TrustedBy: React.FC = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden border-t border-black/[0.03]">
            <div className="absolute inset-0 bg-blueprint opacity-[0.02] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-24 mb-16 relative z-10 text-center">
                <span className="type-label text-[#F58220] block mb-3 uppercase tracking-widest font-black text-[10px]">Partners</span>
                <h2 className="text-4xl font-black tracking-tight text-[#1c1c1b]">Trusted By Global Brands</h2>
            </div>

            <div className="relative w-full flex flex-col gap-10 sm:gap-14 overflow-hidden z-10 mt-10">
                {/* Row 1: Scrolling Left */}
                <div className="flex w-max shrink-0 animate-marquee-left items-center gap-16 sm:gap-24 px-10">
                    {row1Logos.map((logo, index) => (
                        <img
                            key={`r1-${index}`}
                            src={`/assets/trustedAssets/${logo}`}
                            alt={`Trusted Partner ${index + 1}`}
                            className="h-8 sm:h-12 lg:h-12 w-auto max-w-[110px] sm:max-w-[140px] lg:max-w-[170px] object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                        />
                    ))}
                    {row1Logos.map((logo, index) => (
                        <img
                            key={`r1-dup-${index}`}
                            src={`/assets/trustedAssets/${logo}`}
                            alt={`Trusted Partner Duplicate ${index + 1}`}
                            className="h-8 sm:h-12 lg:h-12 w-auto max-w-[110px] sm:max-w-[140px] lg:max-w-[170px] object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                        />
                    ))}
                </div>

                {/* Row 2: Scrolling Right */}
                <div className="flex w-max shrink-0 animate-marquee-right items-center gap-16 sm:gap-24 px-10">
                    {row2Logos.map((logo, index) => (
                        <img
                            key={`r2-${index}`}
                            src={`/assets/trustedAssets/${logo}`}
                            alt={`Trusted Partner ${index + 1}`}
                            className="h-8 sm:h-12 lg:h-12 w-auto max-w-[110px] sm:max-w-[140px] lg:max-w-[170px] object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                        />
                    ))}
                    {row2Logos.map((logo, index) => (
                        <img
                            key={`r2-dup-${index}`}
                            src={`/assets/trustedAssets/${logo}`}
                            alt={`Trusted Partner Duplicate ${index + 1}`}
                            className="h-8 sm:h-12 lg:h-12 w-auto max-w-[110px] sm:max-w-[140px] lg:max-w-[170px] object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                        />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes marqueeLeft {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marqueeRight {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                }
                .animate-marquee-left {
                    animation: marqueeLeft 45s linear infinite;
                }
                .animate-marquee-right {
                    animation: marqueeRight 40s linear infinite;
                }
                .animate-marquee-left:hover, .animate-marquee-right:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default TrustedBy;
