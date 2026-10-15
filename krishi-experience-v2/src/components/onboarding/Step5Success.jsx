import React, { useState } from "react";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Droplets,
  Calendar,
  ShieldAlert,
  Sprout,
  Download,
  RotateCcw,
  Layers,
  LayoutDashboard
} from "lucide-react";

export function Step5Success({ profile, onReset, onEnterDashboard }) {
  const [showJson, setShowJson] = useState(false);

  const isPlanning = profile?.farmingStatus === "planning" || !profile?.activeFarming?.cropName;

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `krishi_farm_profile_${profile?.account?.firstName || "farmer"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-brand-surface border border-brand-border rounded-2xl shadow-card overflow-hidden animate-fade-in">
      {/* Celebration Header */}
      <div className="bg-gradient-to-r from-brand-green via-brand-primary to-brand-emerald p-8 sm:p-12 text-white text-center relative overflow-hidden">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white mb-4 shadow-elevated">
          <CheckCircle2 className="w-10 h-10 text-brand-mint" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-sans tracking-tight mb-3">
          Farm Profile Initialized Successfully!
        </h1>
        <p className="text-brand-mint/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Welcome to Krishi AI, <strong className="text-white">{profile?.account?.firstName} {profile?.account?.lastName}</strong>! Your farm profile for{" "}
          <strong className="text-white">
            {profile?.farmLocation?.village || "your field"}, {profile?.farmLocation?.district}
          </strong>{" "}
          ({profile?.farmLocation?.farmSize} {profile?.farmLocation?.measurementUnit}) has been registered.
        </p>
      </div>

      <div className="p-6 sm:p-10 space-y-8">
        {/* Primary CTA - Enter Dashboard / Review Crop Recommendation */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-mint/30 via-white to-brand-sand border-2 border-brand-green/30 text-center space-y-3 shadow-soft">
          <div className="inline-flex p-3 rounded-full bg-brand-green text-brand-mint shadow-xs">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-stone-900">
            {isPlanning
              ? "Next Step: AI Crop Recommendation & Soil Review"
              : "Your Personalized Farmer Dashboard is Ready"}
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
            {isPlanning
              ? "Review your smart soil analysis and select your recommended crop to generate your customized crop management calendar."
              : `Standing crop: ${profile?.activeFarming?.cropName}. Your 7-day weather, APMC mandi rates, and crop calendar are live.`}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onEnterDashboard(isPlanning)}
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-brand-green text-white hover:bg-brand-primary active:scale-[0.98] transition-all shadow-md"
            >
              <span>
                {isPlanning
                  ? "Review Soil & Select Crop"
                  : "Enter Farmer Dashboard"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Readiness Roadmap for Phase 2 Modules */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-brand-border">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Connected Core Features
              </h2>
              <p className="text-xs text-stone-500">
                Your farm profile is actively powering the following agricultural modules:
              </p>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-brand-mint text-brand-green border border-brand-leaf/30">
              Live &amp; Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Module 1 */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-sand/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-brand-green shrink-0">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-0.5">
                  AI Crop Recommendation
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Calibrated for {profile?.farmLocation?.state} climate &amp; {profile?.farmLocation?.soilType || "regional"} soil.
                </p>
              </div>
            </div>

            {/* Module 2 */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-sand/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-brand-green shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-0.5">
                  7-Day Mandi Price Intelligence
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Real-time APMC auction rates for markets near {profile?.farmLocation?.district}.
                </p>
              </div>
            </div>

            {/* Module 3 */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-sand/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-brand-green shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-0.5">
                  Crop Life-Cycle &amp; Calendar
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Stage tracking and daily operational tasks synchronized with your sowing date.
                </p>
              </div>
            </div>

            {/* Module 4 */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-sand/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-brand-green shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-0.5">
                  Smart Irrigation Advisor
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Root-zone moisture management for {profile?.farmLocation?.irrigationSource || "your water source"}.
                </p>
              </div>
            </div>

            {/* Module 5 */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-sand/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-brand-green shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-0.5">
                  Pest &amp; Disease Assistant
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Leaf symptom checks &amp; organic control advice.
                </p>
              </div>
            </div>

            {/* Module 6 */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-sand/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-brand-green shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-0.5">
                  Organic Fertilizer Balancer
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  N-P-K balances and FYM dosage calculated for {profile?.farmLocation?.farmSize} {profile?.farmLocation?.measurementUnit}.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile JSON Inspector & Restart Demo */}
        <div className="pt-4 border-t border-brand-border flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={downloadJson}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-white border border-brand-border hover:bg-stone-50 text-stone-700 font-semibold shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-brand-green" />
              <span>Download Profile JSON</span>
            </button>
            <button
              type="button"
              onClick={() => setShowJson(!showJson)}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-white border border-brand-border hover:bg-stone-50 text-stone-700 font-semibold shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
              <span>{showJson ? "Hide Raw Data" : "Inspect Schema JSON"}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Another Onboarding</span>
          </button>
        </div>

        {showJson && (
          <div className="p-4 rounded-xl bg-stone-900 text-stone-100 font-mono text-[11px] overflow-x-auto max-h-72 border border-stone-800">
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
