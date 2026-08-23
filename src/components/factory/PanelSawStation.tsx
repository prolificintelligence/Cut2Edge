"use client";

import React, { useState } from "react";
import {
  Scissors,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ArrowRight,
  RefreshCw,
  QrCode,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { FactoryJob } from "@/types";
import { NestingVisualizer } from "./NestingVisualizer";

interface PanelSawStationProps {
  job: FactoryJob;
  onAdvanceStation: (jobId: string, nextStation: string) => void;
}

export const PanelSawStation: React.FC<PanelSawStationProps> = ({
  job,
  onAdvanceStation,
}) => {
  const [currentSheet, setCurrentSheet] = useState<number>(3);
  const [cutsDone, setCutsDone] = useState<number>(18);
  const totalSheets = job.sheetCount || 14;
  const totalCuts = job.totalCuts || 78;

  const handleNextSheet = () => {
    if (currentSheet < totalSheets) {
      setCurrentSheet((prev) => prev + 1);
      setCutsDone((prev) => Math.min(totalCuts, prev + 6));
    }
  };

  const handleFinishSawing = () => {
    onAdvanceStation(job.id, "edge_bander");
  };

  return (
    <div className="space-y-6">
      {/* Top Station Header & Telemetry */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Scissors className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-white">Station 01: Precision Beam & Panel Saw</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                Active Cutting
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Machine: SCMI Si400 EP | Blade Kerf: 3.2mm | Operator: Ibrahim Musa
            </p>
          </div>
        </div>

        {/* Current Job Badge */}
        <div className="flex items-center space-x-3 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Current Job Code</div>
            <div className="text-sm font-black text-emerald-400 font-mono">{job.jobCode}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-400">Client / Workshop</div>
            <div className="text-xs font-bold text-white">{job.clientName}</div>
          </div>
        </div>
      </div>

      {/* Progress & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Sheet Cutting Progress</div>
          <div className="text-2xl font-black text-white font-mono mt-1">
            {currentSheet} <span className="text-slate-500 text-sm">/ {totalSheets} Sheets</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentSheet / totalSheets) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Cuts Completed</div>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
            {cutsDone} <span className="text-slate-500 text-sm">/ {totalCuts} Cuts</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            {Math.round((cutsDone / totalCuts) * 100)}% Job Completion
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Board Specification</div>
          <div className="text-sm font-bold text-white truncate mt-1">{job.boardType}</div>
          <div className="text-[11px] text-slate-400 mt-1">2440 x 1220 x 18mm</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Nesting Efficiency</div>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
            {job.nestingEfficiencyPct}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Scrap Salvaged: 1.8 sheets</div>
        </div>
      </div>

      {/* Main Interactive Visualizer & Cut List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <NestingVisualizer
            activeSheetIndex={currentSheet}
            totalSheets={totalSheets}
            efficiencyPct={job.nestingEfficiencyPct}
          />
        </div>

        {/* Right Cut Panel List */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">Cutlist Breakdown (Sheet {currentSheet})</h4>
              <button
                onClick={() => alert("Printing QR Barcode Labels for this sheet...")}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 font-semibold border border-slate-700"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span>Print QR Labels</span>
              </button>
            </div>

            <div className="mt-3 space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {job.panels.map((panel, idx) => (
                <div
                  key={panel.id || idx}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs hover:border-emerald-500/40 transition-colors"
                >
                  <div>
                    <div className="font-bold text-white flex items-center space-x-1.5">
                      <span>{panel.label}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-emerald-300 font-mono">
                        {panel.quantity} pcs
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {panel.length} x {panel.width} x {panel.thickness}mm
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Edge Tape</div>
                    <div className="text-[11px] font-mono text-emerald-400 font-semibold">
                      {panel.edgeTop !== "none" ? `${panel.edgeTop} (T)` : ""}{" "}
                      {panel.edgeLeft !== "none" ? `${panel.edgeLeft} (L)` : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Station Action Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleNextSheet}
                disabled={currentSheet >= totalSheets}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all disabled:opacity-50"
              >
                {currentSheet < totalSheets ? `Next Sheet (${currentSheet + 1}/${totalSheets})` : "All Sheets Cut"}
              </button>
              <button
                onClick={handleFinishSawing}
                className="py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Send to Edge Bander</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
