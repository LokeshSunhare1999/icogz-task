import React from "react";

export default function SelectionCard({
  title,
  description,
  icon,
  selected = false,
  onClick,
  className = ""
}) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col py-6 px-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:border-[#7B68EE] ${
        selected ? "border-[#7B68EE] bg-[#7B68EE]/5" : "border-gray-200 bg-white"
      } ${className}`}
    >
      {icon && (
        <div className={`mb-4 ${selected ? "text-[#7B68EE]" : "text-gray-600"}`}>
          {icon}
        </div>
      )}
      <h3 className={`text-md font-semibold mb-2 ${selected ? "text-[#7B68EE]" : "text-gray-900"}`}>
        {title}
      </h3>
      <p className="text-sm text-[#9B9B9B]">
        {description}
      </p>
    </div>
  );
}
