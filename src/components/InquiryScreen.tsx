import React, { useState } from 'react';
import { Studio } from '../types';
import { ChevronLeft, CheckCircle2, Clock, Calendar, Users, AlertCircle, CreditCard } from 'lucide-react';

interface InquiryScreenProps {
  studios: Studio[];
  onBack: () => void;
  onDone: () => void;
}

export const InquiryScreen: React.FC<InquiryScreenProps> = ({
  studios,
  onBack,
  onDone,
}) => {
  const [dates, setDates] = useState('10/12(토), 10/19(토)');
  const [timeSlot, setTimeSlot] = useState<'오전' | '오후' | '상관없음'>('오후');
  const [people, setPeople] = useState('아기 1명 + 부모 2인 + 조부모 2인');
  const [notes, setNotes] = useState('조부모님과 3대 가족촬영 1컷 함께 촬영 희망합니다.');
  
  const [state, setState] = useState<'form' | 'sent' | 'paid'>('form');
  const [selectedStudioForBooking, setSelectedStudioForBooking] = useState<Studio>(studios[0]);

  const formatMan = (num: number) => `${Math.round(num / 10000).toLocaleString('ko-KR')}만원`;

  const handleSendInquiry = () => {
    setState('sent');
  };

  const handlePayDeposit = () => {
    setState('paid');
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Nav */}
      <div className="h-[56px] flex items-center px-4 gap-2 border-b border-[#F2F4F6] shrink-0">
        <button
          onClick={onBack}
          className="p-1 -ml-1 text-[#191F28] hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <h2 className="text-[17px] font-black text-[#191F28]">
          {state === 'form' ? '견적요청 작성' : state === 'sent' ? '견적 도착 확인' : '예약 완료'}
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5 pb-24">
        {state === 'form' && (
          <div className="space-y-6">
            {/* Target Studios */}
            <div>
              <label className="block text-[14px] font-extrabold text-[#191F28] mb-2.5">
                받는 스튜디오 ({studios.length}곳)
              </label>
              <div className="space-y-2">
                {studios.map((s) => {
                  const allInPrice = s.pd.base + (!s.pd.raw ? s.pd.rawFee : 0);
                  return (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 p-3.5 bg-[#F2F4F6] rounded-[14px]"
                    >
                      <img
                        src={s.im}
                        alt={s.nm}
                        className="w-10 h-10 rounded-[10px] object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <b className="text-[14.5px] font-extrabold text-[#191F28] block truncate">
                          {s.nm}
                        </b>
                        <span className="text-[12px] text-[#8B95A1] truncate block">
                          {s.pd.nm}
                        </span>
                      </div>
                      <span className="text-[14.5px] font-black text-[#191F28]">
                        {formatMan(allInPrice)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hopeful Dates */}
            <div>
              <label className="block text-[14px] font-extrabold text-[#191F28] mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#8B95A1]" />
                <span>희망 날짜 (복수 가능)</span>
              </label>
              <input
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full px-4 py-3.5 rounded-[12px] border border-[#E5E8EB] text-[15px] font-semibold text-[#191F28] focus:outline-none focus:border-[#111111]"
              />
            </div>

            {/* Hopeful Time */}
            <div>
              <label className="block text-[14px] font-extrabold text-[#191F28] mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8B95A1]" />
                <span>희망 시간대</span>
              </label>
              <div className="flex gap-2">
                {(['오전', '오후', '상관없음'] as const).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`flex-1 py-3 rounded-full text-[14px] font-bold transition-all ${
                      timeSlot === slot
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'bg-[#F2F4F6] text-[#4A5058] hover:bg-[#E5E8EB]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* People */}
            <div>
              <label className="block text-[14px] font-extrabold text-[#191F28] mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#8B95A1]" />
                <span>촬영 인원 & 대상</span>
              </label>
              <input
                type="text"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="w-full px-4 py-3.5 rounded-[12px] border border-[#E5E8EB] text-[15px] font-semibold text-[#191F28] focus:outline-none focus:border-[#111111]"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[14px] font-extrabold text-[#191F28] mb-2">
                추가 요청사항 (선택)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="예) 수유실이 필요한 100일 아기입니다. 주차 안내 부탁드려요."
                className="w-full px-4 py-3 rounded-[12px] border border-[#E5E8EB] text-[14px] font-semibold text-[#191F28] focus:outline-none focus:border-[#111111] resize-none"
              />
            </div>

            {/* Safety Notice Box */}
            <div className="bg-[#F2F4F6] rounded-[14px] p-4 text-[13px] text-[#4A5058] leading-relaxed flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-[#8B95A1] shrink-0 mt-0.5" />
              <div>
                ⏱ 보통 <b>3시간 내</b>에 스튜디오로부터 상세 일정 및 확정 견적이 도착합니다.
                <br />
                스냅핏 표준 견적표를 바탕으로 한 <b>실결제 보증 견적</b>이 전달되며, 마음에 드는 업체의 예약금(10%)을 결제하기 전까지 일체의 비용이 발생하지 않습니다.
              </div>
            </div>
          </div>
        )}

        {state === 'sent' && (
          <div className="text-center pt-3">
            <div className="w-16 h-16 rounded-full bg-[#EBF9F2] text-[#00A05A] flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <h2 className="text-[22px] font-black text-[#191F28] tracking-tight">
              견적요청을 발송했습니다
            </h2>
            <p className="text-[14px] text-[#8B95A1] mt-1.5 font-medium">
              스튜디오에서 실시간 회신된 예약 가능 슬롯을 확인하세요
            </p>

            {/* Simulated incoming answers */}
            <div className="mt-7 text-left space-y-3">
              <div className="text-[13px] font-black text-[#8B95A1]">
                도착한 견적 & 가능 일정 ({studios.length}곳)
              </div>

              {studios.map((s, idx) => {
                const allIn = s.pd.base + (!s.pd.raw ? s.pd.rawFee : 0);
                const isChosen = selectedStudioForBooking.id === s.id;
                const slotTimes = ['10/12(토) 14:00 (오후)', '10/19(토) 11:30 (오전)', '10/12(토) 16:30 (오후)'];
                const slot = slotTimes[idx % slotTimes.length];

                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStudioForBooking(s)}
                    className={`p-4 rounded-[16px] border transition-all cursor-pointer ${
                      isChosen
                        ? 'border-[2px] border-[#FF5C1F] bg-[#FFFBF0] shadow-xs'
                        : 'border-[#E5E8EB] bg-white hover:border-[#B0B8C1]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={s.im}
                        alt={s.nm}
                        className="w-12 h-12 rounded-[12px] object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <b className="text-[15.5px] font-black text-[#191F28]">{s.nm}</b>
                          <span className="text-[16px] font-black text-[#191F28]">
                            {formatMan(allIn)}
                          </span>
                        </div>
                        <div className="text-[13px] font-bold text-[#00A05A] mt-0.5">
                          ✓ {slot} 즉시 가능
                        </div>
                        <div className="text-[12px] text-[#8B95A1] mt-0.5">
                          {s.pd.raw ? '원본 파일 전체 포함' : `표기 ${formatMan(s.pd.base)} + 원본 ${formatMan(s.pd.rawFee)}`}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {state === 'paid' && (
          <div className="text-center pt-6">
            <div className="w-16 h-16 rounded-full bg-[#EBF9F2] text-[#00A05A] flex items-center justify-center mx-auto mb-4 text-3xl">
              🎉
            </div>
            <h2 className="text-[23px] font-black text-[#191F28] tracking-tight">
              예약이 확정되었습니다!
            </h2>
            <p className="text-[14px] text-[#8B95A1] mt-1.5 font-medium">
              카카오톡 알림톡으로 상세 예약 바우처를 전송해드렸습니다.
            </p>

            {/* Receipt Card */}
            <div className="mt-6 bg-[#FAFBFC] border border-[#E5E8EB] rounded-[18px] p-5 text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E8EB]">
                <span className="text-[13px] font-bold text-[#8B95A1]">예약 번호</span>
                <span className="text-[14px] font-mono font-bold text-[#191F28]">SNPF-2026-8821</span>
              </div>

              <div className="flex justify-between text-[14px]">
                <span className="text-[#8B95A1] font-semibold">스튜디오</span>
                <span className="font-extrabold text-[#191F28]">{selectedStudioForBooking.nm}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-[#8B95A1] font-semibold">촬영 상품</span>
                <span className="font-bold text-[#191F28]">{selectedStudioForBooking.pd.nm}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-[#8B95A1] font-semibold">확정 일시</span>
                <span className="font-extrabold text-[#00A05A]">10/12(토) 14:00</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-[#8B95A1] font-semibold">결제된 예약금 (10%)</span>
                <span className="font-extrabold text-[#FF5C1F]">
                  {formatMan(
                    Math.round(
                      (selectedStudioForBooking.pd.base +
                        (!selectedStudioForBooking.pd.raw ? selectedStudioForBooking.pd.rawFee : 0)) *
                        0.1
                    )
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[14px] pt-2 border-t border-[#E5E8EB]">
                <span className="text-[#8B95A1] font-semibold">현장 결제 잔금</span>
                <span className="font-extrabold text-[#191F28]">
                  {formatMan(
                    Math.round(
                      (selectedStudioForBooking.pd.base +
                        (!selectedStudioForBooking.pd.raw ? selectedStudioForBooking.pd.rawFee : 0)) *
                        0.9
                    )
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E5E8EB] p-4 px-5 z-30 shadow-lg">
        {state === 'form' && (
          <button
            onClick={handleSendInquiry}
            className="w-full py-4 rounded-xl bg-[#111111] text-white font-extrabold text-[16px] hover:brightness-110 active:scale-[0.99] transition-all shadow-sm"
          >
            {studios.length > 1 ? `${studios.length}곳 동시 견적요청 보내기` : '견적요청 보내기'}
          </button>
        )}

        {state === 'sent' && (
          <button
            onClick={handlePayDeposit}
            className="w-full py-4 rounded-xl bg-[#FF5C1F] text-white font-extrabold text-[16px] hover:brightness-105 active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            <span>선택한 스튜디오 예약금 결제하기</span>
          </button>
        )}

        {state === 'paid' && (
          <button
            onClick={onDone}
            className="w-full py-4 rounded-xl bg-[#111111] text-white font-extrabold text-[16px] hover:brightness-110 active:scale-[0.99] transition-all shadow-sm"
          >
            홈으로 돌아가기
          </button>
        )}
      </div>
    </div>
  );
};
