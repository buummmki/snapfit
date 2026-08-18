import React, { useState } from 'react';
import { Studio, Facility } from '../types';
import { FACILITIES } from '../data/mockData';
import { ChevronLeft, Search, Star, SlidersHorizontal, CheckSquare, Square, X } from 'lucide-react';

interface SearchScreenProps {
  studios: Studio[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedFilters: string[];
  setSelectedFilters: (f: string[]) => void;
  sortIndex: number;
  setSortIndex: (idx: number) => void;
  onBack: () => void;
  onSelectStudio: (studio: Studio) => void;
  selectedForQuote: number[];
  onToggleQuoteSelect: (id: number, e: React.MouseEvent) => void;
  onOpenMultiQuote: () => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  studios,
  searchQuery,
  setSearchQuery,
  selectedFilters,
  setSelectedFilters,
  sortIndex,
  setSortIndex,
  onBack,
  onSelectStudio,
  selectedForQuote,
  onToggleQuoteSelect,
  onOpenMultiQuote,
}) => {
  const [localInput, setLocalInput] = useState(searchQuery);

  const sortOptions = ['매칭순', '실결제가 낮은순', '후기 많은순', '평점 높은순'];

  const allFilters: Facility[] = [{ id: 'raw', nm: '원본 파일 포함' }, ...FACILITIES];

  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filterId));
    } else {
      setSelectedFilters([...selectedFilters, filterId]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localInput);
  };

  const formatMan = (num: number) => `${Math.round(num / 10000).toLocaleString('ko-KR')}만원`;

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Nav with search input */}
      <div className="h-[56px] flex items-center px-4 gap-2.5 shrink-0 border-b border-[#F2F4F6]">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-[#191F28] hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="bg-[#F2F4F6] rounded-[12px] px-3.5 py-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#8B95A1] shrink-0" />
            <input
              type="text"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="스튜디오명, 컨셉, 지역 검색..."
              className="w-full text-[14px] font-semibold text-[#191F28] bg-transparent focus:outline-none placeholder:text-[#8B95A1]"
            />
            {localInput && (
              <button
                type="button"
                onClick={() => {
                  setLocalInput('');
                  setSearchQuery('');
                }}
                className="text-[#8B95A1] hover:text-[#191F28]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Filter Horizontal Chips Bar */}
      <div className="flex gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar border-b border-[#F2F4F6] shrink-0 bg-white">
        {allFilters.map((f) => {
          const isSelected = selectedFilters.includes(f.id);
          return (
            <button
              key={f.id}
              onClick={() => toggleFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-bold shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                isSelected
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-white border border-[#E5E8EB] text-[#4A5058] hover:border-[#B0B8C1]'
              }`}
            >
              <span>{f.nm}</span>
              {isSelected && <span className="text-[10px]">✕</span>}
            </button>
          );
        })}
      </div>

      {/* Results Header: Count + Sort Toggle */}
      <div className="flex items-center justify-between px-5 py-3 shrink-0 bg-white">
        <span className="text-[14.5px] font-extrabold text-[#191F28]">
          전체 <span className="text-[#FF5C1F]">{studios.length}</span>곳
        </span>

        <button
          onClick={() => setSortIndex((sortIndex + 1) % sortOptions.length)}
          className="flex items-center gap-1 text-[13.5px] font-bold text-[#8B95A1] hover:text-[#191F28] transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{sortOptions[sortIndex]}</span>
        </button>
      </div>

      {/* Studio List */}
      <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-[#F2F4F6]">
        {studios.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F2F4F6] flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-[18px] font-extrabold text-[#191F28]">
              조건에 맞는 스튜디오가 없어요
            </h3>
            <p className="text-[14px] text-[#8B95A1] mt-1.5">
              필터 조건을 줄이거나 지역을 넓혀보세요
            </p>
            <button
              onClick={() => {
                setSelectedFilters([]);
                setSearchQuery('');
                setLocalInput('');
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#111111] text-white text-[14px] font-bold"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          studios.map((studio) => {
            const allInPrice = studio.pd.base + (!studio.pd.raw ? studio.pd.rawFee : 0);
            const discountPercent = Math.round((1 - studio.pd.base / studio.pd.list) * 100);
            const gap = allInPrice - studio.pd.base;
            const isSelectedForQuote = selectedForQuote.includes(studio.id);

            // Match score formula
            const matchScore = studio.ad
              ? '광고'
              : `매칭 ${Math.min(99, Math.round(75 + (studio.rt / 10) * 15 + (studio.resp > 90 ? 8 : 0)))}%`;

            return (
              <div
                key={studio.id}
                onClick={() => onSelectStudio(studio)}
                className="flex gap-3.5 p-4.5 text-left hover:bg-[#FAFBFC] cursor-pointer transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-[100px] h-[100px] rounded-[14px] relative overflow-hidden shrink-0 bg-[#F2F4F6]">
                  <img
                    src={studio.im}
                    alt={studio.nm}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10.5px] font-extrabold px-1.5 py-0.5 rounded-md">
                    {matchScore}
                  </span>
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="text-[12px] font-semibold text-[#8B95A1]">
                      {studio.loc} · {studio.dist}km
                    </div>

                    {/* Batch quote checkbox */}
                    <button
                      onClick={(e) => onToggleQuoteSelect(studio.id, e)}
                      className="p-0.5 text-[#8B95A1] hover:text-[#191F28]"
                      title="비교 견적함에 담기"
                    >
                      {isSelectedForQuote ? (
                        <CheckSquare className="w-5 h-5 text-[#FF5C1F]" />
                      ) : (
                        <Square className="w-5 h-5 text-[#D1D5DB]" />
                      )}
                    </button>
                  </div>

                  <h4 className="text-[16px] font-extrabold text-[#191F28] tracking-tight mt-0.5 truncate">
                    {studio.nm}
                  </h4>

                  <div className="text-[12.5px] font-medium text-[#8B95A1] mt-0.5 truncate">
                    {studio.pd.nm} · {studio.pd.dur}분 · 의상 {studio.pd.out}벌 · 보정 {studio.pd.ret}컷
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mt-1.5">
                    <span className="text-[#FF5C1F] text-[15px] font-black">{discountPercent}%</span>
                    <span className="text-[17px] font-black text-[#191F28] tracking-tight">
                      {formatMan(allInPrice)}
                    </span>
                    <span className="text-[12px] text-[#B0B8C1] line-through">
                      {formatMan(studio.pd.list)}
                    </span>
                  </div>

                  {/* Warning vs Real Price guarantee */}
                  {gap > 0 ? (
                    <div className="text-[12px] text-[#FF5C1F] font-bold mt-1">
                      ⚠ 표기가 {formatMan(studio.pd.base)} + 원본 {formatMan(gap)}
                    </div>
                  ) : (
                    <div className="text-[12px] text-[#00A05A] font-bold mt-1">
                      ✓ 원본 포함 실결제가 보증
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[12.5px] font-extrabold text-[#191F28] mt-1.5">
                    <Star className="w-3.5 h-3.5 fill-[#FFC93C] text-[#FFC93C]" />
                    <span>{studio.rt.toFixed(1)}</span>
                    <span className="text-[#8B95A1] font-semibold">({studio.rv})</span>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div className="h-20" />
      </div>

      {/* Multi-Quote Floating Bottom Bar (if any studios selected) */}
      {selectedForQuote.length > 0 && (
        <div className="absolute bottom-3 left-4 right-4 bg-[#111111] text-white p-4 rounded-[18px] shadow-2xl flex items-center justify-between z-20 animate-in slide-in-from-bottom duration-200">
          <div>
            <div className="text-[14px] font-extrabold">
              선택한 스튜디오 <span className="text-[#FF5C1F]">{selectedForQuote.length}</span>곳
            </div>
            <div className="text-[12px] text-[#8B95A1]">동시에 견적 비교 요청 가능 (최대 3곳)</div>
          </div>

          <button
            onClick={onOpenMultiQuote}
            className="px-5 py-2.5 rounded-xl bg-[#FF5C1F] text-white font-extrabold text-[14px] hover:brightness-105 transition-all"
          >
            한 번에 견적요청
          </button>
        </div>
      )}
    </div>
  );
};
