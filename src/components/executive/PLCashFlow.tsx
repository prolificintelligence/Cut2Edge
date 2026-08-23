"use client";

import React from "react";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, BarChart3, CreditCard } from "lucide-react";
import { formatNaira } from "@/lib/utils";

const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const revenueData = [28.4, 31.2, 29.8, 34.5, 36.1, 38.3];
const cogsData = [16.1, 17.8, 17.0, 19.5, 20.3, 21.4];
const netData = revenueData.map((r, i) => +(r - cogsData[i]).toFixed(1));

const expenseRows = [
  { label: "Raw Board Materials (CARB E1 & MDF)", amount: 12_800_000, pct: 33.4 },
  { label: "PVC/ABS Edge Tape & Glue", amount: 2_400_000, pct: 6.3 },
  { label: "Factory Operator Wages (12 staff)", amount: 4_200_000, pct: 11.0 },
  { label: "Diesel & 150kVA Gen Maintenance", amount: 1_800_000, pct: 4.7 },
  { label: "Machine Depreciation & Blade Replacement", amount: 920_000, pct: 2.4 },
  { label: "Logistics & Delivery (Abuja, PH routes)", amount: 680_000, pct: 1.8 },
];

export const PLCashFlow: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Aug Revenue", value: "₦38.3M", sub: "+6.1% vs Jul", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-950 border-emerald-800" },
          { label: "Cost of Goods", value: "₦21.4M", sub: "55.9% COGS ratio", icon: TrendingDown, color: "text-rose-400", bg: "bg-rose-950 border-rose-800" },
          { label: "Net Operating Margin", value: "₦16.9M", sub: "44.1% margin", icon: BarChart3, color: "text-cyan-400", bg: "bg-cyan-950 border-cyan-800" },
          { label: "Paystack Cash Position", value: "₦9.2M", sub: "Settled & cleared", icon: CreditCard, color: "text-amber-400", bg: "bg-amber-950 border-amber-800" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className={`rounded-2xl p-5 border ${k.bg} space-y-1`}>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>{k.label}</span>
                <Icon className={`w-4 h-4 ${k.color}`} />
              </div>
              <div className={`text-2xl font-black font-mono ${k.color}`}>{k.value}</div>
              <div className="text-[11px] text-slate-400">{k.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Revenue vs COGS 6-Month Sparkline Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
        <h4 className="text-sm font-bold text-white flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span>6-Month Revenue vs. COGS vs. Net Profit (₦M)</span>
        </h4>

        <div className="grid grid-cols-6 gap-2">
          {months.map((month, i) => {
            const maxH = 120;
            const maxVal = 40;
            return (
              <div key={month} className="flex flex-col items-center space-y-1">
                <div className="text-[10px] text-emerald-400 font-mono font-bold">+{netData[i]}M</div>
                <div className="w-full flex items-end space-x-0.5" style={{ height: maxH }}>
                  <div
                    className="flex-1 bg-emerald-600/80 rounded-t-md"
                    style={{ height: `${(revenueData[i] / maxVal) * maxH}px` }}
                    title={`Revenue: ₦${revenueData[i]}M`}
                  />
                  <div
                    className="flex-1 bg-rose-700/80 rounded-t-md"
                    style={{ height: `${(cogsData[i] / maxVal) * maxH}px` }}
                    title={`COGS: ₦${cogsData[i]}M`}
                  />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">{month}</div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center space-x-4 text-[11px] text-slate-400">
          <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-emerald-600 inline-block" /> Revenue</span>
          <span className="flex items-center space-x-1"><span className="w-3 h-3 rounded bg-rose-700 inline-block" /> COGS</span>
        </div>
      </div>

      {/* Operating Expense Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <h4 className="text-sm font-bold text-white">Aug Operating Expense Breakdown</h4>
        <div className="space-y-3">
          {expenseRows.map((row) => (
            <div key={row.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">{row.label}</span>
                <span className="text-white font-mono font-bold">{formatNaira(row.amount)} <span className="text-slate-500">({row.pct}%)</span></span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(row.pct / 35) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
