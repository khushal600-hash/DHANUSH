import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { DashboardStats } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyActor = any;

export function useDashboard() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<DashboardStats | null>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      if (!actor) return null;
      return (actor as AnyActor).getDashboard();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30_000,
  });
}
