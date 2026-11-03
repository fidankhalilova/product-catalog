"use client"; // Client leaf: logs TTFB and LCP to the console for the timing report.
import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals(({ name, value }) => {
    if (name === "TTFB" || name === "LCP")
      console.log(`${name}: ${Math.round(value)} ms`);
  });
  return null;
}
