
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          CricLive <span className="text-blue-400">Gemini</span>
        </h1>
        <p className="text-slate-400">Your AI-Powered Cricket Companion</p>
      </div>
    </header>
  );
};
