"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  login,
  registerEmployee,
  registerOrganisation,
} from "@/app/actions/auth";
import type { AuthActionState } from "@/lib/auth/action-state";

const initialState: AuthActionState = {};
const inputClassName =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function FormField({
  name,
  label,
  type = "text",
  autoComplete,
  required = true,
  errors,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  errors?: AuthActionState["fieldErrors"];
}) {
  const errorId = `${name}-error`;
  const error = errors?.[name]?.[0];

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        className={inputClassName}
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p className="text-sm text-destructive" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FormMessage({ state }: { state: AuthActionState }) {
  return state.message ? (
    <p
      aria-live="polite"
      className={`text-sm ${state.success ? "text-foreground" : "text-destructive"}`}
      role="status"
    >
      {state.message}
    </p>
  ) : null;
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <FormField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        errors={state.fieldErrors}
      />
      <FormField
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        errors={state.fieldErrors}
      />
      <FormMessage state={state} />
      <Button className="h-11 w-full" disabled={pending} type="submit">
        {pending ? "Signing in..." : "Log in"}
      </Button>
    </form>
  );
}

export function EmployeeRegistrationForm() {
  const [state, formAction, pending] = useActionState(
    registerEmployee,
    initialState
  );

  return (
    <form action={formAction} className="grid gap-5">
      <FormField
        name="fullName"
        label="Full name"
        autoComplete="name"
        errors={state.fieldErrors}
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        errors={state.fieldErrors}
      />
      <FormField
        name="phone"
        label="Phone number"
        type="tel"
        autoComplete="tel"
        errors={state.fieldErrors}
      />
      <FormField
        name="password"
        label="Password (at least 8 characters)"
        type="password"
        autoComplete="new-password"
        errors={state.fieldErrors}
      />
      <FormField
        name="inviteCode"
        label="Organisation invite code (optional)"
        required={false}
        errors={state.fieldErrors}
      />
      <FormMessage state={state} />
      <Button className="h-11 w-full" disabled={pending} type="submit">
        {pending ? "Creating account..." : "Create employee account"}
      </Button>
    </form>
  );
}

export function OrganisationRegistrationForm() {
  const [state, formAction, pending] = useActionState(
    registerOrganisation,
    initialState
  );

  return (
    <form action={formAction} className="grid gap-5">
      <FormField
        name="organisationName"
        label="Organisation name"
        errors={state.fieldErrors}
      />
      <FormField
        name="officialEmail"
        label="Official email"
        type="email"
        autoComplete="email"
        errors={state.fieldErrors}
      />
      <FormField
        name="organisationType"
        label="Organisation type"
        errors={state.fieldErrors}
      />
      <FormField
        name="officeAddress"
        label="Office address"
        autoComplete="street-address"
        errors={state.fieldErrors}
      />
      <FormField
        name="contactNumber"
        label="Contact number"
        type="tel"
        autoComplete="tel"
        errors={state.fieldErrors}
      />
      <FormField
        name="adminName"
        label="Admin name"
        autoComplete="name"
        errors={state.fieldErrors}
      />
      <FormField
        name="password"
        label="Password (at least 8 characters)"
        type="password"
        autoComplete="new-password"
        errors={state.fieldErrors}
      />
      <FormMessage state={state} />
      <Button className="h-11 w-full" disabled={pending} type="submit">
        {pending ? "Creating account..." : "Register organisation"}
      </Button>
    </form>
  );
}
