import Image from "next/image";

const doodles = [
  ["shield-female", "auth-doodle--one"],
  ["phone-bell", "auth-doodle--two"],
  ["laptop-lock", "auth-doodle--three"],
  ["phone-route-cab", "auth-doodle--four"],
  ["map-pin", "auth-doodle--five"],
  ["scales", "auth-doodle--six"],
] as const;

export function AuthDoodles() {
  return (
    <div aria-hidden="true" className="auth-doodles">
      {doodles.map(([name, position]) => (
        <Image
          alt=""
          aria-hidden="true"
          className={`auth-doodle ${position}`}
          height={120}
          key={name}
          src={`/doodles/${name}.png`}
          width={120}
        />
      ))}
      <svg className="auth-route auth-route--left" viewBox="0 0 110 220">
        <path d="M-5 210 C 60 170, 10 110, 70 80 S 90 20, 40 5" />
      </svg>
      <svg className="auth-route auth-route--right" viewBox="0 0 110 220">
        <path d="M115 10 C 40 50, 100 110, 40 140 S 20 200, 80 215" />
      </svg>
    </div>
  );
}
