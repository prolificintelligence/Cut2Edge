"use client";

import React, { useState } from "react";
import {
  Award,
  Layers,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
  Send,
  ShieldCheck,
  Building,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";

export const TurnkeyEstimator: React.FC = () => {
  const [scopeType, setScopeType] = useState<"kitchen" | "wardrobe" | "doors" | "penthouse">("kitchen");
  const [linearMeters, setLinearMeters] = useState<number>(12); // Running meters
  const [finishGrade, setFinishGrade] = useState<"matte_cashmere" | "high_gloss_acrylic" | "walnut_veneer">("matte_cashmere");
  const [hardwareGrade, setHardwareGrade] = useState<"blum_premium" | "hafele_standard">("blum_premium");
  const [countertopType, setCountertopType] = useState<"calacatta_quartz" | "porcelain_slab" | "none">("calacatta_quartz");
  const [siteLocation, setSiteLocation] = useState<string>("Banana Island / Ikoyi");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [booked, setBooked] = useState<boolean>(false);

  // Pricing Matrix
  const baseRatesPerMeter: Record<string, number> = {
    kitchen: 420000, // ₦420,000 per linear meter of carcase + shutters
    wardrobe: 360000, // ₦360,000 per linear meter of floor-to-ceiling wardrobe
    doors: 280000, // ₦280,000 per bespoke engineered door set
    penthouse: 490000,
  };

  const finishMultipliers: Record<string, number> = {
    matte_cashmere: 1.0,
    high_gloss_acrylic: 1.15,
    walnut_veneer: 1.25,
  };

  const hardwareAddons: Record<string, number> = {
    blum_premium: 120000 * (linearMeters / 3), // Blum Legrabox + soft close drawers
    hafele_standard: 55000 * (linearMeters / 3),
  };

  const countertopCosts: Record<string, number> = {
    calacatta_quartz: linearMeters * 165000,
    porcelain_slab: linearMeters * 195000,
    none: 0,
  };

  const baseStructure = (baseRatesPerMeter[scopeType] * linearMeters) * finishMultipliers[finishGrade];
  const hardwareTotal = hardwareAddons[hardwareGrade];
  const countertopTotal = scopeType === "kitchen" ? countertopCosts[countertopType] : 0;
  const installationAndLogistics = 450000;

  const estimatedMin = Math.round((baseStructure + hardwareTotal + countertopTotal + installationAndLogistics) * 0.95);
  const estimatedMax = Math.round((baseStructure + hardwareTotal + countertopTotal + installationAndLogistics) * 1.1);

  const handleBookSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    const text = encodeURIComponent(
      `Hello Cut2Edge Direct Turnkey Desk! I generated an architectural estimate for my project:\n\n` +
      `*Scope:* ${scopeType.toUpperCase()} (${linearMeters} linear meters)\n` +
      `*Finishes:* ${finishGrade} with ${hardwareGrade}\n` +
      `*Location:* ${siteLocation}\n` +
      `*Estimated Range:* ${formatNaira(estimatedMin)} – ${formatNaira(estimatedMax)}\n` +
      `*Contact:* ${clientName} (${clientPhone})\n\n` +
      `Please schedule our physical Laser Site Survey & 3D CAD Engineering consultation!`
    );
    window.open(`https://wa.me/2348034459182?text=${text}`, "_blank");
  };

  return (
    <div id="turnkey-estimator" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-400 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>Category C • Direct Corporate & Residential Contracts</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
          Turnkey Scope & Budget Estimator
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Designed for architects, corporate developers, and luxury homeowners. Configure your space, select premium finishes, and generate an indicative BoQ range.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Scope Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Project Scope
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "kitchen", label: "Luxury Fitted Kitchen", desc: "Island waterfall & tall pantries" },
                { id: "wardrobe", label: "Master Walk-in Wardrobe", desc: "Floor-to-ceiling glass & HDF" },
                { id: "doors", label: "Acoustic Commercial Doors", desc: "Acoustic core & flush jambs" },
                { id: "penthouse", label: "Full Penthouse Package", desc: "Complete joinery & fitout" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setScopeType(s.id as any)}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    scopeType === s.id
                      ? "bg-amber-950/60 border-amber-500 text-amber-300 shadow-md shadow-amber-950"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold text-white">{s.label}</div>
                  <div className="text-[11px] text-slate-400">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Running Meters Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Total Linear Running Run / Scale
              </label>
              <span className="text-amber-400 font-black text-lg bg-amber-950/80 px-3 py-0.5 rounded-lg border border-amber-800 font-mono">
                {linearMeters} Linear Meters
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="30"
              value={linearMeters}
              onChange={(e) => setLinearMeters(parseInt(e.target.value) || 4)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>4m (Compact)</span>
              <span>12m (Luxury 4-Bed Penthouse)</span>
              <span>30m (Commercial Project)</span>
            </div>
          </div>

          {/* Finishes & Hardware */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Shutter & Finish Grade</label>
              <select
                value={finishGrade}
                onChange={(e) => setFinishGrade(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="matte_cashmere">Super Matte Cashmere HDF (J-Pull)</option>
                <option value="high_gloss_acrylic">High Gloss UV Acrylic (Pure White)</option>
                <option value="walnut_veneer">American Natural Walnut Wood Veneer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Architectural Hardware Tier</label>
              <select
                value={hardwareGrade}
                onChange={(e) => setHardwareGrade(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="blum_premium">Blum Clip-Top Soft-Close + Legrabox (Austria)</option>
                <option value="hafele_standard">Hafele Matrix Box Concealed Soft-Close (Germany)</option>
              </select>
            </div>
          </div>

          {/* Countertop if Kitchen */}
          {scopeType === "kitchen" && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Countertop & Island Waterfall</label>
              <select
                value={countertopType}
                onChange={(e) => setCountertopType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="calacatta_quartz">Calacatta Gold 20mm Quartz with Mitered Edge</option>
                <option value="porcelain_slab">Sintered Stone / Porcelain Slab 12mm</option>
                <option value="none">Client Sourcing Countertop Separately</option>
              </select>
            </div>
          )}

          {/* Location in Lagos */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Site Location in Lagos</label>
            <select
              value={siteLocation}
              onChange={(e) => setSiteLocation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="Banana Island / Ikoyi">Banana Island / Ikoyi, Lagos</option>
              <option value="Victoria Island / Lekki Phase 1">Victoria Island / Lekki Phase 1</option>
              <option value="Ikeja GRA / Magodo">Ikeja GRA / Magodo</option>
              <option value="Epe / Lekki Free Zone">Epe / Lekki Free Zone</option>
              <option value="Other Lagos Mainland">Other Lagos Mainland</option>
            </select>
          </div>
        </div>

        {/* Right Summary & REVIEW NOTICE */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div className="flex justify-between items-start pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Indicative Scope</span>
              <h4 className="text-lg font-bold text-white">Direct Contract Estimate</h4>
            </div>
            <div className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-800">
              {linearMeters}m Scope
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Precision Carcase & Shutter Production:</span>
              <span className="font-mono font-semibold text-white">{formatNaira(baseStructure)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Blum / Hafele Soft-Close Hardware:</span>
              <span className="font-mono font-semibold text-white">{formatNaira(hardwareTotal)}</span>
            </div>
            {scopeType === "kitchen" && countertopType !== "none" && (
              <div className="flex justify-between text-slate-300">
                <span>Quartz / Porcelain Waterfall Countertop:</span>
                <span className="font-mono font-semibold text-white">{formatNaira(countertopTotal)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-300">
              <span>Haulage, Master Installation & Snagging:</span>
              <span className="font-mono font-semibold text-white">{formatNaira(installationAndLogistics)}</span>
            </div>
          </div>

          {/* Indicative Range */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 block font-medium">Estimated Budget Range:</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
              {formatNaira(estimatedMin)} – {formatNaira(estimatedMax)}
            </div>
          </div>

          {/* MANDATORY REVIEW REQUIREMENT NOTICE */}
          <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/60 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Mandatory Physical Review Requirement</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              This is a <strong>provisional indicative estimate</strong>. Final contract sign-off requires a physical laser site survey by Cut2Edge engineering team to verify wall plumb, electrical/plumbing offsets, and client 3D CAD approval.
            </p>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleBookSurvey} className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Architect / Client Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
              <input
                type="text"
                required
                placeholder="WhatsApp Phone"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Laser Site Survey & 3D Engineering Sign-off</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
