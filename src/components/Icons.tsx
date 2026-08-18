import React from 'react';

const Y = '#FFD84D';
const O = '#FF5C1F';
const P = '#FFB3A0';
const B = '#A8C8F0';
const DARK = '#4A3A10';

export const OccasionIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-11 h-11' }) => {
  switch (name) {
    case 'belly': // 만삭
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="26" cy="18" r="9" fill={Y} />
          <path d="M22 27c-5 0-9 5-9 12v13h12" fill={Y} />
          <circle cx="34" cy="40" r="15" fill={Y} />
          <circle cx="34" cy="40" r="9" fill={O} opacity="0.3" />
          <circle cx="23" cy="17" r="1.5" fill={DARK} />
          <circle cx="29" cy="17" r="1.5" fill={DARK} />
        </svg>
      );
    case 'newborn': // 신생아
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="32" cy="30" r="17" fill={Y} />
          <path d="M27 12c2-4 8-4 10 0" stroke={O} strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="26" cy="29" r="2" fill={DARK} />
          <circle cx="38" cy="29" r="2" fill={DARK} />
          <path d="M28 37a5 5 0 008 0" stroke={O} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <circle cx="19" cy="34" r="3.5" fill={P} opacity="0.75" />
          <circle cx="45" cy="34" r="3.5" fill={P} opacity="0.75" />
        </svg>
      );
    case 'cake': // 100일
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <rect x="12" y="32" width="40" height="20" rx="4" fill={Y} />
          <rect x="12" y="32" width="40" height="7" rx="3.5" fill={P} />
          <rect x="30" y="18" width="4" height="12" rx="2" fill="#fff" stroke={O} strokeWidth="1.5" />
          <path d="M32 12c3 3 2 6 0 6s-3-3 0-6z" fill={O} />
          <circle cx="20" cy="44" r="2.5" fill={O} opacity="0.5" />
          <circle cx="32" cy="46" r="2.5" fill={O} opacity="0.5" />
          <circle cx="44" cy="44" r="2.5" fill={O} opacity="0.5" />
        </svg>
      );
    case 'crown': // 돌
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M12 44l-4-22 12 8 12-16 12 16 12-8-4 22z" fill={Y} />
          <rect x="12" y="44" width="40" height="7" rx="3" fill={O} />
          <circle cx="20" cy="34" r="2.5" fill={O} />
          <circle cx="32" cy="30" r="2.5" fill={O} />
          <circle cx="44" cy="34" r="2.5" fill={O} />
        </svg>
      );
    case 'family': // 가족
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="18" cy="22" r="8" fill={Y} />
          <path d="M8 50c0-8 4-14 10-14s10 6 10 14z" fill={Y} />
          <circle cx="44" cy="22" r="8" fill={P} />
          <path d="M34 50c0-8 4-14 10-14s10 6 10 14z" fill={P} />
          <circle cx="31" cy="35" r="6" fill={O} />
          <path d="M24 52c0-6 3-10 7-10s7 4 7 10z" fill={O} />
        </svg>
      );
    case 'profile': // 프로필
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="32" cy="24" r="11" fill={Y} />
          <path d="M14 54c0-11 8-18 18-18s18 7 18 18z" fill={Y} />
          <rect x="40" y="38" width="17" height="13" rx="3" fill={B} />
          <circle cx="48.5" cy="44.5" r="4" fill="#fff" />
          <rect x="45" y="34" width="7" height="5" rx="1.5" fill={B} />
        </svg>
      );
    case 'ring': // 웨딩 본식
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="32" cy="38" r="15" fill="none" stroke={Y} strokeWidth="7" />
          <path d="M24 18h16l7 9-15 9-15-9z" fill={B} />
          <path d="M24 18l8 9 8-9M17 27h30" stroke="#fff" strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'dress': // 리허설
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="32" cy="14" r="6" fill={Y} />
          <path d="M26 22h12l4 10-4 4 8 22H18l8-22-4-4z" fill="#fff" stroke={Y} strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M28 24l4 12 4-12" stroke={O} strokeWidth="1.8" fill="none" />
        </svg>
      );
    case 'couple': // 커플
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M23 44S11 35 11 26a8 8 0 0114-5 8 8 0 0114 5c0 9-12 18-12 18z" fill={P} />
          <path d="M43 52S33 45 33 37a6.5 6.5 0 0111-4 6.5 6.5 0 0111 4c0 8-12 15-12 15z" fill={O} opacity="0.85" />
        </svg>
      );
    case 'pet': // 반려동물
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <ellipse cx="32" cy="38" rx="16" ry="14" fill={Y} />
          <path d="M14 22l6 10-9 2z" fill={Y} />
          <path d="M50 22l-6 10 9 2z" fill={Y} />
          <circle cx="25" cy="36" r="2.4" fill={DARK} />
          <circle cx="39" cy="36" r="2.4" fill={DARK} />
          <ellipse cx="32" cy="43" rx="4" ry="3" fill={O} />
          <path d="M32 46v3M28 50a4 4 0 004-1 4 4 0 004 1" stroke={DARK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'idcard': // 증명사진
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <rect x="9" y="16" width="46" height="32" rx="5" fill={B} />
          <circle cx="23" cy="29" r="6" fill="#fff" />
          <path d="M15 42c0-5 4-8 8-8s8 3 8 8z" fill="#fff" />
          <rect x="35" y="26" width="15" height="3" rx="1.5" fill="#fff" />
          <rect x="35" y="33" width="12" height="3" rx="1.5" fill="#fff" />
        </svg>
      );
    case 'more': // 기타
    default:
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="20" cy="32" r="4.5" fill="#B0B8C1" />
          <circle cx="32" cy="32" r="4.5" fill="#B0B8C1" />
          <circle cx="44" cy="32" r="4.5" fill="#B0B8C1" />
        </svg>
      );
  }
};

export const TrophyIcon: React.FC<{ rank: number }> = ({ rank }) => {
  const colors = ['#E5486B', '#9AA5B1', '#C08552'];
  const c = colors[rank - 1] || '#9AA5B1';
  return (
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 28 28" fill="none">
      <path d="M8 4h12v6a6 6 0 01-12 0z" fill={c} />
      <path d="M8 5H5v2a4 4 0 004 4M20 5h3v2a4 4 0 01-4 4" stroke={c} strokeWidth="1.6" fill="none" />
      <rect x="12" y="16" width="4" height="4" fill={c} />
      <rect x="8" y="20" width="12" height="3" rx="1.2" fill={c} />
      <text x="14" y="11.5" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">
        {rank}
      </text>
    </svg>
  );
};
