
import React from 'react';
import type { ActiveTab } from '../types';
import { ActiveTab as ActiveTabEnum } from '../types';

interface TabSelectorProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab }) => {
  const getTabClasses = (tab: ActiveTab) => {
    const baseClasses = 'w-1/2 py-3 text-center font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900';
    if (activeTab === tab) {
      return `${baseClasses} bg-blue-600 text-white shadow-lg`;
    }
    return `${baseClasses} bg-slate-800 text-slate-300 hover:bg-slate-700`;
  };

  return (
    <div className="flex bg-slate-800/50 p-1 rounded-lg border border-slate-700">
      <button
        onClick={() => setActiveTab(ActiveTabEnum.LIVE)}
        className={getTabClasses(ActiveTabEnum.LIVE)}
      >
        🔴 Live Matches
      </button>
      <button
        onClick={() => setActiveTab(ActiveTabEnum.RECENT)}
        className={getTabClasses(ActiveTabEnum.RECENT)}
      >
        ⏪ Recent Matches
      </button>
    </div>
  );
};
