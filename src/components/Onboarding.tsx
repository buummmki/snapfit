import React from 'react';
import { OccasionId, ConceptId, ModeType } from '../types';
import { OCCASIONS, MODES, CONCEPTS } from '../data/mockData';
import { OccasionIcon, TrophyIcon } from './Icons';
import { ChevronLeft, Plus } from 'lucide-react';

interface OnboardingProps {
  step: number;
  setStep: (step: number) => void;
  selectedOccasions: OccasionId[];
  setSelectedOccasions: (occs: OccasionId[]) => void;
  selectedSubs: string[];
  setSelectedSubs: (subs: string[]) => void;
  selectedMode: ModeType | null;
  setSelectedMode: (mode: ModeType) => void;
  selectedConcepts: ConceptId[];
  setSelectedConcepts: (concs: ConceptId[]) => void;
  selectedRegions: string[];
  setSelectedRegions: (regs: string[]) => void;
  onOpenRegionSheet: () => void;
  onFinish: () => void;
  onSkip: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({
  step,
  setStep,
  selectedOccasions,
  setSelectedOccasions,
  selectedSubs,
  setSelectedSubs,
  selectedMode,
  setSelectedMode,
  selectedConcepts,
  setSelectedConcepts,
  selectedRegions,
  setSelectedRegions,
  onOpenRegionSheet,
  onFinish,
  onSkip,
}) => {
  // Step 1 Toggle
  const toggleOccasion = (id: OccasionId) => {
    if (selectedOccasions.includes(id)) {
      setSelectedOccasions(selectedOccasions.filter((x) => x !== id));
    } else {
      if (selectedOccasions.length >= 2) return;
      setSelectedOccasions([...selectedOccasions, id]);
    }
  };

  // Step 2 Toggle
  const toggleSub = (sub: string) => {
    if (selectedSubs.includes(sub)) {
      setSelectedSubs(selectedSubs.filter((x) => x !== sub));
    } else {
      if (selectedSubs.length >= 10) return;
      setSelectedSubs([...selectedSubs, sub]);
    }
  };

  // Step 4 Toggle
  const toggleConcept = (id: ConceptId) => {
    if (selectedConcepts.includes(id)) {
      setSelectedConcepts(selectedConcepts.filter((x) => x !== id));
    } else {
      setSelectedConcepts([...selectedConcepts, id]);
    }
  };

  // Step 5 remove region tag
  const removeRegionTag = (reg: string) => {
    setSelectedRegions(selectedRegions.filter((r) => r !== reg));
  };

  const progressPercent = step * 20;

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Nav Bar */}
      <div className="h-[52px] flex items-center px-5 shrink-0 justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="p-1 -ml-2 text-[#191F28] hover:opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        ) : (
          <div className="w-6" />
        )}

        <button
          onClick={onSkip}
          className="text-[14.5px] font-semibold text-[#191F28] underline underline-offset-4 hover:opacity-80"
        >
          건너뛰기
        </button>
      </div>

      {/* Thin Progress Bar */}
      <div className="w-full h-[3px] bg-[#F2F4F6] shrink-0">
        <div
          className="h-full bg-[#111111] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* ================= STEP 1: 촬영 목적 ================= */}
        {step === 1 && (
          <div className="pt-6 pb-4">
            <div className="px-5">
              <div className="text-[14px] font-semibold text-[#8B95A1] mb-1.5">
                나에게 맞는 스튜디오를 찾아볼게요
              </div>
              <h1 className="text-[25px] font-extrabold text-[#191F28] tracking-tight leading-tight">
                어떤 촬영을 찾으세요?
              </h1>
            </div>

            <div className="grid grid-cols-4 gap-x-2 gap-y-3 px-5 pt-6 pb-2">
              {OCCASIONS.map((occ) => {
                const isSelected = selectedOccasions.includes(occ.id);
                return (
                  <button
                    key={occ.id}
                    onClick={() => toggleOccasion(occ.id)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`w-full aspect-square rounded-[16px] flex items-center justify-center mb-1.5 transition-all ${
                        isSelected
                          ? 'border-[2px] border-[#111111] bg-[#FAFBFC] shadow-xs'
                          : 'border border-[#E5E8EB] bg-white group-hover:border-[#B0B8C1]'
                      }`}
                    >
                      <OccasionIcon name={occ.ic} className="w-10 h-10" />
                    </div>
                    <span
                      className={`text-[13px] tracking-tight ${
                        isSelected ? 'font-black text-[#111111]' : 'font-semibold text-[#4A5058]'
                      }`}
                    >
                      {occ.nm}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 2: 세부 촬영 ================= */}
        {step === 2 && (
          <div className="pt-6 pb-6">
            <div className="px-5 mb-5">
              <div className="text-[14px] font-semibold text-[#8B95A1] mb-1.5">
                구체적으로 어떤 사진인지 알아볼게요
              </div>
              <h1 className="text-[24px] font-extrabold text-[#191F28] tracking-tight leading-tight">
                해당하는 촬영을 선택해주세요
              </h1>
            </div>

            {selectedOccasions.map((occId) => {
              const occ = OCCASIONS.find((o) => o.id === occId);
              if (!occ) return null;

              return (
                <div key={occ.id} className="mb-6">
                  <div className="px-5 mb-3 text-[16px] font-extrabold text-[#191F28]">
                    {occ.nm}
                  </div>
                  <div className="flex flex-wrap gap-2 px-5">
                    {occ.subs.map((sub) => {
                      const isSel = selectedSubs.includes(sub);
                      return (
                        <button
                          key={sub}
                          onClick={() => toggleSub(sub)}
                          className={`px-4 py-2.5 rounded-[12px] text-[14.5px] font-semibold tracking-tight transition-all ${
                            isSel
                              ? 'bg-[#111111] text-white shadow-xs'
                              : 'bg-[#F2F4F6] text-[#191F28] hover:bg-[#E5E8EB]'
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= STEP 3: 촬영 방식 ================= */}
        {step === 3 && (
          <div className="pt-6 pb-6">
            <div className="px-5 mb-6">
              <div className="text-[14px] font-semibold text-[#8B95A1] mb-1.5">
                선택에 맞춰서 정보를 추천할게요
              </div>
              <h1 className="text-[24px] font-extrabold text-[#191F28] tracking-tight leading-tight">
                촬영 방식을 알려주세요
              </h1>
            </div>

            <div className="px-5 space-y-3">
              {MODES.map((mode) => {
                const isSelected = selectedMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`w-full text-left p-5 rounded-[16px] border transition-all ${
                      isSelected
                        ? 'border-[2px] border-[#111111] bg-[#FAFBFC] shadow-xs'
                        : 'border-[#E5E8EB] bg-white hover:border-[#B0B8C1]'
                    }`}
                  >
                    <b className="text-[17px] font-extrabold text-[#191F28] block tracking-tight">
                      {mode.nm}
                    </b>
                    {mode.ds && (
                      <span className="text-[14px] font-medium text-[#8B95A1] mt-1.5 block">
                        {mode.ds}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 4: 관심 컨셉 ================= */}
        {step === 4 && (
          <div className="pt-6 pb-6">
            <div className="px-5 mb-4">
              <div className="text-[14px] font-semibold text-[#8B95A1] mb-1.5">
                선택한 컨셉으로 홈에서 추천할게요
              </div>
              <h1 className="text-[24px] font-extrabold text-[#191F28] tracking-tight leading-tight">
                관심 컨셉을 선택해주세요
              </h1>
            </div>

            {/* Popularity banner */}
            <div className="mx-5 mb-4 bg-[#F2F4F6] rounded-[12px] px-4 py-3 text-[14.5px] font-bold text-[#191F28]">
              {selectedOccasions.length > 0
                ? `${OCCASIONS.find((o) => o.id === selectedOccasions[0])?.nm || '이 촬영'}을 찾는 고객이 많이 예약하는 컨셉`
                : '고객들이 가장 많이 예약하는 인기 컨셉'}
            </div>

            <div className="px-5 space-y-3">
              {CONCEPTS.map((concept) => {
                const isSelected = selectedConcepts.includes(concept.id);
                return (
                  <button
                    key={concept.id}
                    onClick={() => toggleConcept(concept.id)}
                    className={`w-full text-left p-4.5 rounded-[16px] border relative transition-all ${
                      isSelected
                        ? 'border-[2px] border-[#111111] bg-[#FAFBFC]'
                        : 'border-[#E5E8EB] bg-white hover:border-[#B0B8C1]'
                    }`}
                  >
                    {/* Checkbox badge */}
                    <div
                      className={`absolute top-4.5 right-4.5 w-6 h-6 rounded-md flex items-center justify-center font-black text-xs transition-all ${
                        isSelected
                          ? 'bg-[#111111] text-white'
                          : 'border border-[#E5E8EB] text-transparent'
                      }`}
                    >
                      ✓
                    </div>

                    {/* Title with Trophy */}
                    <div className="flex items-center gap-2 mb-2 pr-8">
                      {concept.rank && <TrophyIcon rank={concept.rank} />}
                      <b className="text-[17px] font-extrabold text-[#191F28] tracking-tight">
                        {concept.nm}
                      </b>
                    </div>

                    <p className="text-[14px] text-[#4A5058] leading-relaxed mb-2 font-medium">
                      {concept.ds}
                    </p>

                    <div className="text-[13.5px] text-[#8B95A1] font-semibold">
                      최근 3개월 예약{' '}
                      <b className="text-[#191F28] font-bold ml-1">{concept.pop}건</b>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 5: 관심 지역 ================= */}
        {step === 5 && (
          <div className="pt-8 pb-6 px-5">
            <h1 className="text-[25px] font-extrabold text-[#191F28] tracking-tight">
              관심 지역을 선택해주세요
            </h1>
            <p className="text-[15px] text-[#8B95A1] mt-2 font-medium">
              관심 지역 주변의 스튜디오와 실결제 견적을 우선 추천해드려요
            </p>

            <button
              onClick={onOpenRegionSheet}
              className="w-full mt-7 p-5 rounded-[16px] border border-[#E5E8EB] bg-white hover:bg-[#FAFBFC] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-5 h-5 text-[#191F28]" />
              <b className="text-[16px] font-extrabold text-[#191F28]">관심 지역 추가하기</b>
            </button>

            {/* Selected preview */}
            {selectedRegions.length > 0 && (
              <div className="mt-5">
                <div className="text-[13px] font-bold text-[#8B95A1] mb-2.5">
                  선택된 지역 ({selectedRegions.length}곳)
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedRegions.map((reg) => (
                    <span
                      key={reg}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F2F4F6] text-[14px] font-bold text-[#191F28]"
                    >
                      {reg}
                      <button
                        onClick={() => removeRegionTag(reg)}
                        className="text-[#8B95A1] hover:text-[#FF5C1F] text-xs font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky Bottom CTA Section */}
      <div className="p-4 bg-white border-t border-[#F2F4F6] shrink-0">
        {step === 1 && (
          <>
            <div className="text-center text-[13.5px] font-semibold text-[#8B95A1] pb-2">
              <b className="text-[#191F28] font-bold">{selectedOccasions.length}</b>/2 선택됨
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={selectedOccasions.length === 0}
              className="w-full py-4 rounded-xl bg-[#111111] text-white font-extrabold text-[16px] disabled:bg-[#E5E8EB] disabled:text-[#B0B8C1] transition-all active:scale-[0.99]"
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center text-[13.5px] font-semibold text-[#8B95A1] pb-2">
              <b className="text-[#191F28] font-bold">{selectedSubs.length}</b>/10 선택됨
            </div>
            <button
              onClick={() => setStep(3)}
              disabled={selectedSubs.length === 0}
              className="w-full py-4 rounded-xl bg-[#111111] text-white font-extrabold text-[16px] disabled:bg-[#E5E8EB] disabled:text-[#B0B8C1] transition-all active:scale-[0.99]"
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <button
            onClick={() => setStep(4)}
            disabled={!selectedMode}
            className="w-full py-4 rounded-xl bg-[#111111] text-white font-extrabold text-[16px] disabled:bg-[#E5E8EB] disabled:text-[#B0B8C1] transition-all active:scale-[0.99]"
          >
            다음
          </button>
        )}

        {step === 4 && (
          <>
            <div className="text-center text-[13.5px] font-semibold text-[#8B95A1] pb-2">
              <b className="text-[#191F28] font-bold">{selectedConcepts.length}</b>개 선택됨
            </div>
            <button
              onClick={() => setStep(5)}
              disabled={selectedConcepts.length === 0}
              className="w-full py-4 rounded-xl bg-[#111111] text-white font-extrabold text-[16px] disabled:bg-[#E5E8EB] disabled:text-[#B0B8C1] transition-all active:scale-[0.99]"
            >
              선택한 컨셉으로 추천받기
            </button>
          </>
        )}

        {step === 5 && (
          <button
            onClick={onFinish}
            disabled={selectedRegions.length === 0}
            className="w-full py-4 rounded-xl bg-[#FF5C1F] text-white font-extrabold text-[16px] disabled:bg-[#FFD6C6] disabled:text-white transition-all active:scale-[0.99]"
          >
            스튜디오 둘러보기
          </button>
        )}
      </div>
    </div>
  );
};
