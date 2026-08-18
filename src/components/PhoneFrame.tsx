import React, { useState } from 'react';
import { Smartphone, Maximize2, Minimize2 } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#E9ECEF] flex flex-col items-center justify-center p-0 md:p-6 transition-all">
      {/* Desktop Helper Bar */}
      <div className="hidden md:flex items-center justify-between w-full max-w-[420px] mb-3 px-2 text-xs font-bold text-[#4A5058]">
        <div className="flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-[#FF5C1F]" />
          <span>스냅핏 (SnapFit) 모바일 앱 시뮬레이터</span>
        </div>
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full shadow-xs text-[#191F28] hover:bg-[#FAFBFC] transition-colors"
        >
          {isFullScreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span>프레임 모드</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span>전체화면</span>
            </>
          )}
        </button>
      </div>

      {/* Phone Mockup Body */}
      <div
        className={`w-full bg-white relative overflow-hidden transition-all duration-300 ${
          isFullScreen
            ? 'max-w-[560px] h-[95vh] rounded-[32px] shadow-2xl border-4 border-[#1C1C1E]'
            : 'max-w-[390px] h-[844px] md:rounded-[44px] md:shadow-[0_0_0_11px_#1C1C1E,0_22px_60px_rgba(0,0,0,0.35)]'
        } flex flex-col`}
      >
        {/* iOS Dynamic Island & Status Bar */}
        <div className="h-[46px] px-6 pt-2 pb-1 flex items-end justify-between text-xs font-black text-[#191F28] select-none shrink-0 bg-white z-40">
          <span>11:24</span>

          {/* Dynamic Island Pill */}
          <div className="w-[100px] h-[22px] bg-black rounded-full mx-auto -mb-1 flex items-center justify-end px-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1C1C1E] border border-[#333]" />
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <svg className="w-4 h-2.5" viewBox="0 0 17 11" fill="currentColor">
              <rect x="0" y="7" width="3" height="4" rx="1" />
              <rect x="4.5" y="5" width="3" height="6" rx="1" />
              <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
              <rect x="13.5" y="0" width="3" height="11" rx="1" />
            </svg>
            <span className="text-[10px] font-extrabold font-mono">5G</span>
            <div className="w-6 h-3 border border-[#191F28] rounded-[3.5px] relative flex items-center justify-center text-[8px] font-black">
              79
              <span className="absolute -right-1 top-0.5 w-[2px] h-[5px] bg-[#191F28] rounded-r-xs" />
            </div>
          </div>
        </div>

        {/* Viewport Content */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
