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
  ChevronRight,
  BarChart3,
  FolderKanban,
  FileText,
  MessageSquare,
  Package,
  Cpu,
  LayoutDashboard,
  Building2,
} from "lucide-react";
import { MOCK_EXECUTIVE_METRICS } from "@/data/mockData";
import { UnitEconomics } from "./UnitEconomics";
import { MachineHealth } from "./MachineHealth";
import { PLCashFlow } from "./PLCashFlow";
import { CRMClientIntelligence } from "./CRMClientIntelligence";
import { ProjectManagement } from "./ProjectManagement";
import { ReportsKPIArchive } from "./ReportsKPIArchive";
import { BoardChatDecisionLog } from "./BoardChatDecisionLog";
import { StaffPayroll } from "./StaffPayroll";
import { MaterialInventory } from "./MaterialInventory";
import { formatNaira, formatMeters } from "@/lib/utils";

type ExecTab =
  | "overview"
  | "unit_economics"
  | "machines"
  | "pl_cashflow"
  | "crm_clients"
  | "project_management"
  | "reports_kpi"
  | "board_chat"
  | "staff_payroll"
  | "material_inventory";

const NAV_ITEMS: {
  id: ExecTab;
  label: string;
  desc: string;
  icon: React.FC<{ className?: string }>;
  badge: string;
  badgeColor: string;
  section: string;
}[] = [
  // --- Business Performance ---
  {
    id: "overview",
    label: "Executive Overview",
    desc: "Revenue throughput, yields & KPI scorecard",
    icon: LayoutDashboard,
    badge: "Live",
    badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
    section: "Performance",
  },
  {
    id: "unit_economics",
    label: "Unit Economics",
    desc: "Sheet cost, margin per cut, banding economics",
    icon: BarChart3,
    badge: "Updated",
    badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
    section: "Performance",
  },
  {
    id: "pl_cashflow",
    label: "P&L & Cash Flow Ledger",
    desc: "Revenue vs COGS, net margin & Paystack position",
    icon: DollarSign,
    badge: "₦16.9M Net",
    badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
    section: "Accounting",
  },
  // --- Operations ---
  {
    id: "machines",
    label: "Machine Telemetry",
    desc: "Fleet health, blade wear & uptime data",
    icon: Cpu,
    badge: "4 Online",
    badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
    section: "Operations",
  },
  {
    id: "material_inventory",
    label: "Material & Inventory Control",
    desc: "Board/tape stock, reorder alerts & wastage",
    icon: Package,
    badge: "1 Critical",
    badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
    section: "Operations",
  },
  {
    id: "staff_payroll",
    label: "Staff & Payroll Overview",
    desc: "Operator roster, overtime flags & payroll accrual",
    icon: Users,
    badge: "2 OT Flags",
    badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
    section: "Operations",
  },
  // --- Customer & Projects ---
  {
    id: "crm_clients",
    label: "CRM & Client Intelligence",
    desc: "Top clients ranked, churn risk & outstanding debt",
    icon: Award,
    badge: "1 High Risk",
    badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
    section: "Customer Relations",
  },
  {
    id: "project_management",
    label: "Project Management Board",
    desc: "Turnkey fitout milestones & overdue sign-offs",
    icon: FolderKanban,
    badge: "1 Overdue",
    badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
    section: "Customer Relations",
  },
  // --- Governance ---
  {
    id: "reports_kpi",
    label: "Reports & KPI Archive",
    desc: "Board-ready PDF snapshots & trend history",
    icon: FileText,
    badge: "Latest: W4 Aug",
    badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
    section: "Governance",
  },
  {
    id: "board_chat",
    label: "Board Chat & Decision Log",
    desc: "Cryptographically pinned director decisions",
    icon: MessageSquare,
    badge: "SHA-256",
    badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
    section: "Governance",
  },
];

const SECTIONS = ["Performance", "Accounting", "Operations", "Customer Relations", "Governance"];

