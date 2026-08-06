'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 44 }) => {
  return (
    <div className={`flex items-center space-x-3.5 ${className}`}>
      {/* Pure White Base 3-Dot Ascending W Logo Icon */}
      <div className="relative group flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="blueLineVibrant" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            <filter id="vibrantGlow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#2563EB" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Pure Opaque White Card Base */}
          <rect x="0" y="0" width="48" height="48" rx="12" fill="#FFFFFF" />
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="11"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            className="shadow-sm"
          />

          {/* Proportional W Trajectory Line */}
          <path
            d="M 8 22 L 15 34 L 22 17 L 29 27 L 38 10"
            stroke="url(#blueLineVibrant)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#vibrantGlow)"
          />

          {/* Three Sequential Ascending Growth Dots */}
          <circle cx="8" cy="22" r="3.2" fill="#4F46E5" />
          <circle cx="22" cy="17" r="3.5" fill="#2563EB" />
          <circle cx="38" cy="10" r="4.5" fill="#0284C7" filter="url(#vibrantGlow)" />
        </svg>
      </div>

      {/* Executive Premium Typography (Slate Navy + Growth Blue + Crimson Red Accent) */}
      <div className="flex flex-col justify-center leading-none space-y-0.5">
        {/* Line 1: Solid Dark Slate Navy + Brand Blue Suffix */}
        <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
          WillSun<span className="text-blue-600">.agency</span>
        </span>
        
        {/* Line 2: Refined Monetization Slate Gray (Fits Flush) */}
        <span className="text-[9.5px] tracking-wider text-slate-500 uppercase font-semibold">
          Growth & Monetize
        </span>
        
        {/* Line 3: Crimson Red Accent Studio Badge */}
        <span className="text-[9.5px] tracking-widest text-red-600 uppercase font-extrabold">
          Studio
        </span>
      </div>
    </div>
  );
};
