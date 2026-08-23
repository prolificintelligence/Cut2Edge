"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PublicHero } from "@/components/public/PublicHero";
import { CutlistEstimator } from "@/components/public/CutlistEstimator";
import { DoorMatrixCalculator } from "@/components/public/DoorMatrixCalculator";
import { TurnkeyEstimator } from "@/components/public/TurnkeyEstimator";
import { CapacityGauge } from "@/components/public/CapacityGauge";
import { TradePartnerOnboarding } from "@/components/public/TradePartnerOnboarding";
import { ClientPortal } from "@/components/portal/ClientPortal";
import { FloorKanban } from "@/components/factory/FloorKanban";
import { AgentSimulator } from "@/components/agents/AgentSimulator";
import { TurnkeyContractRoom } from "@/components/turnkey/TurnkeyContractRoom";
import { ExecutiveDashboard } from "@/components/executive/ExecutiveDashboard";
import { RoleType } from "@/types";
import { MapPin, Phone, Mail, Sparkles, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const [activeRole, setActiveRole] = useState<RoleType>("public");

  const handleScrollToCutlistEstimator = () => {
    setActiveRole("public");
    const el = document.getElementById("cutlist-estimator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToTurnkeyEstimator = () => {
    setActiveRole("public");
    const el = document.getElementById("turnkey-estimator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenSimulator = () => {
    setActiveRole("agents");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation & Role Switcher */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenSimulator={handleOpenSimulator}
      />

      {/* Main Full-Width Immersive Workspace Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 1. PUBLIC MARKETING & ESTIMATORS */}
        {activeRole === "public" && (
          <div className="space-y-8">
            <PublicHero
              onScrollToEstimator={handleScrollToCutlistEstimator}
              onScrollToTurnkey={handleScrollToTurnkeyEstimator}
              onOpenSimulator={handleOpenSimulator}
            />
            <CapacityGauge />
            <CutlistEstimator />
            <DoorMatrixCalculator />
            <TurnkeyEstimator />
            <TradePartnerOnboarding />
          </div>
        )}

        {/* 2. DEDICATED CLIENT PORTAL */}
        {activeRole === "client_portal" && <ClientPortal />}

        {/* 3. FACTORY FLOOR KIOSKS & HISTORY */}
        {activeRole === "kiosks" && <FloorKanban />}

        {/* 4. AGENTIC AI & MULTIMODAL LAB */}
        {activeRole === "agents" && (
          <AgentSimulator onSwitchToKiosk={() => setActiveRole("kiosks")} />
        )}

        {/* 5. TURNKEY CONTRACT & BOQ ROOM */}
        {activeRole === "turnkey" && <TurnkeyContractRoom />}

        {/* 6. EXECUTIVE ROI COMMAND CENTER */}
        {activeRole === "executive" && <ExecutiveDashboard />}
      </main>

      {/* Industrial Footer */}
      <footer className="bg-[#050811] border-t border-slate-800/80 pt-10 pb-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-slate-950 text-xs">
                C2E
              </div>
              <span className="text-base font-extrabold text-white tracking-wide">
                CUT<span className="text-emerald-400">2</span>EDGE
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Industrial woodworking, beam saw sizing, automatic edge banding, and membrane hot-press doors in Lagos, Nigeria.
            </p>
            <div className="text-[11px] text-emerald-400 font-mono">
              Vercel • Neon DB • Inngest • Mem0
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Factory Hub</h4>
            <div className="text-slate-400 space-y-1.5">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>#7 Fatai Atere Way, Matori Industrial, Lagos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>+234 803 445 9182</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>production@cut2edge.ng</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Client Channels</h4>
            <ul className="text-slate-400 space-y-1">
              <li>• Category A: Cabinetry Makers (Cut-to-Size)</li>
              <li>• Category B: Door Suppliers (Membrane Press)</li>
              <li>• Category C: Turnkey Contracts (3D & BoQ)</li>
              <li>• B2B Trade Partner Portal</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Matori Factory Specs</h4>
            <div className="text-slate-400 space-y-1">
              <div>Operating: <strong>07:30 AM – 06:30 PM</strong></div>
              <div>Turnaround: <strong>3.8 Hours Average</strong></div>
              <div>Quality: <strong>±0.2mm Precision Verified</strong></div>
              <div className="text-emerald-400 pt-1 font-mono">150kVA Power Sync Active</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>© 2026 Cut2Edge Manufacturing Co. All Rights Reserved.</div>
          <div className="flex items-center space-x-4 font-mono">
            <span>Matori Platform v2.9</span>
            <span>•</span>
            <span>Audit-Proof Canonical System</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
