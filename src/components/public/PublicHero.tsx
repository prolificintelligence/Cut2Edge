"use client";

import React from "react";
import {
  Scissors,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Clock,
  Award,
  Calculator,
} from "lucide-react";

interface PublicHeroProps {
  onScrollToEstimator: () => void;
  onScrollToTurnkey: () => void;
  onOpenSimulator: () => void;
}

export const PublicHero: React.FC<PublicHeroProps> = ({
  onScrollToEstimator,
  onScrollToTurnkey,
  onOpenSimulator,
}) => {
  return (
    <section className="relative overflow-hidden pt-4 pb-12">
      {/* Subtle Glow backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-400 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "6s" }} />
            <span>AI-Optimized Woodworking Factory</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Matori Industrial Hub, Lagos</span>
          </span>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Industrial Cabinetry Sizing &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              High-Press Door Processing
            </span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Zero sheet waste with AI nesting. Precision beam saw cuts, seamless PVC/ABS edge banding, and membrane hot-press doors at <strong className="text-emerald-300">#7 Fatai Atere Way, Matori, Lagos</strong>.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onScrollToEstimator}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Scissors className="w-4 h-4" />
              <span>Instant Cutlist Cost Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onScrollToTurnkey}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Turnkey Fitout Estimator</span>
            </button>
            <button
              onClick={onOpenSimulator}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/80 shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Test AI Intake Demo</span>
            </button>
          </div>
        </div>

        {/* 3 Core Client Solutions Cards with Custom Generated Authentic Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Category A - Nigerian Woodworking Worker Operating Panel Saw */}
          <div className="relative group bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between">
            <div>
              <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/category_a_artisan.jpg"
                  alt="Nigerian Woodworker Artisan Operating Panel Saw in Factory"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-[10px] font-bold uppercase tracking-wider font-mono">
                  Category A • Artisans & Carpenters
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Cabinetry Makers & Joiners</h3>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Bring your 8x4 HDF/MDF boards. We deliver ±0.2mm precision beam cuts, 1mm/2mm PUR/EVA edge banding, and pre-drilled hinge cups.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 mb-4">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>AI nesting cuts sheet waste by 18%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Same-day turnaround for &lt;15 boards</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Handwritten cutlist OCR + MaxCut upload</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>From ₦3,500 / sheet cut</span>
              <span>1mm Tape: ₦480/m &rarr;</span>
            </div>
          </div>

          {/* Card 2: Category B - Picture of Premium Engineered Door */}
          <div className="relative group bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between">
            <div>
              <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/category_b_door.jpg"
                  alt="Premium Luxury Architectural Engineered Wood Door"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-cyan-950/90 border border-cyan-500/60 text-cyan-300 text-[10px] font-bold uppercase tracking-wider font-mono">
                  Category B • Door Merchants
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Door Suppliers & Dealers</h3>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Industrial vacuum membrane press & heavy hot press for HDF moulded skins, solid timber cores, veneer lamination, and shaker CNC routing.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 mb-4">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>High-temperature 138°C zero-delamination</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>CNC lock-pocket & hinge mortising</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>Batch processing up to 150 doors/day</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400">
              <span>From ₦5,500 / door press</span>
              <span>Bulk rebate up to 10% &rarr;</span>
            </div>
          </div>

          {/* Card 3: Category C - Picture of Nigerian in Premium Luxury Kitchen */}
          <div className="relative group bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between">
            <div>
              <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                <img
                  src="/images/category_c_kitchen.jpg"
                  alt="Nigerian in Luxury Bespoke Fitted Kitchen with Waterfall Island"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-amber-950/90 border border-amber-500/60 text-amber-300 text-[10px] font-bold uppercase tracking-wider font-mono">
                  Category C • Direct Corporate & Homeowners
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Turnkey Fitouts & Contracts</h3>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Contract manufacturing for luxury kitchens, master walk-in wardrobes, and commercial building doors for architects & developers.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 mb-4">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Laser 3D site survey & CAD drafting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>70/20/10 Milestone escrow payment protection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Full haulage, installation & 12-mo warranty</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400">
              <span>Itemized BoQ Estimator</span>
              <span>Launch Scope Builder &rarr;</span>
            </div>
          </div>
        </div>

        {/* Factory Guarantee Badges */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">±0.2mm</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Beam Saw Precision</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">3.8 Hrs</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Avg. Job Turnaround</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Edge Adhesion Peel Tested</div>
          </div>
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-black text-purple-400">100% Lagos</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Matori Power Redundancy</div>
          </div>
        </div>
      </div>
    </section>
  );
};
