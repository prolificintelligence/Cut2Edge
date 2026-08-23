"use client";

import React from "react";
import { FolderKanban, Calendar, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { formatNaira } from "@/lib/utils";

const projects = [
  {
    id: "TK-2026-011",
    name: "Lekki Phase 1 Penthouse Kitchen",
    client: "Studio Axis Architecture",
    totalValue: 8_400_000,
    paidToDate: 5_880_000,
    pct: 70,
    milestones: [
      { label: "Site Survey & CAD Sign-Off", done: true, date: "12 Aug" },
      { label: "Material Procurement & Cutting", done: true, date: "18 Aug" },
      { label: "Edge Banding & Assembly", done: false, date: "26 Aug" },
      { label: "Site Installation & Snagging", done: false, date: "2 Sep" },
    ],
    status: "on_track",
  },
  {
    id: "TK-2026-014",
    name: "Victoria Island Corporate Reception",
    client: "Pelican Interiors Ltd",
    totalValue: 4_200_000,
    paidToDate: 2_940_000,
    pct: 35,
    milestones: [
      { label: "Site Survey & CAD Sign-Off", done: true, date: "5 Aug" },
      { label: "Material Procurement & Cutting", done: false, date: "OVERDUE" },
      { label: "Edge Banding & Assembly", done: false, date: "30 Aug" },
      { label: "Site Installation & Snagging", done: false, date: "10 Sep" },
    ],
    status: "overdue",
  },
  {
    id: "TK-2026-017",
    name: "Ikoyi Duplex Master Suite Wardrobe",
    client: "Direct (Walk-in Client)",
    totalValue: 2_800_000,
    paidToDate: 0,
    pct: 5,
    milestones: [
      { label: "Site Survey & CAD Sign-Off", done: false, date: "28 Aug" },
      { label: "Material Procurement & Cutting", done: false, date: "4 Sep" },
      { label: "Edge Banding & Assembly", done: false, date: "11 Sep" },
      { label: "Site Installation & Snagging", done: false, date: "18 Sep" },
    ],
    status: "pending_deposit",
  },
];

const statusStyles = {
  on_track: { label: "On Track", color: "text-emerald-400 bg-emerald-950 border-emerald-800" },
  overdue: { label: "⚠ Overdue", color: "text-rose-400 bg-rose-950 border-rose-800" },
  pending_deposit: { label: "Pending Deposit", color: "text-amber-400 bg-amber-950 border-amber-800" },
};

export const ProjectManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400">Active Turnkey Projects</div>
          <div className="text-3xl font-black text-white font-mono mt-1">3</div>
        </div>
        <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400">Total Contract Value</div>
          <div className="text-xl font-black text-emerald-300 font-mono mt-1">{formatNaira(15_400_000)}</div>
        </div>
        <div className="bg-rose-950 border border-rose-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400">Outstanding Balance Due</div>
          <div className="text-xl font-black text-rose-300 font-mono mt-1">{formatNaira(6_580_000)}</div>
        </div>
      </div>

      {/* Project Cards */}
      <div className="space-y-5">
        {projects.map((proj) => {
          const st = statusStyles[proj.status as keyof typeof statusStyles];
          return (
            <div key={proj.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-slate-500">{proj.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-bold ${st.color}`}>{st.label}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">{proj.name}</h4>
                  <p className="text-xs text-slate-400">{proj.client}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold font-mono text-emerald-400">{formatNaira(proj.totalValue)}</div>
                  <div className="text-[11px] text-slate-400 font-mono">Paid: {formatNaira(proj.paidToDate)}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-[11px] mb-1 text-slate-400">
                  <span>Completion Progress</span>
                  <span className="font-mono font-bold text-white">{proj.pct}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${proj.status === "overdue" ? "bg-rose-500" : "bg-emerald-500"}`}
                    style={{ width: `${proj.pct}%` }}
                  />
                </div>
              </div>

              {/* Milestones */}
              <div className="grid grid-cols-2 gap-2">
                {proj.milestones.map((m, i) => (
                  <div key={i} className={`flex items-center space-x-2 p-2.5 rounded-xl border text-xs ${m.done ? "bg-emerald-950/50 border-emerald-900" : "bg-slate-950 border-slate-800"}`}>
                    {m.done
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      : m.date === "OVERDUE"
                        ? <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 animate-pulse" />
                        : <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    }
                    <div className="truncate">
                      <div className={`font-medium truncate ${m.done ? "text-emerald-300" : "text-slate-300"}`}>{m.label}</div>
                      <div className={`text-[10px] font-mono ${m.date === "OVERDUE" ? "text-rose-400 font-bold" : "text-slate-500"}`}>{m.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
