"use client";

import React from "react";
import { CreditCard, Download, CheckCircle2, Clock, AlertCircle, FileText, Send } from "lucide-react";
import { formatNaira } from "@/lib/utils";
import { MOCK_JOBS } from "@/data/mockData";

export const ClientBilling: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Financial Ledger</span>
          <h3 className="text-xl font-bold text-white">Invoices, Receipts & 70/30 Payment Status</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent payment schedules, Paystack transfer reconciliation, and gatepass release clearance.
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800 flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Paystack Auto-Reconciliation Active</span>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {MOCK_JOBS.map((job) => {
          const isFullPaid = job.balanceDue === 0;
          return (
            <div
              key={job.id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">Invoice #{job.jobCode.replace("C2E", "INV")}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.2 rounded font-bold uppercase ${
                      isFullPaid
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-amber-950 text-amber-400 border border-amber-800"
                    }`}
                  >
                    {isFullPaid ? "Paid in Full" : "70% Mobilized (Balance Pending)"}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  {job.boardType} • {job.sheetCount} sheets • {job.totalLinearMeters} lm tape
                </div>
                <div className="text-[11px] text-slate-500 font-mono">Created on {job.createdAt}</div>
              </div>

              {/* Amounts */}
              <div className="flex flex-wrap items-center gap-6 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Total Proforma</span>
                  <span className="font-mono font-bold text-white text-sm">{formatNaira(job.totalAmount)}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block">Deposit Paid (70%)</span>
                  <span className="font-mono font-bold text-emerald-400">{formatNaira(job.depositPaid)}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block">Gatepass Balance</span>
                  <span className={`font-mono font-bold ${isFullPaid ? "text-slate-500" : "text-amber-400"}`}>
                    {formatNaira(job.balanceDue)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {!isFullPaid && (
                    <button
                      onClick={() => alert("Redirecting to Paystack payment gateway...")}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
                    >
                      Pay Balance
                    </button>
                  )}
                  <button
                    onClick={() => alert("Downloading PDF Invoice & Receipt...")}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
