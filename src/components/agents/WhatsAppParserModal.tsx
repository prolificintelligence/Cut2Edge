"use client";

import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  Send,
  CheckCircle2,
  FileCode,
  Layers,
  ArrowRight,
  PhoneCall,
  Volume2,
  Image as ImageIcon,
} from "lucide-react";
import { SAMPLE_WHATSAPP_RAW_INPUT, SIMULATED_PARSED_JSON } from "@/data/agentWorkflows";
import { formatNaira } from "@/lib/utils";

interface WhatsAppParserModalProps {
  onClose?: () => void;
  onDispatchToSaw?: () => void;
}

export const WhatsAppParserModal: React.FC<WhatsAppParserModalProps> = ({
  onClose,
  onDispatchToSaw,
}) => {
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [isParsed, setIsParsed] = useState<boolean>(false);

  const handleRunParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      setIsParsed(true);
    }, 1200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Agent 01: WhatsApp AI Cutlist & Voice Parser</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                Multimodal OCR / Audio
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Extracts dimensional cutlists from Nigerian artisan WhatsApp voice notes, handwritten photos, and messy text.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunParse}
          disabled={isParsing}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isParsing ? "AI Agent Parsing Cutlist..." : "Run AI Parsing Simulation"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Raw WhatsApp Message Simulator */}
        <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800/80">
            <span className="font-bold text-slate-300 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Incoming WhatsApp Webhook (+234 803 445 9182)</span>
            </span>
            <div className="flex items-center space-x-2 text-slate-500">
              <Volume2 className="w-3.5 h-3.5" />
              <ImageIcon className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="bg-[#0b141a] rounded-xl p-4 border border-[#202c33] text-xs text-slate-200 font-sans space-y-2 relative">
            <div className="text-[11px] text-emerald-400 font-semibold mb-1">
              Master Tunde (Ikeja Woodcrafts):
            </div>
            <p className="leading-relaxed whitespace-pre-line text-slate-300">
              &quot;Good morning Cut2Edge. Abeg see my cutlist for Victoria Island kitchen job:<br />
              1. Base cabinet sides: 870mm by 580mm, 8 pcs, 1mm tape front and top<br />
              2. Base shelf: 564mm by 550mm, 12 pcs, 1mm front only<br />
              3. Tall pantry shaker doors: 2150mm by 595mm, 4 pcs, 2mm tape all 4 sides<br />
              4. Drawer fronts: 895mm by 295mm, 6 pcs, 2mm all round<br />
              Material: 18mm High Gloss White MDF (14 sheets total). Pls make sure grain follows height. Calculate money let me pay deposit now now.&quot;
            </p>
            <div className="text-[10px] text-right text-slate-500">07:14 AM • Delivered</div>
          </div>

          {/* Voice note indicator */}
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Attached Audio: &quot;voice_note_0714.opus&quot; (42s)</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Transcribed</span>
          </div>
        </div>

        {/* Right: AI Parsed Output & Structured Table */}
        <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-emerald-500/30 p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800/80">
              <span className="font-bold text-emerald-400 flex items-center space-x-1.5">
                <FileCode className="w-4 h-4" />
                <span>Extracted Cutlist Specification (JSON & Table)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Confidence: 99.4%
              </span>
            </div>

            {isParsed ? (
              <div className="space-y-3 mt-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Client / Identified ID</span>
                    <span className="text-white font-bold">Babatunde Alabi (mem-1)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Total Sheets / Linear Tape</span>
                    <span className="text-emerald-400 font-bold font-mono">14 Sheets | 284.5 lm</span>
                  </div>
                </div>

                {/* Parsed Panels Table */}
                <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase font-mono">
                      <tr>
                        <th className="py-2 px-3">Panel Description</th>
                        <th className="py-2 px-2">Dimensions</th>
                        <th className="py-2 px-2">Qty</th>
                        <th className="py-2 px-3">Edge Banding</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {SIMULATED_PARSED_JSON.panels.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-900/50">
                          <td className="py-2 px-3 font-semibold text-white">{p.label}</td>
                          <td className="py-2 px-2 font-mono text-cyan-400">{p.length}x{p.width}mm</td>
                          <td className="py-2 px-2 font-mono font-bold text-white">{p.qty}</td>
                          <td className="py-2 px-3 text-[11px] text-emerald-400">{p.edge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Instant Pricing */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Net Invoice Amount (with -7.5% Gold Rebate):</span>
                    <span className="font-mono font-bold text-white">{formatNaira(SIMULATED_PARSED_JSON.pricingSummary.netPayable)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-400">
                    <span>70% Required Mobilization Deposit:</span>
                    <span className="font-mono">{formatNaira(SIMULATED_PARSED_JSON.pricingSummary.requiredDeposit70Pct)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs space-y-2">
                <Sparkles className="w-8 h-8 mx-auto text-slate-600 animate-pulse" />
                <p>Click &quot;Run AI Parsing Simulation&quot; above to watch the agent parse the raw message into structured cuts.</p>
              </div>
            )}
          </div>

          {isParsed && (
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-[11px] text-emerald-400 flex items-center space-x-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>WhatsApp Quote Sent Automatically</span>
              </span>

              <button
                onClick={onDispatchToSaw}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center space-x-1.5"
              >
                <span>Dispatch Job to Panel Saw Kiosk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
