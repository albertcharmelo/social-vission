"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";

interface InputBaseProps {
  label?: string;
  helper?: string;
  error?: string;
  icon?: string;
  fullWidth?: boolean;
}

interface InputFieldProps
  extends InputBaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  as?: "input";
}

interface TextareaFieldProps
  extends InputBaseProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  as: "textarea";
  rows?: number;
}

type InputProps = InputFieldProps | TextareaFieldProps;

export function Input(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    label,
    helper,
    error,
    icon,
    fullWidth = true,
    as = "input",
    ...rest
  } = props;

  const isPassword =
    as === "input" && (rest as InputFieldProps).type === "password";
  const inputType = isPassword && showPassword ? "text" : (rest as InputFieldProps).type;

  const baseClasses = `
    bg-white border text-deep text-[15px] placeholder:text-stone
    rounded-[var(--radius-sm)] px-4 py-2.5 w-full
    transition-all outline-none
    focus:ring-2 focus:ring-calm/30 focus:border-sky
    ${icon ? "pl-11" : ""}
    ${isPassword ? "pr-11" : ""}
    ${error ? "border-blush" : "border-sage"}
  `;

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label className="block text-dusk text-sm font-medium mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span
            className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
            style={{ fontSize: "20px" }}
          >
            {icon}
          </span>
        )}
        {as === "textarea" ? (
          <textarea
            className={baseClasses}
            rows={(props as TextareaFieldProps).rows ?? 4}
            {...(rest as Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">)}
          />
        ) : (
          <input
            className={baseClasses}
            type={inputType}
            {...(rest as Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type">)}
          />
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone hover:text-dusk transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
      </div>
      {error && (
        <p className="text-blush text-xs mt-1 flex items-center gap-1">
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>error</span>
          {error}
        </p>
      )}
      {helper && !error && (
        <p className="text-stone text-xs mt-1">{helper}</p>
      )}
    </div>
  );
}
