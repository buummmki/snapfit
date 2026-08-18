import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * 앱 셸.
 *
 * 실기기와 PC를 한 벌의 반응형 레이아웃으로 처리한다.
 *
 *   모바일(<768px)  뷰포트 전체를 쓴다. 100dvh + safe-area-inset으로
 *                   노치·다이나믹아일랜드·홈인디케이터·펀치홀을 피한다.
 *                   iOS와 Android 차이는 전부 env(safe-area-inset-*)가 흡수하므로
 *                   기기별 분기나 별도 빌드가 필요 없다.
 *
 *   PC(≥768px)      모바일 레이아웃을 중앙 480px 컬럼으로 보여준다.
 *                   좌우 경계선만 두고 폰 목업(베젤·가짜 상태바)은 그리지 않는다.
 *
 * 이전 버전은 390x844(iPhone 14)를 하드코딩하고 가짜 iOS 상태바를 항상 렌더해서,
 * 갤럭시에서는 여백이 남고 iPhone SE에서는 하단 CTA가 화면 밖으로 밀렸다.
 * 실기기에 목업을 그리지 않는 것이 이 컴포넌트의 유일한 규칙이다.
 */
export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-[100dvh] w-full bg-[#F4F5F7] md:flex md:justify-center">
      <div
        className="
          relative flex flex-col overflow-hidden bg-white
          h-[100dvh] w-full
          pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]
          md:h-[100dvh] md:w-full md:max-w-[480px]
          md:border-x md:border-[#E5E8EB] md:pt-0 md:pb-0
        "
      >
        {children}
      </div>
    </div>
  );
};
