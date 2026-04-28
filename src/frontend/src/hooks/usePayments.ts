import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Payment, PaymentInput } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyActor = any;

export function usePayments() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Payment[]>({
    queryKey: ["payments"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as AnyActor).listPayments();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function usePayment(id: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Payment | null>({
    queryKey: ["payment", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await (actor as AnyActor).getPayment(id);
      return result.length > 0 ? result[0] : null;
    },
    enabled: !!actor && !actorFetching && id !== undefined,
  });
}

export function useAddPayment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: PaymentInput) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as AnyActor).addPayment(
        input.customerId,
        input.amount,
        input.method,
        input.note,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}

export function useUpdatePayment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: bigint;
      input: PaymentInput;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as AnyActor).updatePayment(
        id,
        input.customerId,
        input.amount,
        input.method,
        input.note,
      );
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({
        queryKey: ["payment", vars.id.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeletePayment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as AnyActor).deletePayment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
