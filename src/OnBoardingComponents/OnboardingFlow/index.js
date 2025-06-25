"use client";
import React, { useState } from "react";
import { USER_DETAILS, ONBOARDING_STEPS } from "../../constant";
import ProgressBar from "../../commonComponents/ProgressBar";
import PersonalInfoStep from "../PersonalInfoStep";
import WorkspaceTypeStep from "../WorkspaceTypeStep";
import WorkspaceSetupStep from "../WorkspaceSetupStep";
import CompletionStep from "../CompletionStep";

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(ONBOARDING_STEPS.PERSONAL_INFO);
  const [formData, setFormData] = useState(USER_DETAILS);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case ONBOARDING_STEPS.PERSONAL_INFO:
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Full name is required";
        }
        if (!formData.displayName.trim()) {
          newErrors.displayName = "Display name is required";
        }
        break;
      case ONBOARDING_STEPS.WORKSPACE_SETUP:
        if (!formData.workspaceName.trim()) {
          newErrors.workspaceName = "Workspace name is required";
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentStep(prev => prev + 1);
    setLoading(false);
    setErrors({});
  };

  const handleLaunch = async () => {
    setLoading(true);
    
    // Simulate final setup
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Launching Eden with data:", formData);
    alert("Welcome to Eden! 🎉");
    setLoading(false);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case ONBOARDING_STEPS.PERSONAL_INFO:
        return (
          <PersonalInfoStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            errors={errors}
            loading={loading}
          />
        );
      case ONBOARDING_STEPS.WORKSPACE_TYPE:
        return (
          <WorkspaceTypeStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            loading={loading}
          />
        );
      case ONBOARDING_STEPS.WORKSPACE_SETUP:
        return (
          <WorkspaceSetupStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
            errors={errors}
            loading={loading}
          />
        );
      case ONBOARDING_STEPS.COMPLETION:
        return (
          <CompletionStep
            formData={formData}
            onLaunch={handleLaunch}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#7B68EE] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Eden</span>
          </div>
        </div>

        <ProgressBar currentStep={currentStep} />

        {renderCurrentStep()}
      </div>
    </div>
  );
}