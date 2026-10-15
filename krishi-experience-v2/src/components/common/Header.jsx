import React, { useState, useEffect } from "react";
import {
  Sprout,
  LogIn,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Calendar,
  TrendingUp,
  LayoutDashboard,
  ShieldAlert,
  Droplets,
  Store,
  Menu,
  X,
  User
} from "lucide-react";
import { authService } from "../../services/authService";

export function Header({
  activeView,
  onNavigate,
  onOpenLogin,
  onLoadDemo,
  onResetDraft,
  activeCrop,
  currentFarmerName
}) {
  const [backendStatus, setBackendStatus] = useState({ checking: true, isOnline: false });
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "lifecycle", label: "Crop Calendar", icon: Calendar },
    { id: "market", label: "Mandi Prices", icon: TrendingUp },
    { id: "disease", label: "Disease AI", icon: ShieldAlert },
    { id: "irrigation", label: "Smart Irrigation", icon: Droplets },
    { id: "marketplace", label: "Marketplace", icon: Store }
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-brand-border bg-brand-surface sticky top-0 z-40 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & V2 Badge */}
        <div className="flex items-center space-x-3">
          <div
            onClick={() => onNavigate("dashboard")}
            className="flex items-center space-x-2.5 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-brand-mint shadow-sm">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold font-sans tracking-tight text-brand-green">
                  Krishi AI
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-brand-mint text-brand-green border border-brand-leaf/30">
                  V2
                </span>
              </div>
              <p className="text-[10px] text-stone-400 hidden sm:block -mt-0.5">
                Farmer-First Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 ml-6 pl-6 border-l border-brand-border">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? "bg-brand-mint text-brand-green shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Demo Selector for Evaluators */}
          <div className="hidden xl:flex items-center space-x-1 bg-brand-sand px-2 py-1 rounded-lg border border-brand-border text-xs text-stone-600">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
            <span className="font-semibold text-stone-500 mr-1">Demo:</span>
            <button
              type="button"
              onClick={() => onLoadDemo("activeWheatFarmer")}
              className="text-brand-green hover:underline font-bold"
            >
              Active Wheat
            </button>
            <span className="text-stone-300">|</span>
            <button
              type="button"
              onClick={() => onLoadDemo("planningCottonFarmer")}
              className="text-brand-green hover:underline font-bold"
            >
              Planning Cotton
            </button>
          </div>

          {/* Onboarding Flow Shortcut */}
          <button
            type="button"
            onClick={() => onNavigate("onboarding")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              activeView === "onboarding"
                ? "bg-brand-green text-white border-brand-green"
                : "bg-white text-stone-600 border-brand-border hover:bg-stone-50"
            }`}
          >
            Onboarding Flow
          </button>

          {/* User Badge / Login */}
          {currentFarmerName ? (
            <div className="hidden sm:flex items-center space-x-2 bg-brand-mint/40 px-3 py-1.5 rounded-xl border border-brand-leaf/30 text-xs font-bold text-brand-green">
              <User className="w-3.5 h-3.5 text-brand-leaf" />
              <span className="truncate max-w-[120px]">{currentFarmerName}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold text-brand-green bg-white hover:bg-stone-50 border border-brand-border shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-surface border-b border-brand-border px-4 py-4 space-y-2 shadow-lg animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2.5 ${
                  isActive
                    ? "bg-brand-mint text-brand-green shadow-xs"
                    : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                <Icon className="w-4 h-4 text-brand-green" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
