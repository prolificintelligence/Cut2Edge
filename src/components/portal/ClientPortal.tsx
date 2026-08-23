"use client";

import React, { useState } from "react";
import {
  UserCheck,
  QrCode,
  MessageSquare,
  CreditCard,
  FileCheck,
  Wrench,
  Clock,
  CheckCircle2,
  Download,
  AlertCircle,
  Layers,
  Scissors,
} from "lucide-react";
import { MOCK_JOBS, MOCK_MEM0_PROFILES, MOCK_SNAG_TICKETS } from "@/data/mockData";
import { CanonicalChat } from "./CanonicalChat";
import { ClientBilling } from "./ClientBilling";
import { formatNaira } from "@/lib/utils";

interface ClientPortalProps {
  activeSection?: string;
  onSelectSection?: (section: string) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  activeSection = "job_tracker",
  onSelectSection,
}) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("mem-1");
  const [activeTab, setActiveTab] = useState<string>(activeSection || "job_tracker");

  // Keep internal tab in sync if parent passed activeSection
  React.useEffect(() => {
    if (activeSection) setActiveTab(activeSection);
  }, [activeSection]);

  const currentProfile =
    MOCK_MEM0_PROFILES.find((p) => p.id === selectedPersonaId) || MOCK_MEM0_PROFILES[0];

  const activeJob = MOCK_JOBS[0];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner with Persona Switcher */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Dedicated Client Portal</span>
            </span>
            <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
              {currentProfile.loyaltyTier} (-{currentProfile.discountRatePct}% Rebate)
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Welcome back, {currentProfile.clientName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {currentProfile.businessName} • WhatsApp: <strong className="text-white font-mono">{currentProfile.phone}</strong>
          </p>
        </div>

        {/* Persona Switcher Buttons */}
        <div className="flex items-center space-x-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-500 px-2 font-medium">Switch Client:</span>
          {MOCK_MEM0_PROFILES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPersonaId(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedPersonaId === p.id
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {p.clientName}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: "job_tracker", label: "Active Jobs & QR Tracker", icon: QrCode },
          { id: "canonical_chat", label: "Dispute-Proof Chat Vault", icon: MessageSquare },
          { id: "billing_invoices", label: "Invoices & 70/30 Ledger", icon: CreditCard },
          { id: "download_center", label: "CNC Cut Sheets & Downloads", icon: FileCheck },
          { id: "snag_tickets", label: "Snag & Rework Tickets", icon: Wrench },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                if (onSelectSection) onSelectSection(t.id);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-slate-800 text-white border border-slate-700 shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. JOB TRACKER */}
      {activeTab === "job_tracker" && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Live Production Status</span>
                <h3 className="text-xl font-bold text-white">Active Factory Job #{activeJob.jobCode}</h3>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold">
                Current: {activeJob.currentStation.replace("_", " ").toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Details */}
              <div className="lg:col-span-8 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Board Stock</span>
                    <span className="font-bold text-white truncate block">{activeJob.boardType}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Sheets / Cuts</span>
                    <span className="font-bold text-emerald-400 font-mono">{activeJob.sheetCount} sheets (78 cuts)</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Linear Tape</span>
                    <span className="font-bold text-white font-mono">{activeJob.totalLinearMeters} lm</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Est. Completion</span>
                    <span className="font-bold text-cyan-400 font-mono">{activeJob.estimatedCompletion}</span>
                  </div>
                </div>

                {/* Progress Pipeline */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-white">4-Station Manufacturing Pipeline</div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                    <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                      1. Beam Saw (Done)
                    </div>
                    <div className="p-2 rounded-xl bg-amber-950 text-amber-300 border border-amber-800 font-bold animate-pulse">
                      2. Edge Bander (Active)
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 text-slate-500 border border-slate-800">
                      3. CNC / Pre-Fit
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 text-slate-500 border border-slate-800">
                      4. QC & Gatepass
                    </div>
                  </div>
                </div>
              </div>

              {/* Right QR Barcode & Pickup Card */}
              <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-emerald-500/30 text-center space-y-4">
                <div className="text-xs font-bold text-white">Digital Job QR Code</div>
                <img
                  src={activeJob.qrCodeUrl}
                  alt="Job QR Code"
                  className="w-36 h-36 mx-auto rounded-xl border border-slate-700 bg-white p-2"
                />
                <div className="text-[11px] text-slate-400">
                  Scan at Matori Gate #2 reception for instant panel collection status.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CANONICAL CHAT */}
      {activeTab === "canonical_chat" && <CanonicalChat jobId={activeJob.id} />}

      {/* 3. BILLING & INVOICES */}
      {activeTab === "billing_invoices" && <ClientBilling />}

      {/* 4. DOWNLOAD CENTER */}
      {activeTab === "download_center" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <h3 className="text-xl font-bold text-white">Digital CNC Cut Sheets, Gatepasses & Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-bold text-white text-sm">2D Nesting Cut Sheet (PDF)</div>
              <p className="text-xs text-slate-400">Complete 14-sheet visual cutting diagram with kerf offsets and grain markers.</p>
              <button
                onClick={() => alert("Downloading PDF cutlist...")}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download Cut Sheet</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-bold text-white text-sm">Digital Gatepass Release (GP-9842)</div>
              <p className="text-xs text-slate-400">Cryptographically signed security gate clearance code for truck dispatch.</p>
              <button
                onClick={() => alert("Downloading digital gatepass...")}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download Gatepass</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-bold text-white text-sm">Quality Assurance & Adhesion Certificate</div>
              <p className="text-xs text-slate-400">ISO 9001 edge peel test and dimensional tolerance certification.</p>
              <button
                onClick={() => alert("Downloading QA Certificate...")}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download QA Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. SNAG TICKETS */}
      {activeTab === "snag_tickets" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">Logged Snag & Rework Tickets</h3>
              <p className="text-xs text-slate-400">Formal complaints and rework resolutions with supervisor sign-offs.</p>
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_SNAG_TICKETS.map((ticket) => (
              <div key={ticket.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400">{ticket.ticketCode}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">Job #{ticket.jobCode} — {ticket.issueType.replace(/_/g, " ")}</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold uppercase">
                    {ticket.status.replace(/_/g, " ")}
                  </span>
                </div>

                <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  {ticket.description}
                </p>

                <div className="text-xs text-emerald-300 flex items-center justify-between pt-1">
                  <span><strong>Resolution:</strong> {ticket.resolutionAction}</span>
                  <span className="text-slate-400 font-mono text-[11px]">Sign-off: {ticket.supervisorSignOff}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
