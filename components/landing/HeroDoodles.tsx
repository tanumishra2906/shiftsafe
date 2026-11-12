import Image from "next/image";

export function HeroDoodles() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Shield Female (top-left) - visible on mobile */}
      <div
        className="absolute doodle-float-1 block"
        style={{
          top: "16px",
          left: "max(12px, calc(50% - 580px))",
          width: "82px",
          height: "82px",
          opacity: 0.24,
        }}
      >
        <Image
          src="/doodles/shield-female.png"
          alt=""
          width={82}
          height={82}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 2. Calendar (top-right) - visible on mobile */}
      <div
        className="absolute doodle-float-4 block"
        style={{
          top: "14px",
          right: "max(24px, calc(50% - 560px))",
          width: "78px",
          height: "78px",
          opacity: 0.22,
        }}
      >
        <Image
          src="/doodles/calendar.png"
          alt=""
          width={78}
          height={78}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 3. Phone Bell (bottom-right) - visible on mobile */}
      <div
        className="absolute doodle-float-3 block"
        style={{
          bottom: "16px",
          right: "max(32px, calc(50% - 540px))",
          width: "86px",
          height: "86px",
          opacity: 0.25,
        }}
      >
        <Image
          src="/doodles/phone-bell.png"
          alt=""
          width={86}
          height={86}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 4. Laptop Lock (mid-left) - hidden below 768px */}
      <div
        className="absolute doodle-float-5 hidden md:block"
        style={{
          top: "58%",
          left: "max(8px, calc(50% - 590px))",
          width: "80px",
          height: "80px",
          opacity: 0.20,
        }}
      >
        <Image
          src="/doodles/laptop-lock.png"
          alt=""
          width={80}
          height={80}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 5. Phone Route (mid-right) - hidden below 768px */}
      <div
        className="absolute doodle-float-2 hidden md:block"
        style={{
          top: "46%",
          right: "max(12px, calc(50% - 590px))",
          width: "88px",
          height: "88px",
          opacity: 0.22,
        }}
      >
        <Image
          src="/doodles/phone-route.png"
          alt=""
          width={88}
          height={88}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 6. Map Pin (bottom-left) - hidden below 768px */}
      <div
        className="absolute doodle-float-6 hidden md:block"
        style={{
          bottom: "12px",
          left: "max(60px, calc(50% - 510px))",
          width: "72px",
          height: "72px",
          opacity: 0.26,
        }}
      >
        <Image
          src="/doodles/map-pin.png"
          alt=""
          width={72}
          height={72}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
