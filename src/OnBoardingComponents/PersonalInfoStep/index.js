import React from "react";
import FormCard from "../../commonComponents/FormCard";
import FormInput from "../../commonComponents/FormInput";
import Button from "../../commonComponents/Button";
import { NAME_REGEX } from "@/constant";

export default function PersonalInfoStep({
  formData,
  setFormData,
  onNext,
  errors = {},
  loading = false
}) {
  const handleInputChange = (field, value) => {
    let updatedValue = value;

    if (field === "fullName") {
      updatedValue = value.replace(NAME_REGEX, "");
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: updatedValue
    }));
  };

  const isFormValid = formData.fullName.trim() && formData.displayName.trim();

  return (
    <FormCard
      title="Welcome! First things first..."
      subtitle="You can always change them later."
      className="max-w-md"
      subClassName="flex w-full flex-col gap-5"
    >
      <div className="flex w-full flex-col gap-5">
        <FormInput
          label="Full Name"
          value={formData.fullName}
          onChange={(value) => handleInputChange('fullName', value)}
          placeholder="Steve Jobs"
          error={errors.fullName}
          className="rounded-lg"
        />

        <FormInput
          label="Display Name"
          value={formData.displayName}
          onChange={(value) => handleInputChange('displayName', value)}
          placeholder="Steve"
          error={errors.displayName}
          className="rounded-lg"
        />

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