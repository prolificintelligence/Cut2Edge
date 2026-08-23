"use client";

import React, { useState } from "react";
import { Award, CheckCircle2, Send, ShieldCheck, Star, Users } from "lucide-react";

export const TradePartnerOnboarding: React.FC = () => {
  const [partnerType, setPartnerType] = useState<string>("cabinet_maker");
  const [companyName, setCompanyName] = useState<string>("");
  const [monthlyVolume, setMonthlyVolume] = useState<string>("15_30");
  const [contactName, setContactName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="bg-gradient-to-br from-slate-900 via-[#0f172a] to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>B2B Commercial Trade Program</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Unlock Tiered Trade Rebates & Dedicated Queue Priority
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Are you a high-volume cabinetry maker, interior contractor, or door merchant in Lagos? Join our Trade Partner Network at Matori to unlock trade discounts, credit terms, and priority cutting slots.
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">1</div>
                <span><strong>5% to 12% Volume Discount</strong> automatically applied on every cutlist.</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">2</div>
                <span><strong>Direct WhatsApp AI Channel</strong> with zero counter queue wait.</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
                <span><strong>30-Day Trade Credit Facility</strong> for vetted contractors.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Application Received!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Our B2B Operations Manager at Matori will contact {contactName} via WhatsApp ({phone}) within 2 hours to activate your Trade Account.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 font-semibold"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-white mb-2">Register Your Woodworking Business</h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Business Type</label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="cabinet_maker">Cabinetry Maker / Carpenter</option>
                    <option value="door_supplier">Door Merchant / Supplier</option>
                    <option value="interior_designer">Interior Designer / Architect</option>
                    <option value="general_contractor">Real Estate Developer / Contractor</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Workshop Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Masterwork Kitchens"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Board Volume</label>
                    <select
                      value={monthlyVolume}
                      onChange={(e) => setMonthlyVolume(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="5_15">5 - 15 Boards / Month</option>
                      <option value="15_30">15 - 30 Boards / Month (Silver)</option>
                      <option value="30_100">30 - 100 Boards / Month (Gold)</option>
                      <option value="100_plus">100+ Boards / Month (Platinum)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Person Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engr. Babatunde"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 0803 445 9182"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Trade Partner Application</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
