"use client";

import React, { useState } from "react";
import { Shield, Lock, Hash, CheckCircle2, Send, AlertCircle } from "lucide-react";

const DECISION_THREAD = [
  {
    id: "DEC-2026-041",
    author: "Engr. Chukwuemeka Obi (MD/CEO)",
    time: "22 Aug 2026 • 09:14 AM",
    text: "Board resolution: Approve acquisition of a second Nanxing 505 Edge Bander to handle overflow from the Lekki and Ikoyi turnkey pipelines. Budget ceiling: ₦6.8M. Finance to prepare CAPEX brief by 30 Aug.",
    hash: "SHA256: 3f7c...d1a9",
    type: "resolution",
    locked: true,
  },
  {
    id: "DEC-2026-042",
    author: "Mrs. Funke Adeyemi (CFO)",
    time: "22 Aug 2026 • 11:32 AM",
    text: "Acknowledged. Initiating CAPEX brief. Note: Q3 cash position supports ₦4M upfront with ₦2.8M deferred via lease-to-own with Nanxing distributor (Ikeja). Presenting two scenarios in the Aug monthly board report.",
    hash: "SHA256: 8b2e...44fc",
    type: "response",
    locked: true,
  },
  {
    id: "DEC-2026-043",
    author: "Abiodun Salami (Operations Director)",
    time: "23 Aug 2026 • 08:55 AM",
    text: "Factory layout survey completed. Station 2 expansion bay at Matori is 6.2m × 3.8m — sufficient for second bander without disrupting Beam Saw throughput. Recommend lease-to-own route. Supplier contact: 0803-111-4422.",
    hash: "SHA256: c4a1...2b87",
    type: "response",
    locked: true,
  },
];

export const BoardChatDecisionLog: React.FC = () => {
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!draft.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setDraft(""); }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30 rounded-3xl p-6 shadow-2xl flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Board Decision Vault</span>
          </div>
          <h3 className="text-lg font-black text-white mt-1">Cryptographically Pinned Decision Log</h3>
          <p className="text-xs text-slate-400 mt-0.5">All board decisions are SHA-256 timestamped and immutable. No message can be edited or deleted.</p>
        </div>
        <div className="flex items-center space-x-2 text-[11px] bg-purple-950 border border-purple-800 px-3 py-1.5 rounded-xl font-mono text-purple-300">
          <Lock className="w-3 h-3" />
          <span>3 Directors Active</span>
        </div>
      </div>

      {/* Thread */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        {DECISION_THREAD.map((msg) => (
          <div key={msg.id} className={`rounded-2xl p-4 border space-y-3 ${msg.type === "resolution" ? "bg-purple-950/40 border-purple-800/60" : "bg-slate-950 border-slate-800"}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs font-bold text-white">{msg.author}</div>
                <div className="text-[10px] text-slate-400 font-mono">{msg.time}</div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                {msg.type === "resolution" && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono font-bold">BOARD RESOLUTION</span>
                )}
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono flex items-center space-x-1">
                  <Lock className="w-2.5 h-2.5" />
                  <span>Locked</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">{msg.text}</p>

            <div className="flex items-center space-x-2 pt-1 border-t border-slate-800/60">
              <Hash className="w-3 h-3 text-slate-500" />
              <span className="text-[10px] font-mono text-slate-500">{msg.id}</span>
              <span className="text-[10px] font-mono text-emerald-400 ml-auto">{msg.hash}</span>
            </div>
          </div>
        ))}

        {/* Compose Area */}
        <div className="pt-2 border-t border-slate-800 space-y-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-amber-400 font-medium">Once submitted, your message will be cryptographically locked and cannot be edited.</span>
          </div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a board decision or response..."
            rows={3}
            className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-2xl px-4 py-3 resize-none placeholder-slate-600 focus:outline-none focus:border-purple-500"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSend}
              disabled={!draft.trim()}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sent
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                  : "bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              {sent ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              <span>{sent ? "Locked & Sent" : "Submit & Lock"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
