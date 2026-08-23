"use client";

import React, { useState } from "react";
import {
  Scissors,
  Calculator,
  Layers,
  Sparkles,
  Check,
  Send,
  Printer,
  HelpCircle,
  Clock,
  CheckCircle2,
  UploadCloud,
  FileCode,
  Image as ImageIcon,
  Edit3,
  ArrowRight,
  ArrowLeft,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";
import { formatNaira, formatMeters } from "@/lib/utils";
import { MOCK_FACTORY_RATES } from "@/data/mockData";
import { CutlistPanel } from "@/types";
import { NestingVisualizer } from "../factory/NestingVisualizer";

export const CutlistEstimator: React.FC = () => {
  // Wizard Step: 1 = Upload/Capture, 2 = AI Extraction, 3 = Table Verification, 4 = Nesting & Approval
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadSource, setUploadSource] = useState<"manual" | "handwritten" | "maxcut">("handwritten");
  const [isProcessingOcr, setIsProcessingOcr] = useState<boolean>(false);

  // Ingested Panels state
  const [panels, setPanels] = useState<CutlistPanel[]>([
    {
      id: "p-1",
      label: "Base Cabinet Side (L)",
      length: 870,
      width: 580,
      thickness: 18,
      quantity: 8,
      edgeTop: "1.0mm",
      edgeBottom: "0.8mm",
      edgeLeft: "1.0mm",
      edgeRight: "none",
      material: "18mm High Gloss UV MDF",
      grainOrientation: "length",
      confidence: 0.99,
    },
    {
      id: "p-2",
      label: "Base Cabinet Shelf",
      length: 564,
      width: 550,
      thickness: 18,
      quantity: 12,
      edgeTop: "1.0mm",
      edgeBottom: "none",
      edgeLeft: "none",
      edgeRight: "none",
      material: "18mm High Gloss UV MDF",
      grainOrientation: "length",
      confidence: 0.98,
    },
    {
      id: "p-3",
      label: "Tall Pantry Shaker Door",
      length: 2150,
      width: 595,
      thickness: 18,
      quantity: 4,
      edgeTop: "2.0mm",
      edgeBottom: "2.0mm",
      edgeLeft: "2.0mm",
      edgeRight: "2.0mm",
      material: "18mm High Gloss UV MDF",
      grainOrientation: "length",
      confidence: 0.99,
    },
    {
      id: "p-4",
      label: "Drawer Fronts (Large)",
      length: 895,
      width: 295,
      thickness: 18,
      quantity: 6,
      edgeTop: "2.0mm",
      edgeBottom: "2.0mm",
      edgeLeft: "2.0mm",
      edgeRight: "2.0mm",
      material: "18mm High Gloss UV MDF",
      grainOrientation: "length",
      confidence: 0.97,
    },
  ]);

  // Overall Project Specs
  const [sheetCount, setSheetCount] = useState<number>(14);
  const [supplyMode, setSupplyMode] = useState<"client_supplies" | "cut2edge_supplies">("client_supplies");
  const [boardMaterial, setBoardMaterial] = useState<string>("hg_white");
  const [clientName, setClientName] = useState<string>("Master Tunde Joinery");
  const [clientPhone, setClientPhone] = useState<string>("+234 803 445 9182");
  const [isApproved, setIsApproved] = useState<boolean>(false);

  // Board Prices (if factory supplies)
  const boardPrices: Record<string, { name: string; price: number }> = {
    hg_white: { name: "18mm High Gloss UV MDF (Pure White)", price: 44000 },
    egger_oak: { name: "18mm Egger Synchro Oak HDF (Warm Walnut)", price: 52000 },
    matte_hdf: { name: "18mm Moisture-Resistant Super Matte HDF", price: 38500 },
    back_9mm: { name: "9mm MDF Carcase Backing Sheet", price: 21500 },
  };

  // Linear Tape Calculations from Panels
  const calculateTotalMeters = () => {
    let tape1mm = 0;
    let tape2mm = 0;
    panels.forEach((p) => {
      const perimPerPiece = {
        top: (p.length / 1000) * p.quantity,
        bottom: (p.length / 1000) * p.quantity,
        left: (p.width / 1000) * p.quantity,
        right: (p.width / 1000) * p.quantity,
      };

      if (p.edgeTop === "1.0mm" || p.edgeTop === "0.8mm") tape1mm += perimPerPiece.top;
      if (p.edgeTop === "2.0mm") tape2mm += perimPerPiece.top;

      if (p.edgeBottom === "1.0mm" || p.edgeBottom === "0.8mm") tape1mm += perimPerPiece.bottom;
      if (p.edgeBottom === "2.0mm") tape2mm += perimPerPiece.bottom;

      if (p.edgeLeft === "1.0mm" || p.edgeLeft === "0.8mm") tape1mm += perimPerPiece.left;
      if (p.edgeLeft === "2.0mm") tape2mm += perimPerPiece.left;

      if (p.edgeRight === "1.0mm" || p.edgeRight === "0.8mm") tape1mm += perimPerPiece.right;
      if (p.edgeRight === "2.0mm") tape2mm += perimPerPiece.right;
    });

    return { tape1mm: Math.round(tape1mm * 10) / 10, tape2mm: Math.round(tape2mm * 10) / 10 };
  };

  const { tape1mm: tape1mmMeters, tape2mm: tape2mmMeters } = calculateTotalMeters();

  // Financial Calculations
  const cuttingFee = sheetCount * MOCK_FACTORY_RATES.sheetCuttingFee;
  const boardSupplyFee =
    supplyMode === "cut2edge_supplies"
      ? sheetCount * (boardPrices[boardMaterial]?.price || 0)
      : 0;
  const tape1mmFee = tape1mmMeters * MOCK_FACTORY_RATES.edgeBandingPerMeter["1.0mm"];
  const tape2mmFee = tape2mmMeters * MOCK_FACTORY_RATES.edgeBandingPerMeter["2.0mm"];
  const grandTotal = cuttingFee + boardSupplyFee + tape1mmFee + tape2mmFee;
  const requiredDeposit = Math.round(grandTotal * 0.7);
  const balanceDue = grandTotal - requiredDeposit;

  const handleSimulateOcr = (type: "handwritten" | "maxcut") => {
    setUploadSource(type);
    setIsProcessingOcr(true);
    setTimeout(() => {
      setIsProcessingOcr(false);
      setCurrentStep(2);
    }, 1200);
  };

  const handleApproveAndRegister = () => {
    setIsApproved(true);
    const text = encodeURIComponent(
      `Hello Cut2Edge Matori! I just approved my digitized cutlist proforma:\n\n` +
      `*Job Code:* C2E-2026-891\n` +
      `*Client:* ${clientName}\n` +
      `*Phone:* ${clientPhone}\n` +
      `*Sheets:* ${sheetCount} boards (${supplyMode === "cut2edge_supplies" ? boardPrices[boardMaterial].name : "Client Supplying Boards"})\n` +
      `*Edge Banding:* ${tape1mmMeters}m (1mm) + ${tape2mmMeters}m (2mm)\n` +
      `*Estimated Total:* ${formatNaira(grandTotal)}\n` +
      `*70% Deposit:* ${formatNaira(requiredDeposit)}\n\n` +
      `Please queue into Sliding Saw #1 workstation!`
    );
    window.open(`https://wa.me/2348034459182?text=${text}`, "_blank");
  };

  return (
    <div id="cutlist-estimator" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-semibold">
          <Calculator className="w-3.5 h-3.5" />
          <span>Multimodal Cutlist & Ingestion Engine</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
          4-Step Cutlist Digitizer & Cost Estimator
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Upload a photo of your handwritten cutlist or MaxCut PDF/CSV. Our AI agent extracts panel specs, optimizes 2D sheet nesting, and presents a verified proforma before factory dispatch.
        </p>
      </div>

      {/* 4-Step Wizard Progress Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { step: 1, title: "1. Upload & Capture", desc: "Photo / MaxCut / Manual" },
          { step: 2, title: "2. AI OCR Detection", desc: "Multimodal Bounding Boxes" },
          { step: 3, title: "3. Table Verification", desc: "Review & Adjust Cells" },
          { step: 4, title: "4. Nesting & Approval", desc: "Live Yield & 70% Deposit" },
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(s.step)}
            className={`p-3 rounded-2xl border text-left transition-all ${
              currentStep === s.step
                ? "bg-emerald-950/70 border-emerald-500 text-white shadow-lg shadow-emerald-950"
                : currentStep > s.step
                ? "bg-slate-900 border-slate-700 text-slate-300"
                : "bg-slate-950/60 border-slate-800 text-slate-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono">{s.title}</span>
              {currentStep > s.step && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">{s.desc}</div>
          </button>
        ))}
      </div>

      {/* STEP 1: UPLOAD & CAPTURE */}
      {currentStep === 1 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xl font-bold text-white">Upload Your Cutlist (Any Format)</h3>
            <p className="text-xs text-slate-400">
              Snap a picture of your handwritten carpenter notepad, or drop a MaxCut / Cutting Optimization Pro PDF/CSV export.
            </p>
          </div>

          <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/80 rounded-3xl p-8 text-center bg-slate-950/60 space-y-4 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-white">Drag & drop your cutlist file here, or browse</div>
              <div className="text-xs text-slate-400">Supports JPG, PNG (Handwritten Notes), PDF (MaxCut), CSV, Excel</div>
            </div>

            {/* Quick Simulation Load Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleSimulateOcr("handwritten")}
                disabled={isProcessingOcr}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center space-x-2 transition-all"
              >
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>{isProcessingOcr && uploadSource === "handwritten" ? "Processing OCR..." : "Load Sample Lagos Handwritten Cutlist"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulateOcr("maxcut")}
                disabled={isProcessingOcr}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center space-x-2 transition-all"
              >
                <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                <span>{isProcessingOcr && uploadSource === "maxcut" ? "Parsing MaxCut..." : "Load MaxCut Software PDF Export"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: AI OCR DETECTION PREVIEW */}
      {currentStep === 2 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">AI Multimodal Perception</span>
              <h3 className="text-xl font-bold text-white">Handwritten OCR & Dimension Extraction</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-800">
              Confidence Score: 99.2%
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Simulated Raw Document */}
            <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Original Ingested Source</span>
                <span className="text-emerald-400 font-mono">Notepad_Photo_0714.jpg</span>
              </div>
              <div className="bg-[#121824] p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2 relative overflow-hidden">
                <div className="text-[11px] text-amber-400 font-bold border-b border-slate-800 pb-1">
                  Master Tunde - VI Kitchen Job (14 Sheets HDF)
                </div>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  <div className="p-1 rounded bg-emerald-950/40 border border-emerald-500/40">
                    1. Base side: 870 x 580mm (8 pcs) — 1mm top & front
                  </div>
                  <div className="p-1 rounded bg-emerald-950/40 border border-emerald-500/40">
                    2. Base shelf: 564 x 550mm (12 pcs) — 1mm front only
                  </div>
                  <div className="p-1 rounded bg-emerald-950/40 border border-emerald-500/40">
                    3. Tall pantry shaker: 2150 x 595mm (4 pcs) — 2mm all 4 sides
                  </div>
                  <div className="p-1 rounded bg-emerald-950/40 border border-emerald-500/40">
                    4. Drawer fronts: 895 x 295mm (6 pcs) — 2mm all 4 sides
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 pt-2">Note: Grain strictly along height. High Gloss Pure White.</div>
              </div>
            </div>

            {/* Right: Detected Entities */}
            <div className="lg:col-span-6 bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-4">
              <h4 className="text-xs font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Extracted Dimensional Entities</span>
              </h4>

              <div className="space-y-2">
                {panels.map((p, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-white">{p.label}</div>
                      <div className="text-cyan-400 font-mono text-[11px]">{p.length}mm x {p.width}mm x {p.thickness}mm</div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold font-mono text-emerald-400">{p.quantity} pcs</span>
                      <div className="text-[10px] text-slate-400 font-mono">{p.edgeTop} / {p.edgeLeft} tape</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center space-x-1.5"
                >
                  <span>Proceed to Verification Table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: INTERACTIVE TABLE VERIFICATION & CELL EDITING */}
      {currentStep === 3 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Step 3 • Human-in-the-Loop Review</span>
              <h3 className="text-xl font-bold text-white">Review & Adjust Extracted Cutlist Table</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Verify panel dimensions, quantities, and edge tape specifications before sending to the factory nesting engine.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700"
              >
                Back to OCR
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center space-x-1.5"
              >
                <span>Calculate 2D Nesting & Proforma</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Editable Table */}
          <div className="border border-slate-800 rounded-2xl overflow-x-auto bg-slate-950">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Panel Description</th>
                  <th className="py-3 px-3">Length (mm)</th>
                  <th className="py-3 px-3">Width (mm)</th>
                  <th className="py-3 px-3">Thk</th>
                  <th className="py-3 px-3">Qty</th>
                  <th className="py-3 px-3">Top Edge</th>
                  <th className="py-3 px-3">Left Edge</th>
                  <th className="py-3 px-3">Grain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {panels.map((p, idx) => (
                  <tr key={p.id} className="hover:bg-slate-900/50">
                    <td className="py-3 px-4 font-bold text-white">
                      <input
                        type="text"
                        value={p.label}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPanels((prev) => prev.map((item, i) => (i === idx ? { ...item, label: val } : item)));
                        }}
                        className="bg-transparent border-b border-slate-700 focus:border-emerald-500 focus:outline-none text-white text-xs w-full"
                      />
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <input
                        type="number"
                        value={p.length}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setPanels((prev) => prev.map((item, i) => (i === idx ? { ...item, length: val } : item)));
                        }}
                        className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-cyan-400 font-mono text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <input
                        type="number"
                        value={p.width}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setPanels((prev) => prev.map((item, i) => (i === idx ? { ...item, width: val } : item)));
                        }}
                        className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-cyan-400 font-mono text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400">18mm</td>
                    <td className="py-3 px-3 font-mono">
                      <input
                        type="number"
                        value={p.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          setPanels((prev) => prev.map((item, i) => (i === idx ? { ...item, quantity: val } : item)));
                        }}
                        className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold font-mono text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={p.edgeTop}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setPanels((prev) => prev.map((item, i) => (i === idx ? { ...item, edgeTop: val } : item)));
                        }}
                        className="bg-slate-900 border border-slate-700 text-emerald-400 rounded px-2 py-1 text-xs focus:outline-none"
                      >
                        <option value="none">None</option>
                        <option value="0.8mm">0.8mm PVC</option>
                        <option value="1.0mm">1.0mm PVC</option>
                        <option value="2.0mm">2.0mm ABS</option>
                      </select>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={p.edgeLeft}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setPanels((prev) => prev.map((item, i) => (i === idx ? { ...item, edgeLeft: val } : item)));
                        }}
                        className="bg-slate-900 border border-slate-700 text-emerald-400 rounded px-2 py-1 text-xs focus:outline-none"
                      >
                        <option value="none">None</option>
                        <option value="0.8mm">0.8mm PVC</option>
                        <option value="1.0mm">1.0mm PVC</option>
                        <option value="2.0mm">2.0mm ABS</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">Length &rarr;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STEP 4: LIVE NESTING YIELD & FACTORY QUEUE APPROVAL */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Nesting Pattern */}
            <div className="lg:col-span-7">
              <NestingVisualizer
                activeSheetIndex={1}
                totalSheets={sheetCount}
                efficiencyPct={92.4}
              />
            </div>

            {/* Right: Official Proforma & Approval */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex justify-between items-start pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Factory Proforma</span>
                  <h4 className="text-lg font-bold text-white">Cut2Edge Official Job Estimate</h4>
                </div>
                <div className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                  C2E-2026-891
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Beam Saw Precision Cuts ({sheetCount} sheets @ ₦3,500):</span>
                  <span className="font-mono font-bold text-white">{formatNaira(cuttingFee)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>1.0mm PVC Edge Banding ({tape1mmMeters} lm @ ₦480):</span>
                  <span className="font-mono font-bold text-white">{formatNaira(tape1mmFee)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>2.0mm ABS Door Edge Banding ({tape2mmMeters} lm @ ₦750):</span>
                  <span className="font-mono font-bold text-white">{formatNaira(tape2mmFee)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-semibold text-slate-400">Total Factory Charge:</span>
                  <span className="text-2xl font-black text-white font-mono">{formatNaira(grandTotal)}</span>
                </div>

                <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-4 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-emerald-300">
                    <span>70% Mobilization Deposit:</span>
                    <span className="font-mono text-base">{formatNaira(requiredDeposit)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>30% Balance Due on Gatepass:</span>
                    <span className="font-mono">{formatNaira(balanceDue)}</span>
                  </div>
                </div>
              </div>

              {isApproved ? (
                <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500 text-center space-y-1.5">
                  <div className="text-xs font-bold text-emerald-300">JOB QUEUED AT MATORI FACTORY</div>
                  <div className="text-[11px] text-slate-300">
                    WhatsApp booking dispatched. Operator Ibrahim Musa notified on Sliding Saw #1.
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleApproveAndRegister}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Approve & Register into Factory Floor Queue</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
