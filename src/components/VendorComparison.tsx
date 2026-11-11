import React, { useState } from 'react';
import {
  AlertTriangle,
  Award,
  Search,
  CheckCircle2,
  Clock,
  MessageSquareWarning,
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from 'recharts';
import { VENDOR_AUDITS, RECENT_COMPLAINTS } from '../data/messData';

export const VendorComparison: React.FC = () => {
  const [complaintFilter, setComplaintFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sodexo = VENDOR_AUDITS.find((v) => v.vendorName === 'Sodexo')!;
  const tmss = VENDOR_AUDITS.find((v) => v.vendorName === 'TMSS')!;

  // Radar chart comparison data
  const radarData = [
    { metric: 'Hygiene Audit', Sodexo: sodexo.overallHygieneScore, TMSS: tmss.overallHygieneScore },
    { metric: 'Food Safety Index', Sodexo: sodexo.foodSafetyIndex, TMSS: tmss.foodSafetyIndex },
    { metric: 'Thermal Holding (>65°C)', Sodexo: sodexo.temperatureCompliance, TMSS: tmss.temperatureCompliance },
    { metric: 'Pest Audit Rating', Sodexo: sodexo.pestInspectionScore, TMSS: tmss.pestInspectionScore },
    { metric: 'Student Satisfaction', Sodexo: sodexo.studentSatisfaction, TMSS: tmss.studentSatisfaction },
    { metric: 'Fresh Oil Index', Sodexo: Math.round((1 - sodexo.oilTpmScore / 25) * 100), TMSS: Math.round((1 - tmss.oilTpmScore / 25) * 100) },
  ];

  const filteredComplaints = RECENT_COMPLAINTS.filter((c) => {
    if (complaintFilter !== 'all' && c.vendor !== complaintFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        c.comment.toLowerCase().includes(q) || c.hostel.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              CAMPUS AUDIT BENCHMARK
            </span>
            <span className="text-xs text-slate-400 font-sans">TIET Mess Committee Oversight &amp; Quality Index</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight font-sans">
            Vendor Performance &amp; Quality Audit: Sodexo vs TMSS
          </h2>
          <p className="text-xs text-slate-300 mt-0.5 max-w-2xl font-sans leading-relaxed">
            Continuous empirical monitoring of frying oil degradation (TPM &lt;25%), servery food holding temperatures (&gt;65°C), and student resolution velocity across all campus messes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono shadow-2xs">
            <span className="text-slate-400">Sodexo:</span> <span className="text-amber-400 font-bold">78/100</span>
            <span className="mx-2 text-slate-400 dark:text-slate-700">•</span>
            <span className="text-slate-400">TMSS:</span> <span className="text-emerald-400 font-bold">91/100</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sodexo Card */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-amber-950/60 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white font-sans">Sodexo India</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold">
                    Hostel J, M, D
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-sans mt-0.5">
                  Feeding 3,010 Students Daily &bull; Commercial Caterer
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-extrabold text-amber-400 font-mono">78<span className="text-xs text-slate-500 font-sans">/100</span></div>
                <div className="text-[10px] text-slate-400 font-sans">Audit Rating</div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5 my-4 text-center">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-medium">Oil TPM</div>
                <div className="text-sm font-bold text-amber-400 mt-0.5 font-mono">{sodexo.oilTpmScore}%</div>
                <div className="text-[9px] text-slate-500 font-sans">Limit: &lt;25%</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-medium">Heat Holding</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5 font-mono">{sodexo.temperatureCompliance}%</div>
                <div className="text-[9px] text-slate-500 font-sans">&gt;65°C servery</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-medium">Student Sat.</div>
                <div className="text-sm font-bold text-amber-300 mt-0.5 font-mono">{sodexo.studentSatisfaction}%</div>
                <div className="text-[9px] text-slate-500 font-sans">Positive ratings</div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-3 text-xs font-sans">
              <div>
                <span className="text-emerald-400 font-bold block mb-1">Operational Strengths:</span>
                <ul className="space-y-1.5 text-slate-300">
                  {sodexo.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2.5 border-t border-slate-800">
                <span className="text-rose-400 font-bold block mb-1">Audit Concerns &amp; Alerts:</span>
                <ul className="space-y-1.5 text-slate-300">
                  {sodexo.concerns.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-sans">
            <span className="text-amber-400 font-bold">Mess Sec Note:</span> {sodexo.lastAuditSummary}
          </div>
        </div>

        {/* TMSS Card */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-emerald-950/60 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white font-sans">TMSS Society</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Hostel L, B
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-sans mt-0.5">
                  Feeding 1,630 Students Daily &bull; Autonomous Mess Cooperative
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">91<span className="text-xs text-slate-500 font-sans">/100</span></div>
                <div className="text-[10px] text-slate-400 font-sans">Audit Rating</div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2.5 my-4 text-center">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-medium">Oil TPM</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5 font-mono">{tmss.oilTpmScore}%</div>
                <div className="text-[9px] text-emerald-500 font-sans">Ultra-Fresh</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-medium">Heat Holding</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5 font-mono">{tmss.temperatureCompliance}%</div>
                <div className="text-[9px] text-slate-500 font-sans">&gt;65°C servery</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-medium">Student Sat.</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5 font-mono">{tmss.studentSatisfaction}%</div>
                <div className="text-[9px] text-slate-500 font-sans">Positive ratings</div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-3 text-xs font-sans">
              <div>
                <span className="text-emerald-400 font-bold block mb-1">Operational Strengths:</span>
                <ul className="space-y-1.5 text-slate-300">
                  {tmss.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2.5 border-t border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">Audit Concerns &amp; Alerts:</span>
                <ul className="space-y-1.5 text-slate-300">
                  {tmss.concerns.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-sans">
            <span className="text-emerald-400 font-bold">Mess Sec Note:</span> {tmss.lastAuditSummary}
          </div>
        </div>
      </div>

      {/* Radar Chart & Incident Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2 mb-1.5">
              <Award className="w-4 h-4 text-orange-500" />
              Multi-Vector Compliance Radar
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Evaluated across 6 empirical hygiene, thermal, and satisfaction dimensions.
            </p>

            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="metric" stroke="#94a3b8" fontSize={10} />
                  <PolarRadiusAxis stroke="#475569" fontSize={9} domain={[0, 100]} />
                  <Radar name="Sodexo" dataKey="Sodexo" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
                  <Radar name="TMSS" dataKey="TMSS" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#f8fafc',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800 flex items-center justify-between font-sans">
            <span>Audit cycle: Bi-weekly</span>
            <span className="text-emerald-400 font-medium">Next testing sample: 14 Nov</span>
          </div>
        </div>

        {/* Live Student Complaint & Hygiene Heatmap Log */}
        <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <MessageSquareWarning className="w-4 h-4 text-rose-400" />
                Live Student Quality &amp; Incident Tracker
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Verified logs from TIET student portal and digital mess QR feedback scanners
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-sans">
              {['all', 'Sodexo', 'TMSS'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => setComplaintFilter(btn)}
                  className={`px-3 py-1 rounded-lg cursor-pointer transition ${
                    complaintFilter === btn
                      ? 'bg-orange-500 text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by comment, hostel (Hostel J, D, L...), or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500 font-sans placeholder-slate-500"
            />
          </div>

          {/* Complaint list */}
          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {filteredComplaints.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 font-sans">
                No matching student complaints found.
              </div>
            ) : (
              filteredComplaints.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white font-sans">{item.hostel}</span>
                      <span className="text-[11px] text-slate-400 font-sans">({item.vendor})</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase ${
                          item.severity === 'Critical'
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                            : item.severity === 'Warning'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 font-sans">
                        <Clock className="w-3 h-3 text-slate-500" /> {item.timestamp}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                          item.status === 'Resolved'
                            ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-900'
                            : item.status === 'Action Taken'
                            ? 'text-blue-400 bg-blue-950/60 border border-blue-900'
                            : 'text-amber-400 bg-amber-950/60 border border-amber-900'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs font-sans leading-relaxed pt-0.5">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
