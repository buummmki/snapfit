import React, { useState } from 'react';
import { Studio, OccasionId, ConceptId, ModeType } from './types';
import { STUDIOS } from './data/mockData';
import { scoreStudios, sortStudios, ScoredStudio } from './lib/matching';
import { PhoneFrame } from './components/PhoneFrame';
import { Onboarding } from './components/Onboarding';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { DetailScreen } from './components/DetailScreen';
import { InquiryScreen } from './components/InquiryScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { DiscoverScreen } from './components/DiscoverScreen';
import { SavedScreen } from './components/SavedScreen';
import { RegionSheet } from './components/RegionSheet';
import { Home, Bookmark, Compass, Users } from 'lucide-react';

export default function App() {
  // Navigation State
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [activeTab, setActiveTab] = useState<number>(0); // 0: Home, 1: Saved, 2: Discover, 3: Community
  const [currentView, setCurrentView] = useState<
    'main' | 'search' | 'detail' | 'inquiry'
  >('main');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortIndex, setSortIndex] = useState(0);

  // User Selections from Onboarding & Preferences
  const [selectedOccasions, setSelectedOccasions] = useState<OccasionId[]>(['100day']);
  const [selectedSubs, setSelectedSubs] = useState<string[]>(['100일 스튜디오']);
  const [selectedMode, setSelectedMode] = useState<ModeType | null>('studio');
  const [selectedConcepts, setSelectedConcepts] = useState<ConceptId[]>(['natural', 'white']);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['강남역/신논현/양재']);
  const [selectedSido, setSelectedSido] = useState<string>('서울');

  // Interaction State
  const [savedStudioIds, setSavedStudioIds] = useState<number[]>([1]);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(STUDIOS[0]);
  const [quoteStudios, setQuoteStudios] = useState<Studio[]>([STUDIOS[0]]);
  const [selectedForQuote, setSelectedForQuote] = useState<number[]>([]);
  const [isRegionSheetOpen, setIsRegionSheetOpen] = useState(false);

  // Filtered Studios Computation
  const getFilteredStudios = (): ScoredStudio[] => {
    const base = STUDIOS.filter((s) => {
      // Occasion filter (if not empty)
      if (selectedOccasions.length > 0) {
        const matchesOcc = selectedOccasions.some((occ) => s.cat.includes(occ));
        if (!matchesOcc) return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          s.nm.toLowerCase().includes(q) ||
          s.loc.toLowerCase().includes(q) ||
          s.pd.nm.toLowerCase().includes(q) ||
          s.con.some((c) => c.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Mode filter
      if (selectedMode && selectedMode !== 'both') {
        if (!s.mode.includes(selectedMode)) return false;
      }

      // Facilities & Raw filters
      for (const f of selectedFilters) {
        if (f === 'raw') {
          if (!s.pd.raw) return false;
        } else {
          if (!s.fac.includes(f)) return false;
        }
      }

      return true;
    });

    // 매칭 점수 부착 후 정렬. 점수 계산과 정렬 모두 lib/matching.ts를 쓴다.
    return sortStudios(scoreStudios(base, { concepts: selectedConcepts }), sortIndex);
  };

  const filteredStudios = getFilteredStudios();

  // 홈 추천은 필터와 무관하게 사용자의 관심 컨셉 기준으로 정렬한다.
  const recommendedStudios = sortStudios(
    scoreStudios(STUDIOS, { concepts: selectedConcepts }),
    0,
  );

  const handleToggleSave = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (savedStudioIds.includes(id)) {
      setSavedStudioIds(savedStudioIds.filter((x) => x !== id));
    } else {
      setSavedStudioIds([...savedStudioIds, id]);
    }
  };

  const handleSelectStudio = (studio: Studio) => {
    setSelectedStudio(studio);
    setCurrentView('detail');
  };

  const handleGoSearch = (query?: string, filter?: string) => {
    if (query !== undefined) setSearchQuery(query);
    if (filter) setSelectedFilters([filter]);
    setCurrentView('search');
  };

  const handleOpenInquiry = (studio: Studio) => {
    setQuoteStudios([studio]);
    setCurrentView('inquiry');
  };

  const handleToggleQuoteSelect = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedForQuote.includes(id)) {
      setSelectedForQuote(selectedForQuote.filter((x) => x !== id));
    } else {
      if (selectedForQuote.length >= 3) {
        alert('한 번에 최대 3곳까지 견적을 비교 요청할 수 있습니다.');
        return;
      }
      setSelectedForQuote([...selectedForQuote, id]);
    }
  };

  const handleOpenMultiQuote = () => {
    const targets = STUDIOS.filter((s) => selectedForQuote.includes(s.id));
    if (targets.length > 0) {
      setQuoteStudios(targets);
      setCurrentView('inquiry');
    }
  };

  const tabs = [
    { id: 0, label: '홈', icon: Home },
    { id: 1, label: '저장', icon: Bookmark, badge: savedStudioIds.length > 0 },
    { id: 2, label: '발견', icon: Compass },
    { id: 3, label: '커뮤니티', icon: Users, badge: true },
  ];

  return (
    <PhoneFrame>
      {/* Onboarding View */}
      {!isOnboarded ? (
        <Onboarding
          step={onboardingStep}
          setStep={setOnboardingStep}
          selectedOccasions={selectedOccasions}
          setSelectedOccasions={setSelectedOccasions}
          selectedSubs={selectedSubs}
          setSelectedSubs={setSelectedSubs}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          selectedConcepts={selectedConcepts}
          setSelectedConcepts={setSelectedConcepts}
          selectedRegions={selectedRegions}
          setSelectedRegions={setSelectedRegions}
          onOpenRegionSheet={() => setIsRegionSheetOpen(true)}
          onFinish={() => setIsOnboarded(true)}
          onSkip={() => {
            setSelectedOccasions(['100day']);
            setSelectedSubs(['100일 스튜디오']);
            setSelectedMode('studio');
            setSelectedConcepts(['natural', 'white']);
            setSelectedRegions(['강남역/신논현/양재']);
            setIsOnboarded(true);
          }}
        />
      ) : (
        /* Main App Body with 5 Tabs and Sub-views */
        <div className="flex flex-col h-full bg-white relative">
          {/* Active View Layer */}
          <div className="flex-1 min-h-0 relative">
            {currentView === 'search' && (
              <SearchScreen
                studios={filteredStudios}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                sortIndex={sortIndex}
                setSortIndex={setSortIndex}
                onBack={() => setCurrentView('main')}
                onSelectStudio={handleSelectStudio}
                selectedForQuote={selectedForQuote}
                onToggleQuoteSelect={handleToggleQuoteSelect}
                onOpenMultiQuote={handleOpenMultiQuote}
              />
            )}

            {currentView === 'detail' && selectedStudio && (
              <DetailScreen
                studio={selectedStudio}
                onBack={() => setCurrentView('main')}
                onOpenInquiry={handleOpenInquiry}
                isSaved={savedStudioIds.includes(selectedStudio.id)}
                onToggleSave={handleToggleSave}
              />
            )}

            {currentView === 'inquiry' && (
              <InquiryScreen
                studios={quoteStudios}
                onBack={() => {
                  if (selectedStudio) setCurrentView('detail');
                  else setCurrentView('main');
                }}
                onDone={() => {
                  setSelectedForQuote([]);
                  setCurrentView('main');
                  setActiveTab(0);
                }}
              />
            )}

            {currentView === 'main' && (
              <>
                {activeTab === 0 && (
                  <HomeScreen
                    selectedSido={selectedSido}
                    selectedOccasions={selectedOccasions}
                    selectedSubs={selectedSubs}
                    selectedConcepts={selectedConcepts}
                    onOpenRegionSheet={() => setIsRegionSheetOpen(true)}
                    onGoSearch={handleGoSearch}
                    onSelectStudio={handleSelectStudio}
                    savedStudioIds={savedStudioIds}
                    onToggleSave={handleToggleSave}
                    studios={recommendedStudios}
                  />
                )}

                {activeTab === 1 && (
                  <SavedScreen
                    studios={STUDIOS}
                    savedIds={savedStudioIds}
                    onSelectStudio={handleSelectStudio}
                    onGoSearch={() => handleGoSearch()}
                  />
                )}

                {activeTab === 2 && (
                  <DiscoverScreen
                    studios={STUDIOS}
                    onSelectStudio={handleSelectStudio}
                  />
                )}

                {activeTab === 3 && <CommunityScreen />}
              </>
            )}
          </div>

          {/* Bottom 5-Tab Bar (Visible when in Main Tabbed View) */}
          {currentView === 'main' && (
            <div className="h-[58px] bg-white border-t border-[#F2F4F6] flex items-center shrink-0 z-30 px-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCurrentView('main');
                    }}
                    className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all relative ${
                      isActive ? 'text-[#191F28]' : 'text-[#B0B8C1] hover:text-[#8B95A1]'
                    }`}
                  >
                    <div className="relative">
                      <Icon
                        className={`w-5.5 h-5.5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`}
                      />
                      {tab.badge && (
                        <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-[#FF5C1F]" />
                      )}
                    </div>
                    <span
                      className={`text-[10.5px] tracking-tight ${
                        isActive ? 'font-black' : 'font-semibold'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Region Selection Bottom Sheet */}
      <RegionSheet
        isOpen={isRegionSheetOpen}
        onClose={() => setIsRegionSheetOpen(false)}
        selectedRegions={selectedRegions}
        onSelectRegions={setSelectedRegions}
        currentSido={selectedSido}
        onSelectSido={setSelectedSido}
      />
    </PhoneFrame>
  );
}
