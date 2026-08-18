import React, { useState } from 'react';
import { REGIONS } from '../data/mockData';
import { RotateCcw, X, Check } from 'lucide-react';

interface RegionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegions: string[];
  onSelectRegions: (regions: string[]) => void;
  currentSido: string;
  onSelectSido: (sido: string) => void;
}

export const RegionSheet: React.FC<RegionSheetProps> = ({
  isOpen,
  onClose,
  selectedRegions,
  onSelectRegions,
  currentSido,
  onSelectSido,
}) => {
  const [activeSido, setActiveSido] = useState<string>(currentSido || '서울');

  if (!isOpen) return null;

  const currentDistricts = REGIONS[activeSido] || [];
  const isAllSelected = currentDistricts.length > 0 && currentDistricts.every((r) => selectedRegions.includes(r));

  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      onSelectRegions(selectedRegions.filter((r) => r !== region));
    } else {
      onSelectRegions([...selectedRegions, region]);
    }
  };

  const toggleAllInSido = () => {
    if (isAllSelected) {
      onSelectRegions(selectedRegions.filter((r) => !currentDistricts.includes(r)));
    } else {
      const added = currentDistricts.filter((r) => !selectedRegions.includes(r));
      onSelectRegions([...selectedRegions, ...added]);
    }
  };

  const resetAll = () => {
    onSelectRegions([]);
  };

  const removeRegion = (region: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectRegions(selectedRegions.filter((r) => r !== region));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div className="relative w-full max-w-[440px] bg-white rounded-t-[24px] shadow-2xl z-10 flex flex-col max-h-[82vh] h-[640px] animate-in slide-in-from-bottom duration-250">
        {/* Grab bar */}
        <div className="w-11 h-1 bg-[#E5E8EB] rounded-full mx-auto mt-2.5 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3.5 pb-2 shrink-0">
          <h3 className="text-[20px] font-extrabold text-[#191F28] tracking-tight">내 관심 지역</h3>
          <button
            onClick={onClose}
            className="p-1 text-[#8B95A1] hover:text-[#191F28] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Selected Regions Tag Row */}
        <div className="flex items-center gap-2 px-5 py-2 overflow-x-auto shrink-0 border-b border-[#F2F4F6] no-scrollbar min-h-[50px]">
          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-[13px] font-semibold text-[#8B95A1] shrink-0 hover:text-[#191F28] transition-colors pr-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            초기화
          </button>

          {selectedRegions.length === 0 ? (
            <span className="text-[13px] text-[#B0B8C1] pl-1 font-medium">지역을 선택해주세요 (중복 가능)</span>
          ) : (
            selectedRegions.map((reg) => (
              <span
                key={reg}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2F4F6] text-[13px] font-semibold text-[#191F28] shrink-0"
              >
                {reg}
                <button
                  onClick={(e) => removeRegion(reg, e)}
                  className="text-[#8B95A1] hover:text-[#FF5C1F] text-xs font-bold"
                >
                  ✕
                </button>
              </span>
            ))
          )}
        </div>

        {/* Body (Sido List on Left + Districts on Right) */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sido Sidebar */}
          <div className="w-[110px] bg-white border-r border-[#F2F4F6] overflow-y-auto no-scrollbar py-1">
            {Object.keys(REGIONS).map((sido) => {
              const isActive = activeSido === sido;
              const hasSelectedInside = (REGIONS[sido] || []).some((r) => selectedRegions.includes(r));

              return (
                <button
                  key={sido}
                  onClick={() => {
                    setActiveSido(sido);
                    onSelectSido(sido);
                  }}
                  className={`w-full text-left px-4 py-3.5 text-[15px] font-bold transition-all relative flex items-center justify-between ${
                    isActive
                      ? 'text-[#FF5C1F] bg-[#FFFBF0] font-extrabold'
                      : 'text-[#8B95A1] hover:text-[#191F28]'
                  }`}
                >
                  <span>{sido}</span>
                  {hasSelectedInside && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C1F]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right District List */}
          <div className="flex-1 overflow-y-auto py-1 px-2 no-scrollbar">
            {/* All toggle */}
            <div
              onClick={toggleAllInSido}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#FAFBFC] cursor-pointer transition-colors"
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                  isAllSelected
                    ? 'bg-[#FF5C1F] text-white border border-[#FF5C1F]'
                    : 'border border-[#E5E8EB] bg-white'
                }`}
              >
                {isAllSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-[15px] font-extrabold text-[#191F28]">{activeSido} 전체</span>
            </div>

            <div className="h-[1px] bg-[#F2F4F6] my-1 mx-2" />

            {/* Individual Districts */}
            {currentDistricts.map((district) => {
              const isChecked = selectedRegions.includes(district);

              return (
                <div
                  key={district}
                  onClick={() => toggleRegion(district)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#FAFBFC] cursor-pointer transition-colors"
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                      isChecked
                        ? 'bg-[#FF5C1F] text-white border border-[#FF5C1F]'
                        : 'border border-[#E5E8EB] bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span
                    className={`text-[14.5px] ${
                      isChecked ? 'font-bold text-[#191F28]' : 'font-medium text-[#4A5058]'
                    }`}
                  >
                    {district}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#F2F4F6] shrink-0">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-[#FF5C1F] text-white font-extrabold text-[16px] shadow-sm hover:brightness-105 active:scale-[0.99] transition-all"
          >
            관심 지역 선택 완료 ({selectedRegions.length}개)
          </button>
        </div>
      </div>
    </div>
  );
};
