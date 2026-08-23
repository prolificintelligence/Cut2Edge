"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Scissors,
  Flame,
  Activity,
  Award,
  Users,
  Clock,
  Sparkles,
  PieChart,
  ShieldCheck,
} from "lucide-react";
import { MOCK_EXECUTIVE_METRICS } from "@/data/mockData";
import { UnitEconomics } from "./UnitEconomics";
import { MachineHealth } from "./MachineHealth";
import { formatNaira, formatMeters } from "@/lib/utils";

export const ExecutiveDashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "unit_economics" | "machines">("overview");

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Executive Board Command Center</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Cut2Edge Factory Operations & ROI Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Real-time business performance, daily revenue throughput, Lagos artisan retention, and machine fleet utilization at #7 Fatai Atere Way, Matori.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveSubTab("overview")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === "overview"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            Executive Overview
          </button>
          <button
            onClick={() => setActiveSubTab("unit_economics")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === "unit_economics"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            Unit Economics
          </button>
          <button
            onClick={() => setActiveSubTab("machines")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === "machines"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            Machine Telemetry
          </button>
        </div>
      </div>

      {activeSubTab === "overview" && (
        <div className="space-y-8">
          {/* 4 Core Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Daily Gross Inflow</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono mt-1">
                {formatNaira(MOCK_EXECUTIVE_METRICS.dailyRevenue)}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center space-x-1 font-mono">
                <span>Monthly: {formatNaira(MOCK_EXECUTIVE_METRICS.monthlyRevenue)}</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Daily Sizing & Edge Banding</span>
                <Scissors className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono mt-1">
                {MOCK_EXECUTIVE_METRICS.sheetsProcessedToday} <span className="text-xs text-slate-500 font-normal">Sheets</span>
              </div>
              <div className="text-[11px] text-cyan-400 mt-1 font-mono">
                {formatMeters(MOCK_EXECUTIVE_METRICS.linearMetersBandedToday)} Banded
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Door Membrane Pressings</span>
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono mt-1">
                {MOCK_EXECUTIVE_METRICS.doorsPressedToday} <span className="text-xs text-slate-500 font-normal">Doors Today</span>
              </div>
              <div className="text-[11px] text-orange-400 mt-1 font-mono">
                0% Delamination Rejects
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Turnaround Velocity</span>
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-purple-400 font-mono mt-1">
                {MOCK_EXECUTIVE_METRICS.averageTurnaroundHours} Hours
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Down from 24 hrs (Manual Era)
              </div>
            </div>
          </div>

          {/* Revenue Breakdown by Client Category & Strategic Advantages */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Category Distribution */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <PieChart className="w-4 h-4 text-emerald-400" />
                <span>Revenue Contribution by Client Segment</span>
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-white">Cabinetry Makers & Joiners (Cut & Banding)</span>
                    <span className="text-emerald-400 font-mono">42% (₦16.1M/mo)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "42%" }} />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">146 Active Lagos Artisans on WhatsApp</div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-white">Door Suppliers & Wholesale Merchants</span>
                    <span className="text-cyan-400 font-mono">35% (₦13.4M/mo)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: "35%" }} />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">High volume membrane & veneer hot pressing</div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-white">Direct Company Turnkey Fitouts (Architects)</span>
                    <span className="text-amber-400 font-mono">23% (₦8.8M/mo)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "23%" }} />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">High-margin luxury kitchen & door projects</div>
                </div>
              </div>
            </div>

            {/* Right: Key Competitive Defensibility */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Why Cut2Edge Dominates the Lagos Woodworking Market</span>
              </h4>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-white">1. Instant Frictionless WhatsApp Onboarding</div>
                  <p className="text-slate-400">
                    Artisans do not fill complex web forms; they send voice notes or paper cutlist photos, and receive an instant proforma with 70% deposit payment link within 30 seconds.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-white">2. +18.4% Sheet Yield via AI 2D Nesting</div>
                  <p className="text-slate-400">
                    Saves carpenters up to 2 full sheets per kitchen job, making Cut2Edge the undisputed lowest-waste processing factory in Lagos.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-white">3. Zero Lost Boards & Digital Gatepass</div>
                  <p className="text-slate-400">
                    Every cut panel receives a QR barcode sticker. Artisans cannot leave with missing pieces, eliminating factory floor disputes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "unit_economics" && <UnitEconomics />}
      {activeSubTab === "machines" && <MachineHealth />}
    </div>
  );
};
