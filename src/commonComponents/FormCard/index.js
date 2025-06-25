import React from "react";

export default function FormCard({
  children,
  title,
  subtitle,
  className = "",
  subClassName = ""
}) {
  return (
    <div className={`flex w-full mx-auto flex-col items-center justify-center p-8 ${className}`}>
      {title && (
        <div className="flex w-full flex-col mb-8">
          <h2 className="text-[26px] font-semibold leading-[32px] tracking-[-0.01em] text-[#000] text-center mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[14px] leading-[24px] text-[#606C85] font-medium text-center">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={`${subClassName}`}>
        {children}
      </div>
    </div>
  );
}
