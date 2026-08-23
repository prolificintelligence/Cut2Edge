"use client";

import React from "react";
import { Package, AlertTriangle, Truck, BarChart3 } from "lucide-react";
import { formatNaira } from "@/lib/utils";

const inventory = [
  { item: "CARB E1 18mm Melamine Board (2440×1220)", unit: "Sheets", stock: 84, reorderAt: 30, reorderQty: 120, supplier: "WoodPlus Ikeja", leadDays: 2, cost: 28_500, status: "ok" },
  { item: "CARB E1 16mm White Plain Board", unit: "Sheets", stock: 32, reorderAt: 40, reorderQty: 80, supplier: "WoodPlus Ikeja", leadDays: 2, cost: 26_000, status: "low" },
  { item: "MDF 9mm (Door Blanks)", unit: "Sheets", stock: 61, reorderAt: 20, reorderQty: 60, supplier: "Lagos MDF Depot", leadDays: 3, cost: 18_500, status: "ok" },
  { item: "1mm PVC Edge Tape (White/Wengé/Walnut)", unit: "Rolls (50m)", stock: 18, reorderAt: 10, reorderQty: 40, supplier: "TapeKing Apapa", leadDays: 1, cost: 4_200, status: "ok" },
  { item: "2mm ABS Edge Tape (Premium Walnut)", unit: "Rolls (50m)", stock: 6, reorderAt: 8, reorderQty: 20, supplier: "TapeKing Apapa", leadDays: 1, cost: 7_800, status: "critical" },
  { item: "PUR Hot-Melt Adhesive (Jowat 280.35)", unit: "Cartridges (500g)", stock: 22, reorderAt: 10, reorderQty: 30, supplier: "Jowat Distributor Lagos", leadDays: 5, cost: 14_500, status: "ok" },
  { item: "Si400 Beam Saw Blades (Ø350mm TCT)", unit: "Blades", stock: 3, reorderAt: 2, reorderQty: 6, supplier: "SCMI Nigeria Partner", leadDays: 7, cost: 48_000, status: "low" },
];

const statusConfig = {
  ok: { label: "In Stock", color: "text-emerald-400 bg-emerald-950 border-emerald-800" },
  low: { label: "⚠ Running Low", color: "text-amber-400 bg-amber-950 border-amber-800" },
  critical: { label: "🔴 Critical — Reorder Now", color: "text-rose-400 bg-rose-950 border-rose-800" },
};

export const MaterialInventory: React.FC = () => {
  const criticalCount = inventory.filter(i => i.status === "critical").length;
  const lowCount = inventory.filter(i => i.status === "low").length;
  const totalStockValue = inventory.reduce((s, i) => s + i.stock * i.cost, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400">Total Stock Value</div>
          <div className="text-xl font-black text-white font-mono mt-1">{formatNaira(totalStockValue)}</div>
        </div>
        <div className={`rounded-2xl p-5 border ${criticalCount > 0 ? "bg-rose-950 border-rose-800" : "bg-slate-900 border-slate-800"}`}>
          <div className="text-xs text-slate-400 flex items-center space-x-1.5"><AlertTriangle className="w-3.5 h-3.5 text-rose-400" /><span>Critical Reorders</span></div>
          <div className="text-3xl font-black text-rose-300 font-mono mt-1">{criticalCount}</div>
        </div>
        <div className={`rounded-2xl p-5 border ${lowCount > 0 ? "bg-amber-950 border-amber-800" : "bg-slate-900 border-slate-800"}`}>
          <div className="text-xs text-slate-400">Low Stock Alerts</div>
          <div className="text-3xl font-black text-amber-300 font-mono mt-1">{lowCount}</div>
        </div>
        <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400">Avg Board Wastage (AI Nesting)</div>
          <div className="text-xl font-black text-emerald-300 font-mono mt-1">12.2%</div>
          <div className="text-[11px] text-slate-400">vs 30.4% industry avg</div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center space-x-2">
          <Package className="w-4 h-4 text-emerald-400" />
          <span>Live Inventory Control — Matori Warehouse</span>
        </h4>
        <div className="space-y-3">
          {inventory.map((item) => {
            const sc = statusConfig[item.status as keyof typeof statusConfig];
            const stockPct = Math.min(100, Math.round((item.stock / (item.reorderAt * 3)) * 100));
            return (
              <div key={item.item} className={`p-4 rounded-2xl border ${item.status === "critical" ? "bg-rose-950/20 border-rose-800/40" : item.status === "low" ? "bg-amber-950/20 border-amber-800/40" : "bg-slate-950 border-slate-800"}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="text-xs font-bold text-white">{item.item}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Supplier: {item.supplier} • Lead time: {item.leadDays} days • ₦{item.cost.toLocaleString()}/{item.unit.toLowerCase()}
                    </div>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono font-bold flex-shrink-0 ${sc.color}`}>{sc.label}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.status === "critical" ? "bg-rose-500" : item.status === "low" ? "bg-amber-500" : "bg-emerald-500"}`}
                      style={{ width: `${stockPct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-white font-bold flex-shrink-0">{item.stock} {item.unit}</span>
                  <span className="text-[10px] text-slate-500 flex-shrink-0">Reorder @ {item.reorderAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
