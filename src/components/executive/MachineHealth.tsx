"use client";

import React from "react";
import {
  Wrench,
  Activity,
  Flame,
  Scissors,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Clock,
} from "lucide-react";
import { MOCK_MACHINES } from "@/data/mockData";

export const MachineHealth: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Shop Floor Telemetry</span>
          <h3 className="text-xl font-bold text-white">Machine Health & Workstation Fleet Status</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time diagnostics across heavy woodworking machinery at #7 Fatai Atere Way, Matori.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-800">
          <Zap className="w-3.5 h-3.5" />
          <span>Fleet Uptime: 96.8%</span>
        </div>
      </div>

      {/* Grid of 4 Machines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_MACHINES.map((machine) => {
          const isWarning = machine.status === "warning";
          return (
            <div
              key={machine.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 ${
                isWarning
                  ? "bg-amber-950/20 border-amber-500/50"
                  : "bg-slate-950 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-white">{machine.name}</h4>
                  <div className="text-xs text-slate-400">{machine.model}</div>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded border ${
                    isWarning
                      ? "bg-amber-950 text-amber-400 border-amber-800"
                      : "bg-emerald-950 text-emerald-400 border-emerald-800"
                  }`}
                >
                  {machine.status.replace("_", " ")}
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Overall Machine Health</span>
                  <span className="font-mono font-bold text-white">{machine.healthPct}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      machine.healthPct > 80 ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${machine.healthPct}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-xs pt-3 border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 block">Today&apos;s Output</span>
                  <span className="font-mono font-bold text-white">
                    {machine.sheetsCutToday > 0
                      ? `${machine.sheetsCutToday} Sheets`
                      : `${machine.linearMetersToday} lm`}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Power Used</span>
                  <span className="font-mono font-bold text-cyan-400">{machine.powerKwhToday} kWh</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Next Service</span>
                  <span className="font-mono text-slate-300 text-[11px]">{machine.nextScheduledService}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
