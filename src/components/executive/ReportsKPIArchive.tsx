"use client";

import React from "react";
import { FileText, Download, TrendingUp, AlertCircle, BarChart3 } from "lucide-react";

const reports = [
  { id: "RPT-AUG-W4", title: "Week 4 August 2026 — Board Performance Pack", type: "Weekly KPI Snapshot", date: "23 Aug 2026", pages: 8, kpis: ["Revenue: ₦9.6M", "Sheets: 312", "Margin: 43.9%", "Snag Rate: 0.8%"], badge: "Latest", badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800" },
  { id: "RPT-AUG-M", title: "August 2026 — Monthly Operations Report", type: "Monthly Board Report", date: "31 Aug 2026 (Projected)", pages: 24, kpis: ["Revenue: ₦38.3M", "COGS: 55.9%", "Net: ₦16.9M", "NPS: 92/100"], badge: "Upcoming", badgeColor: "bg-amber-950 text-amber-300 border-amber-800" },
  { id: "RPT-JUL-M", title: "July 2026 — Monthly Operations Report", type: "Monthly Board Report", date: "31 Jul 2026", pages: 22, kpis: ["Revenue: ₦36.1M", "Sheets: 1,186", "Snag Rate: 1.2%", "Margin: 43.8%"], badge: "Archived", badgeColor: "bg-slate-800 text-slate-300 border-slate-700" },
  { id: "RPT-Q2-2026", title: "Q2 2026 — Quarterly Executive Summary", type: "Quarterly Strategy Report", date: "30 Jun 2026", pages: 41, kpis: ["Revenue: ₦93.5M", "YoY Growth: +34%", "EBITDA: 40.2%", "NPS: 89/100"], badge: "Archived", badgeColor: "bg-slate-800 text-slate-300 border-slate-700" },
];

const trendData = [
  { month: "Mar", snag: 2.1, yield: 81.2, nps: 84 },
  { month: "Apr", snag: 1.8, yield: 82.5, nps: 86 },
  { month: "May", snag: 1.5, yield: 83.9, nps: 88 },
  { month: "Jun", snag: 1.2, yield: 85.1, nps: 89 },
  { month: "Jul", snag: 1.0, yield: 86.3, nps: 91 },
  { month: "Aug", snag: 0.8, yield: 87.8, nps: 92 },
];

export const ReportsKPIArchive: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Trends */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>6-Month Operational Trend Index</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-500 border-b border-slate-800">
                <th className="text-left pb-2 font-medium">Month</th>
                <th className="text-right pb-2 font-medium text-rose-400">Snag Rate %</th>
                <th className="text-right pb-2 font-medium text-emerald-400">Sheet Yield %</th>
                <th className="text-right pb-2 font-medium text-cyan-400">NPS Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {trendData.map((row) => (
                <tr key={row.month} className="py-2">
                  <td className="py-2 font-mono font-bold text-white">{row.month} '26</td>
                  <td className="text-right py-2 font-mono text-rose-300">{row.snag}%</td>
                  <td className="text-right py-2 font-mono text-emerald-300">{row.yield}%</td>
                  <td className="text-right py-2 font-mono text-cyan-300">{row.nps}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Archive */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center space-x-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Board-Ready Report Archive</span>
        </h4>
        <div className="space-y-3">
          {reports.map((rpt) => (
            <div key={rpt.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-slate-500">{rpt.id}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono font-bold ${rpt.badgeColor}`}>{rpt.badge}</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">{rpt.title}</div>
                  <div className="text-[11px] text-slate-400">{rpt.type} • {rpt.date} • {rpt.pages} pages</div>
                </div>
                <button
                  onClick={() => alert(`Downloading ${rpt.id}...`)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex-shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PDF</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {rpt.kpis.map((k) => (
                  <span key={k} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono">{k}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
