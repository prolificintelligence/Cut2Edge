"use client";

import React from "react";
import {
  Layers,
  Cpu,
  MonitorCheck,
  Briefcase,
  TrendingUp,
  UserCheck,
  Flame,
  Zap,
  MapPin,
  Bot,
  Sparkles,
} from "lucide-react";
import { RoleType } from "@/types";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeRole: RoleType;
  setActiveRole: (role: RoleType) => void;
  onOpenSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  setActiveRole,
  onOpenSimulator,
}) => {
  const roles = [
    {
      id: "public" as RoleType,
      label: "Public Portal & Estimator",
      icon: Layers,
    },
    {
      id: "client_portal" as RoleType,
      label: "Client Workspace",
      icon: UserCheck,
      badge: "Auth Gated",
    },
    {
      id: "kiosks" as RoleType,
      label: "Factory Floor Kiosks",
      icon: MonitorCheck,
      badge: "Matori Floor",
    },
    {
      id: "agents" as RoleType,
      label: "Agentic AI Lab",
      icon: Cpu,
      badge: "Multimodal",
      highlight: true,
    },
    {
      id: "turnkey" as RoleType,
      label: "Turnkey B2B Contracts",
      icon: Briefcase,
    },
    {
      id: "executive" as RoleType,
      label: "Executive Command",
      icon: TrendingUp,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080d19] border-b border-slate-800/80 shadow-2xl">
      {/* Top Industrial Factory Status Bar */}
      <div className="bg-[#050811] border-b border-slate-800/60 px-4 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Matori Factory Live</span>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <div className="hidden sm:flex items-center space-x-1 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>#7 Fatai Atere Way, Matori Industrial, Lagos</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-amber-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Power: Grid + 150kVA Synchronized</span>
          </div>
          <span className="hidden md:inline text-slate-600">|</span>
          <div className="hidden md:flex items-center space-x-1.5 text-cyan-400">
            <Flame className="w-3.5 h-3.5" />
            <span>Membrane Press: 138°C Ready</span>
          </div>
        </div>
      </div>

      {/* Main Role Switcher Navigation Bar */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setActiveRole("public")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
              <span className="font-black text-white text-xl tracking-tighter">C2E</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-white tracking-wide">
                  CUT<span className="text-emerald-400">2</span>EDGE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                  Agentic OS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">
                #7 Fatai Atere Way, Matori • Lagos
              </p>
            </div>
          </div>

          {/* Top Role Switcher Tabs */}
          <nav className="hidden xl:flex items-center space-x-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = activeRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={cn(
                    "flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200",
                    isActive
                      ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-slate-950" : "text-slate-400")} />
                  <span>{role.label}</span>
                  {role.badge && !isActive && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                      {role.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Simulator Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenSimulator}
              className="group flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Bot className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Simulate AI Intake</span>
              <Sparkles className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Role Switcher Horizontal Scroll */}
        <div className="flex xl:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-800/60">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = activeRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={cn(
                  "flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
                  isActive
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "bg-slate-900 text-slate-300 border border-slate-800"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
