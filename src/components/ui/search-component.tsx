import React, { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  containerClassName?: string;
}

export const Input = ({
  label,
  className = "",
  containerClassName = "",
  id,
  ...props
}: InputProps) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={`px-4 py-2 border border-slate-300 rounded-lg outline-none transition-all 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent 
          placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-500
          ${className}`}
      />
    </div>
  );
};
