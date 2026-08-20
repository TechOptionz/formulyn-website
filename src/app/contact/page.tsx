import type { Metadata } from "next";
import { contactHero } from "@/data/contact";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description: contactHero.body,
};

/**
 * Contact deliberately omits the closing CTA banner — the page already is
 * the call to action.
 */
export default function ContactPage() {
  return <ContactSection />;
}
