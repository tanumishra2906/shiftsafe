export function HowSection() {
  return (
    <section className="sec how" id="how" aria-labelledby="how-title">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">How it works</span>
          <h2 id="how-title">Protection in four simple steps</h2>
          <p>
            Set up once, and SHIFTSAFE quietly works alongside every shift and
            journey.
          </p>
        </div>
        <div className="steps">
          <article className="step" tabIndex={0} role="region" aria-label="Step 1: Join your workspace">
            <span className="step-num">01</span>
            <h3>Join your workspace</h3>
            <p>
              Sign up and link to your organisation. Your organisation&apos;s
              shift schedule appears in your portal.
            </p>
            <span className="tag">Shift management</span>
          </article>
          <article className="step" tabIndex={0} role="region" aria-label="Step 2: Build your circle">
            <span className="step-num">02</span>
            <h3>Build your circle</h3>
            <p>
              Invite family and friends as trusted contacts, and choose exactly
              what each one can see.
            </p>
            <span className="tag">Consent controls</span>
          </article>
          <article className="step" tabIndex={0} role="region" aria-label="Step 3: Share My Journey">
            <span className="step-num">03</span>
            <h3>Share My Journey</h3>
            <p>
              Enter your Ola, Uber or Rapido ride details. SHIFTSAFE checks in
              with you if your journey runs late.
            </p>
            <span className="tag">Journey check-ins</span>
          </article>
          <article className="step" tabIndex={0} role="region" aria-label="Step 4: Get help instantly">
            <span className="step-num">04</span>
            <h3>Get help instantly</h3>
            <p>
              Trigger SOS in one tap, or raise a complaint anonymously. The
              contacts and responders you chose are alerted.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="tag">Emergency SOS</span>{" "}
              <span className="tag">Seek Help</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
