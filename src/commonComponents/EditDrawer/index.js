import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button";

export const EditDrawer = ({
  isOpen,
  onClose,
  workspace,
  onUpdate,
  isUpdating
}) => {
  const [formData, setFormData] = useState({
    name: workspace?.name || '',
    url: workspace?.url || '',
    type: workspace?.type || 'myself',
  });

  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (workspace) {
      setFormData({
        name: workspace.name,
        url: workspace.url,
        type: workspace.type,
      });
    }
  }, [workspace]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Workspace name is required';
    }

    if (!formData.url.trim()) {
      newErrors.url = 'Workspace URL is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.url)) {
      newErrors.url = 'URL can only contain lowercase letters, numbers, and hyphens';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onUpdate({
        ...workspace,
        ...formData
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: workspace?.name || '',
      url: workspace?.url || '',
      type: workspace?.type || 'myself',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[1.5px] bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Edit Workspace</h2>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Image
                src="/crossButton.svg"
                alt="cross icon"
                width={20}
                height={20}
              />

            </button>
          </div>
        </div>

        <form className="p-6 flex flex-col">
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workspace Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter workspace name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workspace URL *
              </label>
              <div className="flex items-center">
                {/* <span className="text-sm text-gray-500 mr-2">www.eden.com/</span> */}
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => handleInputChange('url', e.target.value.toLowerCase())}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.url ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="workspace-url"
                />
              </div>
              {errors.url && (
                <p className="mt-1 text-sm text-red-600">{errors.url}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workspace Type
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="myself"
                    checked={formData.type === 'myself'}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="mr-3"
                  />
                  <Image
                    src="/user.svg"
                    alt="User icon"
                    width={20}
                    height={20}
                  />
                  <div className="font-medium ml-2">For myself</div>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    value="team"
                    checked={formData.type === 'team'}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="mr-3"
                  />
                  <Image
                    src="/teamWork.svg"
                    alt="team icon"
                    width={20}
                    height={20}
                  />
                  <div className="font-medium ml-2">With my team</div>
                </label>
              </div>
            </div>
          </div>
          <div className="my-5 border-t-2 border-gray-200 justify-end"></div>
          <div className="flex gap-3">
            <Button
              onClick={handleCancel}
              disabled={isUpdating}
              variant="secondary" // assuming you support variants like 'outline'
              className="flex-1"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isUpdating}
              loading={isUpdating}
              className="flex-1"
            // variant="bg-blue-600"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
