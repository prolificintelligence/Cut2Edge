"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  Download,
  Printer,
  Sparkles,
  Layers,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";

export const BoQGenerator: React.FC = () => {
  const [markupPct, setMarkupPct] = useState<number>(25);

  const boqItems = [
    {
      category: "1. Board Materials & Carcase",
      items: [
        { desc: "18mm Marine Moisture-Resistant HDF (Carcase)", qty: "18 sheets", unitPrice: 38500, total: 693000 },
        { desc: "18mm Super Matte Cashmere MDF (Shutters/Doors)", qty: "12 sheets", unitPrice: 46000, total: 552000 },
        { desc: "9mm HDF Moisture-Resistant Backing Panels", qty: "8 sheets", unitPrice: 22000, total: 176000 },
      ],
    },
    {
      category: "2. Edge Banding & Consumables",
      items: [
        { desc: "2.0mm Heavy Duty Laser-Fused ABS Tape (Cashmere)", qty: "320 lm", unitPrice: 750, total: 240000 },
        { desc: "1.0mm Carcase Interior PVC Tape (White)", qty: "480 lm", unitPrice: 480, total: 230400 },
        { desc: "High-Strength PUR Water-Resistant Hot Melt Glue", qty: "4 bags", unitPrice: 45000, total: 180000 },
      ],
    },
    {
      category: "3. Premium Architectural Hardware (Blum / Hafele)",
      items: [
        { desc: "Blum Clip-Top 110° Soft-Close Concealed Hinges", qty: "48 pcs", unitPrice: 4800, total: 230400 },
        { desc: "Blum Legrabox Soft-Close Drawer Runners (500mm)", qty: "12 sets", unitPrice: 38000, total: 456000 },
        { desc: "J-Pull Aluminium Integrated Gola Profile Handles", qty: "24 lm", unitPrice: 8500, total: 204000 },
        { desc: "Concealed 12V Warm LED Profile Strips + Sensor", qty: "18 lm", unitPrice: 6500, total: 117000 },
      ],
    },
    {
      category: "4. Factory Floor Machining & Sizing",
      items: [
        { desc: "Beam Saw CNC Cutting & Sizing Fee", qty: "38 sheets", unitPrice: 3500, total: 133000 },
        { desc: "Nanxing Dual-Motor Auto Edge Banding Fee", qty: "800 lm", unitPrice: 300, total: 240000 },
        { desc: "CNC Hinge Cup Boring & Handle Grooving", qty: "48 points", unitPrice: 500, total: 24000 },
      ],
    },
    {
      category: "5. Logistics, Site Survey & Installation",
      items: [
        { desc: "Laser 3D Site Survey & CAD Engineering Drafting", qty: "1 lot", unitPrice: 150000, total: 150000 },
        { desc: "Factory to Banana Island Heavy Truck Logistics", qty: "1 trip", unitPrice: 120000, total: 120000 },
        { desc: "Master Carpentry Fitout, Levelling & Snagging", qty: "1 lot", unitPrice: 650000, total: 650000 },
      ],
    },
  ];

  const totalDirectCost = boqItems.reduce(
    (acc, cat) => acc + cat.items.reduce((cAcc, item) => cAcc + item.total, 0),
    0
  );

  const overheadAndMargin = Math.round((totalDirectCost * markupPct) / 100);
  const contractGrandTotal = totalDirectCost + overheadAndMargin;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Direct Contract Engine</span>
          <h3 className="text-xl font-bold text-white">Itemized Bill of Quantities (BoQ)</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Auto-calculated material schedules, hardware mortising, logistics, and contractor margin controls.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Margin:</span>
            <select
              value={markupPct}
              onChange={(e) => setMarkupPct(parseInt(e.target.value) || 20)}
              className="bg-slate-900 text-emerald-400 font-bold text-xs rounded px-2 py-0.5 border border-slate-700 focus:outline-none"
            >
              <option value={15}>15% Markup</option>
              <option value={20}>20% Standard</option>
              <option value={25}>25% Premium</option>
              <option value={30}>30% Luxury</option>
            </select>
          </div>

          <button
            onClick={() => alert("Downloading BoQ Excel/PDF...")}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export BoQ (Excel)</span>
          </button>
        </div>
      </div>

      {/* BoQ Tables */}
      <div className="space-y-6">
        {boqItems.map((category, cIdx) => (
          <div key={cIdx} className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
            <div className="bg-slate-900/90 px-4 py-2.5 text-xs font-bold text-slate-200 border-b border-slate-800 flex justify-between">
              <span>{category.category}</span>
              <span className="font-mono text-emerald-400">
                {formatNaira(category.items.reduce((a, b) => a + b.total, 0))}
              </span>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-500 text-[10px] uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2 px-4">Item Description</th>
                  <th className="py-2 px-3">Quantity</th>
                  <th className="py-2 px-3">Unit Rate</th>
                  <th className="py-2 px-4 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                {category.items.map((item, iIdx) => (
                  <tr key={iIdx} className="hover:bg-slate-900/40">
                    <td className="py-2.5 px-4 font-medium text-white">{item.desc}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">{item.qty}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">{formatNaira(item.unitPrice)}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-semibold text-emerald-400">
                      {formatNaira(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Financial Summary */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/30 space-y-3">
        <div className="flex justify-between text-xs text-slate-300">
          <span>Total Direct Production & Site Fitout Cost:</span>
          <span className="font-mono font-semibold text-white">{formatNaira(totalDirectCost)}</span>
        </div>
        <div className="flex justify-between text-xs text-emerald-400">
          <span>Contractor Margin & Project Management ({markupPct}%):</span>
          <span className="font-mono font-semibold">{formatNaira(overheadAndMargin)}</span>
        </div>
        <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline font-bold">
          <span className="text-sm text-white">Final Contract Value (Turnkey BoQ):</span>
          <span className="text-2xl font-black text-emerald-400 font-mono">
            {formatNaira(contractGrandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
};
