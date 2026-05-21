import { useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { recordVisit } from "@/lib/visitors.functions";

export function VisitTracker() {
  const fn = useServerFn(recordVisit);
  useEffect(() => {
    // Fire and forget; never block UI
    fn().catch(() => {});
  }, [fn]);
  return null;
}
