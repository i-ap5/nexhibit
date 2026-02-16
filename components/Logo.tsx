
import React, { useState } from 'react';

interface LogoProps {
    mode?: 'light' | 'dark'; // 'light' means the BG is light (use black logo), 'dark' means BG is dark (use white logo)
    className?: string;
    showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ mode = 'light', className = '', showText = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getLogoSrc = () => {
        if (isHovered) return '/assets/nexhibitLogo.webp';
        return mode === 'dark' ? '/assets/nexhibitLogo_W.webp' : '/assets/nexhibitLogo_B.webp';
    };

    return (
        <div
            className={`flex items-center gap-3 cursor-pointer group transition-all duration-300 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-full w-auto flex items-center justify-center overflow-hidden">
                <img
                    src={getLogoSrc()}
                    alt="Nexhibit Arabia Logo"
                    className="h-8 lg:h-10 w-auto object-contain transition-all duration-500 ease-in-out group-hover:scale-105"
                />
            </div>
            {showText && (
                <div className="flex flex-col">
                    {/* Optional text or sub-branding if needed in the future */}
                </div>
            )}
        </div>
    );
};

export default Logo;
