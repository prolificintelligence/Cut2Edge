"use client";

import React from "react";
import { Users, AlertTriangle, TrendingUp, BadgeCheck, PhoneCall } from "lucide-react";
import { formatNaira } from "@/lib/utils";

const clients = [
  { name: "Alh. Mukhtar Musa Enterprises", segment: "Wholesale Door Merchant", revenue: 8_400_000, outstanding: 0, orders: 47, risk: "low", tier: "Diamond", contact: "0803-421-7892" },
  { name: "Studio Axis Architecture (Lagos)", segment: "Turnkey Architect", revenue: 6_200_000, outstanding: 1_200_000, orders: 12, risk: "medium", tier: "Gold", contact: "0817-332-9010" },
  { name: "Master Tunde Woodworks", segment: "Cabinetry Artisan", revenue: 4_800_000, outstanding: 0, orders: 83, risk: "low", tier: "Gold", contact: "0802-667-4531" },
  { name: "Pelican Interiors Ltd", segment: "Turnkey Architect", revenue: 3_700_000, outstanding: 2_100_000, orders: 8, risk: "high", tier: "Silver", contact: "0706-889-0042" },
  { name: "BestBoard Merchants (Ikeja)", segment: "Wholesale Door Merchant", revenue: 3_200_000, outstanding: 0, orders: 29, risk: "low", tier: "Silver", contact: "0811-543-2200" },
  { name: "Ola Carpentry Works (Oshodi)", segment: "Cabinetry Artisan", revenue: 2_900_000, outstanding: 450_000, orders: 61, risk: "medium", tier: "Silver", contact: "0705-221-8871" },
];

const riskColor = { low: "text-emerald-400 bg-emerald-950 border-emerald-800", medium: "text-amber-400 bg-amber-950 border-amber-800", high: "text-rose-400 bg-rose-950 border-rose-800" };
const tierColor = { Diamond: "text-cyan-300 bg-cyan-950 border-cyan-800", Gold: "text-amber-300 bg-amber-950 border-amber-800", Silver: "text-slate-300 bg-slate-800 border-slate-700" };

export const CRMClientIntelligence: React.FC = () => {
  const totalOutstanding = clients.reduce((s, c) => s + c.outstanding, 0);
  const highRiskCount = clients.filter(c => c.risk === "high").length;

  return (
    <div className="space-y-6">
      {/* Summary Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400">Top 6 Client Revenue (Aug)</div>
          <div className="text-2xl font-black font-mono text-white mt-1">{formatNaira(clients.reduce((s,c)=>s+c.revenue,0))}</div>
        </div>
        <div className="bg-rose-950 border border-rose-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400 flex items-center space-x-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Total Outstanding Debt</span>
          </div>
          <div className="text-2xl font-black font-mono text-rose-300 mt-1">{formatNaira(totalOutstanding)}</div>
          <div className="text-[11px] text-rose-400 mt-0.5">{highRiskCount} high-risk client(s) flagged</div>
        </div>
        <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-5">
          <div className="text-xs text-slate-400">Active Client Referral Network</div>
          <div className="text-2xl font-black font-mono text-emerald-300 mt-1">38 Referred</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">via artisan WhatsApp chain</div>
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center space-x-2">
          <Users className="w-4 h-4 text-cyan-400" />
          <span>Top Revenue Clients — Ranked by Monthly Contribution</span>
        </h4>
        <div className="space-y-3">
          {clients.map((client, i) => (
            <div key={client.name} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500">#{i + 1}</span>
                    <span className="text-sm font-bold text-white">{client.name}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono font-bold ${tierColor[client.tier as keyof typeof tierColor]}`}>{client.tier}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{client.segment} • {client.orders} orders YTD</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold font-mono text-emerald-400">{formatNaira(client.revenue)}</div>
                  {client.outstanding > 0 && (
                    <div className="text-[11px] font-mono text-rose-400">Outstanding: {formatNaira(client.outstanding)}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-bold ${riskColor[client.risk as keyof typeof riskColor]}`}>
                  {client.risk === "high" ? "⚠ High Churn Risk" : client.risk === "medium" ? "Medium Risk" : "✓ Low Risk"}
                </span>
                <span className="text-[10px] text-slate-500 font-mono flex items-center space-x-1">
                  <PhoneCall className="w-3 h-3" />
                  <span>{client.contact}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
