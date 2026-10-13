import React, { useState } from "react";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { ProgressSteps } from "./components/common/ProgressSteps";
import { Step1Account } from "./components/onboarding/Step1Account";
import { Step2FarmProfile } from "./components/onboarding/Step2FarmProfile";
import { Step3FarmingStatus } from "./components/onboarding/Step3FarmingStatus";
import { Step4Review } from "./components/onboarding/Step4Review";
import { Step5Success } from "./components/onboarding/Step5Success";
import { LoginModal } from "./components/auth/LoginModal";
import { useOnboarding } from "./hooks/useOnboarding";
import { RotateCcw, Sparkles } from "lucide-react";

export function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col font-sans text-stone-800 antialiased selection:bg-brand-mint selection:text-brand-green">
      {/* Top Navigation */}
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onLoadDemo={loadDemoFixture}
        onResetDraft={resetForm}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Autosave Draft Notification Banner */}
        {draftRestored && currentStep < 5 && (
          <div className="mb-6 p-3.5 rounded-xl bg-brand-mint/40 border border-brand-leaf/30 text-xs text-brand-green flex items-center justify-between shadow-soft animate-fade-in">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-brand-emerald shrink-0" />
              <span>
                <strong>Progress Restored:</strong> We retrieved your previous onboarding draft from this browser. Plaintext passwords are never saved.
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

        {/* 4-Step Progress Tracker */}
        <ProgressSteps currentStep={currentStep} onStepClick={goToStep} />

        {/* Step 1: Welcome & Account Creation */}
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

        {/* Step 2: Farm Profile */}
        {currentStep === 2 && (
          <Step2FarmProfile
            farmLocation={profile.farmLocation}
            onChange={(updates) => updateSection("farmLocation", updates)}
            onNext={nextStep}
            onPrev={prevStep}
            errors={errors}
          />
        )}

        {/* Step 3: Farming Status (Branch A / Branch B) */}
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

        {/* Step 4: Review and Confirmation */}
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

        {/* Step 5: Success & Phase 2 Roadmap Placeholder */}
        {currentStep === 5 && (
          <Step5Success profile={profile} onReset={resetForm} />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Modal for Returning Users */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(user) => {
          // If returning user logged in, we can prefill their name/email
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
