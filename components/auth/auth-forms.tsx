"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Building2,
  CircleAlert,
  CircleCheck,
  Info,
  Layers,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Ticket,
  User,
  UserCog,
} from "lucide-react";
import {
  login,
  registerEmployee,
  registerOrganisation,
} from "@/app/actions/auth";
import { AuthField } from "@/components/auth/AuthField";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";
import type { AuthActionState } from "@/lib/auth/action-state";

const initialState: AuthActionState = {};

function FormMessage({ state }: { state: AuthActionState }) {
  if (!state.message) {
    return null;
  }

  const MessageIcon = state.success ? CircleCheck : CircleAlert;

  return (
    <p
      aria-live="polite"
      className={`auth-message ${
        state.success ? "auth-message--success" : "auth-message--error"
      }`}
      role={state.success ? "status" : "alert"}
    >
      <MessageIcon aria-hidden="true" />
      <span>{state.message}</span>
      {state.showLoginLink && (
        <Link className="auth-inline-link" href="/login">
          Log in
        </Link>
      )}
    </p>
  );
}

function AuthFoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <p className="auth-foot">{children}</p>;
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <>
      <h1>Welcome back</h1>
      <p className="auth-lede">Log in to your SHIFTSAFE account.</p>
      <form action={formAction} className="auth-form" noValidate>
        <AuthField
          autoComplete="email"
          errors={state.fieldErrors}
          icon={AtSign}
          label="Email"
          name="email"
          placeholder="you@company.com"
          type="email"
        />
        <AuthField
          autoComplete="current-password"
          errors={state.fieldErrors}
          icon={LockKeyhole}
          label="Password"
          name="password"
          placeholder="Your password"
          type="password"
        />
        <div className="auth-between">
          <Link className="auth-inline-link" href="/forgot-password">
            Forgot password?
          </Link>
        </div>
        <FormMessage state={state} />
        <AuthSubmitButton>Log in</AuthSubmitButton>
      </form>
      <AuthFoot>
        New to SHIFTSAFE?{" "}
        <Link className="auth-inline-link" href="/register">
          Get started
        </Link>
      </AuthFoot>
    </>
  );
}

export function EmployeeRegistrationForm() {
  const [state, formAction] = useActionState(registerEmployee, initialState);

  return (
    <>
      <Link className="auth-back" href="/register">
        <ArrowLeft aria-hidden="true" />
        Change account type
      </Link>
      <h1>Create your account</h1>
      <p className="auth-lede">Set up your personal SHIFTSAFE profile.</p>
      <form action={formAction} className="auth-form" noValidate>
        <AuthField
          autoComplete="name"
          errors={state.fieldErrors}
          icon={User}
          label="Full name"
          name="fullName"
          placeholder="Ananya Sharma"
        />
        <div className="auth-form-row">
          <AuthField
            autoComplete="email"
            errors={state.fieldErrors}
            icon={Mail}
            label="Email"
            name="email"
            placeholder="you@email.com"
            type="email"
          />
          <AuthField
            autoComplete="tel"
            errors={state.fieldErrors}
            icon={Phone}
            label="Phone"
            name="phone"
            placeholder="+91 98765 43210"
            type="tel"
          />
        </div>
        <AuthField
          autoComplete="new-password"
          errors={state.fieldErrors}
          hint="Use at least 8 characters."
          icon={LockKeyhole}
          label="Password"
          name="password"
          placeholder="At least 8 characters"
          type="password"
        />
        <AuthField
          errors={state.fieldErrors}
          icon={Ticket}
          label="Invite code"
          name="inviteCode"
          optional
          placeholder="e.g. ORG-4F7K"
          required={false}
        />
        <div className="auth-note">
          <Info aria-hidden="true" />
          <span>You can join your organisation later with an invite code.</span>
        </div>
        <FormMessage state={state} />
        <AuthSubmitButton>Create account</AuthSubmitButton>
      </form>
      <AuthFoot>
        Already have an account?{" "}
        <Link className="auth-inline-link" href="/login">
          Log in
        </Link>
      </AuthFoot>
    </>
  );
}

