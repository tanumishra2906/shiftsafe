"use client";

import { useState } from "react";
import {
  ChevronDown,
  Eye,
  EyeOff,
  type LucideIcon,
} from "lucide-react";
import type { AuthActionState } from "@/lib/auth/action-state";

type AuthFieldProps = {
  name: string;
  label: string;
  icon: LucideIcon;
  type?: "text" | "email" | "tel" | "password";
  autoComplete?: string;
  placeholder?: string;
  hint?: string;
  errors?: AuthActionState["fieldErrors"];
  required?: boolean;
  optional?: boolean;
  multiline?: boolean;
  rows?: number;
  options?: string[];
};

export function AuthField({
  name,
  label,
  icon: Icon,
  type = "text",
  autoComplete,
  placeholder,
  hint,
  errors,
  required = true,
  optional = false,
  multiline = false,
  rows = 2,
  options,
}: AuthFieldProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const error = errors?.[name]?.[0];
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const inputType =
    type === "password" && passwordVisible ? "text" : type;

  return (
    <div className={`auth-field${error ? " auth-field--invalid" : ""}`}>
      <label className="auth-field-label" htmlFor={name}>
        {label}
        {optional ? <span className="auth-field-optional">Optional</span> : null}
      </label>
      <div className={`auth-control${multiline ? " auth-control--textarea" : ""}`}>
        <Icon aria-hidden="true" className="auth-leading-icon" />
        {options ? (
          <>
            <select
              aria-describedby={describedBy}
              aria-invalid={Boolean(error)}
              autoComplete={autoComplete}
              className="auth-input"
              defaultValue=""
              id={name}
              name={name}
              required={required}
            >
              <option disabled value="">
                Select type
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="auth-trailing-icon"
            />
          </>
        ) : multiline ? (
          <textarea
            aria-describedby={describedBy}
            aria-invalid={Boolean(error)}
            autoComplete={autoComplete}
            className="auth-input auth-textarea"
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            rows={rows}
          />
        ) : (
          <>
            <input
              aria-describedby={describedBy}
              aria-invalid={Boolean(error)}
              autoComplete={autoComplete}
              className="auth-input"
              id={name}
              name={name}
              placeholder={placeholder}
              required={required}
              type={inputType}
            />
            {type === "password" ? (
              <button
                aria-label={passwordVisible ? "Hide password" : "Show password"}
                aria-pressed={passwordVisible}
                className="auth-password-toggle"
                onClick={() => setPasswordVisible((visible) => !visible)}
                type="button"
              >
                {passwordVisible ? (
                  <EyeOff aria-hidden="true" />
                ) : (
                  <Eye aria-hidden="true" />
                )}
              </button>
            ) : null}
          </>
        )}
      </div>
      {hint ? (
        <span className="auth-hint" id={hintId}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="auth-error" id={errorId}>
          <span aria-hidden="true">!</span>
          {error}
        </span>
      ) : null}
    </div>
  );
}
