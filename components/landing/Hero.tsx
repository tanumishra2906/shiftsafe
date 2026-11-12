import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, Siren } from "lucide-react";
import { HeroDoodles } from "./HeroDoodles";

export function Hero() {
  return (
    <section className="hero">
      <HeroDoodles />
      <div className="wrap hero-grid">
        <div>
          <span className="pill">
            <b>AI-assisted.</b> Consent-first.
          </span>
          <h1>
            Safer shifts. Safer journeys. A <span className="hl">stronger</span>{" "}
            support network.
          </h1>
          <p className="lead">
            SHIFTSAFE connects women, their organisations and their trusted
            circle on one AI-powered platform — for every late shift, every ride
            home, and every concern raised at work. You stay in control of what
            is shared.
          </p>
          <div className="hero-ctas">
            <Link href="/register/employee" className="btn btn-primary">
              Get Started <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
            <a href="#features" className="btn btn-ghost">
              Explore Features
            </a>
          </div>
          <div className="trust">
            <span>
              <Lock className="w-[17px] h-[17px] text-[var(--peri)]" /> You
              control sharing
            </span>
            <span>
              <ShieldCheck className="w-[17px] h-[17px] text-[var(--peri)]" />{" "}
              Consent-based
            </span>
            <span>
              <Siren className="w-[17px] h-[17px] text-[var(--peri)]" /> Manual
              SOS always available
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="frame">
            <Image
              src="/img/hero.png"
              alt="Illustration of a professional woman walking home after her shift, checking a safe route on her phone"
              width={1024}
              height={1024}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="float f2">
            <span className="dot" aria-hidden="true"></span>
            <div>
              <span className="ex-tag">Example</span>
              <strong>Arrived home safely</strong>
              <small>Mom &amp; Priya notified</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
