"use client";

import React from "react";
import { TrendingUp, PieChart, DollarSign, Layers, Sparkles, Percent } from "lucide-react";
import { formatNaira } from "@/lib/utils";

export const UnitEconomics: React.FC = () => {
  const economics = [
    {
      title: "Panel Saw Sizing Economics (Per 8x4 Sheet)",
      revenue: 3500,
      costs: [
        { name: "Operator & Offloader Labor", amount: 900 },
        { name: "Diesel / 150kVA Power Allocation", amount: 650 },
        { name: "Scoring & Main Blade Wear Depreciation", amount: 350 },
      ],
      netMargin: 1600,
      marginPct: 45.7,
    },
    {
      title: "1.0mm PVC Edge Banding (Per Linear Meter)",
      revenue: 480,
      costs: [
        { name: "PVC Tape Roll Cost (Bulk Import)", amount: 145 },
        { name: "High-Temp PUR Hot Melt Glue", amount: 65 },
        { name: "Machine Electric & Buffing Wheel Wear", amount: 50 },
        { name: "Operator Labor", amount: 40 },
      ],
      netMargin: 180,
      marginPct: 37.5,
    },
    {
      title: "Door Vacuum Membrane Press (Per Door Cycle)",
      revenue: 9500,
      costs: [
        { name: "Imported 3D PVC Membrane Foil", amount: 3200 },
        { name: "Spray Adhesive & Activator", amount: 950 },
        { name: "Heating Chamber Power (138°C)", amount: 1100 },
        { name: "Press Technician Labor", amount: 750 },
      ],
      netMargin: 3500,
      marginPct: 36.8,
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Unit Profitability</span>
          <h3 className="text-xl font-bold text-white">Factory Unit Economics & Direct Margins</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent cost-absorption models factoring in Lagos diesel generator runtime, tooling wear, and imported consumables.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800">
          <Percent className="w-3.5 h-3.5" />
          <span>Blended Gross Margin: 41.2%</span>
        </div>
      </div>

      {/* 3 Unit Economics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {economics.map((item, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-200 mb-2">{item.title}</div>
              <div className="text-xl font-black text-white font-mono mb-3">
                {formatNaira(item.revenue)} <span className="text-xs text-slate-500 font-normal">Revenue</span>
              </div>

              <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                {item.costs.map((c, cIdx) => (
                  <div key={cIdx} className="flex justify-between">
                    <span className="text-[11px]">{c.name}</span>
                    <span className="font-mono text-slate-300">-{formatNaira(c.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-xs text-slate-400 font-medium">Net Factory Margin:</span>
              <div className="text-right">
                <span className="text-sm font-black text-emerald-400 font-mono">{formatNaira(item.netMargin)}</span>
                <span className="text-[10px] text-emerald-500 block font-mono">({item.marginPct}%)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Scrap Reduction Impact Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-950 to-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-emerald-300 flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4" />
            <span>AI Nesting Sheet Waste Optimization Impact</span>
          </div>
          <p className="text-xs text-slate-300">
            Automated 2D bin-packing cuts board offcut waste from <strong>28% down to 9.6%</strong> across all Lagos artisan orders, generating an estimated <strong>₦2,450,000 in monthly material recovery</strong>.
          </p>
        </div>

        <div className="text-right flex-shrink-0">
          <span className="text-2xl font-black text-emerald-400 font-mono">+18.4%</span>
          <span className="text-[10px] text-slate-400 block font-mono">Material Yield Gain</span>
        </div>
      </div>
    </div>
  );
};
