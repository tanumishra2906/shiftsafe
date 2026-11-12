import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { AuthDoodles } from "@/components/auth/AuthDoodles";

export type AuthSidePanel = {
  tone: "rose" | "peri" | "cream";
  eyebrow: string;
  eyebrowIcon: LucideIcon;
  title: string;
  description?: string;
  illustration: string;
  illustrationAlt: string;
  note: string;
  noteIcon: LucideIcon;
};

type AuthShellProps = {
  children: React.ReactNode;
  side?: AuthSidePanel;
};

export function AuthShell({ children, side }: AuthShellProps) {
  return (
    <div className="auth-shell">
      <AuthDoodles />
      <header className="auth-topbar">
        <Link aria-label="SHIFTSAFE home" className="auth-logo" href="/">
          <span className="auth-logo-mark">
            <ShieldCheck aria-hidden="true" />
          </span>
          <span>SHIFTSAFE</span>
        </Link>
      </header>

      <main className="auth-main">
        {side ? (
          <div className="auth-card">
            <aside className={`auth-side auth-side--${side.tone}`}>
              <div className="auth-side-copy">
                <span className="auth-eyebrow">
                  <side.eyebrowIcon aria-hidden="true" />
                  {side.eyebrow}
                </span>
                <h2>{side.title}</h2>
                {side.description ? <p>{side.description}</p> : null}
              </div>
              <div aria-label={side.illustrationAlt} className="auth-art" role="img">
                <Image
                  alt=""
                  className="auth-art-image"
                  fill
                  loading="eager"
                  sizes="(max-width: 560px) 1px, (max-width: 900px) 130px, 300px"
                  src={`/doodles/${side.illustration}.png`}
                />
              </div>
              <div className="auth-side-note">
                <side.noteIcon aria-hidden="true" />
                <span>{side.note}</span>
              </div>
            </aside>
            <section className="auth-form-pane">{children}</section>
          </div>
        ) : (
          <section className="auth-role-card">{children}</section>
        )}
      </main>

      <footer className="auth-page-foot">
        SHIFTSAFE supports safety and reporting. It is not a replacement for
        emergency services. In an emergency, call 112.
      </footer>
    </div>
  );
}
