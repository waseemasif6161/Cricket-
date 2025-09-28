
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { TabSelector } from './components/TabSelector';
import { MatchList } from './components/MatchList';
import { Loader } from './components/Loader';
import type { Match, CricketData } from './types';
import { ActiveTab } from './types';
import { fetchCricketData } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.LIVE);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMatchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data: CricketData = await fetchCricketData();
      // Filter out any potential malformed data
      const validLiveMatches = data.liveMatches?.filter(match => match && match.id) || [];
      const validRecentMatches = data.recentMatches?.filter(match => match && match.id) || [];

      setLiveMatches(validLiveMatches);
      setRecentMatches(validRecentMatches);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch match data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMatchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matchesToShow = activeTab === ActiveTab.LIVE ? liveMatches : recentMatches;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 max-w-4xl">
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

        {isLoading && <Loader />}

        {error && (
          <div className="text-center mt-10 p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-300 text-lg">{error}</p>
            <button
              onClick={loadMatchData}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="mt-6">
            <MatchList matches={matchesToShow} />
            {matchesToShow.length === 0 && (
                <div className="text-center mt-10 p-4 bg-slate-800 rounded-lg">
                    <p className="text-slate-400 text-lg">
                        No {activeTab === ActiveTab.LIVE ? 'live' : 'recent'} matches available at the moment.
                    </p>
                </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
