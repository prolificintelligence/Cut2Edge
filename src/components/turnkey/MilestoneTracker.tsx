"use client";

import React from "react";
import { CheckCircle2, Clock, DollarSign, FileCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { TurnkeyMilestone } from "@/types";
import { formatNaira } from "@/lib/utils";

interface MilestoneTrackerProps {
  milestones: TurnkeyMilestone[];
  totalAmount: number;
}

export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({
  milestones,
  totalAmount,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Payment & Site Progress</span>
          <h3 className="text-xl font-bold text-white">70 / 20 / 10 Milestone Escrow Schedule</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Stage-by-stage verification protects both Cut2Edge factory operations and corporate property developers.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-500">Contract Total</span>
          <div className="text-lg font-black text-white font-mono">{formatNaira(totalAmount)}</div>
        </div>
      </div>

      {/* 3 Step Progression */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {milestones.map((m, idx) => {
          const isPaid = m.status === "paid";
          const isInProgress = m.status === "in_progress";
          return (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isPaid
                  ? "bg-emerald-950/30 border-emerald-500/50"
                  : isInProgress
                  ? "bg-amber-950/30 border-amber-500/80 shadow-lg shadow-amber-950/40"
                  : "bg-slate-950/50 border-slate-800 opacity-60"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-white border border-slate-700">
                    Stage 0{idx + 1} ({m.percentage}%)
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isPaid
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : isInProgress
                        ? "bg-amber-950 text-amber-400 border border-amber-800 animate-pulse"
                        : "bg-slate-900 text-slate-500"
                    }`}
                  >
                    {m.status.replace("_", " ")}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-2 leading-snug">{m.title}</h4>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">{m.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex justify-between items-baseline">
                <span className="text-[11px] text-slate-500">Stage Amount:</span>
                <span className="text-base font-black text-white font-mono">{formatNaira(m.amount)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
