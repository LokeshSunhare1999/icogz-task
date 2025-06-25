import React from "react";
import FormCard from "../../commonComponents/FormCard";
import SelectionCard from "../../commonComponents/SelectionCard";
import Button from "../../commonComponents/Button";
import Image from "next/image";

export default function WorkspaceTypeStep({
  formData,
  setFormData,
  onNext,
  loading = false
}) {
  const handleSelectionChange = (type) => {
    setFormData(prev => ({
      ...prev,
      workspaceType: type
    }));
  };

  const workspaceOptions = [
    {
      id: "myself",
      title: "For myself",
      description: "Write better. Think more clearly. Stay organized.",
      icon: (
        <Image
          src="/user.svg"
          alt="User icon"
          width={24}
          height={24}
        />
      )
    },
    {
      id: "team",
      title: "With my team",
      description: "Wikis, docs, tasks & projects, all in one place.",
      icon: (
        <Image
          src="/teamWork.svg"
          alt="User icon"
          width={24}
          height={24}
        />
      )
    }
  ];

  return (
    <FormCard
      title="How are you planning to use Eden?"
      subtitle="We'll streamline your setup experience accordingly."
    >
      <div className="flex w-full max-w-sm gap-4 mb-6">
        {workspaceOptions.map((option) => (
          <SelectionCard
            key={option.id}
            title={option.title}
            description={option.description}
            icon={option.icon}
            selected={formData.workspaceType === option.id}
            onClick={() => handleSelectionChange(option.id)}
          />
        ))}
      </div>

      <Button
        onClick={onNext}
        disabled={!formData.workspaceType}
        loading={loading}
      >
        Create Workspace
      </Button>
    </FormCard>
  );
}