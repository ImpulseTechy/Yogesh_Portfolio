"use client";

import { useEffect, useState } from "react";
import { emailAddress, site } from "./site";

// Returns the address only after hydration, so it never appears in the static HTML.
export function useEmail(index = 0) {
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => {
    setAddress(emailAddress(site.emails[index]));
  }, [index]);
  return address;
}

export function mailto(address: string | null, subject?: string) {
  if (!address) return undefined;
  return `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
