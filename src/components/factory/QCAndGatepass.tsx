"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  Printer,
  Sparkles,
  Send,
  Lock,
  Unlock,
} from "lucide-react";
import { FactoryJob } from "@/types";
import { formatNaira } from "@/lib/utils";

interface QCAndGatepassProps {
  job: FactoryJob;
  onCompleteJob: (jobId: string) => void;
}

export const QCAndGatepass: React.FC<QCAndGatepassProps> = ({
  job,
  onCompleteJob,
}) => {
  const [squarenessPassed, setSquarenessPassed] = useState<boolean>(true);
  const [adhesionPassed, setAdhesionPassed] = useState<boolean>(true);
  const [surfacePassed, setSurfacePassed] = useState<boolean>(true);
  const [countVerified, setCountVerified] = useState<boolean>(true);
  const [balancePaid, setBalancePaid] = useState<boolean>(job.balanceDue === 0);
  const [gatepassGenerated, setGatepassGenerated] = useState<boolean>(false);

  const allQCPassed = squarenessPassed && adhesionPassed && surfacePassed && countVerified;
  const isReadyToRelease = allQCPassed && (balancePaid || job.balanceDue === 0);

  const handlePayBalance = () => {
    setBalancePaid(true);
  };

  const handleIssueGatepass = () => {
    setGatepassGenerated(true);
    onCompleteJob(job.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-white">Station 04: Quality Assurance & Digital Gatepass</h3>
              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800 text-[10px] font-bold uppercase tracking-wider">
                Inspection & Dispatch
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Location: Dispatch Bay 2 (#7 Fatai Atere Way) | Inspector: Chinedu Obi
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Job Code</div>
            <div className="text-sm font-black text-purple-400 font-mono">{job.jobCode}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-400">Client / Phone</div>
            <div className="text-xs font-bold text-white">{job.clientName}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: QC Inspection Checklist */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>4-Point Factory Floor Quality Audit</span>
          </h4>

          <div className="space-y-3">
            <label className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={squarenessPassed}
                onChange={(e) => setSquarenessPassed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-900"
              />
              <div>
                <div className="text-xs font-bold text-white">1. Dimensional Precision & Squareness (±0.2mm)</div>
                <div className="text-[11px] text-slate-400">Digital caliper checked against cutlist specs. Zero diagonal distortion.</div>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={adhesionPassed}
                onChange={(e) => setAdhesionPassed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-900"
              />
              <div>
                <div className="text-xs font-bold text-white">2. Edge Banding Adhesion & Flush Trimming</div>
                <div className="text-[11px] text-slate-400">Manual peel test passed. Hot melt glue line uniform and bubble-free.</div>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={surfacePassed}
                onChange={(e) => setSurfacePassed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-900"
              />
              <div>
                <div className="text-xs font-bold text-white">3. Surface Finish & Chipping Inspection</div>
                <div className="text-[11px] text-slate-400">No micro-chips on laminate face or protective film tear.</div>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={countVerified}
                onChange={(e) => setCountVerified(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-900"
              />
              <div>
                <div className="text-xs font-bold text-white">4. Panel Count & Bundling with Corner Protectors</div>
                <div className="text-[11px] text-slate-400">All panels tagged with QR labels and strapped with corrugated edge guards.</div>
              </div>
            </label>
          </div>
        </div>

        {/* Right: Payment Balance & Digital Gatepass Card */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-purple-400" />
                <span>Financial Reconciliation & Release</span>
              </h4>
              <div className="text-[11px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                Gate Bay #2
              </div>
            </div>

            {/* Financial Status */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Processing Fee:</span>
                <span className="font-mono font-bold text-white">{formatNaira(job.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>70% Mobilization Deposit Paid:</span>
                <span className="font-mono text-emerald-400">-{formatNaira(job.depositPaid)}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm">
                <span className="text-slate-300">30% Balance Due:</span>
                <span className={`font-mono ${balancePaid ? "text-emerald-400" : "text-amber-400"}`}>
                  {balancePaid ? "₦0 (Paid In Full)" : formatNaira(job.balanceDue)}
                </span>
              </div>
            </div>

            {/* If balance is pending */}
            {!balancePaid && job.balanceDue > 0 && (
              <div className="mt-4 p-3.5 rounded-xl bg-amber-950/50 border border-amber-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-300">Outstanding Balance Required</div>
                  <div className="text-[11px] text-slate-400">Accept POS card swipe or Direct Bank Transfer</div>
                </div>
                <button
                  onClick={handlePayBalance}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Mark Paid (POS)
                </button>
              </div>
            )}
          </div>

          {/* Gatepass Output */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            {gatepassGenerated ? (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto font-black">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-sm font-black text-white">DIGITAL GATEPASS ISSUED</div>
                <div className="text-xs text-emerald-300 font-mono">PASS-2026-GP-9842 | TRUCK CLEARED</div>
                <p className="text-[11px] text-slate-300">
                  Automated WhatsApp receipt and pickup release code sent to {job.phone}. Gate security scanner updated.
                </p>
              </div>
            ) : (
              <button
                onClick={handleIssueGatepass}
                disabled={!isReadyToRelease}
                className="w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center space-x-2"
              >
                <Truck className="w-4 h-4" />
                <span>Issue Digital Gatepass & Release Truck</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
