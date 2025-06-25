import React from "react";

export default function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error = "",
  disabled = false,
  required = false,
  prefix = null,
  className = ""
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label className="text-[#606C85] text-sm font-medium capitalize leading-none">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full border-[1px] px-4 text-sm focus:outline-0 h-[42px] text-[#000000] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#A6A6A6] ${
            error ? "border-[#FF4747]" : "border-[#CDD4DF]"
          } focus:border-[2px] focus:border-[#7B68EE] ${
            prefix ? "pl-[70px]" : ""
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""} ${className}`}
        />
        {prefix && (
          <div className="absolute top-[12px] left-[16px] flex gap-1 items-center bg-gray-200 py-1 pl-1 pr-2 rounded-md">
            {prefix}
          </div>
        )}
      </div>
      {error && (
        <span className="text-[#FF4747] text-sm">{error}</span>
      )}
    </div>
  );
}