import React, { useState, useEffect } from "react";
import { Sprout, LogIn, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from "lucide-react";
import { authService } from "../../services/authService";

export function Header({ onOpenLogin, onLoadDemo, onResetDraft }) {
  const [backendStatus, setBackendStatus] = useState({ checking: true, isOnline: false });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function checkBackend() {
      const res = await authService.checkHealth();
      if (isMounted) {
        setBackendStatus({ checking: false, isOnline: res.isOnline });
        setCurrentUser(authService.getCurrentUser());
      }
    }
    checkBackend();
    return () => { isMounted = false; };
  }, []);

  return (
    <header className="border-b border-brand-border bg-brand-surface sticky top-0 z-30 shadow-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & V2 Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-brand-mint shadow-sm">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold font-sans tracking-tight text-brand-green">
                Krishi AI
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-brand-mint text-brand-green border border-brand-leaf/30">
                V2 Experience
              </span>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block">
              Farmer-First Agricultural Platform &bull; Phase 1 Onboarding
            </p>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Backend Connectivity Status Pill */}
          <div
            title={
              backendStatus.isOnline
                ? "Backend API (Flask:5000) is online and connected"
                : "Backend is currently offline or unreachable. Development Mock mode is active."
            }
            className={`hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
              backendStatus.checking
                ? "bg-stone-100 text-stone-600 border-stone-200"
                : backendStatus.isOnline
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            {backendStatus.checking ? (
              <RefreshCw className="w-3 h-3 animate-spin text-stone-500" />
            ) : backendStatus.isOnline ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span>
              {backendStatus.checking
                ? "Checking API..."
                : backendStatus.isOnline
                ? "Backend Connected"
                : "Dev Fixture Mode"}
            </span>
          </div>

          {/* Quick Demo Prefill Dropdown for Evaluators */}
          <div className="hidden lg:flex items-center space-x-1 bg-brand-sand px-2 py-1 rounded-lg border border-brand-border text-xs text-stone-600">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
            <span className="font-medium mr-1">Demo Autofill:</span>
            <button
              type="button"
              onClick={() => onLoadDemo("activeWheatFarmer")}
              className="text-brand-green hover:underline font-medium hover:text-brand-emerald"
            >
              Active Wheat
            </button>
            <span className="text-stone-300">|</span>
            <button
              type="button"
              onClick={() => onLoadDemo("planningCottonFarmer")}
              className="text-brand-green hover:underline font-medium hover:text-brand-emerald"
            >
              Planning Cotton
            </button>
          </div>

          {/* Returning User Login Button */}
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-brand-green bg-brand-mint/40 px-3 py-1.5 rounded-lg border border-brand-leaf/20">
                Farmer: {currentUser.username || currentUser.email}
              </span>
              <button
                type="button"
                onClick={() => {
                  authService.logout();
                  setCurrentUser(null);
                }}
                className="text-xs text-stone-500 hover:text-stone-800 underline"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-brand-green bg-white hover:bg-brand-mint/20 border border-brand-green/20 transition-all shadow-sm"
            >
              <LogIn className="w-4 h-4 text-brand-green" />
              <span>Farmer Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
