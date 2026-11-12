import {
  BadgeCheck,
  Building2,
  EyeOff,
  LockKeyhole,
  ToggleRight,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { AuthSidePanel } from "@/components/auth/AuthShell";

export const loginSide: AuthSidePanel = {
  tone: "rose",
  eyebrow: "Private by design",
  eyebrowIcon: LockKeyhole,
  title: "You control what you share.",
  illustration: "girl-phone-verified",
  illustrationAlt: "Illustration of a woman checking her phone with a verified shield",
  note: "Your journeys, shifts and reports stay private until you choose to share them.",
  noteIcon: EyeOff,
};

export const employeeSide: AuthSidePanel = {
  tone: "rose",
  eyebrow: "Employee account",
  eyebrowIcon: UserRound,
  title: "Your shifts and journeys, in one calm place.",
  description:
    "Nothing is shared with your organisation or contacts unless you turn it on.",
  illustration: "girl-laptop",
  illustrationAlt: "Illustration of a woman working on her laptop",
  note: "Sharing settings can be changed at any time from your dashboard.",
  noteIcon: ToggleRight,
};

export const organisationSide: AuthSidePanel = {
  tone: "peri",
  eyebrow: "Organisation account",
  eyebrowIcon: Building2,
  title: "Support your people with care and accountability.",
  description:
    "Set up a workspace for HR and safety teams to manage shifts, alerts and complaints.",
  illustration: "building",
  illustrationAlt: "Illustration of an office building",
  note: "Employees always decide what they share with your team.",
  noteIcon: BadgeCheck,
};

export const contactSide: AuthSidePanel = {
  tone: "cream",
  eyebrow: "Trusted contact",
  eyebrowIcon: UsersRound,
  title: "Be there for someone who trusts you.",
  description: "Join with the invite code you received from her.",
  illustration: "three-women-shield",
  illustrationAlt: "Illustration of three women protected by a shield",
  note: "She can pause or end sharing whenever she chooses.",
  noteIcon: UsersRound,
};
