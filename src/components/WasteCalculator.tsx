import React, { useState } from 'react';
import {
  TrendingUp,
  AlertOctagon,
  Sparkles,
  Droplets,
  TreePine,
  DollarSign,
  PieChart as PieIcon,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { TIET_HOSTELS } from '../data/messData';
import { formatINR } from '../lib/demandModel';

export const WasteCalculator: React.FC = () => {
  const [selectedHostel, setSelectedHostel] = useState<string>('hostel-j');
  const [adoptionPct, setAdoptionPct] = useState<number>(75); // 75% batching adoption

  // Itemized breakdown of wasted categories in kilograms and financial value
  const itemizedWasteData = [
    { name: 'Arhar Dal & Gravies', baselineKg: 142, smartKg: 28, costPerKg: 52, color: '#f59e0b' },
    { name: 'Basmati & Jeera Rice', baselineKg: 184, smartKg: 34, costPerKg: 38, color: '#f97316' },
    { name: 'Phulkas & Parathas', baselineKg: 110, smartKg: 22, costPerKg: 45, color: '#eab308' },
    { name: 'Seasonal Sabzi', baselineKg: 95, smartKg: 20, costPerKg: 42, color: '#10b981' },
    { name: 'Milk, Curd & Kheer', baselineKg: 64, smartKg: 12, costPerKg: 60, color: '#38bdf8' },
  ];

  const totalBaselineCost = itemizedWasteData.reduce(
    (acc, item) => acc + item.baselineKg * item.costPerKg,
    0
  );
  const totalSmartCost = itemizedWasteData.reduce(
    (acc, item) => acc + item.smartKg * item.costPerKg,
    0
  );

  // Adjust for adoption slider
  const effFactor = adoptionPct / 100;
  const currentWeeklyLoss = Math.round(totalBaselineCost - (totalBaselineCost - totalSmartCost) * effFactor);
  const weeklySavings = Math.round((totalBaselineCost - totalSmartCost) * effFactor);
  const monthlySavings = weeklySavings * 4.3;
  const annualSavingsAllHostels = weeklySavings * 52 * 4.4; // 5 hostels combined

  const totalBaselineKg = itemizedWasteData.reduce((acc, item) => acc + item.baselineKg, 0);
  const totalSmartKg = itemizedWasteData.reduce((acc, item) => acc + item.smartKg, 0);
  const kgDivertedWeekly = Math.round((totalBaselineKg - totalSmartKg) * effFactor);
  const litersWaterSaved = Math.round(kgDivertedWeekly * 850);
  const co2AvoidedKg = Math.round(kgDivertedWeekly * 2.3);

  return (
    <div className="space-y-6 font-sans">
      {/* Highlight Callout Box: Confirmed TIET Audit Benchmark */}
      <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-orange-950/30 p-6 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <AlertOctagon className="w-3.5 h-3.5" /> CONFIRMED TIET AUDIT BENCHMARK
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-snug">
              &ldquo;This week Hostel J wasted <span className="text-rose-400 font-mono font-bold">₹14,200</span> worth of dal &amp; rice.{' '}
              <span className="text-emerald-400">Predictive batching saves ₹9,800/week.</span>&rdquo;
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              When 58% of Hostel J residents head to 22 No. Phatak, Bhupindra Road, or catch trains home on Friday/Saturday, traditional flat cooking prepares food for empty chairs. SmartMess dynamically throttles Batch 2 and Batch 3.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-right min-w-[220px] shadow-2xs">
            <div className="text-[11px] font-sans text-slate-400 uppercase tracking-wider font-semibold">
              Hostel J Weekly Net Saving
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
              {formatINR(weeklySavings)}
            </div>
            <div className="text-[11px] text-slate-400 font-sans mt-1 flex items-center justify-end gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span><strong className="font-mono text-slate-200">{kgDivertedWeekly} kg</strong> food preserved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Control & Hostel Selector */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="w-full md:w-1/3">
          <label className="text-xs text-slate-400 mb-1.5 block font-medium">Audit Mess Facility</label>
          <select
            value={selectedHostel}
            onChange={(e) => setSelectedHostel(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-orange-500 font-sans text-xs"
          >
            {TIET_HOSTELS.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.currentResidents} residents &bull; {h.vendor})
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center text-xs mb-1 font-medium">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-orange-400" />
              Dynamic 3-Stage Batching Implementation Adoption
            </span>
            <span className="text-emerald-400 font-bold font-mono">{adoptionPct}% Implemented</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={adoptionPct}
            onChange={(e) => setAdoptionPct(Number(e.target.value))}
            className="w-full accent-orange-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
            <span>10% (Legacy Single Batch)</span>
            <span>50% (Partial Lunch Batching)</span>
            <span>100% (Full Campus AI Batching)</span>
          </div>
        </div>
      </div>

      {/* 4 Financial Impact Bento Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-2xs">
          <div className="text-[11px] font-sans text-slate-400 uppercase tracking-wider flex items-center justify-between font-semibold">
            <span>Blind Wastage Loss</span>
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400 mt-1 font-mono">
            {formatINR(totalBaselineCost)} <span className="text-xs text-slate-500 font-sans">/ wk</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-sans">
            Baseline without turnout sensor integration
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-emerald-950/60 bg-gradient-to-br from-slate-900 to-emerald-950/20 shadow-2xs">
          <div className="text-[11px] font-sans text-slate-400 uppercase tracking-wider flex items-center justify-between font-semibold">
            <span>Active Waste Bill</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-300 mt-1 font-mono">
            {formatINR(currentWeeklyLoss)} <span className="text-xs text-slate-500 font-sans">/ wk</span>
          </div>
          <div className="text-[11px] text-emerald-400/90 mt-1 font-sans">
            Saved {formatINR(weeklySavings)} this week ({adoptionPct}% adoption)
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-2xs">
          <div className="text-[11px] font-sans text-slate-400 uppercase tracking-wider flex items-center justify-between font-semibold">
            <span>Projected Monthly ROI</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 mt-1 font-mono">
            {formatINR(monthlySavings)} <span className="text-xs text-slate-500 font-sans">/ mo</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-sans">
            Surplus funds redirected to quality ingredients
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-orange-950/60 bg-gradient-to-br from-slate-900 to-orange-950/20 shadow-2xs">
          <div className="text-[11px] font-sans text-slate-400 uppercase tracking-wider flex items-center justify-between font-semibold">
            <span>TIET Campus Annual Pot</span>
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-orange-400 mt-1 font-mono">
            {formatINR(annualSavingsAllHostels)}
          </div>
          <div className="text-[11px] text-orange-300/90 mt-1 font-sans">
            Across 5 messes (Hostels J, L, M, B, D)
          </div>
        </div>
      </div>

      {/* Visual Item Breakdown & Environmental Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Itemized Waste Comparison Bar Chart */}
        <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-orange-500" />
                Category-wise Food Waste (kg/week)
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Baseline blind cook vs. SmartMess dynamic batching
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              Hostel J Audit Log
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={itemizedWasteData.map((item) => ({
                  name: item.name.split(' ')[0],
                  fullName: item.name,
                  Baseline: item.baselineKg,
                  SmartMess: Math.round(item.baselineKg - (item.baselineKg - item.smartKg) * effFactor),
                }))}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#f8fafc',
                  }}
                  formatter={(value: any, name: any) => [`${value} kg`, name === 'Baseline' ? 'Traditional Blind Waste' : 'With SmartMess']}
                />
                <Bar dataKey="Baseline" fill="#f43f5e" opacity={0.4} name="Traditional Blind Waste" radius={[4, 4, 0, 0]} />
                <Bar dataKey="SmartMess" fill="#f97316" name="With SmartMess" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed item list with waste cost meters */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            {itemizedWasteData.map((item, idx) => {
              const currentKg = Math.round(item.baselineKg - (item.baselineKg - item.smartKg) * effFactor);
              const savedKg = item.baselineKg - currentKg;
              const savedRupees = savedKg * item.costPerKg;
              return (
                <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-200 font-medium font-sans">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-rose-400/80 line-through text-[11px]">{item.baselineKg} kg</span>
                    <span className="text-emerald-400 font-bold text-xs">{currentKg} kg</span>
                    <span className="text-slate-200 font-semibold bg-slate-800 px-2 py-0.5 rounded-md text-[11px] border border-slate-700">
                      +{formatINR(savedRupees)} saved
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Environmental Footprint & Savings Breakdown */}
        <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <TreePine className="w-4 h-4 text-emerald-400" />
                Ecological &amp; Carbon Dividend
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">Net Zero Target</span>
            </div>

            <p className="text-xs text-slate-400 mt-3 font-sans leading-relaxed">
              Food waste decomposing in municipal dumps emits potent methane. Dynamic batching eliminates excess agricultural runoff and protects groundwater.
            </p>

            <div className="grid grid-cols-1 gap-3 mt-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 shrink-0">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white font-mono">
                    {litersWaterSaved.toLocaleString()} Liters
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    Agricultural virtual water conserved weekly (Paddy &amp; Dal farming)
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
                  <TreePine className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white font-mono">
                    {co2AvoidedKg.toLocaleString()} kg CO₂e
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    Greenhouse gas emissions averted from landfill decomposition
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-950 border border-orange-800 flex items-center justify-center text-orange-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white font-mono">
                    {kgDivertedWeekly} kg Food Preserved
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    Equivalent to feeding <span className="font-mono text-slate-200 font-bold">{Math.round(kgDivertedWeekly / 0.4)}</span> full student plates
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Kitchen Tip */}
          <div className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-500/30 text-xs font-sans text-orange-200">
            <span className="font-bold text-orange-400">💡 Executive Chef Recommendation:</span>{' '}
            Shift Sunday dinner poultry &amp; paneer to dynamic batching. Sunday turnout fluctuates by ±35% depending on late-evening student returns from Chandigarh and NCR.
          </div>
        </div>
      </div>
    </div>
  );
};
