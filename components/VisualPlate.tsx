'use client';

import { useState } from 'react';
import type { VisualPlateConfig } from '@/content/types';

interface VisualPlateProps {
  plate: VisualPlateConfig;
  className?: string;
  compact?: boolean;
  showFigureTag?: boolean;
}

/**
 * Minimalist upload-ready visual frame.
 * - If `plate.imageSrc` is set in your post file, it renders your photo cleanly (`object-cover`).
 * - Otherwise, it renders a warm editorial architectural placeholder inspired by the Scale & Substance plates.
 */
export default function VisualPlate({
  plate,
  className = '',
  compact = false,
  showFigureTag = true,
}: VisualPlateProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (plate.imageSrc && !imgFailed) {
    return (
      <div
        className={`relative overflow-hidden bg-[#E5DFD2] ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={plate.imageSrc}
          alt={plate.alt}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      role="img"
      aria-label={plate.alt}
    >
      {plate.motif === 'desk-horizon' && (
        <svg
          viewBox="0 0 350 190"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="plateWarmStudio" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#DCD0BC" />
              <stop offset="55%" stopColor="#A68A6B" />
              <stop offset="100%" stopColor="#3B2E25" />
            </linearGradient>
          </defs>
          <rect width="350" height="190" fill="url(#plateWarmStudio)" />
          <polygon points="0,130 350,104 350,190 0,190" fill="#2A211B" />
          <circle cx="74" cy="58" r="26" fill="#F6E5C4" opacity="0.28" />
          <circle cx="74" cy="58" r="10" fill="#FFF3D6" opacity="0.72" />
          <rect
            x="126"
            y="42"
            width="124"
            height="74"
            rx="4"
            fill="#1E2B37"
            stroke="#E8DCC8"
            strokeWidth="1.8"
          />
          <rect x="136" y="52" width="104" height="54" fill="#2D4556" />
          <polyline
            points="144,94 164,83 184,87 206,66 232,60"
            fill="none"
            stroke="#90C2B5"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="232" cy="60" r="3" fill="#F3EFE6" />
          <line
            x1="0"
            y1="130"
            x2="350"
            y2="104"
            stroke="#D9C7AE"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
        </svg>
      )}

      {plate.motif === 'architectural-grid' && (
        <svg
          viewBox="0 0 220 156"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="plateArchStone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DFD9CC" />
              <stop offset="100%" stopColor="#B8B09F" />
            </linearGradient>
          </defs>
          <rect width="220" height="156" fill="url(#plateArchStone)" />
          <rect
            x="32"
            y="30"
            width="156"
            height="96"
            rx="3"
            fill="#F8F5EE"
            stroke="#8E8678"
            strokeWidth="1"
          />
          <line x1="48" y1="52" x2="122" y2="52" stroke="#141414" strokeWidth="2.2" />
          <line x1="48" y1="66" x2="168" y2="66" stroke="#9A9386" strokeWidth="1.4" />
          <rect x="48" y="80" width="56" height="30" rx="2" fill="#4A7C8C" opacity="0.82" />
          <rect x="114" y="80" width="56" height="30" rx="2" fill="#131E29" opacity="0.88" />
        </svg>
      )}

      {plate.motif === 'tablet-sketch' && (
        <svg
          viewBox="0 0 220 190"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="plateDeskPaper" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E7E2D7" />
              <stop offset="100%" stopColor="#C8C0B2" />
            </linearGradient>
          </defs>
          <rect width="220" height="190" fill="url(#plateDeskPaper)" />
          <g transform="translate(26, 32) rotate(-7)">
            <rect x="0" y="14" width="154" height="112" rx="9" fill="#1B2229" />
            <rect x="8" y="22" width="138" height="96" rx="4" fill="#F9F7F2" />
            <rect
              x="20"
              y="34"
              width="50"
              height="34"
              rx="2"
              fill="none"
              stroke="#5A5750"
              strokeWidth="1.2"
            />
            <line x1="20" y1="34" x2="70" y2="68" stroke="#B5AFA2" strokeWidth="1" />
            <rect x="80" y="34" width="54" height="14" rx="2" fill="#D5D0C5" />
            <rect x="80" y="54" width="38" height="14" rx="2" fill="#D5D0C5" />
            <rect x="20" y="78" width="114" height="26" rx="3" fill="#4A7C8C" opacity="0.28" />
            <line
              x1="104"
              y1="86"
              x2="174"
              y2="18"
              stroke="#FFFFFF"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <line
              x1="104"
              y1="86"
              x2="112"
              y2="78"
              stroke="#141414"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </g>
        </svg>
      )}

      {plate.motif === 'night-lamp' && (
        <svg
          viewBox="0 0 200 176"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="plateMoodyNight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3F2F23" />
              <stop offset="100%" stopColor="#131E29" />
            </linearGradient>
          </defs>
          <rect width="200" height="176" fill="url(#plateMoodyNight)" />
          <circle cx="100" cy="84" r="46" fill="#E3B375" opacity="0.22" />
          <circle cx="100" cy="84" r="24" fill="#F2CA91" opacity="0.18" />
          <polygon points="78,92 122,92 110,60 90,60" fill="#E9C28D" opacity="0.88" />
          <line x1="100" y1="92" x2="100" y2="128" stroke="#9B856E" strokeWidth="2" />
          <rect x="0" y="128" width="200" height="48" fill="#181513" opacity="0.72" />
        </svg>
      )}

      {plate.motif === 'studio-blocks' && (
        <svg
          viewBox="0 0 220 156"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
        >
          <rect width="220" height="156" fill="#C4B9A6" />
          <rect x="34" y="34" width="152" height="84" rx="4" fill="#F3EFE6" />
          <rect x="48" y="48" width="56" height="52" rx="2.5" fill="#73937E" />
          <rect x="114" y="48" width="58" height="23" rx="2.5" fill="#131E29" />
          <rect x="114" y="77" width="58" height="23" rx="2.5" fill="#4A7C8C" />
        </svg>
      )}

      {plate.motif === 'reader-arc' && (
        <svg
          viewBox="0 0 220 156"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
        >
          <rect width="220" height="156" fill="#243746" />
          <g stroke="#395265" strokeWidth="0.8">
            <line x1="24" y1="38" x2="196" y2="38" />
            <line x1="24" y1="74" x2="196" y2="74" />
            <line x1="24" y1="110" x2="196" y2="110" />
          </g>
          <polyline
            points="28,116 66,94 104,102 146,62 190,46"
            fill="none"
            stroke="#E8DFC8"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="190" cy="46" r="4.5" fill="#C48F5A" />
        </svg>
      )}

      {plate.motif === 'minimal-frame' && (
        <svg
          viewBox="0 0 220 156"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
        >
          <rect width="220" height="156" fill="#1B2835" />
          <rect
            x="24"
            y="24"
            width="172"
            height="108"
            rx="4"
            fill="none"
            stroke="#4A7C8C"
            strokeDasharray="4 4"
            strokeWidth="1.2"
          />
          <line x1="24" y1="78" x2="196" y2="78" stroke="#31475B" strokeWidth="1" />
          <line x1="110" y1="24" x2="110" y2="132" stroke="#31475B" strokeWidth="1" />
          <circle cx="110" cy="78" r="16" fill="none" stroke="#8FB3C0" strokeWidth="1.4" />
        </svg>
      )}

      {/* Subtle architectural upload-ready plate caption at bottom-left */}
      {showFigureTag && !compact && (
        <div
          className={`pointer-events-none absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.08em] ${
            plate.tone === 'moody' || plate.tone === 'slate' || plate.motif === 'desk-horizon' || plate.motif === 'reader-arc'
              ? 'text-[#E7E2D6]/80'
              : 'text-[#141414]/65'
          }`}
        >
          <span className="truncate">{plate.figureLabel}</span>
          <span className="hidden shrink-0 sm:inline">{plate.aspectHint}</span>
        </div>
      )}
    </div>
  );
}
