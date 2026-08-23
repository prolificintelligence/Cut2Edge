"use client";

import React, { useState, useEffect } from "react";
import {
  Flame,
  Gauge,
  Layers,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Timer,
  ArrowRight,
} from "lucide-react";
import { DoorProcessingJob } from "@/types";

interface MembranePressStationProps {
  doorJob: DoorProcessingJob;
  onAdvanceDoorJob: (jobId: string, nextStatus: string) => void;
}

export const MembranePressStation: React.FC<MembranePressStationProps> = ({
  doorJob,
  onAdvanceDoorJob,
}) => {
  const [isPressing, setIsPressing] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(270); // 4.5 minutes
  const [completedDoors, setCompletedDoors] = useState<number>(14);
  const totalDoors = doorJob.quantity || 28;

  useEffect(() => {
    let interval: any;
    if (isPressing && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isPressing) {
      setIsPressing(false);
      setCompletedDoors((prev) => Math.min(totalDoors, prev + 2));
      setSecondsRemaining(270);
    }
    return () => clearInterval(interval);
  }, [isPressing, secondsRemaining, totalDoors]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? "0" : ""}${remainderSecs}`;
  };

  const handleStartCycle = () => {
    setIsPressing(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-white">Station 03: High-Temperature Vacuum Membrane Press</h3>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold uppercase tracking-wider">
                {isPressing ? "Heating Cycle Active" : "Tray Ready"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Machine: Orma PM/CA 25-13 Dual Tray | Operator: Kayode Adeyemi | Bed: 2500 x 1300mm
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Batch Code</div>
            <div className="text-sm font-black text-cyan-400 font-mono">{doorJob.orderCode}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-400">Supplier</div>
            <div className="text-xs font-bold text-white truncate max-w-[140px]">{doorJob.clientName}</div>
          </div>
        </div>
      </div>

      {/* Main Press Gauges & Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Temp */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
            <span>Chamber Temperature</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-black text-orange-400 font-mono mt-1">
            {doorJob.pressCycleTemp || 138}°C
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">High-pressure silicone membrane</div>
        </div>

        {/* Vacuum Pressure */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
            <span>Vacuum Negative Pressure</span>
            <Gauge className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
            -0.092 <span className="text-xs text-slate-500 font-normal">MPa</span>
          </div>
          <div className="text-[11px] text-cyan-400 mt-1">Deep 3D grooving pull active</div>
        </div>

        {/* Batch Progress */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 font-medium">Batch Units Pressed</div>
          <div className="text-2xl font-black text-white font-mono mt-1">
            {completedDoors} <span className="text-xs text-slate-500">/ {totalDoors} Doors</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
            <div
              className="bg-cyan-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(completedDoors / totalDoors) * 100}%` }}
            />
          </div>
        </div>

        {/* Cycle Timer */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
            <span>Cycle Countdown</span>
            <Timer className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
            {formatTimer(secondsRemaining)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {isPressing ? "Pressing under vacuum..." : "Standby for next tray"}
          </div>
        </div>
      </div>

      {/* Interactive Tray Controller */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-white">Door Tray Specification & Alignment Check</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Foil: <strong className="text-white">{doorJob.foilColor}</strong> | Core: <strong className="text-white">{doorJob.coreType}</strong> | Dims: <strong className="text-white">{doorJob.dimensions}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleStartCycle}
              disabled={isPressing}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-1.5 transition-all disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPressing ? "Cycle In Progress..." : "Start Vacuum Press Cycle (4.5m)"}</span>
            </button>
            <button
              onClick={() => {
                setIsPressing(false);
                setSecondsRemaining(270);
              }}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tray Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400">Tray Slot 1 (Left)</span>
              <div className="text-sm font-bold text-white mt-1">Unit #{completedDoors + 1} - 2100x900mm</div>
              <div className="text-xs text-slate-400 mt-0.5">PUR Glue Spray: Evenly Coated (80g/m²)</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400">Tray Slot 2 (Right)</span>
              <div className="text-sm font-bold text-white mt-1">Unit #{completedDoors + 2} - 2100x900mm</div>
              <div className="text-xs text-slate-400 mt-0.5">Foil Pre-heated & Stretched</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Complete Batch */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => onAdvanceDoorJob(doorJob.id, "qc_approved")}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
          >
            <span>Batch Complete &rarr; Send to Trimming & QC Inspection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
