"use client";

import React, { useState } from "react";
import {
  History,
  Search,
  Filter,
  CheckCircle2,
  Printer,
  Download,
  Clock,
  Layers,
  Sparkles,
} from "lucide-react";
import { FactoryJob } from "@/types";
import { MOCK_JOB_HISTORY } from "@/data/mockData";
import { formatNaira } from "@/lib/utils";

export const JobHistoryDrawer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [historyJobs] = useState<FactoryJob[]>(MOCK_JOB_HISTORY);

  const filtered = historyJobs.filter(
    (j) =>
      j.jobCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
            Workstation Audit Archive
          </span>
          <h3 className="text-xl font-bold text-white">Factory Job History & Completed Runs</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Historical run durations, material yield audits, operator logs, and barcode label reprinting.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Job Code or Client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* History Table */}
      <div className="border border-slate-800 rounded-2xl overflow-x-auto bg-slate-950">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase font-mono border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Job Code</th>
              <th className="py-3 px-3">Client / Workshop</th>
              <th className="py-3 px-3">Board Material</th>
              <th className="py-3 px-3">Sheets / Tape</th>
              <th className="py-3 px-3">Yield %</th>
              <th className="py-3 px-3">Operator</th>
              <th className="py-3 px-3">Duration</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filtered.map((job) => (
              <tr key={job.id} className="hover:bg-slate-900/50">
                <td className="py-3 px-4 font-mono font-bold text-purple-400">{job.jobCode}</td>
                <td className="py-3 px-3 font-semibold text-white">{job.clientName}</td>
                <td className="py-3 px-3 text-slate-300 truncate max-w-[160px]">{job.boardType}</td>
                <td className="py-3 px-3 font-mono text-emerald-400">
                  {job.sheetCount > 0 ? `${job.sheetCount} sheets` : "Door Batch"} ({job.totalLinearMeters} lm)
                </td>
                <td className="py-3 px-3 font-mono font-bold text-cyan-400">{job.nestingEfficiencyPct}%</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">{job.operatorName}</td>
                <td className="py-3 px-3 font-mono text-slate-400">{job.actualDurationMins} mins</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => alert(`Reprinting QR Barcode Stickers for Job ${job.jobCode}...`)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 border border-slate-700 inline-flex items-center space-x-1"
                  >
                    <Printer className="w-3 h-3 text-purple-400" />
                    <span>Reprint QR Labels</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
