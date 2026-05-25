// Lightweight A/B testing utility for La Table Marrakech.
//
// Sticky per-visitor variant assignment via localStorage. Fires an
// `experiment_view` event into the existing dataLayer (consumed by GTM/GA4)
// so the variant can be joined to any conversion event (whatsapp_click,
// booking_submit, generate_lead) in GA4 reports.
//
// Usage:
//   const variant = useABTest("cooking_class_faq_position");
//   return variant === "variant" ? <NewLayout /> : <OldLayout />;
//
// In GA4: filter Events by `experiment_id` and group by `experiment_variant`
// to see which version produces more conversions.

import { useEffect, useRef, useState } from "react";

export type Variant = "control" | "variant";

const STORAGE_PREFIX = "ltm.ab.";

function assignVariant(experimentId: string): Variant {
  if (typeof window === "undefined") return "control";
  const key = STORAGE_PREFIX + experimentId;
  const existing = window.localStorage.getItem(key);
  if (existing === "control" || existing === "variant") return existing;
  const assigned: Variant = Math.random() < 0.5 ? "control" : "variant";
  try {
    window.localStorage.setItem(key, assigned);
  } catch {
    // localStorage may be disabled (private mode, quota) — variant still works for the session
  }
  return assigned;
}

export function useABTest(experimentId: string): Variant {
  // Synchronous initial assignment — Vite SPA has no SSR, so reading
  // localStorage in the useState initializer is safe and avoids any flicker.
  const [variant] = useState<Variant>(() => assignVariant(experimentId));
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "experiment_view",
      experiment_id: experimentId,
      experiment_variant: variant,
    });
  }, [experimentId, variant]);

  return variant;
}
