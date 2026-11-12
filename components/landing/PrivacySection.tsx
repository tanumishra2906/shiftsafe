import { SlidersHorizontal, UserX, Shield, Undo2, MapPin } from "lucide-react";

export function PrivacySection() {
  return (
    <section className="sec" id="privacy" aria-labelledby="privacy-title">
      <div className="wrap priv-grid">
        <div>
          <span className="eyebrow">Privacy &amp; consent</span>
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <h2 id="privacy-title">You decide who sees what</h2>
            <p>
              SHIFTSAFE is built on consent. Nothing is shared with your
              organisation or your trusted contacts unless you allow it — and
              you can change your mind anytime.
            </p>
          </div>
          <div className="priv-list">
            <div className="priv-item" tabIndex={0} role="region" aria-label="Granular controls">
              <span className="icon">
                <SlidersHorizontal className="w-[22px] h-[22px]" />
              </span>
              <div>
                <h3>Granular controls</h3>
                <p>
                  Set permissions per contact and per feature — journeys,
                  location, shift times.
                </p>
              </div>
            </div>
            <div className="priv-item" tabIndex={0} role="region" aria-label="Anonymous by design">
              <span className="icon">
                <UserX className="w-[22px] h-[22px]" />
              </span>
              <div>
                <h3>Anonymous by design</h3>
                <p>
                  Anonymous complaints are built not to store or expose your
                  identity.
                </p>
              </div>
            </div>
            <div className="priv-item" tabIndex={0} role="region" aria-label="Access you can audit">
              <span className="icon">
                <Shield className="w-[22px] h-[22px]" />
              </span>
              <div>
                <h3>Access you can audit</h3>
                <p>
                  Role-based access controls and logs of who viewed sensitive
                  information.
                </p>
              </div>
            </div>
            <div className="priv-item" tabIndex={0} role="region" aria-label="Revoke anytime">
              <span className="icon">
                <Undo2 className="w-[22px] h-[22px]" />
              </span>
              <div>
                <h3>Revoke anytime</h3>
                <p>
                  Withdraw any permission you&apos;ve given, whenever you
                  choose.
                </p>
              </div>
            </div>
            <div className="priv-item" tabIndex={0} role="region" aria-label="Location only when authorised">
              <span className="icon">
                <MapPin className="w-[22px] h-[22px]" />
              </span>
              <div>
                <h3>Location only when authorised</h3>
                <p>Collected only during a journey you share or an SOS.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="consent" tabIndex={0} role="region" aria-label="Example sharing preferences">
          <div className="consent-head">
            <div>
              <strong>Sharing preferences</strong>
              <small>Example preferences</small>
            </div>
            <span className="badge">You&apos;re in control</span>
          </div>
          <div className="row th">
            <span>Information</span>
            <span>Organisation</span>
            <span>Trusted</span>
          </div>
          <div className="row">
            <span>Shift schedule</span>
            <button
              type="button"
              className="toggle"
              role="switch"
              aria-checked="true"
              aria-label="Share shift schedule with organisation"
            ></button>
            <button
              type="button"
              className="toggle"
              role="switch"
              aria-checked="true"
              aria-label="Share shift schedule with trusted contacts"
            ></button>
          </div>
          <div className="row">
            <span>Live journey</span>
            <button
              type="button"
              className="toggle"
              role="switch"
              aria-checked="false"
              aria-label="Share live journey with organisation"
            ></button>
            <button
              type="button"
              className="toggle"
              role="switch"
              aria-checked="true"
              aria-label="Share live journey with trusted contacts"
            ></button>
          </div>
          <div className="row">
            <span>Ride details</span>
            <button
              type="button"
              className="toggle"
              role="switch"
              aria-checked="false"
              aria-label="Share ride details with organisation"
            ></button>
            <button
              type="button"
              className="toggle"
              role="switch"
              aria-checked="true"
              aria-label="Share ride details with trusted contacts"
            ></button>
          </div>
          <div className="row">
            <span>SOS alerts</span>
            <button
              type="button"
              className="toggle"
              role="switch"
              aria-checked="true"
              aria-label="Share SOS alerts with organisation"
            ></button>
            <button
              type="button"
              className="toggle"
              role="switch"
              aria-checked="true"
              aria-label="Share SOS alerts with trusted contacts"
            ></button>
          </div>
          <div className="row">
            <span>Complaint identity</span>
            <button
              type="button"
              className="toggle"
              role="switch"
              aria-checked="false"
              aria-label="Share complaint identity with organisation"
            ></button>
            <button
              type="button"
              className="toggle"
              role="switch"
              aria-checked="false"
              aria-label="Share complaint identity with trusted contacts"
            ></button>
          </div>
        </div>
      </div>
    </section>
  );
}
