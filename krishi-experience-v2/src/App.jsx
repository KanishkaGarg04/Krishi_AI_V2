import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { ProgressSteps } from "./components/common/ProgressSteps";
import { Step1Account } from "./components/onboarding/Step1Account";
import { Step2FarmProfile } from "./components/onboarding/Step2FarmProfile";
import { Step3FarmingStatus } from "./components/onboarding/Step3FarmingStatus";
import { Step4Review } from "./components/onboarding/Step4Review";
import { Step5Success } from "./components/onboarding/Step5Success";
import { LoginModal } from "./components/auth/LoginModal";
import { CropRecommendationModal } from "./components/onboarding/CropRecommendationModal";

// Dashboard Components
import { DashboardHeader } from "./components/dashboard/DashboardHeader";
import { WeatherSection } from "./components/dashboard/WeatherSection";
import { MandiPriceSection } from "./components/dashboard/MandiPriceSection";
import { CropLifecycleSection } from "./components/dashboard/CropLifecycleSection";
import { AgriculturalFeatureCards } from "./components/dashboard/AgriculturalFeatureCards";

// Dedicated Feature Pages
import { CropLifecyclePage } from "./components/pages/CropLifecyclePage";
import { MarketIntelligencePage } from "./components/pages/MarketIntelligencePage";
import { DiseaseDetectionPage } from "./components/pages/DiseaseDetectionPage";
import { SmartIrrigationPage } from "./components/pages/SmartIrrigationPage";
import { MarketplacePage } from "./components/pages/MarketplacePage";

import { useOnboarding } from "./hooks/useOnboarding";
import { storageService } from "./services/storageService";
import { generateCropLifecycleState } from "./services/cropLifecycleEngine";
import { DEMO_PROFILES } from "./data/fixtures";
import { RotateCcw, Sparkles } from "lucide-react";

