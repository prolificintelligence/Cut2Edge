"use client";

import React, { useState } from "react";
import {
  Scissors,
  Activity,
  Flame,
  ShieldCheck,
  History,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Layers,
  HardHat,
  Cpu,
} from "lucide-react";
import { FactoryJob, DoorProcessingJob, StationType } from "@/types";
import { PanelSawStation } from "./PanelSawStation";
import { EdgeBanderStation } from "./EdgeBanderStation";
import { MembranePressStation } from "./MembranePressStation";
import { QCAndGatepass } from "./QCAndGatepass";
import { JobHistoryDrawer } from "./JobHistoryDrawer";
import { MOCK_JOBS, MOCK_DOOR_JOBS } from "@/data/mockData";
import { formatNaira } from "@/lib/utils";

interface FloorKanbanProps {
  activeSection?: string;
  onSelectSection?: (section: string) => void;
}

export const FloorKanban: React.FC<FloorKanbanProps> = ({
  activeSection = "panel_saw",
  onSelectSection,
}) => {
  const [activeStationTab, setActiveStationTab] = useState<string>(activeSection || "panel_saw");
  const [jobs, setJobs] = useState<FactoryJob[]>(MOCK_JOBS);
  const [doorJobs, setDoorJobs] = useState<DoorProcessingJob[]>(MOCK_DOOR_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<string>("job-101");

  // Keep internal state in sync if parent passed activeSection
  React.useEffect(() => {
    if (activeSection) setActiveStationTab(activeSection);
  }, [activeSection]);

  const currentActiveJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
  const currentDoorJob = doorJobs[0];

  const handleAdvanceStation = (jobId: string, nextStation: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, currentStation: nextStation as StationType } : j))
    );
    if (nextStation === "edge_bander") {
      setActiveStationTab("edge_bander");
      if (onSelectSection) onSelectSection("edge_bander");
    }
    if (nextStation === "qc_gatepass") {
      setActiveStationTab("qc_gatepass");
      if (onSelectSection) onSelectSection("qc_gatepass");
    }
  };

  const handleCompleteJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: "completed_gatepass" } : j))
    );
  };

  const stationNavItems = [
    {
      id: "panel_saw",
      label: "Station 1: Beam / Panel Saw",
      operator: "Musa Danladi (SCMI Si400)",
      duration: "Avg 24m • 3.2mm Blade Kerf",
      icon: Scissors,
      count: jobs.filter((j) => j.currentStation === "panel_saw").length,
      badgeText: "1 Active",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      accentGlow: "group-hover:border-emerald-500/60",
    },
    {
      id: "edge_bander",
      label: "Station 2: Auto Edge Bander",
      operator: "Sunday Eze (Nanxing 505)",
      duration: "198°C • 1mm/2mm PUR Glue",
      icon: Activity,
      count: jobs.filter((j) => j.currentStation === "edge_bander").length,
      badgeText: "1 Active",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      accentGlow: "group-hover:border-amber-500/60",
    },
    {
      id: "membrane_press",
      label: "Station 3: Membrane Press",
      operator: "Kayode Alabi (Orma 2513)",
      duration: "138°C • 4:30 Cycle Timer",
      icon: Flame,
      count: doorJobs.length,
      badgeText: "1 Active",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      accentGlow: "group-hover:border-cyan-500/60",
    },
    {
      id: "qc_gatepass",
      label: "Station 4: QC & Gatepass",
      operator: "Chinedu Obi (QC Supervisor)",
      duration: "4-Point Audit • Gatepass GP-9842",
      icon: ShieldCheck,
      count: jobs.filter((j) => j.currentStation === "qc_gatepass").length,
      badgeText: "1 Active",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      accentGlow: "group-hover:border-purple-500/60",
    },
    {
      id: "job_history",
      label: "Station Job History",
      operator: "Completed Runs Archive",
      duration: "Run Logs & QR Sticker Reprints",
      icon: History,
      count: 3,
      badgeText: "3 Logged",
      badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
      accentGlow: "group-hover:border-slate-600",
    },
  ];

  const handleSelectStation = (id: string) => {
    setActiveStationTab(id);
    if (onSelectSection) onSelectSection(id);
  };

  return (
    <div className="py-6 px-2 sm:px-4 max-w-7xl mx-auto space-y-6">
      {/* Top Banner with Active Batch Quick Switcher */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-semibold">
              <HardHat className="w-3.5 h-3.5" />
              <span>Shop Floor Touch Kiosks</span>
            </span>
            <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
              Live Multi-Station Coordinator
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
            Matori Factory Production Floor
          </h2>
          <p className="text-xs text-slate-400">
            Select a station from the side menu to view the dedicated touch kiosk interface, run timers, and operator actions.
          </p>
        </div>

        {/* Active Batch Selector */}
        {activeStationTab !== "job_history" && (
          <div className="flex items-center space-x-2 bg-slate-950 p-2 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium pl-2 hidden sm:inline">Active Batch:</span>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.jobCode} — {j.clientName} ({j.boardType.slice(0, 18)}...)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Factory Floor Grid: Dedicated Left Side Menu + Main Station Kiosk View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* DEDICATED FACTORY FLOOR SIDE MENU (Visible only on Factory Floor page) */}
        {/* ========================================================================= */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 px-1">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Station Kiosks
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span>Active Shift</span>
            </span>
          </div>

          {/* Station Buttons List */}
          <nav className="space-y-2">
            {stationNavItems.map((station) => {
              const Icon = station.icon;
              const isActive = activeStationTab === station.id;
              return (
                <button
                  key={station.id}
                  onClick={() => handleSelectStation(station.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                    isActive
                      ? "bg-slate-800/95 border-emerald-500 text-white shadow-lg shadow-emerald-950/40"
                      : `bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-850 hover:border-slate-700 hover:text-slate-200 ${station.accentGlow}`
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
                        <span className="truncate">{station.label}</span>
                      </div>
                      <div className="text-[10px] text-slate-300 truncate mt-0.5 font-medium">
                        {station.operator}
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono truncate">
                        {station.duration}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1 flex-shrink-0 ml-2">
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${station.badgeColor}`}
                    >
                      {station.badgeText}
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

          {/* Shift Telemetry Footer */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Active Plant Power:</span>
              <span className="text-emerald-400 font-mono font-bold">150kVA Sync (Grid/Gen)</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Factory Hub:</span>
              <span className="text-slate-300 font-mono">#7 Fatai Atere, Matori</span>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* MAIN STATION KIOSK WORKSPACE (Renders the active station kiosk) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {activeStationTab === "panel_saw" && (
            <PanelSawStation job={currentActiveJob} onAdvanceStation={handleAdvanceStation} />
          )}

          {activeStationTab === "edge_bander" && (
            <EdgeBanderStation job={currentActiveJob} onAdvanceStation={handleAdvanceStation} />
          )}

          {activeStationTab === "membrane_press" && (
            <MembranePressStation
              doorJob={currentDoorJob}
              onAdvanceDoorJob={(id, status) => alert(`Door batch ${id} marked as ${status}!`)}
            />
          )}

          {activeStationTab === "qc_gatepass" && (
            <QCAndGatepass job={currentActiveJob} onCompleteJob={handleCompleteJob} />
          )}

          {activeStationTab === "job_history" && <JobHistoryDrawer />}
        </div>
      </div>
    </div>
  );
};
