import React from 'react';
import { Studio } from '../types';
import { FACILITIES } from '../data/mockData';

interface DiscoverScreenProps {
  studios: Studio[];
  onSelectStudio: (studio: Studio) => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  studios,
  onSelectStudio,
}) => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Nav */}
      <div className="h-[54px] flex items-center px-5 border-b border-[#F2F4F6] shrink-0">
        <h2 className="text-[20px] font-black text-[#191F28] tracking-tight">발견</h2>
      </div>

      {/* Main Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-[#F2F4F6] pb-16">
        {studios.map((studio) => (
          <div key={studio.id} className="p-5 space-y-4">
            {/* Studio Header */}
            <div className="flex items-center gap-3">
              <img
                src={studio.im}
                alt={studio.nm}
                className="w-12 h-12 rounded-[14px] object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <b className="text-[16px] font-extrabold text-[#191F28] block truncate">
                  {studio.nm}
                </b>
                <span className="text-[13px] text-[#8B95A1]">{studio.loc}</span>
              </div>
            </div>

            {/* Pink Ranking Box: 우리 스튜디오의 후기가 많은 촬영 */}
            <div className="bg-[#FFF0F3] rounded-[16px] p-4.5">
              <h4 className="text-[16px] font-black text-[#191F28] mb-3 tracking-tight">
                우리 스튜디오의 후기가 많은 촬영
              </h4>
              <div className="space-y-2">
                {studio.top.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between text-[14px] font-bold ${
                      idx === 0 ? 'text-[#E5486B]' : 'text-[#8B95A1]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 text-center font-black">{idx + 1}</span>
                      <span className={idx === 0 ? 'text-[#E5486B] font-extrabold' : 'text-[#191F28]'}>
                        {item[0]}
                      </span>
                    </div>
                    <span>{item[1]}개</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Key Features */}
            <div>
              <b className="text-[15px] font-extrabold text-[#191F28]">스튜디오 특징</b>
              <div className="text-[14px] text-[#4A5058] mt-2 space-y-1 leading-relaxed">
                {studio.fac.slice(0, 4).map((fId) => {
                  const fac = FACILITIES.find((f) => f.id === fId);
                  return (
                    <div key={fId} className="flex items-center gap-1.5">
                      <span className="text-[#00A05A] font-bold">✓</span>
                      <span>{fac?.nm}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Deep Dive Action Button */}
            <button
              onClick={() => onSelectStudio(studio)}
              className="w-full py-3.5 rounded-xl border border-[#E5E8EB] text-[#191F28] font-extrabold text-[14.5px] hover:bg-[#FAFBFC] transition-colors"
            >
              이 스튜디오 자세히 보기 ›
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
