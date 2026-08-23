"use client";

import React, { useState } from "react";
import {
  Cpu,
  Bot,
  Workflow,
  Brain,
  Wrench,
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  FileCode,
  Scan,
  ChevronRight,
  Radio,
  Network,
  Activity,
  Sliders,
} from "lucide-react";
import { WhatsAppParserModal } from "./WhatsAppParserModal";
import { HandwrittenOcrLab } from "./HandwrittenOcrLab";
import { InngestWorkflowGraph } from "./InngestWorkflowGraph";
import { Mem0MemoryViewer } from "./Mem0MemoryViewer";
import { ToolingSentinelAlert } from "./ToolingSentinelAlert";

interface AgentSimulatorProps {
  activeSection?: string;
  onSelectSection?: (section: string) => void;
  onSwitchToKiosk?: () => void;
}

export const AgentSimulator: React.FC<AgentSimulatorProps> = ({
  activeSection = "whatsapp_parser",
  onSelectSection,
  onSwitchToKiosk,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<string>(activeSection || "whatsapp_parser");

  // Keep in sync if parent passed activeSection
  React.useEffect(() => {
    if (activeSection) setActiveSubTab(activeSection);
  }, [activeSection]);

  const agentNavItems = [
    {
      id: "whatsapp_parser",
      label: "Voice & WhatsApp Intake Transcriber",
      desc: "Nigerian dialect speech-to-cutlist transcription",
      techSubtext: "Whisper AI + Claude 3.5 Sonnet",
      icon: Bot,
      badgeText: "Active Voice Agent",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      accentGlow: "group-hover:border-emerald-500/60",
    },
    {
      id: "handwritten_ocr",
      label: "Handwritten Cutlist & PDF Digitizer",
      desc: "Multi-modal vision OCR bounding-box extraction",
      techSubtext: "Vision Transformer + MaxCut Parser",
      icon: Scan,
      badgeText: "99.4% Confidence",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      accentGlow: "group-hover:border-cyan-500/60",
    },
    {
      id: "inngest_graph",
      label: "Event-Driven Factory Execution Engine",
      desc: "Durable multi-station workflow coordinator",
      techSubtext: "Inngest Distributed State Graph",
      icon: Workflow,
      badgeText: "Zero-Loss Retry",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      accentGlow: "group-hover:border-purple-500/60",
    },
    {
      id: "mem0_memory",
      label: "Artisan Memory & Preference Vault",
      desc: "Long-term client loyalty, tape & grain preferences",
      techSubtext: "Mem0 Continuous Memory Embeddings",
      icon: Brain,
      badgeText: "3 Artisans Synced",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      accentGlow: "group-hover:border-amber-500/60",
    },
    {
      id: "tooling_sentinel",
      label: "Predictive Tooling & Machine Sentinel",
      desc: "Blade wear telemetry & autonomous PO dispatch",
      techSubtext: "IoT Current Sensors + Nanxing Telemetry",
      icon: Wrench,
      badgeText: "Blade Alert Live",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      accentGlow: "group-hover:border-rose-500/60",
    },
  ];

  const handleSelectAgent = (id: string) => {
    setActiveSubTab(id);
    if (onSelectSection) onSelectSection(id);
  };

  return (
    <div className="py-6 px-2 sm:px-4 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-purple-950/60 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autonomous Woodworking Intelligence Layer</span>
            </span>
            <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
              Agentic Core v2.4
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Agentic AI & Multimodal Intelligence Lab
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Simulate how autonomous agents transcribe artisan WhatsApp voice notes, OCR handwritten paper notepads, parse MaxCut PDFs, optimize 2D sheet nesting, and remember client preferences.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-2 rounded-2xl border border-slate-800 text-xs text-slate-400">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-mono">Inference Engine: <strong>Lagos-Edge Online</strong></span>
        </div>
      </div>

      {/* Main Grid: Dedicated Scoped Left Side Menu + Active AI Module Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* DEDICATED AGENTIC AI SIDE MENU (Visible only on Agentic AI Lab page) */}
        {/* ========================================================================= */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 px-1">
            <div className="flex items-center space-x-2">
              <Network className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Agent Directory
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              5 Autonomous Agents
            </span>
          </div>

          {/* Agent Navigation Buttons List */}
          <nav className="space-y-2">
            {agentNavItems.map((agent) => {
              const Icon = agent.icon;
              const isActive = activeSubTab === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => handleSelectAgent(agent.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                    isActive
                      ? "bg-slate-800/95 border-emerald-500 text-white shadow-lg shadow-emerald-950/40"
                      : `bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-850 hover:border-slate-700 hover:text-slate-200 ${agent.accentGlow}`
                  }`}
                >
                  <div className="flex items-start space-x-3 truncate">
                    <div
                      className={`p-2 rounded-xl border flex-shrink-0 mt-0.5 transition-colors ${
                        isActive
                          ? "bg-emerald-500 text-slate-950 border-emerald-400"
                          : "bg-slate-900 border-slate-800 text-slate-400 group-hover:text-emerald-400 group-hover:border-slate-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <span className="truncate">{agent.label}</span>
                      </div>
                      <div className="text-[10px] text-slate-300 truncate mt-0.5 font-medium">
                        {agent.desc}
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono truncate">
                        {agent.techSubtext}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1 flex-shrink-0 ml-2">
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${agent.badgeColor}`}
                    >
                      {agent.badgeText}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? "text-emerald-400 translate-x-0.5" : "text-slate-600 group-hover:text-slate-400"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </nav>

          {/* AI Engine Telemetry Card */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Autonomy Level:</span>
              <span className="text-emerald-400 font-mono font-bold">Level 4 (Human-in-the-Loop)</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Lagos Dialect Models:</span>
              <span className="text-cyan-400 font-mono">Yoruba / Pidgin / Eng</span>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* MAIN AI LAB WORKSPACE (Renders the active AI module) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {activeSubTab === "whatsapp_parser" && (
            <WhatsAppParserModal onDispatchToSaw={onSwitchToKiosk} />
          )}
          {activeSubTab === "handwritten_ocr" && <HandwrittenOcrLab />}
          {activeSubTab === "inngest_graph" && <InngestWorkflowGraph />}
          {activeSubTab === "mem0_memory" && <Mem0MemoryViewer />}
          {activeSubTab === "tooling_sentinel" && <ToolingSentinelAlert />}
        </div>
      </div>
    </div>
  );
};
