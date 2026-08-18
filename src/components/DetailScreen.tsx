import React, { useState } from 'react';
import { Studio } from '../types';
import { CONCEPTS, FACILITIES } from '../data/mockData';
import { ChevronLeft, Share2, Bookmark, Heart, Star, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface DetailScreenProps {
  studio: Studio;
  onBack: () => void;
  onOpenInquiry: (studio: Studio) => void;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  studio,
  onBack,
  onOpenInquiry,
  isSaved,
  onToggleSave,
}) => {
  const p = studio.pd;
  const allInPrice = p.base + (!p.raw ? p.rawFee : 0);
  const maxPrice = p.base + studio.ex.reduce((sum, e) => sum + e.a, 0);
  const discountPercent = Math.round((1 - p.base / p.list) * 100);
  const gap = allInPrice - p.base;

  const formatMan = (num: number) => `${Math.round(num / 10000).toLocaleString('ko-KR')}만원`;

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Top Hero Photo Gallery */}
        <div className="h-[260px] relative bg-[#F2F4F6]">
          <img
            src={studio.im}
            alt={studio.nm}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Floating Top Nav */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#191F28] shadow-sm hover:scale-105 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('스튜디오 링크가 복사되었습니다.');
                  }
                }}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#191F28] shadow-sm"
              >
                <Share2 className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => onToggleSave(studio.id)}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#191F28] shadow-sm"
              >
                {isSaved ? (
                  <Bookmark className="w-5 h-5 fill-[#FF5C1F] text-[#FF5C1F]" />
                ) : (
                  <Heart className="w-5 h-5 text-[#191F28]" />
                )}
              </button>
            </div>
          </div>

          <span className="absolute bottom-3 right-3 bg-black/50 text-white text-[12px] font-bold px-3 py-1 rounded-full backdrop-blur-xs">
            1 / 18
          </span>
        </div>

        {/* Studio Info Header */}
        <div className="px-5 pt-5 pb-4">
          <div className="text-[13px] font-semibold text-[#8B95A1] flex items-center gap-1.5">
            <span>{studio.loc}</span>
            <span>·</span>
            <span>{studio.dist}km</span>
            <span>·</span>
            <span className="text-[#3182F6] font-bold">견적 응답률 {studio.resp}%</span>
          </div>

          <h1 className="text-[24px] font-black text-[#191F28] tracking-tight mt-1">
            {studio.nm}
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-[15px] font-black text-[#191F28]">
              <Star className="w-4 h-4 fill-[#FFC93C] text-[#FFC93C]" />
              <span>{studio.rt.toFixed(1)}</span>
            </div>
            <span className="text-[13.5px] font-semibold text-[#8B95A1]">
              결제인증 후기 <b className="text-[#191F28] font-bold">{studio.rv}개</b>
            </span>
          </div>

          {/* Concept Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {studio.con.map((cId) => {
              const conc = CONCEPTS.find((c) => c.id === cId);
              return (
                <span
                  key={cId}
                  className="bg-[#F2F4F6] text-[#4A5058] text-[12.5px] font-semibold px-2.5 py-1 rounded-md"
                >
                  #{conc?.nm}
                </span>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-[#F2F4F6]" />

        {/* Pink Ranking Box: 우리 스튜디오의 후기가 많은 촬영 */}
        <div className="p-5">
          <div className="bg-[#FFF0F3] rounded-[16px] p-5">
            <h4 className="text-[16.5px] font-extrabold text-[#191F28] mb-3.5 tracking-tight flex items-center justify-between">
              <span>이 스튜디오에서 후기가 많은 촬영</span>
              <span className="text-[11.5px] text-[#E5486B] font-bold bg-white/80 px-2 py-0.5 rounded-full">
                실제 누적 기준
              </span>
            </h4>

            <div className="space-y-2.5">
              {studio.top.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between text-[14.5px] font-bold ${
                    idx === 0 ? 'text-[#E5486B]' : 'text-[#8B95A1]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 text-center font-black">{idx + 1}</span>
                    <span className={idx === 0 ? 'text-[#E5486B] font-extrabold' : 'text-[#191F28]'}>
                      {item[0]}
                    </span>
                  </div>
                  <span>{item[1]}개 후기</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-[#F2F4F6]" />

        {/* Standard Quote Specification Table (표준 견적표) */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[19px] font-black text-[#191F28] tracking-tight">
              상품 · 표준 견적표
            </h3>
            <span className="text-[12px] font-bold text-[#00A05A] bg-[#EBF9F2] px-2.5 py-1 rounded-md">
              표준 규격 인증
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-[#F2F4F6]">
            <b className="text-[17px] font-black text-[#191F28]">{p.nm}</b>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[#FF5C1F] text-[17px] font-black">{discountPercent}%</span>
              <span className="text-[20px] font-black text-[#191F28] tracking-tight">
                {formatMan(p.base)}
              </span>
            </div>
          </div>

          {/* Spec Table */}
          <table className="w-full text-[14px]">
            <tbody className="divide-y divide-[#F2F4F6]">
              <tr>
                <td className="py-2.5 text-[#8B95A1] font-semibold w-[42%]">촬영 시간</td>
                <td className="py-2.5 text-right font-bold text-[#191F28]">{p.dur}분</td>
              </tr>
              <tr>
                <td className="py-2.5 text-[#8B95A1] font-semibold">의상 벌수</td>
                <td className="py-2.5 text-right font-bold text-[#191F28]">{p.out}벌 (대여 포함)</td>
              </tr>
              <tr>
                <td className="py-2.5 text-[#8B95A1] font-semibold">최종 정밀 보정</td>
                <td className="py-2.5 text-right font-bold text-[#191F28]">{p.ret}컷</td>
              </tr>
              <tr>
                <td className="py-2.5 text-[#8B95A1] font-semibold">원본 전체 파일</td>
                <td
                  className={`py-2.5 text-right font-black ${
                    p.raw ? 'text-[#00A05A]' : 'text-[#FF5C1F]'
                  }`}
                >
                  {p.raw ? '✓ 전체 포함 (추가비 0원)' : `✕ 별도 구매 (+${formatMan(p.rawFee)})`}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-[#8B95A1] font-semibold">액자 / 앨범</td>
                <td className="py-2.5 text-right font-bold text-[#191F28]">{p.frame}</td>
              </tr>
              <tr>
                <td className="py-2.5 text-[#8B95A1] font-semibold">헤어메이크업</td>
                <td className={`py-2.5 text-right font-bold ${p.hm ? 'text-[#00A05A]' : 'text-[#8B95A1]'}`}>
                  {p.hm ? '✓ 포함' : '✕ 미포함 (직접 준비)'}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-[#8B95A1] font-semibold">촬영 인원</td>
                <td className="py-2.5 text-right font-bold text-[#191F28]">{p.ppl}</td>
              </tr>
            </tbody>
          </table>

          {/* Raw fee alert if not included */}
          {gap > 0 && (
            <div className="mt-4 bg-[#FFECEA] rounded-[14px] p-4 border border-[#FFC9C6]">
              <h5 className="text-[14.5px] font-extrabold text-[#E5484D] flex items-center gap-1.5">
                <AlertTriangle className="w-4.5 h-4.5" />
                원본을 받으시려면 {formatMan(p.rawFee)}이 추가 결제돼요
              </h5>
              <div className="flex justify-between items-center text-[15px] font-black text-[#E5484D] border-t border-[#FFC9C6] mt-2.5 pt-2.5">
                <span>원본 포함 실결제 예상가</span>
                <span>{formatMan(allInPrice)}</span>
              </div>
            </div>
          )}

          {/* Additional fees box */}
          <div className="mt-4 bg-[#FFEDE6] rounded-[14px] p-4">
            <h5 className="text-[14.5px] font-extrabold text-[#FF5C1F] mb-2.5 flex items-center gap-1.5">
              <span>⚠️ 추가로 발생할 수 있는 옵션 비용</span>
            </h5>
            <div className="space-y-1.5 text-[13.5px] text-[#5A4034]">
              {studio.ex.map((ex, i) => (
                <div key={i} className="flex justify-between">
                  <span>{ex.l}</span>
                  <span className="font-bold">+{formatMan(ex.a)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-[15px] font-black text-[#FF5C1F] border-t border-[#FFCFB8] mt-3 pt-2.5">
              <span>옵션 포함 예상 최대 결제액</span>
              <span>{formatMan(maxPrice)}</span>
            </div>
          </div>

          {/* Green Guarantee Box */}
          <div className="mt-4 bg-[#EBF9F2] rounded-[14px] p-4 text-[#00A05A] flex items-start gap-2.5 text-[13.5px] font-bold leading-relaxed">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <b>스냅핏 사전 고지 보증 스튜디오</b>
              <p className="font-medium text-[#2E7D32] mt-0.5">
                이 스튜디오는 모든 추가금 항목을 사전 고지했습니다. 고지되지 않은 비용이 현장에서 청구되면 차액 전액을 스냅핏이 환불해드립니다.
              </p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-2 bg-[#F2F4F6]" />

        {/* Facilities */}
        <div className="p-5">
          <h4 className="text-[17px] font-black text-[#191F28] mb-3">스튜디오 편의시설 & 특징</h4>
          <div className="flex flex-wrap gap-2">
            {studio.fac.map((fId) => {
              const fac = FACILITIES.find((f) => f.id === fId);
              return (
                <span
                  key={fId}
                  className="bg-[#F2F4F6] text-[#191F28] text-[13px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00A05A]" />
                  {fac?.nm}
                </span>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-[#F2F4F6]" />

        {/* Verified Reviews Section */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[17px] font-black text-[#191F28]">
              결제인증 후기 <span className="text-[#FF5C1F]">{studio.rv}</span>
            </h4>
            <span className="text-[12px] font-semibold text-[#8B95A1]">최신순</span>
          </div>

          <div className="divide-y divide-[#F2F4F6]">
            {studio.rvs.map((rv) => (
              <div key={rv.id} className="py-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#F2F4F6] text-[#8B95A1] font-black text-xs flex items-center justify-center">
                      {rv.n[0]}
                    </div>
                    <b className="text-[14px] font-extrabold text-[#191F28]">{rv.n[0]}**</b>
                    <span className="bg-[#EEF6FF] text-[#3182F6] text-[10px] font-black px-1.5 py-0.5 rounded">
                      결제인증
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[13px] font-black text-[#191F28]">
                    <Star className="w-3.5 h-3.5 fill-[#FFC93C] text-[#FFC93C]" />
                    <span>{rv.s.toFixed(1)}</span>
                  </div>
                </div>

                <div className="text-[12px] text-[#8B95A1]">
                  {rv.p} · {rv.d}
                </div>

                {/* Review Photos */}
                {rv.im.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                    {rv.im.map((imgUrl, i) => (
                      <div
                        key={i}
                        className="w-[90px] h-[90px] rounded-xl overflow-hidden shrink-0 bg-[#F2F4F6]"
                      >
                        <img
                          src={imgUrl}
                          alt="review photo"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-[14px] text-[#333A42] leading-relaxed">{rv.t}</p>

                {/* Hidden fee indicator */}
                <div
                  className={`text-[12.5px] font-extrabold ${
                    rv.ef ? 'text-[#E5484D]' : 'text-[#00A05A]'
                  }`}
                >
                  {rv.ef ? '⚠ 고지되지 않은 추가금이 있었다고 응답' : '✓ 고지 외 추가금 없었다고 응답'}
                </div>

                <div className="text-[12px] text-[#8B95A1] font-semibold">
                  👍 도움됐어요 {rv.h}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E5E8EB] p-3.5 px-5 flex items-center gap-3 z-30 shadow-lg">
        <button
          onClick={() => onToggleSave(studio.id)}
          className="w-12 h-12 rounded-xl border border-[#E5E8EB] flex items-center justify-center text-[#191F28] hover:bg-[#F2F4F6] shrink-0"
        >
          {isSaved ? (
            <Bookmark className="w-5 h-5 fill-[#FF5C1F] text-[#FF5C1F]" />
          ) : (
            <Heart className="w-5 h-5 text-[#191F28]" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="text-[18px] font-black text-[#191F28] tracking-tight">
            {formatMan(allInPrice)}
          </div>
          <div className="text-[11.5px] font-semibold text-[#8B95A1] truncate">
            {p.raw ? '✓ 원본 포함 실결제가' : `원본 포함 시 · 표기가 ${formatMan(p.base)}`}
          </div>
        </div>

        <button
          onClick={() => onOpenInquiry(studio)}
          className="px-7 py-3.5 rounded-xl bg-[#111111] text-white font-extrabold text-[15.5px] hover:brightness-110 active:scale-[0.99] transition-all shadow-sm"
        >
          견적요청
        </button>
      </div>
    </div>
  );
};
