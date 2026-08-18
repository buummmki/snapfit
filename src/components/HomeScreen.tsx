import React from 'react';
import { Studio, OccasionId, ConceptId } from '../types';
import { OCCASIONS, CONCEPTS } from '../data/mockData';
import { Search, MessageSquare, Bell, Bookmark, Heart, Star, ChevronDown, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  selectedSido: string;
  selectedOccasions: OccasionId[];
  selectedSubs: string[];
  selectedConcepts: ConceptId[];
  onOpenRegionSheet: () => void;
  onGoSearch: (query?: string, filter?: string) => void;
  onSelectStudio: (studio: Studio) => void;
  savedStudioIds: number[];
  onToggleSave: (id: number, e: React.MouseEvent) => void;
  studios: Studio[];
  onOpenAiHub: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  selectedSido,
  selectedOccasions,
  selectedSubs,
  selectedConcepts,
  onOpenRegionSheet,
  onGoSearch,
  onSelectStudio,
  savedStudioIds,
  onToggleSave,
  studios,
  onOpenAiHub,
}) => {
  const currentOcc = OCCASIONS.find((o) => o.id === selectedOccasions[0]);
  const primarySearchText = selectedSubs[0] || (currentOcc ? `${currentOcc.nm} 촬영` : '100일 촬영');

  const banners = [
    {
      tag: '🎁 첫 촬영 혜택',
      t1: '처음 예약이라면',
      t2: '원본까지 포함해서',
      sub: '첫 예약 전용가 모음',
      bg: 'linear-gradient(145deg, #FFE9E0 0%, #FFCDBE 100%)',
      badgeBg: 'rgba(0,0,0,0.5)',
      pg: '1 | 3',
    },
    {
      tag: '💧 추가금 방지 가이드',
      t1: `${currentOcc ? currentOcc.nm : '100일'} 촬영이`,
      t2: '처음이라면',
      sub: '원본비부터 사전 확인하세요',
      bg: 'linear-gradient(145deg, #E8F0FF 0%, #C9DCFA 100%)',
      badgeBg: 'rgba(0,0,0,0.5)',
      pg: '2 | 3',
    },
    {
      tag: '📉 비수기 특가',
      t1: '평일 낮 슬롯',
      t2: '최대 40% 즉시할인',
      sub: '스튜디오 공실 핫딜',
      bg: 'linear-gradient(145deg, #EAF7EE 0%, #C5E6D2 100%)',
      badgeBg: 'rgba(0,0,0,0.5)',
      pg: '3 | 3',
    },
  ];

  const quickChips = [
    { ic: '🗺️', bg: '#E9F0FF', label: '집 근처 스튜디오', key: 'near' },
    { ic: '💸', bg: '#FFEDE6', label: '원본 포함만 보기', key: 'raw' },
    { ic: '🍼', bg: '#FFF3E0', label: '수유실 있는 곳', key: 'nursing' },
    { ic: '🚗', bg: '#EAF7EE', label: '주차 되는 곳', key: 'parking' },
    { ic: '✨', bg: '#FDE9F3', label: 'AI 컨셉 찾기', key: 'ai' },
    { ic: '📅', bg: '#E9F5FF', label: '내 견적요청', key: 'my' },
  ];

  const handleQuickClick = (key: string) => {
    if (key === 'ai') {
      onOpenAiHub();
    } else if (key === 'raw') {
      onGoSearch('', 'raw');
    } else if (key === 'nursing') {
      onGoSearch('', 'nursing');
    } else if (key === 'parking') {
      onGoSearch('', 'parking');
    } else {
      onGoSearch();
    }
  };

  const formatMan = (num: number) => `${Math.round(num / 10000).toLocaleString('ko-KR')}만원`;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2 shrink-0">
        {/* Brand Mark + Region Dropdown */}
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 28 28" fill="none">
            <path d="M4 17L21 4l-4 11h7L7 24l4-7H4z" fill="#FF5C1F" />
          </svg>

          <button
            onClick={onOpenRegionSheet}
            className="flex items-center gap-1 text-[20px] font-black text-[#191F28] tracking-tight hover:opacity-80 transition-opacity"
          >
            <span>{selectedSido}</span>
            <ChevronDown className="w-4 h-4 text-[#191F28] stroke-[3]" />
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAiHub}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#191F28] hover:bg-[#F2F4F6] transition-colors"
            title="AI 핏매니저 상담"
          >
            <Sparkles className="w-5 h-5 text-[#FF5C1F]" />
          </button>
          <button
            onClick={() => onGoSearch()}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#191F28] hover:bg-[#F2F4F6] transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => {}}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#191F28] hover:bg-[#F2F4F6] transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FF5C1F]" />
          </button>
        </div>
      </div>

      {/* Search Bar Input */}
      <div className="px-5 pb-3">
        <button
          onClick={() => onGoSearch()}
          className="w-full bg-[#F2F4F6] rounded-[14px] px-4 py-3 flex items-center gap-2.5 text-left hover:bg-[#E5E8EB] transition-colors"
        >
          <Search className="w-4.5 h-4.5 text-[#8B95A1]" />
          <span className="text-[14.5px] font-semibold text-[#8B95A1] truncate">
            {primarySearchText} 입력해보세요
          </span>
        </button>
      </div>

      {/* Scrollable Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Banner Carousel */}
        <div className="flex gap-2.5 overflow-x-auto px-5 pb-4 no-scrollbar snap-x snap-mandatory">
          {banners.map((b, idx) => (
            <div
              key={idx}
              className="flex-none w-[290px] h-[190px] rounded-[18px] p-5 relative overflow-hidden flex flex-col justify-end text-left snap-center shadow-xs cursor-pointer hover:opacity-95 transition-opacity"
              style={{ background: b.bg }}
              onClick={() => onGoSearch()}
            >
              <span className="absolute top-4 left-4 bg-black/40 text-white text-[11.5px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                {b.tag}
              </span>
              <h3 className="text-[21px] font-black text-[#191F28] tracking-tight leading-snug">
                {b.t1}
                <br />
                {b.t2}
              </h3>
              <p className="text-[13.5px] font-semibold text-[#4A5058] mt-1">{b.sub}</p>
              <span className="absolute bottom-4 right-4 bg-black/25 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {b.pg}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Action Chips */}
        <div className="flex flex-wrap gap-2 px-5 pb-6">
          {quickChips.map((q) => (
            <button
              key={q.key}
              onClick={() => handleQuickClick(q.key)}
              className="bg-[#F2F4F6] rounded-full px-3.5 py-2 flex items-center gap-2 hover:bg-[#E5E8EB] transition-all cursor-pointer"
            >
              <span
                className="w-5.5 h-5.5 rounded-md flex items-center justify-center text-[12px]"
                style={{ backgroundColor: q.bg }}
              >
                {q.ic}
              </span>
              <span className="text-[13.5px] font-bold text-[#191F28] tracking-tight">
                {q.label}
              </span>
            </button>
          ))}
        </div>

        {/* Section 1: 좋아할 만한 촬영 둘러볼까요? */}
        <div className="pb-6">
          <div className="flex items-center justify-between px-5 pb-3">
            <h3 className="text-[19px] font-black text-[#191F28] tracking-tight">
              좋아할 만한 촬영 둘러볼까요?
            </h3>
            <button
              onClick={() => onGoSearch()}
              className="text-[13px] font-semibold text-[#8B95A1] underline underline-offset-3"
            >
              더보기
            </button>
          </div>

          {/* Concept Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto px-5 pb-3.5 no-scrollbar">
            <button
              onClick={() => onGoSearch()}
              className="px-3.5 py-1.5 rounded-full bg-[#111111] text-white text-[13px] font-bold shrink-0"
            >
              전체
            </button>
            {CONCEPTS.slice(0, 6).map((c) => (
              <button
                key={c.id}
                onClick={() => onGoSearch(c.nm)}
                className="px-3.5 py-1.5 rounded-full bg-[#F2F4F6] text-[#191F28] text-[13px] font-bold shrink-0 hover:bg-[#E5E8EB] transition-colors"
              >
                {c.nm}
              </button>
            ))}
          </div>

          {/* Horizontal Product Cards Row */}
          <div className="flex gap-3 overflow-x-auto px-5 no-scrollbar">
            {studios.slice(0, 6).map((studio) => {
              const allInPrice = studio.pd.base + (!studio.pd.raw ? studio.pd.rawFee : 0);
              const discountPercent = Math.round((1 - studio.pd.base / studio.pd.list) * 100);
              const gap = allInPrice - studio.pd.base;
              const isSaved = savedStudioIds.includes(studio.id);

              return (
                <div
                  key={studio.id}
                  onClick={() => onSelectStudio(studio)}
                  className="flex-none w-[156px] text-left cursor-pointer group"
                >
                  {/* Thumbnail Image with Bookmark */}
                  <div className="w-[156px] h-[156px] rounded-[14px] relative overflow-hidden mb-2.5 bg-[#F2F4F6]">
                    <img
                      src={studio.im}
                      alt={studio.nm}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => onToggleSave(studio.id, e)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#191F28] shadow-xs hover:scale-110 active:scale-95 transition-all"
                    >
                      {isSaved ? (
                        <Bookmark className="w-4 h-4 fill-[#FF5C1F] text-[#FF5C1F]" />
                      ) : (
                        <Heart className="w-4 h-4 text-[#191F28]" />
                      )}
                    </button>

                    {/* Match Tag on image */}
                    {studio.ad && (
                      <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                        광고
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="text-[12px] font-semibold text-[#8B95A1] truncate leading-tight">
                    {studio.loc} · {studio.nm}
                  </div>
                  <div className="text-[14px] font-extrabold text-[#191F28] tracking-tight line-clamp-2 mt-0.5 leading-snug">
                    {studio.pd.nm}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-[#FF5C1F] text-[15px] font-black">{discountPercent}%</span>
                    <span className="text-[16px] font-black text-[#191F28] tracking-tight">
                      {formatMan(allInPrice)}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[12.5px] font-extrabold text-[#191F28] mt-1">
                    <Star className="w-3.5 h-3.5 fill-[#FFC93C] text-[#FFC93C]" />
                    <span>{studio.rt.toFixed(1)}</span>
                    <span className="text-[#8B95A1] font-semibold">({studio.rv})</span>
                  </div>

                  {/* Raw fee warning or App Pay Badge */}
                  <div className="mt-1.5">
                    {gap > 0 ? (
                      <span className="inline-block bg-[#FFEDE6] text-[#FF5C1F] text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                        원본 +{formatMan(gap)}
                      </span>
                    ) : studio.pay ? (
                      <span className="inline-block bg-[#EEF6FF] text-[#3182F6] text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                        ✓ 실결제가 보증
                      </span>
                    ) : (
                      <span className="inline-block bg-[#F2F4F6] text-[#4A5058] text-[11px] font-bold px-2 py-0.5 rounded-md">
                        정찰제
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider Gap */}
        <div className="h-2.5 bg-[#F2F4F6]" />

        {/* Section 2: 이번 주 [지역] Top 스튜디오 */}
        <div className="py-6">
          <div className="flex items-center justify-between px-5 pb-3.5">
            <h3 className="text-[19px] font-black text-[#191F28] tracking-tight">
              이번 주 {selectedSido} 인기 스튜디오
            </h3>
            <button
              onClick={() => onGoSearch()}
              className="text-[13px] font-semibold text-[#8B95A1] underline underline-offset-3"
            >
              전체보기
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto px-5 no-scrollbar">
            {studios
              .slice()
              .sort((a, b) => b.rv - a.rv)
              .slice(0, 6)
              .map((studio) => {
                const allInPrice = studio.pd.base + (!studio.pd.raw ? studio.pd.rawFee : 0);
                const discountPercent = Math.round((1 - studio.pd.base / studio.pd.list) * 100);
                const gap = allInPrice - studio.pd.base;

                return (
                  <div
                    key={`top-${studio.id}`}
                    onClick={() => onSelectStudio(studio)}
                    className="flex-none w-[156px] text-left cursor-pointer group"
                  >
                    <div className="w-[156px] h-[156px] rounded-[14px] relative overflow-hidden mb-2.5 bg-[#F2F4F6]">
                      <img
                        src={studio.im}
                        alt={studio.nm}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10.5px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                        후기 {studio.rv}개
                      </span>
                    </div>

                    <div className="text-[12px] font-semibold text-[#8B95A1] truncate">
                      {studio.gu} · {studio.nm}
                    </div>
                    <div className="text-[14px] font-extrabold text-[#191F28] line-clamp-1 mt-0.5">
                      {studio.pd.nm}
                    </div>

                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-[#FF5C1F] text-[15px] font-black">{discountPercent}%</span>
                      <span className="text-[16px] font-black text-[#191F28]">
                        {formatMan(allInPrice)}
                      </span>
                    </div>

                    <div className="mt-1.5">
                      {gap > 0 ? (
                        <span className="inline-block bg-[#FFEDE6] text-[#FF5C1F] text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                          ⚠ 표기가 {formatMan(studio.pd.base)} + 원본 {formatMan(gap)}
                        </span>
                      ) : (
                        <span className="inline-block bg-[#EBF9F2] text-[#00A05A] text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                          ✓ 원본 포함 실결제가
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
};
