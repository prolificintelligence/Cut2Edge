"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Layers,
  FileCheck,
  CheckCircle2,
  Image as ImageIcon,
  Sliders,
  DollarSign,
} from "lucide-react";
import { MOCK_TURNKEY_PROJECTS } from "@/data/mockData";
import { BoQGenerator } from "./BoQGenerator";
import { MilestoneTracker } from "./MilestoneTracker";
import { formatNaira } from "@/lib/utils";

export const TurnkeyContractRoom: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(MOCK_TURNKEY_PROJECTS[0]);
  const [subTab, setSubTab] = useState<"overview" | "boq" | "milestones">("overview");

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-700 text-amber-400 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Direct Commercial & Residential Contracts</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Turnkey Project Room & Contract Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            End-to-end management for direct fitout contracts: laser site measurements, 3D architectural engineering, automated BoQ pricing, and 70/20/10 milestone disbursements.
          </p>
        </div>

        {/* Project Selector */}
        <div className="flex items-center space-x-2">
          {MOCK_TURNKEY_PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedProject.id === p.id
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
              }`}
            >
              {p.projectCode}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSubTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === "overview"
              ? "bg-slate-800 text-white border border-slate-700"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Project Overview & 3D Scope
        </button>
        <button
          onClick={() => setSubTab("boq")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === "boq"
              ? "bg-slate-800 text-white border border-slate-700"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Itemized BoQ Generator
        </button>
        <button
          onClick={() => setSubTab("milestones")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            subTab === "milestones"
              ? "bg-slate-800 text-white border border-slate-700"
              : "text-slate-400 hover:text-white"
          }`}
        >
          70/20/10 Milestone Escrow
        </button>
      </div>

      {/* Sub Views */}
      {subTab === "overview" && (
        <div className="space-y-6">
          {/* Main Scope & 3D Render */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    {selectedProject.projectCode}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{selectedProject.title}</h3>
                  <p className="text-xs text-slate-400">
                    Client: <strong>{selectedProject.clientName}</strong> ({selectedProject.clientCompany}) — {selectedProject.location}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800 text-xs font-bold font-mono">
                  {selectedProject.status.replace("_", " ").toUpperCase()}
                </span>
              </div>

              {/* 3D Visualizer Mockup */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 group aspect-video">
                <img
                  src={selectedProject.render3DUrl}
                  alt="3D CAD Render"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-4">
                  <div className="text-xs text-white flex items-center justify-between w-full">
                    <span className="bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700 font-mono">
                      Photorealistic 3D CAD Sign-off Approved
                    </span>
                    <span className="text-emerald-400 font-bold font-mono">65% Factory Completion</span>
                  </div>
                </div>
              </div>

              {/* Material Specs */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-slate-200">Approved Architectural Material Specs:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 text-[11px]">
                  <div>• Carcase: {selectedProject.materialSpecs.carcase}</div>
                  <div>• Shutters: {selectedProject.materialSpecs.shutters}</div>
                  <div>• Hardware: {selectedProject.materialSpecs.hardware}</div>
                  <div>• Edge Tape: {selectedProject.materialSpecs.edgeBanding}</div>
                </div>
              </div>
            </div>

            {/* Financial Overview Card */}
            <div className="lg:col-span-5 bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Contract Financials</span>
                <h4 className="text-lg font-bold text-white">Project Financial Ledger</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Total Approved BoQ Value:</span>
                  <span className="font-mono font-bold text-white text-sm">{formatNaira(selectedProject.totalBoQ)}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Total Disbursed (70% Mobilization):</span>
                  <span className="font-mono font-bold">-{formatNaira(selectedProject.paidAmount)}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-amber-400 font-bold">
                  <span>Remaining Escrow Balance:</span>
                  <span className="font-mono text-sm">
                    {formatNaira(selectedProject.totalBoQ - selectedProject.paidAmount)}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Factory Production Progress</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedProject.completionPct}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${selectedProject.completionPct}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setSubTab("milestones")}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                View 70/20/10 Milestone Stages
              </button>
            </div>
          </div>
        </div>
      )}

      {subTab === "boq" && <BoQGenerator />}

      {subTab === "milestones" && (
        <MilestoneTracker
          milestones={selectedProject.milestones}
          totalAmount={selectedProject.totalBoQ}
        />
      )}
    </div>
  );
};
