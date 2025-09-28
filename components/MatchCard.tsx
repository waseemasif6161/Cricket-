
import React, { useState } from 'react';
import type { Match, TeamScore, PlayerPerformance } from '../types';
import { MatchStatus } from '../types';
import { CricketBatIcon } from './icons/CricketBatIcon';
import { CricketBallIcon } from './icons/CricketBallIcon';

interface MatchCardProps {
  match: Match;
}

const ScoreDisplay: React.FC<{ score: TeamScore }> = ({ score }) => (
    <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
            <span className="text-3xl">{score.team.flag}</span>
            <span className="text-lg font-semibold text-slate-200">{score.team.name}</span>
        </div>
        <div className="flex items-center gap-2 text-lg font-bold">
            <span className="text-white">{score.runs}/{score.wickets}</span>
            <span className="text-slate-400 text-sm">({score.overs} Ov)</span>
        </div>
    </div>
);

const PerformancePill: React.FC<{ icon: React.ReactNode, title: string, performance: PlayerPerformance }> = ({ icon, title, performance }) => (
    <div className="bg-slate-700/50 p-3 rounded-lg flex-1 min-w-[200px]">
        <div className="flex items-center gap-2 text-blue-400 mb-1">
            {icon}
            <h4 className="font-semibold text-sm">{title}</h4>
        </div>
        <p className="font-medium text-slate-200">{performance.playerName}</p>
        <p className="text-slate-400 text-sm">{performance.statistic}</p>
    </div>
);

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isLive = match.status === MatchStatus.LIVE;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-blue-600 hover:shadow-blue-900/50">
      {/* Main Card Header */}
      <div className="p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs text-slate-400">{match.venue}</p>
            {isLive && (
              <div className="flex items-center gap-2 mt-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-red-400 font-bold text-sm uppercase">LIVE</span>
              </div>
            )}
          </div>
           <p className={`text-sm font-semibold px-3 py-1 rounded-full ${isLive ? 'bg-red-900/70 text-red-300' : 'bg-green-900/70 text-green-300'}`}>
            {match.status}
          </p>
        </div>

        {/* Scores */}
        <div className="space-y-2">
            <ScoreDisplay score={match.teamA_score} />
            <ScoreDisplay score={match.teamB_score} />
        </div>
        
        {/* Summary */}
        <p className="mt-4 text-center text-blue-300 bg-blue-900/30 py-2 px-3 rounded-md text-sm">{match.summary}</p>
      </div>

      {/* Expandable Details Section */}
      {isExpanded && (
        <div className="bg-slate-900/70 p-4 border-t border-slate-700 animate-fade-in">
          <h3 className="text-lg font-bold mb-3 text-slate-200">Match Details</h3>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
                <PerformancePill icon={<CricketBatIcon />} title="Top Scorer" performance={match.topScorer} />
                <PerformancePill icon={<CricketBallIcon />} title="Best Bowler" performance={match.bestBowler} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-400">Toss</p>
              <p className="text-slate-300">{match.toss}</p>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
