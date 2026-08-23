"use client";

import React, { useState } from "react";
import {
  Workflow,
  CheckCircle2,
  Clock,
  Zap,
  ArrowDown,
  RefreshCw,
  Database,
  Bot,
  MessageSquare,
  Scissors,
  Check,
} from "lucide-react";
import { SIMULATED_INNGEST_STEPS } from "@/data/agentWorkflows";

export const InngestWorkflowGraph: React.FC = () => {
  const [steps, setSteps] = useState(SIMULATED_INNGEST_STEPS);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(4);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Agent Orchestration Graph (Inngest Durable Workflows)</span>
              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-mono">
                Event-Driven Architecture
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Guarantees zero lost jobs, resilient retries, step timeouts, and automatic multi-station dispatching across Matori factory.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span>Inngest Engine: 5/5 Events Dispatched</span>
        </div>
      </div>

      {/* Step by step execution trace */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isCompleted = step.status === "completed";
          const isRunning = step.status === "in_progress";
          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all ${
                isRunning
                  ? "bg-purple-950/40 border-purple-500/80 shadow-lg shadow-purple-950"
                  : isCompleted
                  ? "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                  : "bg-slate-950/30 border-slate-900 opacity-60"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isCompleted
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : isRunning
                        ? "bg-purple-500/30 text-purple-300 border border-purple-400 animate-pulse"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white font-mono flex items-center space-x-2">
                      <span>{step.name}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded bg-slate-800 text-slate-300 font-sans">
                        Agent: {step.agent}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{step.outputPayload}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono">
                  {step.tokens && step.tokens > 0 && (
                    <span className="text-slate-500 text-[11px]">{step.tokens} tokens</span>
                  )}
                  <span className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
                    {step.latencyMs}ms
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isCompleted
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-purple-950 text-purple-300 border border-purple-800"
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
