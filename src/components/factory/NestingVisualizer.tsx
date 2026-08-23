"use client";

import React from "react";
import { Sparkles, Maximize2, Layers } from "lucide-react";

interface NestingVisualizerProps {
  sheetWidth?: number; // 2440 mm
  sheetHeight?: number; // 1220 mm
  efficiencyPct?: number; // e.g. 92.4%
  activeSheetIndex?: number;
  totalSheets?: number;
}

export const NestingVisualizer: React.FC<NestingVisualizerProps> = ({
  sheetWidth = 2440,
  sheetHeight = 1220,
  efficiencyPct = 92.4,
  activeSheetIndex = 1,
  totalSheets = 14,
}) => {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">AI 2D Nesting Pattern Viewer</h4>
            <p className="text-[11px] text-slate-400">
              Sheet {activeSheetIndex} of {totalSheets} (2440mm x 1220mm x 18mm HDF)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-bold font-mono">
            {efficiencyPct}% Yield
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
            Kerf: 3.2mm
          </span>
        </div>
      </div>

      {/* Interactive SVG Board Representation */}
      <div className="mt-4 relative bg-[#090d16] border border-slate-800/80 rounded-xl p-4 overflow-hidden">
        {/* Grain Orientation Arrow */}
        <div className="absolute top-2 right-4 text-[10px] text-slate-500 flex items-center space-x-1 font-mono">
          <span>Grain Direction</span>
          <span>&rarr;</span>
        </div>

        <svg
          viewBox="0 0 800 400"
          className="w-full h-auto max-h-[300px] border border-slate-700/60 rounded-lg bg-slate-900/50 shadow-inner"
        >
          {/* Main 2440 x 1220 Board Outline */}
          <rect
            x="10"
            y="10"
            width="780"
            height="380"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="2"
            strokeDasharray="4"
          />

          {/* Panel 1: Tall Pantry Door (2150 x 595mm equivalent) */}
          <g>
            <rect
              x="14"
              y="14"
              width="680"
              height="180"
              fill="#065f46"
              stroke="#10b981"
              strokeWidth="2"
              rx="4"
              className="transition-colors hover:fill-emerald-800 cursor-pointer"
            />
            <text x="350" y="90" fill="#ecfdf5" fontSize="14" fontWeight="bold" textAnchor="middle">
              P-3: Tall Pantry Shaker Door
            </text>
            <text x="350" y="112" fill="#a7f3d0" fontSize="11" textAnchor="middle" fontFamily="monospace">
              2150 x 595mm | 2.0mm ABS [All 4 Edges]
            </text>
          </g>

          {/* Panel 2: Base Cabinet Side L (870 x 580mm equivalent) */}
          <g>
            <rect
              x="14"
              y="200"
              width="275"
              height="186"
              fill="#1e3a5f"
              stroke="#38bdf8"
              strokeWidth="2"
              rx="4"
              className="transition-colors hover:fill-sky-800 cursor-pointer"
            />
            <text x="150" y="280" fill="#f0f9ff" fontSize="12" fontWeight="bold" textAnchor="middle">
              P-1: Base Side (L)
            </text>
            <text x="150" y="302" fill="#bae6fd" fontSize="10" textAnchor="middle" fontFamily="monospace">
              870 x 580mm | 1.0mm
            </text>
          </g>

          {/* Panel 3: Base Cabinet Side R (870 x 580mm equivalent) */}
          <g>
            <rect
              x="295"
              y="200"
              width="275"
              height="186"
              fill="#1e3a5f"
              stroke="#38bdf8"
              strokeWidth="2"
              rx="4"
              className="transition-colors hover:fill-sky-800 cursor-pointer"
            />
            <text x="430" y="280" fill="#f0f9ff" fontSize="12" fontWeight="bold" textAnchor="middle">
              P-1: Base Side (R)
            </text>
            <text x="430" y="302" fill="#bae6fd" fontSize="10" textAnchor="middle" fontFamily="monospace">
              870 x 580mm | 1.0mm
            </text>
          </g>

          {/* Panel 4: Drawer Front (895 x 295mm equivalent) */}
          <g>
            <rect
              x="576"
              y="200"
              width="214"
              height="90"
              fill="#831843"
              stroke="#f472b6"
              strokeWidth="2"
              rx="4"
              className="transition-colors hover:fill-pink-900 cursor-pointer"
            />
            <text x="683" y="245" fill="#fdf2f8" fontSize="11" fontWeight="bold" textAnchor="middle">
              P-4: Drawer Face
            </text>
            <text x="683" y="263" fill="#fbcfe8" fontSize="9" textAnchor="middle" fontFamily="monospace">
              895 x 295mm | 2.0mm
            </text>
          </g>

          {/* Reusable Scrap Offcut Area */}
          <g>
            <rect
              x="576"
              y="296"
              width="214"
              height="90"
              fill="#334155"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeDasharray="4"
              rx="4"
            />
            <text x="683" y="342" fill="#94a3b8" fontSize="11" fontWeight="semibold" textAnchor="middle">
              Reusable Offcut Scrap
            </text>
            <text x="683" y="360" fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="monospace">
              560 x 280mm (Saved)
            </text>
          </g>

          {/* Blade Kerf Lines */}
          <line x1="14" y1="197" x2="700" y2="197" stroke="#ef4444" strokeWidth="2" strokeDasharray="3" />
          <line x1="292" y1="200" x2="292" y2="386" stroke="#ef4444" strokeWidth="2" strokeDasharray="3" />
          <line x1="573" y1="200" x2="573" y2="386" stroke="#ef4444" strokeWidth="2" strokeDasharray="3" />
        </svg>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2 font-medium">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" />
              <span>Door Panels (2mm ABS)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded bg-sky-500 inline-block" />
              <span>Carcases (1mm PVC)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded bg-pink-500 inline-block" />
              <span>Drawer Faces</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded bg-slate-600 inline-block" />
              <span>Scrap Salvage</span>
            </span>
          </div>

          <div className="flex items-center space-x-1 text-red-400 font-mono">
            <span className="w-2 h-0.5 bg-red-400 inline-block" />
            <span>Red Line: 3.2mm Saw Blade Cut</span>
          </div>
        </div>
      </div>
    </div>
  );
};
