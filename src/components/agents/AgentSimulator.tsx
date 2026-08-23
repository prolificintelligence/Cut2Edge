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

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-purple-950/60 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Woodworking Intelligence Layer</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Agentic AI & Multimodal Ingestion Lab
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Simulate how autonomous agents transcribe artisan WhatsApp voice notes, OCR handwritten paper notepads, parse MaxCut PDFs, optimize 2D sheet nesting, and remember client preferences with Mem0.
          </p>
        </div>

        {/* Quick Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "whatsapp_parser", label: "1. WhatsApp Voice AI", icon: Bot },
            { id: "handwritten_ocr", label: "2. Handwritten OCR", icon: Scan },
            { id: "inngest_graph", label: "3. Inngest Graph", icon: Workflow },
            { id: "mem0_memory", label: "4. Mem0 Memory", icon: Brain },
            { id: "tooling_sentinel", label: "5. Tooling Sentinel", icon: Wrench },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id);
                  if (onSelectSection) onSelectSection(tab.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active AI Module */}
      {activeSubTab === "whatsapp_parser" && (
        <WhatsAppParserModal onDispatchToSaw={onSwitchToKiosk} />
      )}
      {activeSubTab === "handwritten_ocr" && <HandwrittenOcrLab />}
      {activeSubTab === "inngest_graph" && <InngestWorkflowGraph />}
      {activeSubTab === "mem0_memory" && <Mem0MemoryViewer />}
      {activeSubTab === "tooling_sentinel" && <ToolingSentinelAlert />}
    </div>
  );
};
