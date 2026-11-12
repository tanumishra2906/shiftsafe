import Link from "next/link";
import { ShieldCheck, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="logo">
              <span className="logo-mark">
                <ShieldCheck className="w-5 h-5" />
              </span>
              SHIFTSAFE
            </Link>
            <p style={{ maxWidth: "320px", marginTop: "16px" }}>
              AI-powered workplace and commute safety for women — connecting
              employees, organisations and the people who care.
            </p>
            <p className="disclaimer">
              SHIFTSAFE supports safety and reporting. It is not a replacement
              for emergency services.
            </p>
            <span className="helpline">
              <Phone className="w-4 h-4 text-[var(--rose)]" /> In an emergency,
              call 112.
            </span>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#how">How it works</a>
              </li>
              <li>
                <a href="#portals">Portals</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#help">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Trust</h4>
            <ul>
              <li>
                <a href="#privacy">Privacy</a>
              </li>
              <li>
                <a href="#privacy">Terms</a>
              </li>
              <li>
                <a href="#privacy">Security</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 SHIFTSAFE. All rights reserved.</span>
          <span>Made with care for every woman on every shift.</span>
        </div>
      </div>
    </footer>
  );
}
