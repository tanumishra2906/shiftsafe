import Link from "next/link";
import { UserRound, Building2, MapPin, Check, ArrowRight } from "lucide-react";

export function PortalsSection() {
  return (
    <section className="sec" id="portals" aria-labelledby="portals-title">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">Three connected portals</span>
          <h2 id="portals-title">One network. Three perspectives.</h2>
          <p>
            Each portal is built for its people, connected by consent — and
            centred on the woman it protects.
          </p>
        </div>
        <div className="cards3">
          <article className="portal p-emp" tabIndex={0} role="region" aria-label="Employee Portal">
            <span
              className="icon"
              style={{ background: "var(--blush)", color: "var(--primary)" }}
            >
              <UserRound className="w-[22px] h-[22px]" />
            </span>
            <h3>Employee</h3>
            <span className="role">For women at work</span>
            <ul>
              <li>
                <Check className="w-[18px] h-[18px]" /> View and manage upcoming
                shifts
              </li>
              <li>
                <Check className="w-[18px] h-[18px]" /> Share My Journey with
                ride details
              </li>
              <li>
                <Check className="w-[18px] h-[18px]" /> One-tap Emergency SOS
              </li>
              <li>
                <Check className="w-[18px] h-[18px]" /> Anonymous or
                confidential complaints
              </li>
              <li>
                <Check className="w-[18px] h-[18px]" /> AI safety assistant with
                verified helplines
              </li>
            </ul>
            <Link href="/employee" className="link">
              Enter Employee portal{" "}
              <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
          </article>

          <article className="portal p-org" tabIndex={0} role="region" aria-label="Organisation Portal">
            <span className="icon">
              <Building2 className="w-[22px] h-[22px]" />
            </span>
            <h3>Organisation</h3>
            <span className="role">For HR &amp; safety teams</span>
            <ul>
              <li>
                <Check className="w-[18px] h-[18px]" /> Plan shifts with safety
                in mind
              </li>
              <li>
                <Check className="w-[18px] h-[18px]" /> Receive
                employee-approved, structured complaints
              </li>
              <li>
                <Check className="w-[18px] h-[18px]" /> SOS alerts with
                acknowledgement and audit trail
              </li>
              <li>
                <Check className="w-[18px] h-[18px]" /> Aggregated safety
                reports
              </li>
              <li>
                <Check className="w-[18px] h-[18px]" /> Role-based access for HR
                and Internal Committee
              </li>
            </ul>
            <Link href="/organisation" className="link text-white">
              Enter Organisation portal{" "}
              <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
          </article>

          <article className="portal p-tc" tabIndex={0} role="region" aria-label="Trusted Contact Portal">
            <span
              className="icon"
              style={{ background: "var(--cream)", color: "var(--primary)" }}
            >
              <MapPin className="w-[22px] h-[22px]" />
            </span>
            <h3>Trusted Contact</h3>
            <span className="role">For family &amp; friends</span>
            <ul>
              <li>
                <Check className="w-[18px] h-[18px]" /> View journeys she
                chooses to share
              </li>
              <li>
                <Check className="w-[18px] h-[18px]" /> Arrival confirmations
              </li>
              <li>
                <Check className="w-[18px] h-[18px]" /> SOS alerts
              </li>
              <li>
                <Check className="w-[18px] h-[18px]" /> Only what she chooses to
                share
              </li>
            </ul>
            <Link href="/companion" className="link">
              Enter Trusted Contact portal{" "}
              <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
