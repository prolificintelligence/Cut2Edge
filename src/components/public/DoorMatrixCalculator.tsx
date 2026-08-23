"use client";

import React, { useState } from "react";
import {
  Layers,
  Flame,
  CheckCircle2,
  Send,
  Zap,
  Info,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";

export const DoorMatrixCalculator: React.FC = () => {
  const [doorType, setDoorType] = useState<"membrane_press" | "panel_door" | "grooved_shaker" | "flush_door">("membrane_press");
  const [coreType, setCoreType] = useState<"solid_timber" | "tubular_chipboard" | "honeycomb">("solid_timber");
  const [skinType, setSkinType] = useState<"3.2mm_hdf" | "6mm_mdf" | "natural_veneer">("3.2mm_hdf");
  const [foilFinish, setFoilFinish] = useState<string>("Smoked American Walnut");
  const [doorQuantity, setDoorQuantity] = useState<number>(25);
  const [hasLockMortise, setHasLockMortise] = useState<boolean>(true);
  const [hasArchitraveRouting, setHasArchitraveRouting] = useState<boolean>(false);

  // Pricing Base
  const baseDoorRates: Record<string, { name: string; basePrice: number; cycleMins: number; tempC: number }> = {
    membrane_press: {
      name: "Vacuum Membrane Press (3D PVC Foil)",
      basePrice: 9500,
      cycleMins: 4.5,
      tempC: 138,
    },
    panel_door: {
      name: "Moulded HDF Panel Door Hot Press",
      basePrice: 7000,
      cycleMins: 4.0,
      tempC: 135,
    },
    grooved_shaker: {
      name: "CNC Router Shaker + Membrane Foil",
      basePrice: 8500,
      cycleMins: 3.5,
      tempC: 130,
    },
    flush_door: {
      name: "Flat Flush Door with Hardwood Lippings",
      basePrice: 5500,
      cycleMins: 3.0,
      tempC: 125,
    },
  };

  const coreUpcharges: Record<string, number> = {
    solid_timber: 2000,
    tubular_chipboard: 1200,
    honeycomb: 0,
  };

  const lockMortiseFee = hasLockMortise ? 1500 : 0;
  const architraveFee = hasArchitraveRouting ? 1200 : 0;

  const currentRate = baseDoorRates[doorType];
  const unitProcessingCost = currentRate.basePrice + coreUpcharges[coreType] + lockMortiseFee + architraveFee;

  // Bulk Discount
  let discountPct = 0;
  if (doorQuantity >= 50) discountPct = 10;
  else if (doorQuantity >= 20) discountPct = 5;

  const subtotal = unitProcessingCost * doorQuantity;
  const discountAmount = Math.round((subtotal * discountPct) / 100);
  const totalNet = subtotal - discountAmount;
  const deposit70 = Math.round(totalNet * 0.7);

  // Total press time
  const totalBatchMinutes = Math.round((doorQuantity * currentRate.cycleMins) / 2); // 2 doors per tray

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Hello Cut2Edge Matori! I want to book Door Processing for my supply batch:\n\n` +
      `*Door Style:* ${currentRate.name}\n` +
      `*Core:* ${coreType.replace("_", " ")}\n` +
      `*Finish:* ${foilFinish}\n` +
      `*Quantity:* ${doorQuantity} units\n` +
      `*Lock Mortise CNC:* ${hasLockMortise ? "Yes" : "No"}\n` +
      `*Total Estimate:* ${formatNaira(totalNet)} (${discountPct > 0 ? `${discountPct}% bulk discount applied` : "Standard"})\n` +
      `*70% Deposit:* ${formatNaira(deposit70)}\n\n` +
      `Please confirm press queue availability at #7 Fatai Atere Way, Matori!`
    );
    window.open(`https://wa.me/2348034459182?text=${text}`, "_blank");
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5" />
          <span>Industrial Membrane & Hot Press Line</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
          Door Pressing & CNC Routing Matrix
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Designed specifically for Lagos door merchants and suppliers. Batch press your doors with automated temperature, vacuum pressure, and CNC mortising.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Options */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* 1. Door Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Door Processing Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(baseDoorRates).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDoorType(key as any)}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    doorType === key
                      ? "bg-cyan-950/60 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-0.5">{item.name}</div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>{formatNaira(item.basePrice)} / door</span>
                    <span className="text-cyan-400 font-mono">{item.tempC}°C</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Core & Skin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Internal Core Type</label>
              <select
                value={coreType}
                onChange={(e) => setCoreType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="solid_timber">Solid Hardwood Timber (+₦2,000)</option>
                <option value="tubular_chipboard">Tubular Acoustic Chipboard (+₦1,200)</option>
                <option value="honeycomb">Semi-Solid Honeycomb Core (+₦0)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Membrane Foil / Skin Finish</label>
              <select
                value={foilFinish}
                onChange={(e) => setFoilFinish(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="Smoked American Walnut">Smoked American Walnut (Woodgrain)</option>
                <option value="African Teak Natural">African Teak Natural (Rich Amber)</option>
                <option value="Super Matte Cashmere">Super Matte Cashmere</option>
                <option value="High Gloss Pure White">High Gloss Pure White</option>
                <option value="Raw Sanded MDF for Lacquer Spray">Raw Sanded MDF (For Spray Paint)</option>
              </select>
            </div>
          </div>

          {/* 3. Door Quantity Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Batch Door Quantity (Units)
              </label>
              <span className="text-cyan-400 font-black text-lg bg-cyan-950/80 px-3 py-0.5 rounded-lg border border-cyan-800">
                {doorQuantity} Doors
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={doorQuantity}
              onChange={(e) => setDoorQuantity(parseInt(e.target.value) || 1)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>1 unit</span>
              <span>20 units (5% Trade Discount)</span>
              <span>50+ units (10% Tier Discount)</span>
            </div>
          </div>

          {/* 4. CNC Addons */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="lock-mortise"
                  checked={hasLockMortise}
                  onChange={(e) => setHasLockMortise(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-900"
                />
                <label htmlFor="lock-mortise" className="text-xs font-medium text-slate-200 cursor-pointer">
                  CNC Lock-Pocket & Keyhole Mortising (+₦1,500/door)
                </label>
              </div>
              <span className="text-[11px] font-mono text-cyan-400">Hafele / Yale specs</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="architrave"
                  checked={hasArchitraveRouting}
                  onChange={(e) => setHasArchitraveRouting(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-900"
                />
                <label htmlFor="architrave" className="text-xs font-medium text-slate-200 cursor-pointer">
                  Matching Architrave & Jamb Routing (+₦1,200/door)
                </label>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Jamb profiles</span>
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Door Batch Proforma</span>
              <h4 className="text-lg font-bold text-white">Pressing & Machining Schedule</h4>
            </div>
            <div className="text-xs text-right font-mono text-cyan-400 bg-cyan-950/80 px-2 py-1 rounded border border-cyan-800">
              {currentRate.tempC}°C Vacuum
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Unit Rate per Door:</span>
              <span className="font-mono font-semibold text-white">{formatNaira(unitProcessingCost)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Batch Total ({doorQuantity} units):</span>
              <span className="font-mono font-semibold text-white">{formatNaira(subtotal)}</span>
            </div>
            {discountPct > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Volume Trade Rebate ({discountPct}%):</span>
                <span className="font-mono">-{formatNaira(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-300">
              <span>Estimated Factory Press Time:</span>
              <span className="font-mono font-semibold text-cyan-300">~{totalBatchMinutes} minutes</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm font-semibold text-slate-400">Net Batch Cost:</span>
              <span className="text-2xl font-black text-white font-mono">{formatNaira(totalNet)}</span>
            </div>

            <div className="bg-cyan-950/60 border border-cyan-800/80 rounded-xl p-3.5 space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-cyan-300">
                <span>70% Mobilization Deposit:</span>
                <span className="font-mono text-sm">{formatNaira(deposit70)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>30% Balance on Gatepass Release:</span>
                <span className="font-mono">{formatNaira(totalNet - deposit70)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleWhatsAppBooking}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Book Door Press Slot via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
