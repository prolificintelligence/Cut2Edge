"use client";

import React from "react";
import { Users, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { formatNaira } from "@/lib/utils";

const operators = [
  { name: "Musa Danladi", station: "Beam Saw (SCMI Si400)", shift: "Morning", hoursThisWeek: 44, overtime: 4, output: "312 cuts", payroll: 180_000, risk: "none" },
  { name: "Sunday Eze", station: "Edge Bander (Nanxing 505)", shift: "Morning", hoursThisWeek: 40, overtime: 0, output: "198.4 lm", payroll: 165_000, risk: "none" },
  { name: "Kayode Alabi", station: "Membrane Press (Orma 2513)", shift: "Morning", hoursThisWeek: 42, overtime: 2, output: "47 doors", payroll: 155_000, risk: "none" },
  { name: "Chinedu Obi", station: "QC Supervisor", shift: "Morning", hoursThisWeek: 44, overtime: 4, output: "84 audits", payroll: 220_000, risk: "overtime_alert" },
  { name: "Emeka Okafor", station: "Factory PM / Coordinator", shift: "Morning", hoursThisWeek: 50, overtime: 10, output: "All stations", payroll: 280_000, risk: "overtime_alert" },
  { name: "Taiwo Adebisi", station: "Loading Dock & Logistics", shift: "Afternoon", hoursThisWeek: 38, overtime: 0, output: "24 dispatches", payroll: 140_000, risk: "none" },
];

export const StaffPayroll: React.FC = () => {
  const totalPayroll = operators.reduce((s, o) => s + o.payroll, 0);
  const totalOT = operators.reduce((s, o) => s + o.overtime, 0);
  const alertCount = operators.filter(o => o.risk === "overtime_alert").length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400 flex items-center space-x-1.5"><Users className="w-3.5 h-3.5" /><span>Active Operators</span></div>
          <div className="text-3xl font-black text-white font-mono mt-1">{operators.length}</div>
          <div className="text-[11px] text-slate-400">+ 6 casual daily labourers</div>
        </div>
        <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400">Monthly Payroll Accrual</div>
          <div className="text-xl font-black text-emerald-300 font-mono mt-1">{formatNaira(totalPayroll)}</div>
          <div className="text-[11px] text-slate-400">Core operators (ex-casual)</div>
        </div>
        <div className={`rounded-2xl p-5 border ${alertCount > 0 ? "bg-amber-950 border-amber-800" : "bg-slate-900 border-slate-800"}`}>
          <div className="text-xs text-slate-400 flex items-center space-x-1.5"><Clock className="w-3.5 h-3.5" /><span>Total Overtime Hours</span></div>
          <div className={`text-3xl font-black font-mono mt-1 ${alertCount > 0 ? "text-amber-300" : "text-white"}`}>{totalOT} hrs</div>
          <div className={`text-[11px] ${alertCount > 0 ? "text-amber-400" : "text-slate-400"}`}>{alertCount} operator(s) flagged</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400">Output per Payroll ₦</div>
          <div className="text-xl font-black text-cyan-300 font-mono mt-1">₦24.1 Rev/₦1 Pay</div>
          <div className="text-[11px] text-slate-400">Labour efficiency ratio</div>
        </div>
      </div>

      {/* Operator Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center space-x-2">
          <Users className="w-4 h-4 text-emerald-400" />
          <span>Operator Roster — Current Shift Utilisation</span>
        </h4>
        <div className="space-y-3">
          {operators.map((op) => (
            <div key={op.name} className={`p-4 rounded-2xl border space-y-2 ${op.risk === "overtime_alert" ? "bg-amber-950/30 border-amber-800/50" : "bg-slate-950 border-slate-800"}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-bold text-white">{op.name}</div>
                  <div className="text-[11px] text-slate-400">{op.station} • {op.shift} Shift</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold font-mono text-emerald-400">{formatNaira(op.payroll)}/mo</div>
                  {op.risk === "overtime_alert" && (
                    <div className="text-[10px] text-amber-400 flex items-center space-x-1 justify-end">
                      <AlertTriangle className="w-3 h-3" />
                      <span>+{op.overtime}h OT flag</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Hours this week: <strong className="text-white font-mono">{op.hoursThisWeek}h</strong></span>
                <span>Output: <strong className="text-cyan-300 font-mono">{op.output}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
