import React from "react";
import FormCard from "../../commonComponents/FormCard";
import FormInput from "../../commonComponents/FormInput";
import Button from "../../commonComponents/Button";

export default function WorkspaceSetupStep({
  formData,
  setFormData,
  onNext,
  errors = {},
  loading = false
}) {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.workspaceName.trim();

  return (
    <FormCard
      title="Let's set up a home for all your work"
      subtitle="You can always create another workspace later."
    >
      <div className="flex w-full flex-col gap-5">
        <FormInput
          label="Workspace Name"
          value={formData.workspaceName}
          onChange={(value) => handleInputChange('workspaceName', value)}
          placeholder="Eden"
          error={errors.workspaceName}
          // required
          className="rounded-lg"
        />
        
        <div className="flex flex-col gap-2">
          <label className="text-[#606C85] text-sm font-medium capitalize leading-none">
            Workspace URL <span className="text-gray-400">(optional)</span>
          </label>
          <div className=" flex items-center gap-2 border rounded-lg pl-2 bg-[#F5F5F5]">
            <span className=" text-sm text-gray-600 whitespace-nowrap">www.eden.com/</span>
            <FormInput
              value={formData.workspaceUrl}
              onChange={(value) => handleInputChange('workspaceUrl', value)}
              placeholder="Example"
              error={errors.workspaceUrl}
              className="flex-1 z-2 rounded-r-lg bg-[#ffff]"
            />
          </div>
        </div>
        
        <Button
          onClick={onNext}
          disabled={!isFormValid}
          loading={loading}
        >
          Create Workspace
        </Button>
      </div>
    </FormCard>
  );
}