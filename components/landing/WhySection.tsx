import { MoonStar, Route, MessageSquareWarning } from "lucide-react";

export function WhySection() {
  return (
    <section className="sec" aria-labelledby="why-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Why it matters</span>
          <h2 id="why-title">Safety shouldn&apos;t end when the shift does</h2>
          <p>
            Night shifts, long commutes and unreported incidents leave too many
            women navigating risk alone. SHIFTSAFE closes the gaps between
            workplace, road and home.
          </p>
        </div>
        <div className="cards3">
          <article className="why-card" tabIndex={0} role="region" aria-label="Late shifts carry hidden risk">
            <span
              className="icon"
              style={{ background: "var(--blush)", color: "var(--primary)" }}
            >
              <MoonStar className="w-[22px] h-[22px]" />
            </span>
            <div className="stat">After hours</div>
            <h3>Late shifts carry hidden risk</h3>
            <p>
              Commutes before dawn or after dark are when women feel least safe —
              and when support is hardest to reach.
            </p>
          </article>
          <article className="why-card" tabIndex={0} role="region" aria-label="Journeys go unseen">
            <span
              className="icon"
              style={{ background: "var(--peri-soft)", color: "var(--peri)" }}
            >
              <Route className="w-[22px] h-[22px]" />
            </span>
            <div className="stat">Every ride</div>
            <h3>Journeys go unseen</h3>
            <p>
              Cab rides and route changes often happen with no one aware — until
              something has already gone wrong.
            </p>
          </article>
          <article className="why-card" tabIndex={0} role="region" aria-label="Workplace concerns stay unreported">
            <span
              className="icon"
              style={{ background: "var(--rose)", color: "var(--maroon)" }}
            >
              <MessageSquareWarning className="w-[22px] h-[22px]" />
            </span>
            <div className="stat">Silence</div>
            <h3>Workplace concerns stay unreported</h3>
            <p>
              Fear of exposure keeps harassment hidden. Women need safe,
              confidential channels that organisations can act on.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
