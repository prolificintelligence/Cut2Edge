"use client";

import React, { useState } from "react";
import {
  Activity,
  Flame,
  CheckCircle2,
  Gauge,
  ArrowRight,
  Sparkles,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import { FactoryJob } from "@/types";
import { formatMeters } from "@/lib/utils";

interface EdgeBanderStationProps {
  job: FactoryJob;
  onAdvanceStation: (jobId: string, nextStation: string) => void;
}

export const EdgeBanderStation: React.FC<EdgeBanderStationProps> = ({
  job,
  onAdvanceStation,
}) => {
  const [bandedMeters, setBandedMeters] = useState<number>(142.5);
  const totalMeters = job.totalLinearMeters || 284.5;
  const [glueTemp, setGlueTemp] = useState<number>(198);

  const handleBandingDone = () => {
    onAdvanceStation(job.id, "qc_gatepass");
  };

  return (
    <div className="space-y-6">
      {/* Station Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-white">Station 02: Automatic Dual-Motor Edge Bander</h3>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold uppercase tracking-wider">
                Active Banding
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Machine: Nanxing NB505 | Pre-Milling: 1.0mm | Feed Speed: 18 m/min | Operator: Sunday Okafor
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Job Code</div>
            <div className="text-sm font-black text-amber-400 font-mono">{job.jobCode}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-400">Client</div>
            <div className="text-xs font-bold text-white">{job.clientName}</div>
          </div>
        </div>
      </div>

      {/* Machine Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Glue Temp */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
            <span>Glue Pot Temperature</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">
            {glueTemp}°C <span className="text-xs text-slate-500 font-normal">/ 200°C Target</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>Optimal Adhesion Viscosity</span>
          </div>
        </div>

        {/* Meters Counter */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Linear Meters Banded</div>
          <div className="text-2xl font-black text-white font-mono mt-1">
            {formatMeters(bandedMeters)} <span className="text-xs text-slate-500">/ {formatMeters(totalMeters)}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(bandedMeters / totalMeters) * 100}%` }}
            />
          </div>
        </div>

        {/* Tape Loaded */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Active Tape Loaded</div>
          <div className="text-sm font-bold text-white mt-1 truncate">
            1.0mm Super Matte Pure White
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Next Reel: 2.0mm ABS Door Tape
          </div>
        </div>

        {/* Trimming Quality */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Corner Rounding / Buffing</div>
          <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Dual High-Gloss Buffers Active</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Zero edge chipping detected</div>
        </div>
      </div>

      {/* Interactive Controls & Feed Tracker */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h4 className="text-sm font-bold text-white">Edge Banding Queue & Operation Check</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-white">1. Pre-Milling Diamond Cutters</div>
            <p className="text-[11px] text-slate-400">
              Removes micro-splinters from saw blade for a 100% invisible glue line.
            </p>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
              Active - 1.0mm Skim
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-white">2. Dual Motor End Trimming</div>
            <p className="text-[11px] text-slate-400">
              Cuts front and rear tape overhang flush at 45° angle.
            </p>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
              Synchronized
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-white">3. Radius Scraping & Cotton Buffing</div>
            <p className="text-[11px] text-slate-400">
              Cleans glue residue and polishes edge to factory match.
            </p>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
              Double Buffed
            </span>
          </div>
        </div>

        {/* Advance Station */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => setBandedMeters((prev) => Math.min(totalMeters, prev + 50))}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700"
          >
            + Feed 50 Linear Meters
          </button>

          <button
            onClick={handleBandingDone}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-2"
          >
            <span>Complete Banding & Dispatch to QC / Gatepass</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
