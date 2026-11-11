import React, { useState } from 'react';
import {
  ChefHat,
  ShieldAlert,
  Clock,
  Thermometer,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { REPURPOSING_CATALOG, type RepurposingRecipe } from '../data/messData';
import { formatINR } from '../lib/demandModel';

export const SurplusPlanner: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<RepurposingRecipe>(REPURPOSING_CATALOG[0]);
  const [filterMeal, setFilterMeal] = useState<string>('all');
  const [loggedSurplusItem, setLoggedSurplusItem] = useState<string>('Steamed Rice (Basmati/Kolam)');
  const [loggedKg, setLoggedKg] = useState<number>(18);
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [logSuccess, setLogSuccess] = useState<boolean>(false);

  const filteredRecipes = REPURPOSING_CATALOG.filter((recipe) => {
    if (filterMeal === 'all') return true;
    return recipe.fromMeal === filterMeal;
  });

  const handleLogSurplus = (e: React.FormEvent) => {
    e.preventDefault();
    setLogSuccess(true);
    setTimeout(() => {
      setLogSuccess(false);
      setShowLogModal(false);
    }, 2000);
  };

  // Find recipe for logged item
  const currentRepurposeRecipe = REPURPOSING_CATALOG.find((r) => r.leftoverItem.includes(loggedSurplusItem.split(' ')[0])) || REPURPOSING_CATALOG[0];
  const estimatedRecoveredValue = Math.round(loggedKg * 42 * (currentRepurposeRecipe.costRecoveryRate / 100));

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              CULINARY TRANSFORMATION MATRIX
            </span>
            <span className="text-xs text-slate-400 font-sans">FSSAI Safe Food Handling Compliance Verified</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight font-sans">
            Surplus Repurposing &amp; Safe-Cycle Engine
          </h2>
          <p className="text-xs text-slate-300 mt-0.5 max-w-2xl font-sans leading-relaxed">
            Zero unserved food dumped. Standardized rule-based culinary transformations with strict time-temperature thresholds (reheat core &gt;74°C, rapid chilling &lt;4°C).
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" /> Log Shift Surplus (Kg)
        </button>
      </div>

      {/* Filter Tabs & Temperature Guard */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <span className="px-2.5 text-slate-500 font-medium">Origin Meal:</span>
          {['all', 'breakfast', 'lunch', 'snacks'].map((meal) => (
            <button
              key={meal}
              onClick={() => setFilterMeal(meal)}
              className={`px-3 py-1.5 rounded-lg text-xs capitalize transition cursor-pointer font-sans ${
                filterMeal === meal
                  ? 'bg-orange-500 text-white font-bold shadow-2xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {meal}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <Thermometer className="w-4 h-4 text-orange-400" />
          <span>FSSAI Danger Zone Rule: Keep food outside 5°C – 60°C holding window</span>
        </div>
      </div>

      {/* Main Grid: Recipe Cards on Left, Detailed Chef Sheet on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Recipe Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between font-semibold">
            <span>Validated Transformation Protocols ({filteredRecipes.length})</span>
            <span className="text-[11px] text-orange-400 font-sans">Select to View SOP</span>
          </div>

          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredRecipes.map((recipe) => {
              const isSelected = selectedRecipe.id === recipe.id;
              return (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-orange-500 shadow-md shadow-orange-950/20'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md uppercase font-semibold bg-slate-800 text-slate-300">
                          From {recipe.fromMeal}
                        </span>
                        <ArrowRight className="w-3 h-3 text-orange-400" />
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md uppercase font-semibold bg-orange-950 text-orange-300 border border-orange-800">
                          To {recipe.targetMeal}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-sans">{recipe.suggestedDish}</h4>
                      <div className="text-xs text-slate-400 mt-0.5 font-sans">
                        Base: <span className="text-slate-300">{recipe.leftoverItem}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        {recipe.costRecoveryRate}% Value
                      </span>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" /> {recipe.prepTimeMinutes}m
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-sans">
                    <span className="text-slate-300">Safe Window: <strong className="font-mono text-slate-200">{recipe.shelfLifeHours} hrs</strong></span>
                    <span className="text-orange-400 font-mono text-[11px] truncate max-w-[210px]">
                      {recipe.fssaiSafeTemp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Chef Execution & Safety Protocol */}
        <div className="lg:col-span-7 bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-5 shadow-xs">
          <div className="space-y-4">
            {/* Title & Metadata */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    RECOVERY GRADE A+
                  </span>
                  <span className="text-xs text-slate-400 font-sans">
                    Category: <strong className="text-slate-300">{selectedRecipe.dietaryCategory}</strong>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-orange-500" />
                  {selectedRecipe.suggestedDish}
                </h3>
                <div className="text-xs text-slate-300 mt-0.5 font-sans">
                  Repurposing unserved <strong className="text-orange-400">{selectedRecipe.leftoverItem}</strong> ({selectedRecipe.fromMeal}) into {selectedRecipe.targetMeal} service
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-xl text-right font-mono shadow-2xs">
                <div className="text-[10px] text-slate-400 uppercase font-sans">Recovery Yield</div>
                <div className="text-base font-bold text-emerald-400">{selectedRecipe.costRecoveryRate}% value</div>
              </div>
            </div>

            {/* Critical Food Safety Bar */}
            <div className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-500/30 space-y-1.5">
              <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5 font-sans">
                <Thermometer className="w-4 h-4 text-orange-400" />
                MANDATORY FSSAI TIME &amp; TEMPERATURE THRESHOLD:
              </div>
              <div className="text-xs text-slate-200 font-mono">
                {selectedRecipe.fssaiSafeTemp}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-1 font-sans">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> Max holding window: <strong className="font-mono text-slate-200">{selectedRecipe.shelfLifeHours} hours</strong>
                </span>
                <span>•</span>
                <span>Prep turnaround: <strong className="font-mono text-slate-200">{selectedRecipe.prepTimeMinutes} mins</strong></span>
              </div>
            </div>

            {/* Step-by-Step Chef Execution Steps */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 font-semibold font-sans">
                <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                Standard Operating Procedure (SOP) for Kitchen Crew
              </h4>
              <div className="space-y-2">
                {selectedRecipe.chefInstructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-slate-800 text-orange-400 font-mono text-[11px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-sans">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandatory Safety Checkpoints */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5 font-semibold font-sans">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                Mandatory Food Safety &amp; Microbial Checks
              </h4>
              <div className="space-y-1.5">
                {selectedRecipe.mandatorySafetyChecks.map((chk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{chk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fresh Ingredients to requisition from pantry */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium font-sans">
                Pantry Ingredients to Requisition:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedRecipe.ingredientsToAdd.map((ing, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-sans"
                  >
                    + {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-sans">
            <span className="text-slate-400 font-mono">Hostel Repurposing Ticket: #TRX-2026-904</span>
            <button
              onClick={() => {
                alert(`Transformation Ticket logged for ${selectedRecipe.suggestedDish}! Instructions printed to kitchen station.`);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-orange-400 font-semibold transition cursor-pointer border border-slate-700"
            >
              Print Station Work-Order
            </button>
          </div>
        </div>
      </div>

      {/* Log Surplus Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-orange-500" />
                Log Unserved Mess Surplus
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {logSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white font-sans">Surplus Transformed Successfully!</h4>
                <p className="text-xs text-slate-400 font-sans">
                  Work order dispatched to shift chef. Recovered estimated <span className="font-mono text-emerald-400 font-bold">{formatINR(estimatedRecoveredValue)}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLogSurplus} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Surplus Preparation Item</label>
                  <select
                    value={loggedSurplusItem}
                    onChange={(e) => setLoggedSurplusItem(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-orange-500 font-sans"
                  >
                    <option value="Steamed Rice (Basmati/Kolam)">Steamed Rice (from Lunch shift)</option>
                    <option value="Steamed Idli (Morning Batch)">Steamed Idlis (from Breakfast shift)</option>
                    <option value="Yellow Arhar Dal / Moong Dal">Cooked Dal (from Lunch shift)</option>
                    <option value="Boiled Potatoes (Breakfast / Prep)">Boiled Potatoes</option>
                    <option value="Rajma / Chole Curry">Cooked Rajma / Chole Curry</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Estimated Unserved Quantity (kg)</label>
                  <input
                    type="number"
                    min="2"
                    max="120"
                    value={loggedKg}
                    onChange={(e) => setLoggedKg(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 font-mono text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-[11px] text-slate-400">Recommended Safe Transformation:</div>
                  <div className="text-sm font-bold text-orange-400 font-sans">
                    ➔ {currentRepurposeRecipe.suggestedDish} ({currentRepurposeRecipe.targetMeal})
                  </div>
                  <div className="text-xs text-emerald-400 font-sans">
                    Estimated Value Rescued: <span className="font-mono font-bold">{formatINR(estimatedRecoveredValue)}</span> ({currentRepurposeRecipe.costRecoveryRate}%)
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowLogModal(false)}
                    className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold cursor-pointer"
                  >
                    Dispatch Recipe SOP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
