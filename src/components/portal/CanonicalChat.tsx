"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  ShieldCheck,
  Send,
  Paperclip,
  Image as ImageIcon,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Download,
  Eye,
  User,
  Bot,
  Wrench,
  Clock,
  Sparkles,
} from "lucide-react";
import { ChatMessage, SnagTicket } from "@/types";
import { MOCK_CHAT_THREADS, MOCK_JOBS } from "@/data/mockData";
import { formatNaira } from "@/lib/utils";

interface CanonicalChatProps {
  jobId?: string;
}

export const CanonicalChat: React.FC<CanonicalChatProps> = ({
  jobId = "job-101",
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    MOCK_CHAT_THREADS[jobId] || MOCK_CHAT_THREADS["job-101"]
  );
  const [newMessage, setNewMessage] = useState<string>("");
  const [activePersona, setActivePersona] = useState<"client" | "factory_pm">("client");
  const [showPinnedDrawer, setShowPinnedDrawer] = useState<boolean>(true);
  const [showSnagModal, setShowSnagModal] = useState<boolean>(false);

  // New Snag Ticket Form State
  const [snagIssueType, setSnagIssueType] = useState<string>("tape_color_mismatch");
  const [snagDescription, setSnagDescription] = useState<string>("");
  const [snagCreated, setSnagCreated] = useState<boolean>(false);

  const activeJob = MOCK_JOBS.find((j) => j.id === jobId) || MOCK_JOBS[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const fakeHash = "0x" + Math.random().toString(16).substring(2, 14);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: activePersona,
      senderName: activePersona === "client" ? activeJob.clientName : "Emeka Obi (Matori PM)",
      senderRole: activePersona === "client" ? "Verified Client" : "Factory Operations Manager",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      auditHash: fakeHash,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  const handleCreateSnagTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setSnagCreated(true);
    const fakeHash = "0x" + Math.random().toString(16).substring(2, 14);

    const snagMsg: ChatMessage = {
      id: `msg-snag-${Date.now()}`,
      sender: "client",
      senderName: activeJob.clientName,
      senderRole: "Verified Client",
      content: `⚠️ FORMAL SNAG TICKET LOGGED: ${snagDescription}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      auditHash: fakeHash,
      actionBadge: "SNAG_TICKET_RAISED",
    };

    setMessages((prev) => [...prev, snagMsg]);
    setTimeout(() => {
      setShowSnagModal(false);
      setSnagCreated(false);
      setSnagDescription("");
    }, 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[750px]">
      {/* Top Header & Audit Verification Bar */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">Dispute-Proof Canonical Chat Vault</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>SHA-256 Audit Logged</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Job Code: <strong className="text-white font-mono">{activeJob.jobCode}</strong> • Client: <strong className="text-white">{activeJob.clientName}</strong>
            </p>
          </div>
        </div>

        {/* Persona Switcher Simulation */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-500 px-2 font-medium">Viewing as:</span>
            <button
              onClick={() => setActivePersona("client")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activePersona === "client"
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Client (Artisan)
            </button>
            <button
              onClick={() => setActivePersona("factory_pm")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activePersona === "factory_pm"
                  ? "bg-purple-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Factory PM Desk
            </button>
          </div>

          <button
            onClick={() => setShowPinnedDrawer(!showPinnedDrawer)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center space-x-1.5"
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showPinnedDrawer ? "Hide Signed Specs" : "View Signed Specs"}</span>
          </button>

          <button
            onClick={() => setShowSnagModal(true)}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/40 flex items-center space-x-1.5"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Log Snag Ticket</span>
          </button>
        </div>
      </div>

      {/* Main Chat Layout (Left Messages + Right Pinned Specs) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Messages Feed */}
        <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto space-y-4">
          <div className="space-y-4">
            {/* Audit Notice */}
            <div className="text-center py-2">
              <span className="text-[10px] text-slate-500 bg-slate-950 px-3 py-1 rounded-full border border-slate-800/80 font-mono">
                All communications in this thread are cryptographically timestamped for dispute resolution.
              </span>
            </div>

            {messages.map((msg) => {
              const isClient = msg.sender === "client";
              const isSystem = msg.sender === "system_agent";

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isClient ? "items-start" : isSystem ? "items-center" : "items-end"
                  }`}
                >
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 mb-1 px-1">
                    <span className="font-bold text-white">{msg.senderName}</span>
                    {msg.senderRole && <span>• {msg.senderRole}</span>}
                    <span>• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-xl p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                      isSystem
                        ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
                        : isClient
                        ? "bg-slate-950 border-slate-800 text-slate-200"
                        : "bg-purple-950/50 border-purple-500/50 text-white"
                    }`}
                  >
                    {/* Action Badge if present */}
                    {msg.actionBadge && (
                      <div className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800 w-fit">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>[{msg.actionBadge.replace(/_/g, " ")}]</span>
                      </div>
                    )}

                    <p className="whitespace-pre-line">{msg.content}</p>

                    {/* Attachment preview if present */}
                    {msg.attachment && (
                      <div className="mt-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2 truncate">
                          {msg.attachment.type === "image" ? (
                            <ImageIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          ) : (
                            <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          )}
                          <span className="truncate font-semibold text-white">{msg.attachment.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono ml-2">{msg.attachment.size}</span>
                      </div>
                    )}

                    {/* Immutable Audit Hash Footer */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                      <span>Audit Hash: {msg.auditHash}</span>
                      <span>Verified Immutable</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="pt-4 border-t border-slate-800/80 flex items-center space-x-3">
            <button
              type="button"
              onClick={() => alert("Simulating upload of bank transfer slip or revision sketch...")}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder={`Send instruction or dispute note as ${activePersona === "client" ? activeJob.clientName : "Factory PM"}...`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>

        {/* Right Pinned Specification & Contract Agreement Drawer */}
        {showPinnedDrawer && (
          <div className="w-80 bg-slate-950 border-l border-slate-800/80 p-5 space-y-4 overflow-y-auto flex-shrink-0 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                Pinned Agreement Drawer
              </span>
              <span className="text-[10px] font-mono text-slate-400">Binding</span>
            </div>

            {/* Signed Cutlist Summary */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-bold text-white flex items-center justify-between">
                <span>Signed Cutlist #{activeJob.jobCode}</span>
                <span className="text-emerald-400 font-mono text-[10px]">VERIFIED</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>• Board: {activeJob.boardType}</div>
                <div>• Total Sheets: {activeJob.sheetCount} (78 cuts)</div>
                <div>• Linear Tape: {activeJob.totalLinearMeters} lm</div>
                <div>• Nesting Yield: {activeJob.nestingEfficiencyPct}%</div>
              </div>
              <button
                onClick={() => alert("Downloading signed PDF cutlist...")}
                className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center justify-center space-x-1"
              >
                <Download className="w-3 h-3 text-emerald-400" />
                <span>Download Signed Cut Sheet</span>
              </button>
            </div>

            {/* Financial Ledger Status */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="font-bold text-white">Payment Reconciliation</div>
              <div className="space-y-1 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span>Total Proforma:</span>
                  <span className="font-mono text-white">{formatNaira(activeJob.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>70% Deposit Paid:</span>
                  <span className="font-mono">{formatNaira(activeJob.depositPaid)}</span>
                </div>
                <div className="flex justify-between text-amber-400">
                  <span>30% Balance Due:</span>
                  <span className="font-mono">{formatNaira(activeJob.balanceDue)}</span>
                </div>
              </div>
            </div>

            {/* Live Station */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-white">Current Shop Floor Status</div>
              <div className="text-[11px] text-emerald-400 font-mono">
                {activeJob.currentStation.replace("_", " ").toUpperCase()} (Operator: {activeJob.operatorName})
              </div>
              <div className="text-[10px] text-slate-400">Estimated Finish: {activeJob.estimatedCompletion}</div>
            </div>
          </div>
        )}
      </div>

      {/* Formal Snag Ticket Modal */}
      {showSnagModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Quality Assurance</span>
                <h3 className="text-base font-bold text-white">Log Formal Factory Snag Ticket</h3>
              </div>
              <button
                onClick={() => setShowSnagModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {snagCreated ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">Snag Ticket #SNG-2026-019 Logged!</div>
                <p className="text-xs text-slate-400">
                  Assigned to Matori Floor Supervisor Chinedu Obi for immediate resolution.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateSnagTicket} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Issue Category</label>
                  <select
                    value={snagIssueType}
                    onChange={(e) => setSnagIssueType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="tape_color_mismatch">Edge Tape Color / Thickness Mismatch</option>
                    <option value="size_tolerance">Dimensional Size Exceeds ±0.2mm Tolerance</option>
                    <option value="surface_chip">Laminate Surface Chipping / Scratch</option>
                    <option value="grain_direction">Incorrect Grain Direction Alignment</option>
                    <option value="missing_panel">Missing Panel from Counted Batch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Detailed Description of Problem</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. Panel P-3 pantry shaker door has Cashmere tape instead of Pure White..."
                    value={snagDescription}
                    onChange={(e) => setSnagDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowSnagModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
                  >
                    Submit Snag Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
