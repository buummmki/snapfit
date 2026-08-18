import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Download, RefreshCw, Wand2, Image, Bot, User, AlertCircle, Check } from 'lucide-react';
import { OCCASIONS, CONCEPTS } from '../data/mockData';

export const AiHubScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'generate'>('chat');

  // Chat State
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: `안녕하세요! 스냅핏의 AI 사진 스튜디오 수석 컨설턴트 **핏매니저**입니다. 📷\n\n만삭·신생아·100일·돌·가족·웨딩 등 촬영 목적에 맞는 **최적의 컨셉 추천**, **스튜디오 숨은 추가금(원본비·헬퍼비) 검증**, **견적서 비교 분석**을 도와드릴게요. 어떤 점이 궁금하신가요?`,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Image Generation State
  const [selectedOccasion, setSelectedOccasion] = useState('100일');
  const [selectedConcept, setSelectedConcept] = useState('내추럴');
  const [promptDetail, setPromptDetail] = useState('따뜻한 자연광이 들어오는 화이트 톤 베이비 룸, 감성적인 나무 소품과 편안한 아기 표정');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '3:4' | '4:3' | '9:16'>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1000&auto=format&fit=crop&q=80'
  );
  const [genMetadata, setGenMetadata] = useState<{ size: string; prompt: string } | null>(null);

  const quickQuestions = [
    '100일 촬영 원본비 보통 얼마인가요?',
    '신생아 촬영, 스튜디오 vs 출장 차이점',
    '가족사진 3대 대가족 의상 팁',
    '웨딩 촬영 당일 필수 추가금 체크리스트',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isChatLoading) return;

    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);
    setInputMessage('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          context: {
            service: 'SnapFit (스냅핏)',
            selectedOccasion,
            selectedConcept,
          },
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: '답변을 불러오지 못했습니다. 다시 시도해주세요.' },
        ]);
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: '네트워크 통신 중 오류가 발생했습니다.' },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateConcept = async () => {
    if (!promptDetail.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/gemini/generate-concept-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptDetail,
          occasion: selectedOccasion,
          concept: selectedConcept,
          imageSize,
          aspectRatio,
        }),
      });

      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setGenMetadata({ size: data.imageSize || imageSize, prompt: promptDetail });
      } else {
        alert(data.error || '이미지 생성에 실패했습니다.');
      }
    } catch (err) {
      alert('이미지 생성 서버 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Top Nav */}
      <div className="h-[54px] flex items-center justify-between px-5 border-b border-[#F2F4F6] shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FF5C1F]" />
          <h2 className="text-[20px] font-black text-[#191F28] tracking-tight">AI 핏스튜디오</h2>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex px-5 border-b border-[#F2F4F6] shrink-0">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 text-[15px] font-bold text-center transition-all relative flex items-center justify-center gap-1.5 ${
            activeTab === 'chat' ? 'text-[#191F28] font-black' : 'text-[#8B95A1]'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI 스튜디오 컨설턴트</span>
          {activeTab === 'chat' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#111111]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('generate')}
          className={`flex-1 py-3 text-[15px] font-bold text-center transition-all relative flex items-center justify-center gap-1.5 ${
            activeTab === 'generate' ? 'text-[#191F28] font-black' : 'text-[#8B95A1]'
          }`}
        >
          <Wand2 className="w-4 h-4 text-[#FF5C1F]" />
          <span>AI 컨셉 화보 생성 (1K·2K·4K)</span>
          {activeTab === 'generate' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#111111]" />
          )}
        </button>
      </div>

      {/* Tab 1: AI Chat Consultant */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col min-h-0 bg-[#FAFBFC]">
          {/* Quick Prompt Chips */}
          <div className="p-3 bg-white border-b border-[#F2F4F6] flex gap-2 overflow-x-auto no-scrollbar shrink-0">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-full bg-[#F2F4F6] text-[12.5px] font-bold text-[#4A5058] whitespace-nowrap hover:bg-[#111111] hover:text-white transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((m, idx) => {
              const isAssistant = m.role === 'assistant';
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-full bg-[#FF5C1F] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-xs">
                      핏
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-[16px] p-3.5 text-[14px] leading-relaxed whitespace-pre-line shadow-xs ${
                      isAssistant
                        ? 'bg-white text-[#191F28] border border-[#E5E8EB]'
                        : 'bg-[#111111] text-white font-medium'
                    }`}
                  >
                    {m.content}
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-full bg-[#E5E8EB] text-[#8B95A1] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isChatLoading && (
              <div className="flex items-center gap-2 text-[13px] text-[#8B95A1] font-semibold pl-10">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#FF5C1F]" />
                <span>핏매니저가 견적과 팁을 분석하고 있습니다...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#F2F4F6] shrink-0 mb-14">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="스튜디오 견적, 추가금, 컨셉 추천 질문하기..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E8EB] text-[14px] font-semibold text-[#191F28] focus:outline-none focus:border-[#111111]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isChatLoading}
                className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center disabled:bg-[#E5E8EB] disabled:text-[#B0B8C1] transition-all shrink-0 hover:brightness-110"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: AI High-Quality Concept Image Generator (1K, 2K, 4K) */}
      {activeTab === 'generate' && (
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 pb-20 space-y-5">
          <div className="bg-[#FFF5F0] border border-[#FFD0BE] rounded-[16px] p-4 flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-[#FF5C1F] shrink-0 mt-0.5" />
            <div className="text-[13px] text-[#5A4034] leading-relaxed">
              <b className="text-[#FF5C1F] font-black">AI 고화질 스튜디오 컨셉 화보</b>
              <p className="mt-0.5">
                원하는 촬영 목적과 컨셉을 조합하여 실제 스튜디오 화보급 시안을 <b>1K, 2K, 4K 초고해상도</b>로 생성하고 스튜디오 문의 시 레퍼런스로 사용해보세요.
              </p>
            </div>
          </div>

          {/* Form Controls */}
          <div className="space-y-4">
            {/* Occasion & Concept Selectors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[13px] font-bold text-[#8B95A1] mb-1.5">촬영 목적</label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E8EB] text-[14px] font-bold text-[#191F28] bg-white focus:outline-none focus:border-[#111111]"
                >
                  {OCCASIONS.map((o) => (
                    <option key={o.id} value={o.nm}>
                      {o.nm}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#8B95A1] mb-1.5">컨셉 스타일</label>
                <select
                  value={selectedConcept}
                  onChange={(e) => setSelectedConcept(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E8EB] text-[14px] font-bold text-[#191F28] bg-white focus:outline-none focus:border-[#111111]"
                >
                  {CONCEPTS.map((c) => (
                    <option key={c.id} value={c.nm}>
                      {c.nm}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resolution Selector (1K, 2K, 4K) - Feature Requirement */}
            <div>
              <label className="block text-[13px] font-extrabold text-[#191F28] mb-1.5 flex items-center justify-between">
                <span>이미지 해상도 (Image Size)</span>
                <span className="text-[11.5px] font-bold text-[#FF5C1F]">Gemini Pro Image HD</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['1K', '2K', '4K'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setImageSize(size)}
                    className={`py-2.5 rounded-xl text-[13.5px] font-extrabold transition-all ${
                      imageSize === size
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'bg-[#F2F4F6] text-[#4A5058] hover:bg-[#E5E8EB]'
                    }`}
                  >
                    {size} ({size === '1K' ? '1024px' : size === '2K' ? '2048px' : '4096px'})
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-[13px] font-bold text-[#8B95A1] mb-1.5">화면 비율</label>
              <div className="grid grid-cols-4 gap-2">
                {(['1:1', '3:4', '4:3', '9:16'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-2 rounded-xl text-[13px] font-bold transition-all ${
                      aspectRatio === ratio
                        ? 'bg-[#FF5C1F] text-white'
                        : 'bg-[#F2F4F6] text-[#4A5058]'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt text */}
            <div>
              <label className="block text-[13px] font-bold text-[#8B95A1] mb-1.5">상세 연출 프롬프트</label>
              <textarea
                value={promptDetail}
                onChange={(e) => setPromptDetail(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E8EB] text-[13.5px] font-semibold text-[#191F28] focus:outline-none focus:border-[#111111] resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateConcept}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-[#111111] text-white font-extrabold text-[15px] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all shadow-sm"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4.5 h-4.5 animate-spin text-[#FF5C1F]" />
                  <span>{imageSize} 화질로 렌더링 중...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4.5 h-4.5 text-[#FF5C1F]" />
                  <span>{imageSize} 고화질 컨셉 화보 생성하기</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Result Preview */}
          {generatedImage && (
            <div className="bg-[#FAFBFC] border border-[#E5E8EB] rounded-[18px] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13.5px] font-black text-[#191F28] flex items-center gap-1.5">
                  <Image className="w-4 h-4 text-[#FF5C1F]" />
                  <span>생성된 컨셉 시안 ({imageSize})</span>
                </span>
                <a
                  href={generatedImage}
                  download={`snapfit-concept-${Date.now()}.png`}
                  className="flex items-center gap-1 text-[12.5px] font-bold text-[#3182F6] hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>다운로드</span>
                </a>
              </div>

              <div className="w-full aspect-square rounded-[14px] overflow-hidden bg-black/5 shadow-inner">
                <img
                  src={generatedImage}
                  alt="AI concept"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {genMetadata && (
                <div className="text-[12px] text-[#8B95A1] leading-relaxed">
                  💡 <b>스냅핏 팁:</b> 이 시안 이미지를 저장하여 스튜디오 견적요청 시 첨부하시면 작가님이 정확히 동일한 조명 및 세트로 세팅해드립니다.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
