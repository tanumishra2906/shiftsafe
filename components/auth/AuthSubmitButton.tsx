"use client";

import { useFormStatus } from "react-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthSubmitButton({ children }: { children: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-busy={pending}
      className="auth-button"
      disabled={pending}
      type="submit"
    >
      {pending ? (
        <>
          <span aria-hidden="true" className="auth-spinner" />
          Please wait...
        </>
      ) : (
        <>
          {children}
          <ArrowRight aria-hidden="true" />
        </>
      )}
    </Button>
  );
}
