import { useState, useEffect } from 'react';
import { KitchenHeader } from './components/KitchenHeader';
import { TurnoutForecast } from './components/TurnoutForecast';
import { WasteCalculator } from './components/WasteCalculator';
import { SurplusPlanner } from './components/SurplusPlanner';
import { VendorComparison } from './components/VendorComparison';
import {
  Flame,
  Zap,
  Sparkles,
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('forecast');
  const [scenarioToast, setScenarioToast] = useState<string | null>(null);

  // Light Mode default, Dark Mode toggle
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('smartmess_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('smartmess_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('smartmess_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const showToast = (msg: string) => {
    setScenarioToast(msg);
    setTimeout(() => setScenarioToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-900 dark:selection:text-orange-200 transition-colors duration-200">
      {/* Kitchen Operations Terminal Header */}
      <KitchenHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedHostel="hostel-j"
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Quick Scenario Preset Ticker */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-sans">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">Live Operational Scenarios:</span>
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">Simulate campus dining demand shifts in 1 click:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('forecast');
                showToast('Applied: Saturday Night City Outing Exodus (58% off-campus)');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 text-orange-600 dark:text-orange-300 border border-orange-500/20 transition cursor-pointer flex items-center gap-1.5 font-sans font-medium"
            >
              <span>🌆 Sat Night Exodus</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('waste');
                showToast('Applied: Hostel J Dal & Rice Waste Benchmark (₹14,200 loss)');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 text-amber-600 dark:text-amber-300 border border-amber-500/20 transition cursor-pointer flex items-center gap-1.5 font-sans font-medium"
            >
              <span>💰 Hostel J ₹14.2k Waste Audit</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('repurpose');
                showToast('Applied: Lunch Leftover Rice ➔ Evening Veg Pulao Recipe');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 transition cursor-pointer flex items-center gap-1.5 font-sans font-medium"
            >
              <span>🍚 Surplus Rice Repurposing</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('vendor');
                showToast('Applied: Sodexo vs TMSS Quality & Oil TPM Audit');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 text-sky-600 dark:text-sky-300 border border-sky-500/20 transition cursor-pointer flex items-center gap-1.5 font-sans font-medium"
            >
              <span>⚖️ Sodexo vs TMSS Radar</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tab Render */}
        {activeTab === 'forecast' && <TurnoutForecast />}
        {activeTab === 'waste' && <WasteCalculator />}
        {activeTab === 'repurpose' && <SurplusPlanner />}
        {activeTab === 'vendor' && <VendorComparison />}
      </main>

      {/* Floating Scenario Toast */}
      {scenarioToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-900 border border-orange-500 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-mono text-slate-900 dark:text-slate-100 animate-bounce">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span>{scenarioToast}</span>
        </div>
      )}

      {/* Kitchen Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-12 py-6 text-xs text-slate-500 dark:text-slate-400 font-sans">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-300 font-semibold font-sans">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>SmartMess OS</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Predictive Campus Kitchen Intelligence &bull; Zero Food Waste Mission</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <span>TIET Patiala Campus Food-Tech Ops</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">100% Client-Side Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
