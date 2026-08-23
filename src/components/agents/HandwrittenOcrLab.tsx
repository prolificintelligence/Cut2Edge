"use client";

import React, { useState } from "react";
import {
  FileCode,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Layers,
  ArrowRight,
  RefreshCw,
  FileSpreadsheet,
  Scan,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";

export const HandwrittenOcrLab: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<"handwritten_1" | "maxcut_pdf">("handwritten_1");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(true);

  const handleReScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Scan className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Agent 02: Handwritten Cutlist & MaxCut PDF Multi-Modal Parser</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-mono">
                Vision & OCR Transformer
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Digitizes messy Nigerian artisan handwritten cutlists on scrap paper and parses exported MaxCut/CSV cutting schedules.
            </p>
          </div>
        </div>

        {/* Sample Switcher */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setSelectedSample("handwritten_1");
              handleReScan();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              selectedSample === "handwritten_1"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Handwritten Paper Note</span>
          </button>

          <button
            onClick={() => {
              setSelectedSample("maxcut_pdf");
              handleReScan();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              selectedSample === "maxcut_pdf"
                ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>MaxCut PDF / CSV</span>
          </button>
        </div>
      </div>

      {/* Main OCR Bounding Box Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Visual Document with Bounding Box Highlights */}
        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span>Vision Input: {selectedSample === "handwritten_1" ? "Carpenter_Notepad_Paper.jpg" : "MaxCut_Export_Batch42.pdf"}</span>
            <button
              onClick={handleReScan}
              className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-mono text-[11px]"
            >
              <RefreshCw className={`w-3 h-3 ${isScanning ? "animate-spin" : ""}`} />
              <span>Re-run OCR Vision</span>
            </button>
          </div>

          {selectedSample === "handwritten_1" ? (
            <div className="bg-[#141b2a] border border-cyan-500/40 rounded-xl p-5 font-mono text-xs text-slate-200 relative overflow-hidden space-y-3 shadow-inner">
              {/* Paper Texture Overlay */}
              <div className="text-amber-300 text-xs font-bold border-b border-slate-700/80 pb-2 flex justify-between">
                <span>[Handwritten Ink] Master Tunde Joinery (Ikeja)</span>
                <span className="text-slate-500 font-normal">Date: 23/08/2026</span>
              </div>

              {/* Bounding Box 1 */}
              <div className="p-2 rounded border border-emerald-400 bg-emerald-950/40 relative">
                <span className="absolute -top-2 right-2 text-[9px] bg-emerald-500 text-slate-950 px-1 rounded font-bold">
                  OCR: 870x580 (8 pcs)
                </span>
                <div>1. Base cabinet sides: 870mm x 580mm - 8 pcs (1mm tape Top & Left)</div>
              </div>

              {/* Bounding Box 2 */}
              <div className="p-2 rounded border border-emerald-400 bg-emerald-950/40 relative">
                <span className="absolute -top-2 right-2 text-[9px] bg-emerald-500 text-slate-950 px-1 rounded font-bold">
                  OCR: 564x550 (12 pcs)
                </span>
                <div>2. Base shelves: 564mm x 550mm - 12 pcs (1mm Top only)</div>
              </div>

              {/* Bounding Box 3 */}
              <div className="p-2 rounded border border-emerald-400 bg-emerald-950/40 relative">
                <span className="absolute -top-2 right-2 text-[9px] bg-emerald-500 text-slate-950 px-1 rounded font-bold">
                  OCR: 2150x595 (4 pcs)
                </span>
                <div>3. Tall pantry shaker: 2150mm x 595mm - 4 pcs (2mm ALL 4 sides)</div>
              </div>

              {/* Bounding Box 4 */}
              <div className="p-2 rounded border border-emerald-400 bg-emerald-950/40 relative">
                <span className="absolute -top-2 right-2 text-[9px] bg-emerald-500 text-slate-950 px-1 rounded font-bold">
                  OCR: 895x295 (6 pcs)
                </span>
                <div>4. Drawer fronts: 895mm x 295mm - 6 pcs (2mm ALL 4 sides)</div>
              </div>

              <div className="text-[11px] text-slate-400 pt-1">
                Material Note: 18mm High Gloss Pure White (14 sheets). Grain along length.
              </div>
            </div>
          ) : (
            <div className="bg-[#141b2a] border border-cyan-500/40 rounded-xl p-5 font-mono text-xs text-slate-200 space-y-2">
              <div className="text-cyan-300 font-bold border-b border-slate-700/80 pb-2 flex justify-between">
                <span>[MaxCut v3.8 XML/PDF Ingest]</span>
                <span className="text-slate-500">Source: Studio_Axis_Wardrobes.pdf</span>
              </div>
              <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/40 text-[11px]">
                Detected 6 Part Definitions • 22 Standard Sheets (2440x1220x18mm Egger Oak)
              </div>
              <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/40 text-[11px]">
                Total Linear Edge Tape: 412.0 lm (2.0mm ABS Warm Walnut)
              </div>
              <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/40 text-[11px]">
                Blade Kerf Offset: 3.2mm • Primary Trim: 10mm
              </div>
            </div>
          )}
        </div>

        {/* Right: Extracted Schema & Nesting Yield */}
        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Parsed Structured Schema (Ready for SCMI Beam Saw)</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Confidence: 99.4%
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Total Sheets Required:</span>
              <span className="font-mono font-bold text-white">14 Sheets (2440 x 1220mm)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Total Unique Parts:</span>
              <span className="font-mono font-bold text-cyan-400">4 Types (30 Total Pieces)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>2D Nesting Yield Efficiency:</span>
              <span className="font-mono font-bold text-emerald-400">92.4% (Scrap Saved: 1.8 sheets)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Calculated Proforma Amount:</span>
              <span className="font-mono font-bold text-white">₦185,560 (70% Dep: ₦130,000)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>Human-in-the-loop review approved. Direct G-code dispatch ready.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
