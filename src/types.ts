export type OccasionId =
  | 'maternity'
  | 'newborn'
  | '100day'
  | 'firstbd'
  | 'family'
  | 'profile'
  | 'wedding'
  | 'rehearsal'
  | 'couple'
  | 'pet'
  | 'idphoto'
  | 'etc';

export type ConceptId =
  | 'natural'
  | 'white'
  | 'film'
  | 'hanok'
  | 'pastel'
  | 'modern'
  | 'vintage'
  | 'outdoor'
  | 'bw';

export type ModeType = 'studio' | 'visit' | 'both';

export interface Occasion {
  id: OccasionId;
  ic: string;
  nm: string;
  subs: string[];
}

export interface Concept {
  id: ConceptId;
  nm: string;
  ds: string;
  rank?: number;
  pop: string;
}

export interface ModeOption {
  id: ModeType;
  nm: string;
  ds: string;
}

export interface Facility {
  id: string;
  nm: string;
}

export interface ProductSpec {
  nm: string;
  base: number;
  list: number;
  dur: number;
  out: number;
  ret: number;
  raw: boolean;
  rawFee: number;
  frame: string;
  hm: boolean;
  ppl: string;
}

export interface ExtraFee {
  l: string;
  a: number;
}

export interface Review {
  id: string;
  n: string;
  s: number;
  p: string;
  d: string;
  ef: boolean; // extra fee reported (true if undisclosed extra fee occurred)
  h: number; // helpful count
  t: string;
  im: string[];
}

export interface Studio {
  id: number;
  nm: string;
  loc: string;
  gu: string;
  dist: number;
  rt: number;
  rv: number;
  resp: number;
  cat: OccasionId[];
  mode: ('studio' | 'visit')[];
  con: ConceptId[];
  fac: string[];
  im: string;
  pay: boolean;
  ad?: boolean;
  pd: ProductSpec;
  ex: ExtraFee[];
  top: [string, number][];
  rvs: Review[];
  desc?: string;
  phone?: string;
  address?: string;
}

export interface CommunityPost {
  id: string;
  n: string;
  category: '추가금 제보' | '후기 자랑' | '촬영 질문' | '자유수다';
  time: string;
  title: string;
  text: string;
  images: string[];
  likes: number;
  commentsCount: number;
  isWarn?: boolean;
  studioName?: string;
}

export interface QuoteRequest {
  id: string;
  studios: Studio[];
  date: string;
  timeSlot: '오전' | '오후' | '상관없음';
  people: string;
  notes: string;
  status: 'sent' | 'quoted' | 'booked';
  createdAt: string;
}
