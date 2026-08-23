"use client";

import React, { useState } from "react";
import { Brain, Sparkles, User, Tag, History, CheckCircle2 } from "lucide-react";
import { MOCK_MEM0_PROFILES } from "@/data/mockData";
import { formatNaira } from "@/lib/utils";

export const Mem0MemoryViewer: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState(MOCK_MEM0_PROFILES[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Client Context Memory (Mem0 Personalization Layer)</span>
              <span className="px-2 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-800 text-[10px] font-mono">
                Long-Term Vector Memory
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Remembers artisan preferences, grain directions, custom tape thicknesses, and trade discount levels across WhatsApp interactions.
            </p>
          </div>
        </div>

        {/* Profile Selector */}
        <div className="flex items-center space-x-2">
          {MOCK_MEM0_PROFILES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProfile(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedProfile.id === p.id
                  ? "bg-pink-500 text-slate-950 shadow-md shadow-pink-500/20"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {p.clientName}
            </button>
          ))}
        </div>
      </div>

      {/* Memory Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <span className="text-[10px] uppercase font-bold text-slate-500">Artisan Profile & Loyalty</span>
          <div className="text-base font-bold text-white">{selectedProfile.clientName}</div>
          <div className="text-xs text-slate-400">{selectedProfile.businessName}</div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
              {selectedProfile.loyaltyTier}
            </span>
            <span className="font-mono text-emerald-400 font-bold">-{selectedProfile.discountRatePct}% Rebate</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <span className="text-[10px] uppercase font-bold text-slate-500">Material & Tape Preferences</span>
          <div className="text-xs space-y-1 text-slate-300">
            <div><strong>Favorite Board:</strong> {selectedProfile.favoriteBoard}</div>
            <div><strong>Tape Rule:</strong> {selectedProfile.preferredTapeThickness}</div>
            <div><strong>Grain Direction:</strong> {selectedProfile.grainRule}</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <span className="text-[10px] uppercase font-bold text-slate-500">Historical Lifetime Value</span>
          <div className="text-2xl font-black text-white font-mono">{formatNaira(selectedProfile.lifetimeSpend)}</div>
          <div className="text-xs text-slate-400 font-mono">{selectedProfile.lifetimeJobsCount} Total Factory Jobs Processed</div>
        </div>
      </div>

      {/* Extracted Memory Items */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-pink-500/30 space-y-3">
        <h4 className="text-xs font-bold text-pink-300 flex items-center space-x-2">
          <Sparkles className="w-4 h-4" />
          <span>Autonomous Memory Inferences Extracted by Mem0</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {selectedProfile.customNotes.map((note, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
