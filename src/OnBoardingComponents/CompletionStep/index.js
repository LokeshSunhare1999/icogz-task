import React from "react";
import FormCard from "../../commonComponents/FormCard";
import Button from "../../commonComponents/Button";

export default function CompletionStep({
  formData,
  onLaunch,
  loading = false
}) {
  return (
    <FormCard className="text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-[#7B68EE] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        
        <h2 className="text-[28px] font-semibold leading-[32px] tracking-[-0.01em] text-[#000] mb-4">
          Congratulations, {formData.displayName || 'User'}!
        </h2>
        
        <p className="text-[16px] leading-[24px] text-[#646464] font-medium">
          You have completed onboarding, you can start using the Eden!
        </p>
      </div>
      
      <Button
        onClick={onLaunch}
        loading={loading}
      >
        Launch Eden
      </Button>
    </FormCard>
  );
}
