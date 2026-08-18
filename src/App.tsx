/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Studio, OccasionId, ConceptId, ModeType } from './types';
import { STUDIOS } from './data/mockData';
import { PhoneFrame } from './components/PhoneFrame';
import { Onboarding } from './components/Onboarding';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { DetailScreen } from './components/DetailScreen';
import { InquiryScreen } from './components/InquiryScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { DiscoverScreen } from './components/DiscoverScreen';
import { SavedScreen } from './components/SavedScreen';
import { AiHubScreen } from './components/AiHubScreen';
import { RegionSheet } from './components/RegionSheet';
import { Home, Bookmark, Compass, Users, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation State
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [activeTab, setActiveTab] = useState<number>(0); // 0: Home, 1: Saved, 2: Discover, 3: Community, 4: AI
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
  const getFilteredStudios = () => {
    let list = STUDIOS.filter((s) => {
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

    // Sorting
    if (sortIndex === 0) {
      // Match score desc, keeping ads first
      list.sort((a, b) => {
        const aScore = a.ad ? 999 : a.rt * 10 + a.resp * 0.1;
        const bScore = b.ad ? 999 : b.rt * 10 + b.resp * 0.1;
        return bScore - aScore;
      });
    } else if (sortIndex === 1) {
      // All-in price asc
      list.sort((a, b) => {
        const aAll = a.pd.base + (!a.pd.raw ? a.pd.rawFee : 0);
        const bAll = b.pd.base + (!b.pd.raw ? b.pd.rawFee : 0);
        return aAll - bAll;
      });
    } else if (sortIndex === 2) {
      // Review count desc
      list.sort((a, b) => b.rv - a.rv);
    } else if (sortIndex === 3) {
      // Rating desc
      list.sort((a, b) => b.rt - a.rt);
    }

    return list;
  };

  const filteredStudios = getFilteredStudios();

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
    { id: 4, label: 'AI 스튜디오', icon: Sparkles },
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
                    studios={STUDIOS}
                    onOpenAiHub={() => setActiveTab(4)}
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

                {activeTab === 4 && <AiHubScreen />}
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
                        className={`w-5.5 h-5.5 ${
                          isActive && tab.id !== 4 ? 'stroke-[2.4]' : 'stroke-[1.8]'
                        } ${isActive && tab.id === 4 ? 'text-[#FF5C1F]' : ''}`}
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
