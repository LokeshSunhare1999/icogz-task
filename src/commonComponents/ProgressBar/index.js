import React from "react";

export default function ProgressBar({ currentStep, totalSteps = 4 }) {
  return (
    <div className="flex items-center justify-center mb-12">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isCompleted = stepNumber < currentStep;
        
        return (
          <React.Fragment key={stepNumber}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-1 ${
                isActive
                  ? "bg-[#7B68EE] text-white border-[#7B68EE]"
                  : "bg-white-200 text-gray-500 border-gray-300"
              }`}
            >
              {isCompleted ? "✓" : stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div
                className={`w-16 h-[2px] transition-all duration-300 ${
                  stepNumber < currentStep ? "bg-[#7B68EE]" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}