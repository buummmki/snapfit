import { Occasion, Concept, ModeOption, Facility, Studio, CommunityPost } from '../types';

export const OCCASIONS: Occasion[] = [
  { id: 'maternity', ic: 'belly', nm: '만삭', subs: ['만삭 스튜디오', '만삭 야외', '부부 만삭', '태교 화보'] },
  { id: 'newborn', ic: 'newborn', nm: '신생아', subs: ['신생아 출장', '50일 촬영', '신생아 스튜디오', '본아트 수면컨셉'] },
  { id: '100day', ic: 'cake', nm: '100일', subs: ['100일 스튜디오', '100일 출장', '성장앨범 1회차', '전통 한복 백일'] },
  { id: 'firstbd', ic: 'crown', nm: '돌', subs: ['돌스냅', '돌잔치 현장', '돌 스튜디오', '전통 돌상 사진'] },
  { id: 'family', ic: 'family', nm: '가족사진', subs: ['가족사진', '3대 대가족', '리마인드 웨딩', '환갑·칠순 기념', '명절 가족'] },
  { id: 'profile', ic: 'profile', nm: '프로필', subs: ['이력서 사진', '배우·모델', '링크드인 프로필', '소장용 개인화보', '작가 프로필'] },
  { id: 'wedding', ic: 'ring', nm: '웨딩 본식', subs: ['본식 스냅', '서브 스냅', '혼주 사진', '원판 촬영'] },
  { id: 'rehearsal', ic: 'dress', nm: '리허설', subs: ['실내 스튜디오', '야외 로케이션', '필름 웨딩', '드레스 화보'] },
  { id: 'couple', ic: 'couple', nm: '커플', subs: ['커플 스냅', '우정 스냅', '졸업 스냅', '기념일 촬영'] },
  { id: 'pet', ic: 'pet', nm: '반려동물', subs: ['반려견 단독', '반려묘 촬영', '가족+반려동물 동반'] },
  { id: 'idphoto', ic: 'idcard', nm: '증명사진', subs: ['여권 사진', '이력서 증명', '비자 사진', '컬러 증명'] },
  { id: 'etc', ic: 'more', nm: '기타', subs: ['제품 촬영', '공간·인테리어', '행사 스냅', '임직원 프로필'] },
];

export const MODES: ModeOption[] = [
  { id: 'studio', nm: '스튜디오 촬영', ds: '예: 실내 세트, 호리존, 한옥 스튜디오' },
  { id: 'visit', nm: '출장 촬영', ds: '예: 집·산후조리원·야외 로케이션' },
  { id: 'both', nm: '둘 다 찾고 있어요', ds: '스튜디오와 출장 옵션을 모두 비교' },
];

export const CONCEPTS: Concept[] = [
  { id: 'natural', nm: '내추럴', ds: '과한 소품 없이 자연광 위주로, 있는 그대로의 표정을 담는 컨셉이에요.', rank: 1, pop: '1,842' },
  { id: 'white', nm: '화이트', ds: '흰 배경과 밝은 톤으로 깔끔하게 정리되는 가장 무난한 컨셉이에요.', rank: 2, pop: '1,377' },
  { id: 'film', nm: '필름감성', ds: '필름 특유의 입자감과 따뜻한 색감으로 아날로그 무드를 연출해요.', rank: 3, pop: '986' },
  { id: 'hanok', nm: '한옥·한복', ds: '고즈넉한 한옥 공간과 한복으로 촬영해요. 돌·가족사진에서 인기가 높아요.', pop: '741' },
  { id: 'pastel', nm: '파스텔', ds: '연한 파스텔 색감의 소품과 배경으로 부드럽고 몽환적으로 연출해요.', pop: '623' },
  { id: 'modern', nm: '모던', ds: '군더더기 없는 미니멀 배경과 명확한 조명으로 세련되게 담아요.', pop: '512' },
  { id: 'vintage', nm: '빈티지', ds: '앤티크 소품과 부드러운 저채도로 깊이 있는 분위기를 냅니다.', pop: '388' },
  { id: 'outdoor', nm: '야외', ds: '공원·숲·바다·거리 등 자연스러운 실외 로케이션에서 촬영해요.', pop: '354' },
  { id: 'bw', nm: '흑백', ds: '색을 덜어내고 인물의 표정과 시선, 형태에 오롯이 집중하는 컨셉이에요.', pop: '201' },
];