export function App() {
  const [activeView, setActiveView] = useState("dashboard"); // 'dashboard' | 'lifecycle' | 'market' | 'disease' | 'irrigation' | 'marketplace' | 'onboarding'
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  // Onboarding hook state
  const {
    currentStep,
    profile,
    errors,
    isSubmitting,
    serverError,
    draftRestored,
    updateSection,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    completeOnboarding,
    resetForm,
    loadDemoFixture
  } = useOnboarding();

  // Task state synchronized with storageService
  const [taskState, setTaskState] = useState(() => storageService.getTaskState());

  // Active crop and sowing date (from active profile or saved defaults)
  const activeCropName = profile?.activeFarming?.cropName || "Wheat";
  const activeSowingDate = profile?.activeFarming?.sowingDate || "2026-10-01";

  // Reactive subscription to storage changes
  useEffect(() => {
    const unsubscribe = storageService.subscribe((event, data) => {
      if (event === "tasks_updated") {
        setTaskState(data);
      }
    });
    return unsubscribe;
  }, []);

  // Compute synchronized crop lifecycle state
  const lifecycleState = useMemo(() => {
    return generateCropLifecycleState(activeCropName, activeSowingDate, taskState);
  }, [activeCropName, activeSowingDate, taskState]);

  // Task actions
  const handleToggleTask = useCallback((taskId, isCompleted) => {
    const updated = storageService.toggleTask(taskId, isCompleted);
    setTaskState(updated);
  }, []);

  const handleRescheduleTask = useCallback((taskId, newDateStr, reasonNote) => {
    const updated = storageService.rescheduleTask(taskId, newDateStr, reasonNote);
    setTaskState(updated);
  }, []);

  const handleUpdateNote = useCallback((taskId, note) => {
    const updated = storageService.updateTaskNote(taskId, note);
    setTaskState(updated);
  }, []);

  // Crop confirmation handler (from recommendation modal)
  const handleConfirmCrop = useCallback((chosenCrop, chosenSowingDate) => {
    updateSection("activeFarming", {
      cropName: chosenCrop,
      sowingDate: chosenSowingDate
    });
    updateField("farmingStatus", "active");

    // Save to permanent profile storage
    const current = storageService.getProfile() || profile;
    const updated = {
      ...current,
      farmingStatus: "active",
      activeFarming: {
        ...current.activeFarming,
        cropName: chosenCrop,
        sowingDate: chosenSowingDate
      }
    };
    storageService.saveProfile(updated);

    setIsCropModalOpen(false);
    setActiveView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [updateSection, updateField, profile]);

  // Entering dashboard from onboarding step 5
  const handleEnterDashboardFromOnboarding = useCallback((needsRecommendation) => {
    if (needsRecommendation) {
      setIsCropModalOpen(true);
    } else {
      setActiveView("dashboard");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Evaluator demo pre-loader
  const handleLoadDemo = useCallback((fixtureKey) => {
    loadDemoFixture(fixtureKey);
    const fixture = DEMO_PROFILES[fixtureKey];
    if (fixture) {
      storageService.saveProfile(fixture);
    }
    setActiveView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [loadDemoFixture]);

  const currentFarmerName = profile?.account?.firstName
    ? `${profile.account.firstName} ${profile.account.lastName || ""}`.trim()
    : "Farmer";

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col font-sans text-stone-800 antialiased selection:bg-brand-mint selection:text-brand-green">
      {/* Top Navigation Bar with View Switcher */}
      <Header
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLoadDemo={handleLoadDemo}
        onResetDraft={resetForm}
        activeCrop={activeCropName}
        currentFarmerName={currentFarmerName}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full mx-auto">
        {/* VIEW 1: ONBOARDING FLOW */}
        {activeView === "onboarding" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {draftRestored && currentStep < 5 && (
              <div className="mb-6 p-3.5 rounded-xl bg-brand-mint/40 border border-brand-leaf/30 text-xs text-brand-green flex items-center justify-between shadow-soft">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-brand-emerald shrink-0" />
                  <span>
                    <strong>Progress Restored:</strong> We retrieved your previous onboarding draft from this browser.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-stone-500 hover:text-stone-800 underline font-medium ml-3 shrink-0 flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Start Clean</span>
                </button>
              </div>
            )}

            <ProgressSteps currentStep={currentStep} onStepClick={goToStep} />

            {currentStep === 1 && (
              <Step1Account
                account={profile.account}
                onChange={(updates) => updateSection("account", updates)}
                onNext={nextStep}
                onOpenLogin={() => setIsLoginOpen(true)}
                errors={errors}
                isSubmitting={isSubmitting}
                serverError={serverError}
              />
            )}

            {currentStep === 2 && (
              <Step2FarmProfile
                farmLocation={profile.farmLocation}
                onChange={(updates) => updateSection("farmLocation", updates)}
                onNext={nextStep}
                onPrev={prevStep}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <Step3FarmingStatus
                farmingStatus={profile.farmingStatus}
                activeFarming={profile.activeFarming}
                planningFarming={profile.planningFarming}
                onStatusChange={(status) => updateField("farmingStatus", status)}
                onActiveChange={(updates) => updateSection("activeFarming", updates)}
                onPlanningChange={(updates) => updateSection("planningFarming", updates)}
                onNext={nextStep}
                onPrev={prevStep}
                errors={errors}
              />
            )}

            {currentStep === 4 && (
              <Step4Review
                profile={profile}
                onGoToStep={goToStep}
                onComplete={completeOnboarding}
                onPrev={prevStep}
                isSubmitting={isSubmitting}
                serverError={serverError}
              />
            )}

            {currentStep === 5 && (
              <Step5Success
                profile={profile}
                onReset={resetForm}
                onEnterDashboard={handleEnterDashboardFromOnboarding}
              />
            )}
          </div>
        )}

        {/* VIEW 2: MAIN DASHBOARD */}
        {activeView === "dashboard" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <DashboardHeader
              profile={profile}
              lifecycleState={lifecycleState}
              onOpenCropSelector={() => setIsCropModalOpen(true)}
              onNavigate={(view) => {
                setActiveView(view);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* 7-Day Weather Section near top */}
            <WeatherSection farmLocation={profile?.farmLocation} />

            {/* 7-Day APMC Mandi Price Intelligence immediately after weather */}
            <MandiPriceSection
              activeCrop={activeCropName}
              farmLocation={profile?.farmLocation}
              onNavigate={(view) => {
                setActiveView(view);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* Crop Life-Cycle Monitoring & Tasks */}
            <CropLifecycleSection
              lifecycleState={lifecycleState}
              onToggleTask={handleToggleTask}
              onNavigate={(view) => {
                setActiveView(view);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* 4 Feature Hub Cards */}
            <AgriculturalFeatureCards
              onNavigate={(view) => {
                setActiveView(view);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}

        {/* VIEW 3: CROP LIFE-CYCLE & INTERACTIVE CALENDAR PAGE */}
        {activeView === "lifecycle" && (
          <CropLifecyclePage
            lifecycleState={lifecycleState}
            onToggleTask={handleToggleTask}
            onRescheduleTask={handleRescheduleTask}
            onUpdateNote={handleUpdateNote}
            onOpenCropSelector={() => setIsCropModalOpen(true)}
            onBackToDashboard={() => {
              setActiveView("dashboard");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* VIEW 4: FULL MARKET INTELLIGENCE PAGE */}
        {activeView === "market" && (
          <MarketIntelligencePage
            initialCrop={activeCropName}
            farmLocation={profile?.farmLocation}
            onBackToDashboard={() => {
              setActiveView("dashboard");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* VIEW 5: CROP DISEASE DETECTION PAGE */}
        {activeView === "disease" && (
          <DiseaseDetectionPage
            onBackToDashboard={() => {
              setActiveView("dashboard");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* VIEW 6: SMART IRRIGATION PAGE */}
        {activeView === "irrigation" && (
          <SmartIrrigationPage
            farmLocation={profile?.farmLocation}
            onBackToDashboard={() => {
              setActiveView("dashboard");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {/* VIEW 7: AGRICULTURAL MARKETPLACE */}
        {activeView === "marketplace" && (
          <MarketplacePage
            onBackToDashboard={() => {
              setActiveView("dashboard");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal: Crop Recommendation & Smart Soil Analysis */}
      <CropRecommendationModal
        isOpen={isCropModalOpen}
        profile={profile}
        onConfirmCrop={handleConfirmCrop}
        onClose={() => setIsCropModalOpen(false)}
      />

      {/* Modal: Farmer Login */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(user) => {
          if (user) {
            updateSection("account", {
              firstName: user.username?.split("_")[0] || "",
              lastName: user.username?.split("_")[1] || "",
              email: user.email || ""
            });
            if (user.farm_size) {
              updateSection("farmLocation", { farmSize: String(user.farm_size) });
            }
          }
        }}
      />
    </div>
  );
}

export default App;
