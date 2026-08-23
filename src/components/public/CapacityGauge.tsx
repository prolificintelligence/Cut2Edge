"use client";

import React from "react";
import { Clock, Activity, AlertCircle, CheckCircle, Flame, Scissors, Zap } from "lucide-react";

export const CapacityGauge: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h3 className="text-xl font-bold text-white">Live Matori Factory Floor Capacity</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time machine station load at #7 Fatai Atere Way. Updated every 60 seconds via Inngest events.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Fast-Track Sizing Available</span>
            </div>
          </div>
        </div>

        {/* Stations Load Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Station 1 */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center space-x-1.5">
                <Scissors className="w-3.5 h-3.5 text-emerald-400" />
                <span>Panel Saws (Sliding & Beam)</span>
              </span>
              <span className="font-mono text-emerald-400 font-bold">62% Load</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "62%" }} />
            </div>
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>Current Queue: 3 jobs</span>
              <span>Wait: ~45 mins</span>
            </div>
          </div>

          {/* Station 2 */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>Auto Edge Bander (Nanxing)</span>
              </span>
              <span className="font-mono text-amber-400 font-bold">78% Load</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: "78%" }} />
            </div>
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>Current Queue: 4 jobs</span>
              <span>Wait: ~1.2 hrs</span>
            </div>
          </div>

          {/* Station 3 */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-cyan-400" />
                <span>Vacuum Membrane Press</span>
              </span>
              <span className="font-mono text-cyan-400 font-bold">45% Load</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full" style={{ width: "45%" }} />
            </div>
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>Current Queue: 2 batches</span>
              <span>Wait: ~30 mins</span>
            </div>
          </div>

          {/* Station 4 */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center space-x-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                <span>QC & Gatepass Dispatch</span>
              </span>
              <span className="font-mono text-purple-400 font-bold">Optimal</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: "35%" }} />
            </div>
            <div className="text-[11px] text-slate-400 flex justify-between">
              <span>Scanning Time: &lt;3 mins</span>
              <span>Forklift: Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
