"use client";

import React from "react";
import {
  Layers,
  MonitorCheck,
  Cpu,
  Briefcase,
  TrendingUp,
  UserCheck,
  Scissors,
  Flame,
  FileCheck,
  History,
  MessageSquare,
  CreditCard,
  QrCode,
  Sparkles,
  FileCode,
  Wrench,
  Brain,
  ShieldCheck,
  Sliders,
  DollarSign,
  Activity,
  Calculator,
} from "lucide-react";
import { RoleType } from "@/types";
import { cn } from "@/lib/utils";

interface RoleSidebarProps {
  activeRole: RoleType;
  activeSection: string;
  onSelectSection: (section: string) => void;
  onOpenSimulator?: () => void;
}

export const RoleSidebar: React.FC<RoleSidebarProps> = ({
  activeRole,
  activeSection,
  onSelectSection,
  onOpenSimulator,
}) => {
  // Define menu items for each role
  const getRoleMenu = () => {
    switch (activeRole) {
      case "public":
        return [
          { id: "hero", label: "Factory & Category Showcase", icon: Layers },
          { id: "capacity", label: "Live Floor Capacity", icon: Activity },
          { id: "cutlist_calc", label: "Cutlist & Tape Estimator", icon: Scissors, badge: "AI Wizard" },
          { id: "door_matrix", label: "Door Pressing Matrix", icon: Flame },
          { id: "turnkey_est", label: "Turnkey Scope Estimator", icon: Calculator, badge: "Category C" },
          { id: "trade_partner", label: "B2B Trade Onboarding", icon: ShieldCheck },
        ];
      case "client_portal":
        return [
          { id: "job_tracker", label: "Active Jobs & QR Tracker", icon: QrCode, badge: "2 Live" },
          { id: "canonical_chat", label: "Dispute-Proof Chat Vault", icon: MessageSquare, badge: "Audit" },
          { id: "billing_invoices", label: "Invoices & 70/30 Ledger", icon: CreditCard },
          { id: "download_center", label: "CNC Cut Sheets & Gatepass", icon: FileCheck },
          { id: "snag_tickets", label: "Snag & Rework Tickets", icon: Wrench },
        ];
      case "kiosks":
        return [
          { id: "panel_saw", label: "Station 1: Beam / Panel Saw", icon: Scissors, badge: "Active" },
          { id: "edge_bander", label: "Station 2: Auto Edge Bander", icon: Activity },
          { id: "membrane_press", label: "Station 3: Membrane Press", icon: Flame },
          { id: "qc_gatepass", label: "Station 4: QC & Gatepass", icon: ShieldCheck },
          { id: "job_history", label: "Station History & Run Archive", icon: History, badge: "Archive" },
        ];
      case "agents":
        return [
          { id: "whatsapp_parser", label: "1. WhatsApp Voice & Text AI", icon: MessageSquare, badge: "Voice" },
          { id: "handwritten_ocr", label: "2. Handwritten Cutlist OCR", icon: FileCode, badge: "MaxCut" },
          { id: "inngest_graph", label: "3. Inngest Workflow Graph", icon: Activity },
          { id: "mem0_memory", label: "4. Mem0 Client Memory", icon: Brain },
          { id: "tooling_sentinel", label: "5. Tooling Health Sentinel", icon: Wrench },
        ];
      case "turnkey":
        return [
          { id: "project_overview", label: "Project Scopes & 3D Renders", icon: Briefcase },
          { id: "boq_generator", label: "Itemized BoQ Cost Engine", icon: FileCheck, badge: "Dynamic" },
          { id: "milestone_escrow", label: "70/20/10 Escrow Schedule", icon: DollarSign },
        ];
      case "executive":
        return [
          { id: "exec_overview", label: "Factory KPIs & Revenue", icon: TrendingUp },
          { id: "unit_economics", label: "Unit Profitability & Scrap %", icon: Sliders, badge: "+18.4%" },
          { id: "machine_telemetry", label: "Machine Fleet Telemetry", icon: Activity },
        ];
      default:
        return [];
    }
  };

  const menuItems = getRoleMenu();

  const getRoleHeader = () => {
    switch (activeRole) {
      case "public":
        return { title: "Public Hub", subtitle: "Lead Generation & Quotes" };
      case "client_portal":
        return { title: "Client Workspace", subtitle: "Artisan & Corporate Portal" };
      case "kiosks":
        return { title: "Floor Operator Mode", subtitle: "Shop Floor Workstations" };
      case "agents":
        return { title: "Agentic AI Lab", subtitle: "Multimodal Orchestration" };
      case "turnkey":
        return { title: "Direct B2B Contracts", subtitle: "Turnkey Architecture & BoQ" };
      case "executive":
        return { title: "Executive Command", subtitle: "Board ROI & Financials" };
    }
  };

  const header = getRoleHeader();

  return (
    <aside className="w-64 bg-[#080d19] border-r border-slate-800/80 flex flex-col justify-between p-4 flex-shrink-0 min-h-[calc(100vh-4rem)]">
      <div>
        {/* Role Sub-Header */}
        <div className="pb-4 mb-4 border-b border-slate-800/80">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            Active Workspace
          </span>
          <h3 className="text-sm font-bold text-white mt-0.5">{header.title}</h3>
          <p className="text-[11px] text-slate-400">{header.subtitle}</p>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left",
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent"
                )}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon
                    className={cn(
                      "w-4 h-4 flex-shrink-0",
                      isActive ? "text-emerald-400" : "text-slate-400"
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      "text-[9px] font-bold px-1.5 py-0.2 rounded uppercase font-mono ml-1.5 flex-shrink-0",
                      isActive
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Quick Trigger */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span>Matori Hub #7</span>
            <span className="text-emerald-400 font-mono">ONLINE</span>
          </div>
          <div>Grid + 150kVA Synchronized</div>
        </div>

        {onOpenSimulator && (
          <button
            onClick={onOpenSimulator}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate AI Intake</span>
          </button>
        )}
      </div>
    </aside>
  );
};
