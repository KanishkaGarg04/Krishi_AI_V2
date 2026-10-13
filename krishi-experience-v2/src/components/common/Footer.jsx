import React from "react";
import { ShieldCheck, PhoneCall, HelpCircle, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-border bg-brand-surface py-8 text-stone-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Privacy Guarantee */}
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-brand-mint/40 text-brand-green shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-800 text-sm mb-1">Farmer Data Privacy</h4>
              <p className="text-stone-500 leading-relaxed">
                Your farm profile and land details are encrypted. We never share farmer information with third parties.
              </p>
            </div>
          </div>

          {/* Kisan Helpline */}
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-amber-50 text-brand-amber shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-800 text-sm mb-1">Need Immediate Agronomy Help?</h4>
              <p className="text-stone-500 leading-relaxed">
                Call the National Kisan Call Centre at <span className="font-semibold text-stone-800">1800-180-1551</span> (Toll-Free, 6 AM to 10 PM).
              </p>
            </div>
          </div>

          {/* Phase 1 Scope Clarification */}
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-600 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-800 text-sm mb-1">Phase 1 Onboarding Focus</h4>
              <p className="text-stone-500 leading-relaxed">
                Collecting essential agro-climatic parameters. AI crop recommendation, disease detection, and mandi analytics activate in Phase 2.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between text-stone-400 gap-2">
          <p>
            &copy; {new Date().getFullYear()} Krishi AI Platform. Built with care for Indian farmers.
          </p>
          <p className="flex items-center space-x-1">
            <span>Phase 1 Isolated Release &bull; Port 5174</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
