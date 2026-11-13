"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  FileText,
  LayoutDashboard,
  Map,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";

const links = [
  { label: "Overview", href: "/organisation", icon: LayoutDashboard },
  { label: "Employees", href: "/organisation/employees", icon: Users },
  { label: "Shifts", href: "/organisation/shifts", icon: CalendarDays },
];

const comingSoon = [
  { label: "Journeys", icon: Map },
  { label: "Emergencies", icon: ShieldAlert },
  { label: "Complaints", icon: FileText },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

export function OrganisationNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Organisation" className="flex-1 px-3 py-4">
      <ul className="flex flex-wrap gap-1 lg:flex-col">
        {links.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/organisation" && pathname.startsWith(`${href}/`));

          return (
            <li
              className="min-w-[45%] flex-1 lg:min-w-0 lg:flex-none"
              key={href}
            >
              <Link
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--peri)] ${
                  active
                    ? "bg-[var(--blush)] text-[var(--primary-dark)]"
                    : "text-[var(--muted)] hover:bg-[var(--cream)] hover:text-[var(--maroon)]"
                }`}
                href={href}
              >
                <Icon aria-hidden="true" size={18} />
                {label}
              </Link>
            </li>
          );
        })}
        {comingSoon.map(({ label, icon: Icon }) => (
          <li
            className="flex min-h-11 flex-1 items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted)] opacity-75"
            key={label}
          >
            <span className="flex items-center gap-3">
              <Icon aria-hidden="true" size={18} />
              {label}
            </span>
            <span className="text-right text-[10px] font-semibold uppercase tracking-wide text-[var(--peri)]">
              Coming soon
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
