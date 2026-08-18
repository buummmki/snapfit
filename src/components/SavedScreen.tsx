import React, { useState } from 'react';
import { Studio } from '../types';
import { Bookmark, Star } from 'lucide-react';

interface SavedScreenProps {
  studios: Studio[];
  savedIds: number[];
  onSelectStudio: (studio: Studio) => void;
  onGoSearch: () => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  studios,
  savedIds,
  onSelectStudio,
  onGoSearch,
}) => {
  const [activeTab, setActiveTab] = useState<'스튜디오' | '상품' | '후기' | '커뮤니티'>('스튜디오');

  const savedStudios = studios.filter((s) => savedIds.includes(s.id));

  const formatMan = (num: number) => `${Math.round(num / 10000).toLocaleString('ko-KR')}만원`;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Nav */}
      <div className="h-[54px] flex items-center px-5 border-b border-[#F2F4F6] shrink-0">
        <h2 className="text-[20px] font-black text-[#191F28] tracking-tight">저장</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-5 px-5 border-b border-[#F2F4F6] shrink-0">
        {(['스튜디오', '상품', '후기', '커뮤니티'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-[15px] font-bold transition-all relative ${
              activeTab === tab
                ? 'text-[#191F28] font-black'
                : 'text-[#8B95A1] hover:text-[#191F28]'
            }`}
          >
            <span>{tab}</span>
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#111111]" />
            )}
          </button>
        ))}
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-16">
        {savedStudios.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F2F4F6] flex items-center justify-center mx-auto mb-4 text-[#B0B8C1]">
              <Bookmark className="w-7 h-7" />
            </div>
            <h3 className="text-[18px] font-extrabold text-[#191F28]">
              저장한 {activeTab}가 없어요
            </h3>
            <p className="text-[14px] text-[#8B95A1] mt-1.5 font-medium">
              마음에 드는 스튜디오를 북마크하면 이곳에 모아볼 수 있어요
            </p>
            <button
              onClick={onGoSearch}
              className="mt-6 px-6 py-3 rounded-xl bg-[#111111] text-white text-[14.5px] font-extrabold"
            >
              스튜디오 둘러보기
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#F2F4F6]">
            {savedStudios.map((studio) => {
              const allInPrice = studio.pd.base + (!studio.pd.raw ? studio.pd.rawFee : 0);

              return (
                <div
                  key={studio.id}
                  onClick={() => onSelectStudio(studio)}
                  className="flex gap-3.5 p-4.5 text-left hover:bg-[#FAFBFC] cursor-pointer transition-colors"
                >
                  <img
                    src={studio.im}
                    alt={studio.nm}
                    className="w-[88px] h-[88px] rounded-[12px] object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold text-[#8B95A1]">
                      {studio.loc}
                    </div>
                    <h4 className="text-[15.5px] font-extrabold text-[#191F28] mt-0.5 truncate">
                      {studio.nm}
                    </h4>
                    <div className="text-[13px] font-medium text-[#8B95A1] truncate mt-0.5">
                      {studio.pd.nm}
                    </div>
                    <div className="text-[16px] font-black text-[#191F28] mt-1">
                      {formatMan(allInPrice)}
                    </div>
                    <div className="flex items-center gap-1 text-[12px] font-bold text-[#191F28] mt-1">
                      <Star className="w-3 h-3 fill-[#FFC93C] text-[#FFC93C]" />
                      <span>{studio.rt.toFixed(1)}</span>
                      <span className="text-[#8B95A1]">({studio.rv})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
