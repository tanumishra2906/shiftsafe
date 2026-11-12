import { UserRoundCheck, Building2, CircleCheck } from "lucide-react";

export function BenefitsSection() {
  return (
    <section className="sec benefits" aria-labelledby="ben-title">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">Benefits</span>
          <h2 id="ben-title">Better for her. Better for business.</h2>
          <p>
            When women feel safe, they thrive — and organisations build cultures
            of trust.
          </p>
        </div>
        <div className="ben-grid">
          <article className="ben" tabIndex={0} role="region" aria-label="Benefits for employees">
            <div className="ben-top">
              <span className="icon">
                <UserRoundCheck className="w-[22px] h-[22px]" />
              </span>
              <h3>For employees</h3>
            </div>
            <ul>
              <li>
                <CircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--primary)]" />
                <div>
                  <b>Peace of mind on every commute</b>
                  <span>Someone you trust can know you got home.</span>
                </div>
              </li>
              <li>
                <CircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--primary)]" />
                <div>
                  <b>A voice without fear</b>
                  <span>Report concerns anonymously or confidentially.</span>
                </div>
              </li>
              <li>
                <CircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--primary)]" />
                <div>
                  <b>Help within reach</b>
                  <span>
                    SOS alerts the contacts and safety responders you chose.
                  </span>
                </div>
              </li>
              <li>
                <CircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--primary)]" />
                <div>
                  <b>Full ownership of your data</b>
                  <span>Share only what you choose, when you choose.</span>
                </div>
              </li>
            </ul>
          </article>

          <article className="ben org" tabIndex={0} role="region" aria-label="Benefits for organisations">
            <div className="ben-top">
              <span className="icon">
                <Building2 className="w-[22px] h-[22px]" />
              </span>
              <h3>For organisations</h3>
            </div>
            <ul>
              <li>
                <CircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--peri)]" />
                <div>
                  <b>Support your duty of care</b>
                  <span>Give shift workers a clear safety channel.</span>
                </div>
              </li>
              <li>
                <CircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--peri)]" />
                <div>
                  <b>Structured, employee-approved reports</b>
                  <span>
                    Complaints arrive organised for the right handlers.
                  </span>
                </div>
              </li>
              <li>
                <CircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--peri)]" />
                <div>
                  <b>A clear emergency workflow</b>
                  <span>
                    Acknowledge, assign and close incidents with an audit trail.
                  </span>
                </div>
              </li>
              <li>
                <CircleCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--peri)]" />
                <div>
                  <b>Build trust</b>
                  <span>Show employees that safety is taken seriously.</span>
                </div>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
