import React, { useState, useMemo } from 'react';
import {
  Users,
  Flame,
  Clock,
  Layers,
  Sparkles,
  Calendar,
  CloudSun,
  GraduationCap,
  Scale,
  Printer,
  Send,
  CheckCircle2,
  AlertTriangle,
  Building2,
  TrendingDown,
} from 'lucide-react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TIET_HOSTELS,
  HISTORICAL_WEEK_DATA,
} from '../data/messData';
import {
  type SimulationParams,
  type AcademicPhase,
  type WeatherCondition,
  type DayOfWeek,
  calculateDemandPrediction,
  formatINR,
} from '../lib/demandModel';

export const TurnoutForecast: React.FC = () => {
  // Simulator State
  const [hostelId, setHostelId] = useState<string>('hostel-j');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'snacks' | 'dinner'>('dinner');
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>('Saturday');
  const [academicPhase, setAcademicPhase] = useState<AcademicPhase>('normal');
  const [weather, setWeather] = useState<WeatherCondition>('clear');
  const [weekendPass, setWeekendPass] = useState<number>(58);
  const [batchingEff, setBatchingEff] = useState<number>(85);
  const [isPlanDispatched, setIsPlanDispatched] = useState<boolean>(false);

  // Compute prediction
  const simParams: SimulationParams = useMemo(() => ({
    hostelId,
    mealType,
    dayOfWeek,
    academicPhase,
    weather,
    weekendPassPercentage: weekendPass,
    batchingEfficiency: batchingEff,
  }), [hostelId, mealType, dayOfWeek, academicPhase, weather, weekendPass, batchingEff]);

  const prediction = useMemo(() => calculateDemandPrediction(simParams), [simParams]);

  // Generate chart data matching current hostel & simulated scenario
  const chartData = useMemo(() => {
    const scaleFactor = hostelId === 'all' ? 4.0 : (((TIET_HOSTELS.find((h) => h.id === hostelId)?.currentResidents || 1000) / 1000));
    return HISTORICAL_WEEK_DATA.map((item) => {
      const isCurrentDay = item.day === dayOfWeek;
      const traditional = Math.round(item.traditionalPrepared * scaleFactor);
      const predicted = isCurrentDay ? prediction.predictedTurnout : Math.round(item.aiPredictedTurnout * scaleFactor);
      const actual = Math.round(item.actualTurnout * scaleFactor);
      return {
        day: item.day.substring(0, 3),
        fullDay: item.day,
        Traditional: traditional,
        AIPredicted: predicted,
        ActualTurnout: actual,
        WasteKg: Math.round(item.wasteTraditionalKg * scaleFactor),
        WasteSavedKg: Math.round((item.wasteTraditionalKg - item.wasteSmartKg) * scaleFactor),
      };
    });
  }, [hostelId, dayOfWeek, prediction.predictedTurnout]);

  const handleDispatch = () => {
    setIsPlanDispatched(true);
    setTimeout(() => setIsPlanDispatched(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Context */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              FOOD-TECH PREDICTIVE SUITE
            </span>
            <span className="text-xs text-slate-400 font-sans">Multi-Factor Neural Turnout Engine (94.8% Confidence)</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight font-sans">
            Hostel Meal Turnout &amp; Dynamic Batching Forecaster
          </h2>
          <p className="text-xs text-slate-300 mt-0.5 max-w-2xl font-sans leading-relaxed">
            Eliminates blind bulk cooking. Analyzes day patterns, academic phase, outward digital leaves, and weather to prescribe exact 3-stage kitchen tranches.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-sans transition cursor-pointer border border-slate-700"
          >
            <Printer className="w-3.5 h-3.5" /> Print Prep Sheet
          </button>
          <button
            onClick={handleDispatch}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold font-sans transition shadow-sm cursor-pointer ${
              isPlanDispatched
                ? 'bg-emerald-600 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-950/40'
            }`}
          >
            {isPlanDispatched ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Dispatched to KDS Screens
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Transmit Kitchen Batching
              </>
            )}
          </button>
        </div>
      </div>

      {/* Simulator Control Panel */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="text-xs uppercase tracking-wider text-orange-400 font-bold flex items-center gap-2 font-sans">
            <Flame className="w-4 h-4" /> Live Simulation Modifiers
          </span>
          <span className="text-[11px] text-slate-400 font-sans">
            Parameters instantly recalculate kitchen tranches and requisition weights
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          {/* Hostel Selector */}
          <div>
            <label className="text-slate-400 mb-1.5 block font-medium">1. Target Mess Facility</label>
            <select
              value={hostelId}
              onChange={(e) => setHostelId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-orange-500 font-sans"
            >
              <option value="all">🏢 All Campus Messes (Campus Total)</option>
              {TIET_HOSTELS.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.type} • {h.currentResidents} res • {h.vendor})
                </option>
              ))}
            </select>
          </div>

          {/* Meal Slot Selector */}
          <div>
            <label className="text-slate-400 mb-1.5 block font-medium">2. Target Meal Slot</label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['breakfast', 'lunch', 'snacks', 'dinner'] as const).map((slot) => {
                const isSelected = mealType === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => setMealType(slot)}
                    className={`py-1.5 px-2 rounded-lg text-center capitalize text-[11px] transition cursor-pointer font-sans ${
                      isSelected
                        ? 'bg-orange-500 text-white font-bold border border-orange-400/30 shadow-xs'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day of Week */}
          <div>
            <label className="text-slate-400 mb-1.5 block flex items-center gap-1 font-medium">
              <Calendar className="w-3 h-3 text-slate-400" /> 3. Day of Week
            </label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value as DayOfWeek)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-orange-500 font-sans"
            >
              {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as DayOfWeek[]).map((d) => (
                <option key={d} value={d}>
                  {d} {d === 'Saturday' || d === 'Sunday' ? '⚠️ (High City Outing)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Schedule */}
          <div>
            <label className="text-slate-400 mb-1.5 block flex items-center gap-1 font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> 4. Academic Calendar
            </label>
            <select
              value={academicPhase}
              onChange={(e) => setAcademicPhase(e.target.value as AcademicPhase)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-orange-500 font-sans"
            >
              <option value="normal">Normal Regular Classes</option>
              <option value="mst">Mid-Semester Exams (MST-1 &amp; MST-2)</option>
              <option value="est">End-Semester Final Exams (EST)</option>
              <option value="post_exam">Post-Exam Vacation / Outstation</option>
            </select>
          </div>
        </div>

        {/* Secondary controls: Weather & Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-800 text-xs font-sans">
          {/* Weather */}
          <div>
            <label className="text-slate-400 mb-1.5 block flex items-center gap-1 font-medium">
              <CloudSun className="w-3.5 h-3.5 text-slate-400" /> Patiala Weather
            </label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value as WeatherCondition)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-orange-500 font-sans text-xs"
            >
              <option value="clear">☀️ Clear &amp; Pleasant (22°C - 26°C)</option>
              <option value="foggy_cold">❄️ Dense Fog / Winter Chill (7°C, low 8am wake)</option>
              <option value="rainy">🌧️ Heavy Monsoon Rain (Pakora/Chai surge)</option>
              <option value="extreme_heat">🔥 Extreme Heatwave (41°C, low lunch intake)</option>
            </select>
          </div>

          {/* Weekend Outward Leaves Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-400 font-medium">Approved Outward Gate Passes</label>
              <span className="font-mono text-orange-400 font-bold">{weekendPass}% leaving</span>
            </div>
            <input
              type="range"
              min="0"
              max="75"
              step="5"
              value={weekendPass}
              onChange={(e) => setWeekendPass(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>0% (Full Campus)</span>
              <span>58% (Typical Sat)</span>
              <span>75% (Diwali/Holi)</span>
            </div>
          </div>

          {/* Batching Efficiency */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-400 font-medium">Predictive Batching Adoption</label>
              <span className="font-mono text-emerald-400 font-bold">{batchingEff}% smart</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={batchingEff}
              onChange={(e) => setBatchingEff(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>20% (Traditional single cook)</span>
              <span>85% (Smart 3-stage)</span>
              <span>100% (Zero waste target)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid KPI Stat Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-2xs">
          <div className="text-[11px] font-sans text-slate-400 uppercase tracking-wider flex items-center justify-between font-semibold">
            <span>Forecast Turnout</span>
            <Users className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-1 font-mono">
            {prediction.predictedTurnout}{' '}
            <span className="text-xs font-normal text-slate-400 font-sans">
              / {prediction.totalResidents}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-sans">
            Participation Rate: <span className="font-mono text-slate-200">{Math.round((prediction.predictedTurnout / prediction.totalResidents) * 100)}%</span>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-rose-950/60 shadow-2xs">
          <div className="text-[11px] font-sans text-slate-400 uppercase tracking-wider flex items-center justify-between font-semibold">
            <span>Blind Bulk Prep</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-300 mt-1 font-mono">
            {prediction.traditionalCookPlates}{' '}
            <span className="text-xs font-normal text-rose-400 font-sans">plates</span>
          </div>
          <div className="text-[11px] text-rose-400/90 mt-1 font-sans">
            Surplus dumped: <span className="font-mono">{prediction.traditionalWastePlates} plates ({prediction.traditionalWasteKg} kg)</span>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-emerald-950/60 shadow-2xs">
          <div className="text-[11px] font-sans text-slate-400 uppercase tracking-wider flex items-center justify-between font-semibold">
            <span>Smart Batch Total</span>
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">
            {prediction.smartCookPlates}{' '}
            <span className="text-xs font-normal text-emerald-300 font-sans">plates</span>
          </div>
          <div className="text-[11px] text-emerald-400/90 mt-1 font-sans">
            Dynamic buffer: <span className="font-mono">+{prediction.smartCookPlates - prediction.predictedTurnout} plates</span>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-orange-950/60 bg-gradient-to-br from-slate-900 to-orange-950/20 shadow-2xs">
          <div className="text-[11px] font-sans text-slate-400 uppercase tracking-wider flex items-center justify-between font-semibold">
            <span>₹ Net Meal Savings</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-orange-400 mt-1 font-mono">
            {formatINR(prediction.netFinancialSaved)}
          </div>
          <div className="text-[11px] text-orange-300/90 mt-1 font-sans">
            Saved: <span className="font-mono">{prediction.netWasteSavedKg} kg</span> &bull; Water: <span className="font-mono">{prediction.waterSavedLiters} L</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recharts Visualization & Dynamic 3-Stage Batching Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Trend Recharts Chart */}
        <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <span>Weekly Headcount: Traditional Overcook vs Smart Batching</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Highlights the sharp weekend dip (Friday–Sunday) where flat bulk cooking causes large dumping.
                </p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {prediction.hostelName}
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#f8fafc',
                    }}
                    formatter={(value: any, name: any) => {
                      if (name === 'Traditional') return [`${value} plates (Static 88%)`, 'Traditional Cook'];
                      if (name === 'AIPredicted') return [`${value} plates`, 'AI Forecast'];
                      if (name === 'ActualTurnout') return [`${value} plates`, 'Historical Actual'];
                      return [value, name];
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    iconType="circle"
                  />
                  <Bar dataKey="Traditional" fill="#f43f5e" opacity={0.35} name="Traditional Blind Prep" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ActualTurnout" fill="#64748b" opacity={0.6} name="Actual Turnout" radius={[4, 4, 0, 0]} />
                  <Line
                    type="monotone"
                    dataKey="AIPredicted"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={{ fill: '#f97316', r: 4 }}
                    name="SmartMess AI Target"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Driving Factors Tags */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="text-[11px] font-sans text-slate-400 mb-2 font-medium">Active AI Weighting Drivers:</div>
            <div className="flex flex-wrap gap-2">
              {prediction.drivingFactors.map((df, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] px-2.5 py-1 rounded-md border font-sans flex items-center gap-1.5 ${
                    df.isPositive
                      ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                      : 'bg-rose-950/30 border-rose-800/40 text-rose-300'
                  }`}
                >
                  <span className="font-bold">{df.label}:</span>
                  <span className="text-slate-300">{df.impact}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic 3-Stage Kitchen Batching Execution Card */}
        <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-500" />
                  3-Stage Dynamic Cooking Tranches
                </h3>
                <span className="text-xs text-slate-400 font-sans">
                  Meal: {prediction.mealInfo.name} ({prediction.mealInfo.timeRange})
                </span>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                TOTAL: {prediction.smartCookPlates} PLATES
              </span>
            </div>

            {/* Tranche Stages */}
            <div className="space-y-3 mt-4">
              {/* Batch 1 */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="font-sans font-bold text-orange-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    {prediction.batchSchedule.batch1.label} — <span className="font-mono">{prediction.batchSchedule.batch1.time}</span>
                  </div>
                  <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-orange-950 border border-orange-800">
                    {prediction.batchSchedule.batch1.plates} plates (45%)
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  {prediction.batchSchedule.batch1.menuDetails}
                </p>
              </div>

              {/* Batch 2 */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="font-sans font-bold text-amber-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {prediction.batchSchedule.batch2.label} — <span className="font-mono">{prediction.batchSchedule.batch2.time}</span>
                  </div>
                  <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-amber-950 border border-amber-800">
                    {prediction.batchSchedule.batch2.plates} plates (35%)
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  {prediction.batchSchedule.batch2.menuDetails}
                </p>
              </div>

              {/* Batch 3 */}
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/60 bg-gradient-to-r from-slate-950 to-emerald-950/20">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="font-sans font-bold text-emerald-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    {prediction.batchSchedule.batch3.label} — <span className="font-mono">{prediction.batchSchedule.batch3.time}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-300 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                    {prediction.batchSchedule.batch3.plates} plates (20%)
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  {prediction.batchSchedule.batch3.menuDetails}
                </p>
              </div>
            </div>
          </div>

          {/* Pantry Raw Material Quantities */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[11px] font-sans uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between font-medium">
              <span className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-orange-400" /> Kitchen Store Raw Issue Weights
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Calibrated to 94.8% headcount</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <div className="text-xs font-bold text-white font-mono">{prediction.kitchenPantryQuantities.riceKg} kg</div>
                <div className="text-[10px] text-slate-400 font-sans">Rice Grains</div>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <div className="text-xs font-bold text-white font-mono">{prediction.kitchenPantryQuantities.dalKg} kg</div>
                <div className="text-[10px] text-slate-400 font-sans">Pulses / Dal</div>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <div className="text-xs font-bold text-white font-mono">{prediction.kitchenPantryQuantities.chapatiCount} pcs</div>
                <div className="text-[10px] text-slate-400 font-sans">Atta Rotis</div>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <div className="text-xs font-bold text-white font-mono">{prediction.kitchenPantryQuantities.sabziKg} kg</div>
                <div className="text-[10px] text-slate-400 font-sans">Fresh Sabzi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
