import Image from "next/image";

export function HeroDoodles() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Shield Female (top-left corner, behind content) */}
      <div
        className="absolute doodle-float-1 block"
        style={{
          top: "8px",
          left: "6px",
          width: "68px",
          height: "68px",
          opacity: 0.20,
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

      {/* 2. Calendar (top-right corner) */}
      <div
        className="absolute doodle-float-4 block"
        style={{
          top: "8px",
          right: "6px",
          width: "66px",
          height: "66px",
          opacity: 0.18,
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

      {/* 3. Phone Bell (bottom-right corner) */}
      <div
        className="absolute doodle-float-3 block"
        style={{
          bottom: "8px",
          right: "6px",
          width: "74px",
          height: "74px",
          opacity: 0.22,
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
          top: "56%",
          left: "max(4px, calc(50% - 614px))",
          width: "76px",
          height: "76px",
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
          top: "44%",
          right: "max(4px, calc(50% - 614px))",
          width: "80px",
          height: "80px",
          opacity: 0.20,
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
          bottom: "10px",
          left: "max(4px, calc(50% - 594px))",
          width: "68px",
          height: "68px",
          opacity: 0.24,
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
