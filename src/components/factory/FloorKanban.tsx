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

  const stationButtons = [
    {
      id: "panel_saw",
      label: "Station 1: Beam / Panel Saw",
      icon: Scissors,
      count: jobs.filter((j) => j.currentStation === "panel_saw").length,
      badgeColor: "text-emerald-400 bg-emerald-950 border-emerald-800",
    },
    {
      id: "edge_bander",
      label: "Station 2: Auto Edge Bander",
      icon: Activity,
      count: jobs.filter((j) => j.currentStation === "edge_bander").length,
      badgeColor: "text-amber-400 bg-amber-950 border-amber-800",
    },
    {
      id: "membrane_press",
      label: "Station 3: Membrane Press",
      icon: Flame,
      count: doorJobs.length,
      badgeColor: "text-cyan-400 bg-cyan-950 border-cyan-800",
    },
    {
      id: "qc_gatepass",
      label: "Station 4: QC & Gatepass",
      icon: ShieldCheck,
      count: jobs.filter((j) => j.currentStation === "qc_gatepass").length,
      badgeColor: "text-purple-400 bg-purple-950 border-purple-800",
    },
    {
      id: "job_history",
      label: "Station Job History",
      icon: History,
      count: 3,
      badgeColor: "text-slate-300 bg-slate-800 border-slate-700",
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Sub-Station Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          {stationButtons.map((station) => {
            const Icon = station.icon;
            const isActive = activeStationTab === station.id;
            return (
              <button
                key={station.id}
                onClick={() => {
                  setActiveStationTab(station.id);
                  if (onSelectSection) onSelectSection(station.id);
                }}
                className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-800 text-white shadow-lg border border-slate-700"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{station.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${station.badgeColor}`}>
                  {station.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Job Selector */}
        {activeStationTab !== "job_history" && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Active Batch:</span>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-emerald-500"
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

      {/* Render Selected Station Kiosk */}
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
  );
};
