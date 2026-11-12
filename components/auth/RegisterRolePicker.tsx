"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  {
    value: "employee",
    title: "Employee",
    description:
      "Manage shifts, share journeys and raise concerns on your terms.",
    image: "girl-laptop",
    tone: "rose",
  },
  {
    value: "organisation",
    title: "Organisation",
    description: "Support your teams with safety tools for HR and safety leads.",
    image: "building",
    tone: "peri",
  },
  {
    value: "contact",
    title: "Trusted Contact",
    description:
      "Stay connected to someone who has invited you into her circle.",
    image: "three-women-shield",
    tone: "cream",
  },
] as const;

const registrationPaths = {
  employee: "/register/employee",
  organisation: "/register/organisation",
  contact: "/register/contact",
} as const;

export function RegisterRolePicker() {
  const [selectedRole, setSelectedRole] = useState<
    keyof typeof registrationPaths | ""
  >("");
  const router = useRouter();

  return (
    <>
      <div className="auth-roles-heading">
        <h1 id="register-title">How will you use SHIFTSAFE?</h1>
        <p>
          Choose the account that fits you. Each portal is connected, but every
          person stays in control of their own information.
        </p>
      </div>
      <fieldset aria-labelledby="register-title" className="auth-roles">
        <legend className="sr-only">Choose an account type</legend>
        {roles.map((role) => (
          <label
            className={`auth-role auth-role--${role.tone}`}
            key={role.value}
          >
            <input
              checked={selectedRole === role.value}
              className="auth-role-input"
              name="role"
              onChange={() => setSelectedRole(role.value)}
              type="radio"
              value={role.value}
            />
            <span aria-hidden="true" className="auth-role-indicator">
              <Check />
            </span>
            <span aria-hidden="true" className="auth-role-art">
              <Image
                alt=""
                className="auth-role-image"
                fill
                loading="eager"
                sizes="(max-width: 900px) 110px, 220px"
                src={`/doodles/${role.image}.png`}
              />
            </span>
            <span className="auth-role-copy">
              <span className="auth-role-title">{role.title}</span>
              <span className="auth-role-description">
                {role.description}
              </span>
            </span>
          </label>
        ))}
      </fieldset>
      <div className="auth-roles-actions">
        <Button
          className="auth-button auth-role-continue"
          disabled={!selectedRole}
          onClick={() => {
            if (selectedRole) {
              router.push(registrationPaths[selectedRole]);
            }
          }}
          type="button"
        >
          Continue
          <ArrowRight aria-hidden="true" />
        </Button>
        <p>
          Already have an account?{" "}
          <Link href="/login">Log in</Link>
        </p>
      </div>
    </>
  );
}
