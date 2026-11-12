import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="wrap">
        <p className="emergency" role="note">
          <Phone className="w-[18px] h-[18px] text-[var(--primary)]" /> In an
          emergency, call 112.
        </p>
        <div className="cta-box">
          <div>
            <h2 id="cta-title">
              Build a safer workplace — and a safer way home.
            </h2>
            <p>
              Bring SHIFTSAFE to your team, or start protecting your own
              journeys today.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/register/employee" className="btn btn-light">
              Get Started <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="/register/organisation"
              className="btn btn-outline-light"
            >
              Register your organisation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
