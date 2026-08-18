import { Studio, ConceptId } from '../types';

/**
 * 스냅핏 매칭 엔진
 *
 * 이 모듈이 단일 진실 공급원(single source of truth)이다.
 * 목록 정렬과 카드에 표시되는 "매칭 %"는 반드시 같은 함수를 써야 한다.
 * 두 값이 어긋나면 "왜 이 순서인지 납득시킨다"는 제품의 핵심 주장이 무너진다.
 *
 * 배점 (총 100점)
 *   컨셉 일치   40  — 사용자가 고른 컨셉과 스튜디오 태그의 교집합 비율
 *   거리        25  — 관심 지역 기준 거리. 출장 가능하면 가산
 *   신뢰        20  — 평점 + 결제인증 후기 수(로그 스케일)
 *   가격 투명성 15  — 원본 포함 / 추가금 사전 고지 / 견적 응답률
 *
 * 보정
 *   예산 초과   초과율에 비례해 최대 -25
 *   응답 불량   응답률 75% 미만이면 ×0.88
 */

export interface MatchContext {
  /** 온보딩·필터에서 선택된 관심 컨셉 */
  concepts: ConceptId[];
  /** 예산 상한(원). 미지정이면 예산 감점을 적용하지 않는다 */
  maxBudget?: number | null;
}

export interface ScoredStudio extends Studio {
  /** 0~99 정규화된 매칭 점수 */
  matchScore: number;
  /** 실결제 예상가 = 표기가 + (원본 미포함 시 원본비) */
  allInPrice: number;
  /** 예상 최대 결제액 = 표기가 + 모든 추가금 */
  maxPrice: number;
  /** 표기가와 실결제가의 차이. 0보다 크면 숨은 원본비가 있다는 뜻 */
  rawGap: number;
}

/** 실결제 예상가 — 표기가에 원본비를 더한 진짜 결제 금액 */
export const getAllInPrice = (s: Studio): number =>
  s.pd.base + (s.pd.raw ? 0 : s.pd.rawFee);

/** 예상 최대 결제액 — 고지된 추가금을 모두 더한 상한 */
export const getMaxPrice = (s: Studio): number =>
  s.pd.base + s.ex.reduce((sum, e) => sum + e.a, 0);

export function getMatchScore(s: Studio, ctx: MatchContext): number {
  // 1) 컨셉 일치 (40)
  const hits = ctx.concepts.filter((c) => s.con.includes(c)).length;
  const concept = ctx.concepts.length ? (hits / ctx.concepts.length) * 40 : 30;

  // 2) 거리 (25)
  const d = s.dist;
  let distance = d <= 3 ? 25 : d <= 8 ? 20 : d <= 15 ? 14 : 8;
  if (s.fac.includes('visit')) distance = Math.min(25, distance + 4);

  // 3) 신뢰 (20)
  const trust = (s.rt / 10) * 12 + Math.min(8, Math.log10(s.rv + 1) * 4);

  // 4) 가격 투명성 (15)
  let transparency = 0;
  if (s.pd.raw) transparency += 9; // 원본 포함
  if (s.ex.length > 0) transparency += 3; // 추가금을 숨기지 않고 고지
  if (s.resp >= 90) transparency += 3; // 견적 응답률 우수

  let total = concept + distance + trust + transparency;

  // 예산 초과 감점
  if (ctx.maxBudget && ctx.maxBudget > 0) {
    const over = getAllInPrice(s) - ctx.maxBudget;
    if (over > 0) total -= Math.min(25, (over / ctx.maxBudget) * 50);
  }

  // 견적 응답이 느린 곳은 노출을 낮춘다
  if (s.resp < 75) total *= 0.88;

  return Math.max(1, Math.min(99, Math.round(total)));
}

/** 스튜디오 목록에 매칭 점수와 가격 파생값을 부착한다 */
export function scoreStudios(list: Studio[], ctx: MatchContext): ScoredStudio[] {
  return list.map((s) => {
    const allInPrice = getAllInPrice(s);
    return {
      ...s,
      matchScore: getMatchScore(s, ctx),
      allInPrice,
      maxPrice: getMaxPrice(s),
      rawGap: allInPrice - s.pd.base,
    };
  });
}

export const SORT_OPTIONS = [
  '매칭순',
  '실결제가 낮은순',
  '후기 많은순',
  '평점 높은순',
] as const;

/**
 * 정렬. 매칭순일 때만 광고 슬롯을 상단에 고정한다.
 * 광고는 반드시 "광고" 뱃지와 함께 노출되어야 하며, 매칭 점수를 조작하지 않는다.
 */
export function sortStudios(list: ScoredStudio[], sortIndex: number): ScoredStudio[] {
  const sorted = [...list];

  switch (sortIndex) {
    case 1:
      sorted.sort((a, b) => a.allInPrice - b.allInPrice);
      return sorted;
    case 2:
      sorted.sort((a, b) => b.rv - a.rv);
      return sorted;
    case 3:
      sorted.sort((a, b) => b.rt - a.rt);
      return sorted;
    default:
      sorted.sort((a, b) => b.matchScore - a.matchScore);
      return [...sorted.filter((s) => s.ad), ...sorted.filter((s) => !s.ad)];
  }
}