export const ExecutiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExecTab>("overview");

  const handleSelect = (id: ExecTab) => setActiveTab(id);

  return (
    <div className="py-6 px-2 sm:px-4 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Executive Board Command Center</span>
            </span>
            <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
              Matori, Lagos HQ
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
            Cut2Edge — Factory Operations & ROI Analytics
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Complete top-management view: revenue, costs, machines, staff, clients, projects, and board decisions — all in one command center.
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs text-slate-400 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Aug 2026 • Daily Inflow: <strong className="text-emerald-400 font-mono">{formatNaira(MOCK_EXECUTIVE_METRICS.dailyRevenue)}</strong></span>
        </div>
      </div>

      {/* Main Executive Grid: Scoped Left Side Menu + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================================== */}
        {/* SCOPED EXECUTIVE COMMAND SIDE MENU (only visible on Executive Command page) */}
        {/* ======================================================================== */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 px-1">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Command Menu</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              10 Modules
            </span>
          </div>

          <nav className="space-y-1">
            {SECTIONS.map((section) => {
              const sectionItems = NAV_ITEMS.filter((n) => n.section === section);
              return (
                <div key={section}>
                  <div className="px-1 pt-2 pb-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">{section}</span>
                  </div>
                  {sectionItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between group mb-1 ${
                          isActive
                            ? "bg-slate-800/95 border-emerald-500 text-white shadow-lg shadow-emerald-950/40"
                            : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-850 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-start space-x-2.5 truncate">
                          <div
                            className={`p-1.5 rounded-xl border flex-shrink-0 mt-0.5 transition-colors ${
                              isActive
                                ? "bg-emerald-500 text-slate-950 border-emerald-400"
                                : "bg-slate-900 border-slate-800 text-slate-400 group-hover:text-emerald-400 group-hover:border-slate-700"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-bold text-white truncate">{item.label}</div>
                            <div className="text-[10px] text-slate-500 truncate mt-0.5">{item.desc}</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1 flex-shrink-0 ml-2">
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                          <ChevronRight
                            className={`w-3 h-3 ${isActive ? "text-emerald-400 translate-x-0.5" : "text-slate-700 group-hover:text-slate-400"} transition-transform`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* ======================================================================== */}
        {/* MAIN EXECUTIVE WORKSPACE CONTENT */}
        {/* ======================================================================== */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* 1. EXECUTIVE OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* 4 Core KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Daily Gross Inflow</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono mt-1">
                    {formatNaira(MOCK_EXECUTIVE_METRICS.dailyRevenue)}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-mono">
                    Monthly: {formatNaira(MOCK_EXECUTIVE_METRICS.monthlyRevenue)}
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Daily Sizing & Edge Banding</span>
                    <Scissors className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono mt-1">
                    {MOCK_EXECUTIVE_METRICS.sheetsProcessedToday}{" "}
                    <span className="text-xs text-slate-500 font-normal">Sheets</span>
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
                    {MOCK_EXECUTIVE_METRICS.doorsPressedToday}{" "}
                    <span className="text-xs text-slate-500 font-normal">Doors Today</span>
                  </div>
                  <div className="text-[11px] text-orange-400 mt-1 font-mono">0% Delamination Rejects</div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Turnaround Velocity</span>
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-purple-400 font-mono mt-1">
                    {MOCK_EXECUTIVE_METRICS.averageTurnaroundHours} Hours
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Down from 24 hrs (Manual Era)</div>
                </div>
              </div>

              {/* Revenue by Segment + Competitive Moat */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <PieChart className="w-4 h-4 text-emerald-400" />
                    <span>Revenue by Client Segment</span>
                  </h4>
                  <div className="space-y-4">
                    {[
                      { label: "Cabinetry Makers & Joiners (Cut & Banding)", pct: 42, val: "₦16.1M/mo", sub: "146 Active Lagos Artisans on WhatsApp", color: "bg-emerald-500" },
                      { label: "Door Suppliers & Wholesale Merchants", pct: 35, val: "₦13.4M/mo", sub: "High volume membrane & veneer hot pressing", color: "bg-cyan-500" },
                      { label: "Direct Turnkey Fitouts (Architects)", pct: 23, val: "₦8.8M/mo", sub: "High-margin luxury kitchen & door projects", color: "bg-amber-500" },
                    ].map((seg) => (
                      <div key={seg.label}>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-white">{seg.label}</span>
                          <span className="font-mono text-slate-300">{seg.val} ({seg.pct}%)</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div className={`${seg.color} h-full rounded-full`} style={{ width: `${seg.pct}%` }} />
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{seg.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Why Cut2Edge Dominates Lagos</span>
                  </h4>
                  <div className="space-y-3 text-xs text-slate-300">
                    {[
                      { title: "1. Frictionless WhatsApp Onboarding", body: "Artisans send voice notes or paper photos → instant proforma + Paystack link within 30 seconds." },
                      { title: "2. +18.4% Sheet Yield via AI 2D Nesting", body: "Saves up to 2 full sheets per kitchen job — lowest-waste factory in Lagos." },
                      { title: "3. Zero Lost Boards & Digital Gatepass", body: "QR barcode on every panel eliminates missing-piece disputes at the factory gate." },
                    ].map((m) => (
                      <div key={m.title} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                        <div className="font-bold text-white">{m.title}</div>
                        <p className="text-slate-400">{m.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "unit_economics" && <UnitEconomics />}
          {activeTab === "machines" && <MachineHealth />}
          {activeTab === "pl_cashflow" && <PLCashFlow />}
          {activeTab === "crm_clients" && <CRMClientIntelligence />}
          {activeTab === "project_management" && <ProjectManagement />}
          {activeTab === "reports_kpi" && <ReportsKPIArchive />}
          {activeTab === "board_chat" && <BoardChatDecisionLog />}
          {activeTab === "staff_payroll" && <StaffPayroll />}
          {activeTab === "material_inventory" && <MaterialInventory />}
        </div>
      </div>
    </div>
  );
};
