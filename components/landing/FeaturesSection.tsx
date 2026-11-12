import { Route, ShieldCheck, FileText, BellRing, ArrowRight } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="sec ai" id="features" aria-labelledby="ai-title">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">AI features</span>
          <h2 id="ai-title">Intelligence that looks out for her</h2>
          <p>
            Four AI capabilities that assist while you stay in control. SOS
            never depends on AI.
          </p>
        </div>
        <div className="ai-grid">
          <article className="ai-card" tabIndex={0} role="region" aria-label="Commute anomaly detection">
            <span className="icon">
              <Route className="w-[22px] h-[22px]" />
            </span>
            <div>
              <h3>Commute anomaly detection</h3>
              <p>
                Notices when a journey runs late or goes quiet, and checks in
                with you first. It never assumes danger.
              </p>
              <div className="ex">
                &ldquo;Your journey is taking longer than expected. Are you
                safe?&rdquo;
              </div>
            </div>
          </article>

          <article className="ai-card" tabIndex={0} role="region" aria-label="Women's safety assistant">
            <span className="icon">
              <ShieldCheck className="w-[22px] h-[22px]" />
            </span>
            <div>
              <h3>Women&apos;s safety assistant</h3>
              <p>
                Ask in plain language. Answers come from verified helplines and
                official resources, not guesses.
              </p>
              <div className="ex">
                &ldquo;What are my options if a colleague makes me
                uncomfortable?&rdquo;
              </div>
              <a href="#help" className="ai-link">
                Lives inside Seek Help{" "}
                <ArrowRight className="w-[15px] h-[15px]" />
              </a>
            </div>
          </article>

          <article className="ai-card" tabIndex={0} role="region" aria-label="Smart complaint structuring">
            <span className="icon">
              <FileText className="w-[22px] h-[22px]" />
            </span>
            <div>
              <h3>Smart complaint structuring</h3>
              <p>
                Turns her own words into a structured draft. She reviews, edits
                and approves it before anything is submitted.
              </p>
              <div className="ex">
                Category: Inappropriate behaviour · Date: Not provided · Awaiting
                your review
              </div>
            </div>
          </article>

          <article className="ai-card" tabIndex={0} role="region" aria-label="Smart safety alerts">
            <span className="icon">
              <BellRing className="w-[22px] h-[22px]" />
            </span>
            <div>
              <h3>Smart safety alerts</h3>
              <p>
                Clear alert messages for trusted contacts and the safety team
                when a journey runs late or SOS is triggered. When alerts are
                sent follows fixed rules, not AI.
              </p>
              <div className="ex">
                &ldquo;An unusual journey delay has been detected. Please contact
                her and verify she is safe.&rdquo;
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