export const FACILITIES: Facility[] = [
  { id: 'parking', nm: '주차 지원' },
  { id: 'nursing', nm: '단독 수유실' },
  { id: 'outfit', nm: '의상 대여' },
  { id: 'hairmakeup', nm: '헤어메이크업' },
  { id: 'weekend', nm: '주말 촬영 가능' },
  { id: 'pet', nm: '반려동물 동반' },
  { id: 'elevator', nm: '엘리베이터 완비' },
  { id: 'visit', nm: '출장 가능' },
  { id: 'kids', nm: '유아 놀이/소독존' },
  { id: 'hanbok', nm: '프리미엄 한복' },
];

export const REGIONS: Record<string, string[]> = {
  '서울': [
    '강남역/신논현/양재',
    '청담/압구정/신사',
    '선릉/삼성/대치',
    '논현/반포/학동',
    '서초/교대/방배',
    '송파/잠실/석촌',
    '홍대/합정/신촌/마포',
    '성수/건대/광진',
    '용산/한남/이태원',
    '서울역/명동/종로',
    '목동/여의도/영등포',
    '노원/성북/강북'
  ],
  '경기': ['분당/판교', '일산/킨텍스', '수원/광교', '용인/수지/기흥', '하남/미사', '부천/광명', '안양/평촌', '남양주/다산'],
  '인천': ['송도국제도시', '부평/구월', '청라'],
  '부산': ['해운대/센텀', '서면/전포', '광안리/수영', '동래/남포'],
  '대구': ['수성구/범어', '동성로/중구', '달서구'],
  '대전': ['둔산동/서구', '유성구/도안'],
  '광주': ['상무지구/치평', '수완지구', '충장로'],
  '울산': ['삼산동/달동', '성남동'],
  '충남/세종': ['세종시 정부청사권', '천안 불당/신부', '아산'],
  '충북': ['청주 가경/오창'],
  '강원': ['춘천/온의', '강릉/초당'],
  '전북': ['전주 신시가지/한옥마을'],
  '경남': ['창원 상남', '김해 율하'],
  '제주': ['제주시 노형/연동', '서귀포/안덕']
};

