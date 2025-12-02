import React from 'react';

export const Background: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-950">
            {/* Blob 1: Purple/Blue - Top Left */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] animate-float-slow" />

            {/* Blob 2: Cyan/Blue - Bottom Right */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] animate-float-medium delay-1000" />

            {/* Blob 3: Pink/Violet - Top Right (smaller) */}
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-pink-600/15 blur-[100px] animate-pulse-glow" />

            {/* Blob 4: Indigo - Bottom Left (smaller) */}
            <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] rounded-full bg-indigo-600/15 blur-[100px] animate-float-fast delay-2000" />

            {/* Overlay texture (optional, for noise/grain if desired later) */}
            <div className="absolute inset-0 bg-transparent" />
        </div>
    );
};
