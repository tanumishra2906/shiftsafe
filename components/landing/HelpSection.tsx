import {
  MessageCircle,
  ShieldCheck,
  Route,
  Info,
  Siren,
  MessageSquare,
  Building2,
  Scale,
  Phone,
  ShieldAlert,
} from "lucide-react";

export function HelpSection() {
  return (
    <section className="sec" id="help" aria-labelledby="help-title">
      <div className="wrap">
        <div className="help-grid">
          <div>
            <span className="eyebrow">Seek Help</span>
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <h2 id="help-title">Know your options, in your own words</h2>
              <p>
                Ask the SHIFTSAFE Safety Assistant a question in plain language
                and get guidance drawn from verified helplines and official
                resources. In danger, call 112 or use SOS.
              </p>
            </div>
            <ul className="help-points">
              <li>
                <span className="icon">
                  <MessageCircle className="w-[18px] h-[18px]" />
                </span>
                Ask in English or Hindi
              </li>
              <li>
                <span className="icon">
                  <ShieldCheck className="w-[18px] h-[18px]" />
                </span>
                Answers come only from verified helplines and official resources
              </li>
              <li>
                <span className="icon">
                  <Route className="w-[18px] h-[18px]" />
                </span>
                Clear next steps, with official links
              </li>
              <li>
                <span className="icon">
                  <Info className="w-[18px] h-[18px]" />
                </span>
                General guidance, not legal advice
              </li>
            </ul>
            <p className="sos-note">
              <Siren className="w-4 h-4" /> SOS never depends on AI.
            </p>
          </div>
          <div
            className="chat"
            role="figure"
            aria-label="Example conversation with the SHIFTSAFE Safety Assistant"
          >
            <div className="chat-head">
              <div>
                <span className="icon">
                  <MessageSquare className="w-[18px] h-[18px]" />
                </span>
                <span>
                  <strong>Safety Assistant</strong>
                  <small>Seek Help</small>
                </span>
              </div>
              <span className="badge">Example</span>
            </div>
            <p className="bubble user">
              What can I do if a colleague keeps making me uncomfortable?
            </p>
            <p className="bubble bot">
              You have options. You can write down what happened with dates,
              report it to your organisation&apos;s Internal Committee, or get
              free legal aid through NALSA. If you are in danger right now, call
              112.
            </p>
            <div className="chips" aria-label="Sources">
              <span className="chip">
                <Building2 className="w-[13px] h-[13px]" /> Internal Committee
                (POSH)
              </span>
              <span className="chip">
                <Scale className="w-[13px] h-[13px]" /> NALSA legal aid
              </span>
            </div>
            <div className="chat-foot">
              <small>AI-generated guidance. Not legal advice.</small>
              <a href="tel:112" className="btn btn-primary btn-sm">
                <Phone className="w-[18px] h-[18px]" /> Call 112
              </a>
            </div>
          </div>
        </div>

        <div className="res-grid">
          <article className="res" tabIndex={0} role="region" aria-label="Emergency services">
            <span className="icon">
              <Siren className="w-[18px] h-[18px]" />
            </span>
            <h3>Emergency services</h3>
            <p>Police, fire and medical help. Call 112.</p>
          </article>
          <article className="res" tabIndex={0} role="region" aria-label="Women's helplines">
            <span className="icon">
              <Phone className="w-[18px] h-[18px]" />
            </span>
            <h3>Women&apos;s helplines</h3>
            <p>Support and guidance for women.</p>
          </article>
          <article className="res" tabIndex={0} role="region" aria-label="Cybercrime reporting">
            <span className="icon">
              <ShieldAlert className="w-[18px] h-[18px]" />
            </span>
            <h3>Cybercrime reporting</h3>
            <p>Online harassment and cyber fraud.</p>
          </article>
          <article className="res" tabIndex={0} role="region" aria-label="Free legal aid">
            <span className="icon">
              <Scale className="w-[18px] h-[18px]" />
            </span>
            <h3>Free legal aid</h3>
            <p>Through NALSA.</p>
          </article>
          <article className="res" tabIndex={0} role="region" aria-label="Your Internal Committee">
            <span className="icon">
              <Building2 className="w-[18px] h-[18px]" />
            </span>
            <h3>Your Internal Committee</h3>
            <p>Workplace harassment complaints.</p>
          </article>
        </div>
        <p className="res-note">
          Official numbers and links are shown in the app after verification.
        </p>
      </div>
    </section>
  );
}
