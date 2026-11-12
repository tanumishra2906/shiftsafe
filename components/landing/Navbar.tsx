import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <header>
      <nav className="wrap" aria-label="Primary">
        <Link href="/" className="logo" aria-label="SHIFTSAFE home">
          <span className="logo-mark">
            <ShieldCheck className="w-5 h-5" />
          </span>
          SHIFTSAFE
        </Link>
        <ul className="nav-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how">How it works</a>
          </li>
          <li>
            <a href="#portals">Portals</a>
          </li>
          <li>
            <a href="#help">Seek Help</a>
          </li>
          <li>
            <a href="#privacy">Privacy</a>
          </li>
        </ul>
        <div className="nav-right">
          <Link href="/login" className="btn btn-ghost btn-sm">
            Login
          </Link>
          <Link href="/register/employee" className="btn btn-primary btn-sm">
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
