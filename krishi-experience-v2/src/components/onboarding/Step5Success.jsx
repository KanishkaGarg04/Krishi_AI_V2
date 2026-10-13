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
  Lock
} from "lucide-react";

export function Step5Success({ profile, onReset }) {
  const [showJson, setShowJson] = useState(false);

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `krishi_farm_profile_${profile.account.firstName || "farmer"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-brand-surface border border-brand-border rounded-2xl shadow-card overflow-hidden">
      {/* Celebration Header */}
      <div className="bg-gradient-to-r from-brand-green via-brand-primary to-brand-emerald p-8 sm:p-12 text-white text-center relative overflow-hidden">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white mb-4 shadow-elevated">
          <CheckCircle2 className="w-10 h-10 text-brand-mint" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-sans tracking-tight mb-3">
          Farm Profile Initialized Successfully!
        </h1>
        <p className="text-brand-mint/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Welcome to Krishi AI, <strong className="text-white">{profile.account.firstName} {profile.account.lastName}</strong>! Your farm profile for{" "}
          <strong className="text-white">
            {profile.farmLocation.village || "your field"}, {profile.farmLocation.district}
          </strong>{" "}
          ({profile.farmLocation.farmSize} {profile.farmLocation.measurementUnit}) has been registered and calibrated.
        </p>
      </div>

      <div className="p-6 sm:p-10 space-y-8">
        {/* Readiness Roadmap for Phase 2 */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-brand-border">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Your Farm Profile is Ready for Phase 2 AI Modules
              </h2>
              <p className="text-xs text-stone-500">
                Your agro-climatic profile is formatted to power the following precision agriculture services:
              </p>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-brand-mint text-brand-green border border-brand-leaf/30">
              Phase 2 Unlocks Next
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
                  Calibrated for {profile.farmLocation.state} climate &amp; {profile.farmLocation.soilType || "regional"} soil.
                </p>
              </div>
            </div>

            {/* Module 2 */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-sand/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-brand-green shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-0.5">
                  Organic Fertilizer Plan
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Targeted N-P-K balances and organic FYM dosage calculated for {profile.farmLocation.farmSize} {profile.farmLocation.measurementUnit}.
                </p>
              </div>
            </div>

            {/* Module 3 */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-sand/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-brand-green shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-0.5">
                  Smart Irrigation Advisor
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Optimized for {profile.farmLocation.irrigationSource || "your primary source"} with moisture conservation tips.
                </p>
              </div>
            </div>

            {/* Module 4 */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-sand/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-brand-green shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-0.5">
                  Mandi Price Intelligence
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Real-time APMC price forecasts for APMC markets in {profile.farmLocation.district}.
                </p>
              </div>
            </div>

            {/* Module 5 */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-sand/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-brand-green shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-0.5">
                  Personalized Crop Calendar
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Week-by-week sowing, vegetative, flowering, and harvesting advisories.
                </p>
              </div>
            </div>

            {/* Module 6 */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-sand/40 flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-brand-green shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 mb-0.5">
                  Pest &amp; Disease Assistant
                </h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Early detection &amp; organic remedies for common regional crop hazards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 1 Dashboard Destination Placeholder (Clearly Labelled) */}
        <div className="p-6 rounded-2xl bg-stone-50 border-2 border-dashed border-stone-300 text-center space-y-3">
          <div className="inline-flex p-3 rounded-full bg-white shadow-xs text-stone-400">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-800">
            Farmer Dashboard — [Phase 2 Destination Placeholder]
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
            Per project specifications, Phase 1 focuses exclusively on the farmer onboarding experience. The full dashboard with live AI model inference will be integrated in Phase 2.
          </p>
          <div className="pt-2">
            <button
              type="button"
              disabled
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-stone-200 text-stone-500 cursor-not-allowed"
            >
              <span>Explore Dashboard (Unlocks in Phase 2)</span>
              <Lock className="w-3.5 h-3.5" />
            </button>
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