export const STUDIOS: Studio[] = [
  {
    id: 1,
    nm: '스튜디오 봄',
    loc: '서울 논현역 도보 3분',
    gu: '강남구 논현동',
    dist: 2.1,
    rt: 9.8,
    rv: 142,
    resp: 98,
    cat: ['100day', 'newborn', 'maternity', 'family'],
    mode: ['studio'],
    con: ['natural', 'white', 'pastel'],
    fac: ['parking', 'nursing', 'elevator', 'outfit', 'weekend', 'kids'],
    im: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    pay: true,
    pd: {
      nm: '100일 촬영 베이직 올인원',
      base: 680000,
      list: 850000,
      dur: 60,
      out: 3,
      ret: 15,
      raw: true,
      rawFee: 0,
      frame: '8x10 아크릴 액자 1개',
      hm: false,
      ppl: '아기 + 부모 2인'
    },
    ex: [
      { l: '의상 1벌 추가 (소품 포함)', a: 50000 },
      { l: '보정 컷 추가 (1컷당)', a: 20000 },
      { l: '조부모 동반 촬영 (1인당)', a: 50000 },
      { l: '주말·공휴일 예약금', a: 50000 }
    ],
    top: [
      ['100일 촬영', 412],
      ['만삭 화보', 288],
      ['신생아 본아트', 134]
    ],
    desc: '자연광 채광 스튜디오로 아기의 컨디션을 최우선으로 배려합니다. 단독 수유실 및 베이비 살균 케어 시스템을 운영합니다.',
    address: '서울특별시 강남구 학동로 123 3층',
    rvs: [
      {
        id: 'r1',
        n: '김지현',
        s: 10,
        p: '100일 촬영 베이직 올인원',
        d: '2026.07',
        ef: false,
        h: 42,
        t: '추가금 단 1원도 없었어요! 아기가 중간에 졸려서 20분 넘게 달래느라 늦어졌는데 추가비 일절 안 받으시고 웃으면서 기다려주셨습니다. 원본 파일도 이틀 만에 고화질로 전부 전송받았어요.',
        im: [
          'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=500&auto=format&fit=crop&q=80'
        ]
      },
      {
        id: 'r2',
        n: '이서윤',
        s: 10,
        p: '만삭 스탠다드',
        d: '2026.06',
        ef: false,
        h: 28,
        t: '수유실이랑 드레스룸이 완벽히 분리되어 있어 너무 쾌적했습니다. 표기된 견적서 그대로 결제했고, 보정본 톤도 요청사항 100% 반영해주셨어요.',
        im: [
          'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=80'
        ]
      }
    ]
  },
  {
    id: 2,
    nm: '리틀문 스튜디오',
    loc: '서울 서초역 4번출구',
    gu: '서초구 서초동',
    dist: 3.4,
    rt: 9.1,
    rv: 86,
    resp: 88,
    cat: ['100day', 'newborn', 'firstbd'],
    mode: ['studio'],
    con: ['white', 'pastel', 'modern'],
    fac: ['parking', 'nursing', 'weekend', 'outfit'],
    im: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&auto=format&fit=crop&q=80',
    pay: false,
    pd: {
      nm: '100일 프리미엄 (원본 별도)',
      base: 550000,
      list: 690000,
      dur: 90,
      out: 4,
      ret: 20,
      raw: false,
      rawFee: 300000,
      frame: '11x14 원목 액자 1개',
      hm: false,
      ppl: '아기 + 부모 2인'
    },
    ex: [
      { l: '원본 전체 파일 (필수 선택 시)', a: 300000 },
      { l: '의상 1벌 추가', a: 80000 },
      { l: '주말·공휴일 할증', a: 70000 }
    ],
    top: [
      ['100일 촬영', 221],
      ['돌스냅', 97],
      ['신생아', 64]
    ],
    desc: '화이트 톤의 깔끔한 베이비 전문 스튜디오입니다. 감각적인 소품과 조명 설계.',
    address: '서울특별시 서초구 서초대로 240',
    rvs: [
      {
        id: 'r3',
        n: '박민지',
        s: 8,
        p: '100일 프리미엄',
        d: '2026.07',
        ef: true,
        h: 67,
        t: '사진 퀄리티 자체는 수준급입니다. 다만 표기가격 55만원만 보고 갔다가 현장에서 원본 받으려면 30만원 추가 결제해야 한다고 해서 총 85만원 나왔어요. 스냅핏처럼 미리 원본비가 표기되는 게 꼭 필요합니다!',
        im: [
          'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&auto=format&fit=crop&q=80'
        ]
      }
    ]
  },
  {
    id: 3,
    nm: '온고재 한옥스튜디오',
    loc: '서울 안국역 북촌한옥마을',
    gu: '종로구 가회동',
    dist: 8.7,
    rt: 9.7,
    rv: 203,
    resp: 94,
    cat: ['family', 'firstbd', 'couple', 'rehearsal'],
    mode: ['studio'],
    con: ['hanok', 'natural', 'film'],
    fac: ['outfit', 'weekend', 'elevator', 'hanbok', 'parking'],
    im: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    pay: true,
    pd: {
      nm: '북촌 한옥 3대 가족촬영 올인원',
      base: 750000,
      list: 980000,
      dur: 120,
      out: 2,
      ret: 25,
      raw: true,
      rawFee: 0,
      frame: '16x20 고급 캔버스 액자 1개',
      hm: false,
      ppl: '최대 6인 (대가족)'
    },
    ex: [
      { l: '인원 1인 추가 (6인 초과 시)', a: 50000 },
      { l: '프리미엄 비단 한복 대여 1벌', a: 40000 },
      { l: '정밀 보정 컷 추가 (1컷당)', a: 25000 }
    ],
    top: [
      ['한옥 가족사진', 689],
      ['돌 한복 전통촬영', 312],
      ['리마인드 웨딩', 188]
    ],
    desc: '북촌 100년 고택에서 펼쳐지는 정통 한옥 스튜디오. 실내 및 중정 마당을 단독 대관하여 프라이빗하게 촬영합니다.',
    address: '서울특별시 종로구 북촌로 45',
    rvs: [
      {
        id: 'r4',
        n: '최유정',
        s: 10,
        p: '북촌 한옥 3대 가족촬영 올인원',
        d: '2026.05',
        ef: false,
        h: 91,
        t: '조부모님 칠순 기념으로 3대가 함께 찍었는데 어르신들이 감동하셨어요. 한복 퀄리티도 백화점 대여급이었고, 원본 파일도 누락 없이 당일 압축파일로 주셨습니다.',
        im: [
          'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=80'
        ]
      }
    ]
  },
  {
    id: 4,
    nm: '화이트룸 홍대',
    loc: '서울 홍대입구역 9번출구',
    gu: '마포구 서교동',
    dist: 11.2,
    rt: 9.0,
    rv: 74,
    resp: 85,
    ad: true,
    cat: ['100day', 'newborn', 'profile', 'idphoto'],
    mode: ['studio'],
    con: ['white', 'modern'],
    fac: ['nursing', 'elevator', 'weekend', 'hairmakeup'],
    im: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80',
    pay: true,
    pd: {
      nm: '베이비 & 키즈 화이트 미니멀',
      base: 420000,
      list: 520000,
      dur: 50,
      out: 2,
      ret: 10,
      raw: true,
      rawFee: 0,
      frame: '미포함 (인화 10장 제공)',
      hm: false,
      ppl: '아기 + 부모 2인'
    },
    ex: [
      { l: '원목 액자 추가', a: 80000 },
      { l: '의상 1벌 추가', a: 40000 },
      { l: '보정 컷 추가 (1컷)', a: 15000 }
    ],
    top: [
      ['베이비 화이트', 188],
      ['프로필 사진', 142],
      ['컬러 증명사진', 96]
    ],
    desc: '순백의 호리존에서 담는 미니멀하고 깨끗한 초상. 거품을 뺀 정찰제 가격.',
    address: '서울특별시 마포구 양화로 160',
    rvs: [
      {
        id: 'r5',
        n: '정하늘',
        s: 10,
        p: '베이비 & 키즈 화이트 미니멀',
        d: '2026.06',
        ef: false,
        h: 35,
        t: '가성비 최고예요. 액자 강요도 전혀 없고 원본을 다 넘겨주셔서 제가 인터넷에서 앨범 직접 만들었습니다. 시간 약속도 칼같이 지켜주셨어요.',
        im: [
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=80'
        ]
      }
    ]
  },
  {
    id: 5,
    nm: '무드필름 성수',
    loc: '서울 성수역 연무장길',
    gu: '성동구 성수동',
    dist: 9.5,
    rt: 9.8,
    rv: 312,
    resp: 96,
    cat: ['couple', 'family', 'rehearsal', 'wedding'],
    mode: ['visit', 'studio'],
    con: ['film', 'vintage', 'outdoor'],
    fac: ['outfit', 'weekend', 'visit'],
    im: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80',
    pay: true,
    pd: {
      nm: '아날로그 필름 커플·웨딩 스냅',
      base: 390000,
      list: 450000,
      dur: 90,
      out: 1,
      ret: 30,
      raw: true,
      rawFee: 0,
      frame: '필름 엽서북 증정',
      hm: false,
      ppl: '2인'
    },
    ex: [
      { l: '서울 외 경기권 출장비', a: 100000 },
      { l: '필름 1롤 추가 촬영 현상', a: 50000 },
      { l: '주말·일몰 골든아워 지정', a: 50000 }
    ],
    top: [
      ['필름 커플스냅', 904],
      ['리허설 야외스냅', 421],
      ['본식 서브스냅', 233]
    ],
    desc: '실제 중형 필름 카메라와 디지털을 병행하여 영화 같은 색감을 만듭니다. 성수/서울숲 야외 로케이션 전문.',
    address: '서울특별시 성동구 연무장5길 10',
    rvs: [
      {
        id: 'r6',
        n: '한지민',
        s: 10,
        p: '아날로그 필름 커플·웨딩 스냅',
        d: '2026.07',
        ef: false,
        h: 120,
        t: '필름 특유의 빛바랜 따뜻한 감성 그대로 나왔어요! 서울숲 구석구석 사람 없는 비밀 스팟으로 안내해주셔서 긴장하지 않고 데이트하듯 찍었습니다.',
        im: [
          'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop&q=80'
        ]
      }
    ]
  },
  {
    id: 6,
    nm: '베이비파스텔 강남점',
    loc: '서울 강남역 우성아파트사거리',
    gu: '강남구 역삼동',
    dist: 1.4,
    rt: 8.9,
    rv: 62,
    resp: 79,
    cat: ['maternity', '100day', 'newborn', 'family'],
    mode: ['studio'],
    con: ['pastel', 'natural'],
    fac: ['parking', 'nursing', 'outfit', 'kids', 'hairmakeup'],
    im: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80',
    pay: false,
    pd: {
      nm: '만삭 + 100일 2회 연계 패키지',
      base: 890000,
      list: 1180000,
      dur: 150,
      out: 5,
      ret: 30,
      raw: true,
      rawFee: 0,
      frame: '12x12 압축앨범 + 액자 2개',
      hm: true,
      ppl: '아기 + 부모 2인'
    },
    ex: [
      { l: '인원 1인 추가', a: 60000 },
      { l: '주말 슬롯 지정', a: 60000 }
    ],
    top: [
      ['만삭+100일 패키지', 132],
      ['만삭 촬영', 88],
      ['성장앨범', 44]
    ],
    desc: '단독 4층 건물 베이비 전문 스튜디오. 테마별 12개 세트장 완비.',
    address: '서울특별시 강남구 역삼로 102',
    rvs: [
      {
        id: 'r7',
        n: '윤선영',
        s: 9,
        p: '만삭 + 100일 패키지',
        d: '2026.04',
        ef: false,
        h: 22,
        t: '만삭 때 찍고 만족해서 100일까지 이어서 찍었어요. 헤어메이크업이 포함이라 산모 입장에서 준비할 게 적어 편했습니다.',
        im: [
          'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=500&auto=format&fit=crop&q=80'
        ]
      }
    ]
  },
  {
    id: 7,
    nm: '프레임 서초',
    loc: '서울 교대역 1번출구',
    gu: '서초구 서초동',
    dist: 4.2,
    rt: 8.8,
    rv: 97,
    resp: 85,
    cat: ['profile', 'family', 'idphoto'],
    mode: ['studio'],
    con: ['modern', 'bw', 'white'],
    fac: ['parking', 'elevator', 'hairmakeup', 'weekend'],
    im: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    pay: true,
    pd: {
      nm: '비즈니스 & 전문직 프로필',
      base: 180000,
      list: 240000,
      dur: 60,
      out: 2,
      ret: 5,
      raw: false,
      rawFee: 100000,
      frame: '미포함',
      hm: true,
      ppl: '1인'
    },
    ex: [
      { l: '원본 전체 파일 (고화질 RAW 변환)', a: 100000 },
      { l: '정밀 1:1 리터칭 추가 (1컷)', a: 30000 },
      { l: '추가 의상 환복 1벌', a: 30000 }
    ],
    top: [
      ['프로필 스탠다드', 381],
      ['이력서 증명', 204],
      ['배우 프로필', 88]
    ],
    desc: '신뢰감을 주는 조명과 전문 헤어메이크업 디렉터 상주. 현장 1:1 맞춤 모니터링 보정.',
    address: '서울특별시 서초구 서초중앙로 110',
    rvs: [
      {
        id: 'r8',
        n: '조성우',
        s: 8,
        p: '비즈니스 프로필',
        d: '2026.08',
        ef: false,
        h: 18,
        t: '헤어메이크업 포함해서 18만원이면 가성비 괜찮습니다. 원본은 굳이 안 사고 보정본 5컷으로 링크드인이랑 사내 프로필 해결했어요.',
        im: [
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80'
        ]
      }
    ]
  },
  {
    id: 8,
    nm: '하남 스튜디오모아',
    loc: '경기 하남 미사강변도시',
    gu: '하남시 망월동',
    dist: 18.3,
    rt: 9.5,
    rv: 82,
    resp: 92,
    cat: ['family', 'pet', '100day', 'firstbd'],
    mode: ['studio', 'visit'],
    con: ['natural', 'outdoor', 'white'],
    fac: ['parking', 'nursing', 'outfit', 'pet', 'weekend', 'visit', 'kids'],
    im: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80',
    pay: true,
    pd: {
      nm: '가족 + 반려동물 동반 촬영',
      base: 520000,
      list: 640000,
      dur: 80,
      out: 2,
      ret: 18,
      raw: true,
      rawFee: 0,
      frame: '11x14 매트 액자 1개',
      hm: false,
      ppl: '최대 4인 + 반려동물 1마리'
    },
    ex: [
      { l: '반려동물 1마리 추가', a: 50000 },
      { l: '인원 1인 추가', a: 50000 },
      { l: '하남 인근 야외 출장', a: 120000 }
    ],
    top: [
      ['가족+반려동물', 241],
      ['돌스냅', 118],
      ['가족사진', 87]
    ],
    desc: '넓은 천연 잔디 야외 가든과 미끄럼 방지 실내 바닥. 반려견 훈련사 자격 보유 작가.',
    address: '경기도 하남시 미사강변대로 200',
    rvs: [
      {
        id: 'r9',
        n: '서은지',
        s: 10,
        p: '가족+반려동물 촬영',
        d: '2026.06',
        ef: false,
        h: 44,
        t: '강아지가 낯가림이 심한데 간식이랑 장난감으로 편안하게 유도해주셔서 인생샷 건졌어요. 주차 공간도 넉넉합니다.',
        im: [
          'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80'
        ]
      }
    ]
  },
  {
    id: 9,
    nm: '라뮤즈 웨딩 청담',
    loc: '서울 청담역 명품거리',
    gu: '강남구 청담동',
    dist: 2.8,
    rt: 9.4,
    rv: 176,
    resp: 93,
    cat: ['rehearsal', 'wedding'],
    mode: ['studio'],
    con: ['modern', 'white', 'natural'],
    fac: ['parking', 'outfit', 'hairmakeup', 'weekend', 'elevator'],
    im: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    pay: false,
    pd: {
      nm: '웨딩 리허설 화보 스탠다드',
      base: 1800000,
      list: 2400000,
      dur: 240,
      out: 4,
      ret: 40,
      raw: false,
      rawFee: 500000,
      frame: '프리미엄 가죽앨범 20p',
      hm: true,
      ppl: '신랑신부 2인'
    },
    ex: [
      { l: '원본 전체 파일(원판 RAW)', a: 500000 },
      { l: '현장 이모님 헬퍼비 (필수 실비)', a: 200000 },
      { l: '앨범 페이지 추가 (5p 단위)', a: 200000 },
      { l: '오전 8시 이전 얼리스타트비', a: 100000 }
    ],
    top: [
      ['리허설 스탠다드', 522],
      ['본식 스냅', 311],
      ['웨딩 화보', 144]
    ],
    desc: '하이엔드 웨딩 스튜디오. 자연광 통유리창과 웅장한 클래식 샹들리에 세트.',
    address: '서울특별시 강남구 압구정로 400',
    rvs: [
      {
        id: 'r10',
        n: '노아름',
        s: 8,
        p: '웨딩 리허설 화보 스탠다드',
        d: '2026.05',
        ef: true,
        h: 203,
        t: '사진 퀄리티는 정말 화보처럼 예쁩니다. 다만 180만원 상품인데 원본비 50만원 + 헬퍼비 20만원 + 페이지 추가 등으로 총 280만원 넘게 결제했어요. 계약 전 총비용 확인 필수입니다!',
        im: [
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&auto=format&fit=crop&q=80'
        ]
      }
    ]
  },
  {
    id: 10,
    nm: '분당 아이러브스냅',
    loc: '경기 분당 정자역 카페거리',
    gu: '성남시 분당구 정자동',
    dist: 22.1,
    rt: 9.3,
    rv: 88,
    resp: 82,
    cat: ['firstbd', '100day', 'family', 'maternity'],
    mode: ['studio'],
    con: ['natural', 'pastel', 'white'],
    fac: ['parking', 'nursing', 'outfit', 'elevator', 'weekend', 'kids'],
    im: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=800&auto=format&fit=crop&q=80',
    pay: true,
    pd: {
      nm: '돌 촬영 & 전통 돌잡이 올인원',
      base: 610000,
      list: 780000,
      dur: 100,
      out: 4,
      ret: 22,
      raw: true,
      rawFee: 0,
      frame: '액자 1개 + 미니 포토북',
      hm: false,
      ppl: '아기 + 가족 4인'
    },
    ex: [
      { l: '인원 1인 추가', a: 40000 },
      { l: '포토북 페이지 추가 (10p)', a: 60000 },
      { l: '주말·공휴일 촬영', a: 50000 }
    ],
    top: [
      ['돌촬영 올인원', 288],
      ['100일 촬영', 176],
      ['만삭 화보', 92]
    ],
    desc: '분당 정자동 10년 경력의 베이비 & 키즈 전문 스튜디오. 돌잡이 영상 클립 무료 제공.',
    address: '경기도 성남시 분당구 정자일로 135',
    rvs: [
      {
        id: 'r11',
        n: '강동원',
        s: 10,
        p: '돌 촬영 & 전통 돌잡이 올인원',
        d: '2026.07',
        ef: false,
        h: 31,
        t: '포토북까지 올인원으로 포함되어 있어서 만족했습니다. 돌잡이 순간도 여러 각도로 잘 포착해주셨어요.',
        im: [
          'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&auto=format&fit=crop&q=80'
        ]
      }
    ]
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    n: '백일맘_강남',
    category: '추가금 제보',
    time: '2시간 전',
    title: '100일 촬영 예약할 때 원본비 꼭 사전에 확인하세요!',
    text: '저는 표기가격 55만원인 것만 보고 계약서 썼는데, 촬영 끝나고 원본 파일 받으려니 30만원 별도 결제하라고 하더라고요. 계약서 하단에 6pt 작은 글씨로 적혀있긴 했는데 정말 당황스러웠습니다. 스냅핏처럼 실결제가(All-in)로 계산해주는 곳에서 확인하고 가세요!',
    images: [
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80'
    ],
    likes: 148,
    commentsCount: 312,
    isWarn: true,
    studioName: '서초 모 스튜디오'
  },
  {
    id: 'post-2',
    n: '북촌하나둘셋',
    category: '후기 자랑',
    time: '5시간 전',
    title: '북촌 한옥에서 3대 가족사진 찍었어요 🥹',
    text: '시어머니 칠순 기념으로 온고재 한옥에서 3대 가족촬영 진행했습니다. 어머님이 사진 보시면서 우셨어요 ㅠㅠ 비단 한복 대여료만 딱 4만원 추가되고 원본 600장 전부 당일 드라이브로 주셨습니다. 가족사진 고민하시는 분들 강추해요!',
    images: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80'
    ],
    likes: 382,
    commentsCount: 94
  },
  {
    id: 'post-3',
    n: '초보아빠_판교',
    category: '촬영 질문',
    time: '12시간 전',
    title: '신생아 촬영, 출장이랑 스튜디오 중에 어떤 게 낫나요?',
    text: '생후 25일차 아기인데 목도 못 가누고 조리원 나온 지 얼마 안 돼서 이동이 걱정됩니다. 출장은 스튜디오보다 10~15만원 정도 비싸던데 실제로 출장 불러보신 선배 부모님들 후기 궁금합니다!',
    images: [],
    likes: 67,
    commentsCount: 189
  },
  {
    id: 'post-4',
    n: '웨딩러버_송파',
    category: '추가금 제보',
    time: '1일 전',
    title: '웨딩 스드메 헬퍼비 + 원판비 충격적인 현실 공유',
    text: '스튜디오 기본가 180만원 견적 받고 신났는데, 당일 이모님 헬퍼비 현금 20만원 + 원판 및 고화질 RAW 50만원 + 앨범 5장 추가 20만원 해서 총 270만원 썼습니다... 다들 계약 전에 사전 추가금표 무조건 요구하세요.',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80'
    ],
    likes: 512,
    commentsCount: 420,
    isWarn: true
  }
];
