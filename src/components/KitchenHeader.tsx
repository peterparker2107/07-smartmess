import React from 'react';
import { Flame, ChefHat, ShieldCheck, TrendingDown, Clock, Sparkles, Sun, Moon } from 'lucide-react';
import { formatINR } from '../lib/demandModel';

interface KitchenHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedHostel: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const KitchenHeader: React.FC<KitchenHeaderProps> = ({ 
  activeTab, 
  setActiveTab,
  isDark,
  onToggleTheme,
}) => {
  const tabs = [
    { id: 'forecast', label: 'Demand & Batching', icon: TrendingDown },
    { id: 'waste', label: '₹ Waste Calculator', icon: Flame },
    { id: 'repurpose', label: 'Surplus Recipe Engine', icon: ChefHat },
    { id: 'vendor', label: 'Vendor Audit (Sodexo vs TMSS)', icon: ShieldCheck },
  ];

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200">
      {/* Top advisory ticker */}
      <div className="bg-slate-100 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800/80 px-4 py-1.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="text-orange-600 dark:text-orange-400 font-semibold uppercase tracking-wider">Kitchen Alert:</span>
          <span className="text-slate-700 dark:text-slate-300">
            Hostel J Saturday evening exodus detected • Gate passes +42% • Dynamic batching clamped dinner prep to 495 plates (-52%)
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> FSSAI Compliance: Verified (Grade A)
          </span>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Patiala Standard Time
          </span>
        </div>
      </div>

      {/* Main Terminal Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-950/20 border border-orange-400/30">
            <Flame className="w-5 h-5 text-white animate-flame-flicker" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 font-sans">
                SmartMess <span className="text-orange-500">OS</span>
              </h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-semibold">
                TIET PATIALA
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              Campus Food-Tech Intelligence &bull; AI Turnout Forecasting &bull; ₹ Waste Mitigator
            </p>
          </div>
        </div>

        {/* Live Operational Metrics Pill */}
        <div className="hidden lg:flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-mono shadow-2xs">
          <div className="border-r border-slate-200 dark:border-slate-800 pr-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans">Campus Scope</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">5 Hostels (4,640 Students)</div>
          </div>
          <div className="border-r border-slate-200 dark:border-slate-800 pr-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans">Est. Weekly Saved</div>
            <div className="font-semibold text-emerald-600 dark:text-emerald-400">{formatINR(48200)} / wk</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans">Surplus Repurposed</div>
            <div className="font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 182 kg this week
            </div>
          </div>
        </div>

        {/* Right Action: Shift Lead Badge & Theme Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-xs shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">
              <ChefHat className="w-4 h-4" />
            </div>
            <div className="text-left leading-tight font-sans">
              <div className="font-semibold text-slate-900 dark:text-slate-200">Chef Ram Kumar</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Head Chef &bull; Mess Operations</div>
            </div>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-amber-400 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 text-xs font-semibold"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 flex space-x-1.5 overflow-x-auto pb-2.5 pt-1 border-t border-slate-200 dark:border-slate-800/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer font-sans ${
                isActive
                  ? 'bg-orange-500 text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