export function OrganisationRegistrationForm() {
  const [state, formAction] = useActionState(
    registerOrganisation,
    initialState
  );

  return (
    <>
      <Link className="auth-back" href="/register">
        <ArrowLeft aria-hidden="true" />
        Change account type
      </Link>
      <h1>Register your organisation</h1>
      <p className="auth-lede">
        Tell us about your organisation and its admin.
      </p>
      <form action={formAction} className="auth-form" noValidate>
        <div className="auth-form-row">
          <AuthField
            autoComplete="organization"
            errors={state.fieldErrors}
            icon={Building2}
            label="Organisation name"
            name="organisationName"
            placeholder="Acme Technologies"
          />
          <AuthField
            errors={state.fieldErrors}
            icon={Layers}
            label="Organisation type"
            name="organisationType"
            options={[
              "IT / Technology",
              "BPO / Customer support",
              "Healthcare",
              "Retail",
              "Manufacturing",
              "Hospitality",
              "Education",
              "Other",
            ]}
          />
        </div>
        <AuthField
          autoComplete="email"
          errors={state.fieldErrors}
          hint="This email is used for the admin account."
          icon={Mail}
          label="Official email"
          name="officialEmail"
          placeholder="hr@acme.com"
          type="email"
        />
        <AuthField
          autoComplete="street-address"
          errors={state.fieldErrors}
          icon={MapPin}
          label="Office address"
          multiline
          name="officeAddress"
          placeholder="Building, street, city, PIN code"
        />
        <div className="auth-form-row">
          <AuthField
            autoComplete="name"
            errors={state.fieldErrors}
            icon={UserCog}
            label="Admin name"
            name="adminName"
            placeholder="Priya Menon"
          />
          <AuthField
            autoComplete="tel"
            errors={state.fieldErrors}
            icon={Phone}
            label="Contact number"
            name="contactNumber"
            placeholder="+91 80 4000 1234"
            type="tel"
          />
        </div>
        <AuthField
          autoComplete="new-password"
          errors={state.fieldErrors}
          hint="Use at least 8 characters."
          icon={LockKeyhole}
          label="Password"
          name="password"
          placeholder="At least 8 characters"
          type="password"
        />
        <FormMessage state={state} />
        <AuthSubmitButton>Submit for verification</AuthSubmitButton>
      </form>
      <AuthFoot>
        Already registered?{" "}
        <Link className="auth-inline-link" href="/login">
          Log in
        </Link>
      </AuthFoot>
    </>
  );
}

export function ContactRegistrationPanel() {
  return (
    <>
      <Link className="auth-back" href="/register">
        <ArrowLeft aria-hidden="true" />
        Change account type
      </Link>
      <h1>Join as a trusted contact</h1>
      <p className="auth-lede">Create your account to accept an invitation.</p>
      <div className="auth-coming-soon" role="status">
        <ShieldCheck aria-hidden="true" />
        <div>
          <strong>Coming soon</strong>
          <p>
            Trusted contact registration will be available in a future update.
          </p>
        </div>
      </div>
      <ButtonForComingSoon />
      <AuthFoot>
        Already have an account?{" "}
        <Link className="auth-inline-link" href="/login">
          Log in
        </Link>
      </AuthFoot>
    </>
  );
}

function ButtonForComingSoon() {
  return (
    <button
      className="auth-button auth-soon-button"
      disabled
      type="button"
    >
      Accept invitation
      <ArrowRight aria-hidden="true" />
    </button>
  );
}

export function ForgotPasswordPanel() {
  return (
    <>
      <Link className="auth-back" href="/login">
        <ArrowLeft aria-hidden="true" />
        Back to login
      </Link>
      <h1>Forgot password?</h1>
      <p className="auth-lede">
        Password recovery isn&apos;t available yet.
      </p>
      <div className="auth-coming-soon" role="status">
        <Info aria-hidden="true" />
        <div>
          <strong>Coming soon</strong>
          <p>
            You can return to the login page and try again later.
          </p>
        </div>
      </div>
      <AuthFoot>
        <Link className="auth-inline-link" href="/login">
          Return to login
        </Link>
      </AuthFoot>
    </>
  );
}
