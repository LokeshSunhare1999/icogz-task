import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  variant = "primary",
  className = ""
}) {
  const baseClasses = "flex h-[44px] w-full flex-row items-center justify-center rounded-[10px] text-[16px] font-semibold leading-[28px] tracking-[-0.01em] transition-all duration-300";
  
  const variants = {
    primary: `bg-[#7B68EE] text-white hover:bg-[#6B5ADE] ${
      disabled ? "cursor-not-allowed bg-[#BAC8D3]" : "cursor-pointer"
    }`,
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-white" />
      ) : (
        children
      )}
    </button>
  );
}