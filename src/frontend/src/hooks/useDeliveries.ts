import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { DeliveryInput, DeliveryView } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyActor = any;

export function useDeliveries() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<DeliveryView[]>({
    queryKey: ["deliveries"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as AnyActor).listDeliveries();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useDelivery(id: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<DeliveryView | null>({
    queryKey: ["delivery", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await (actor as AnyActor).getDelivery(id);
      return result.length > 0 ? result[0] : null;
    },
    enabled: !!actor && !actorFetching && id !== undefined,
  });
}

export function useAddDelivery() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: DeliveryInput) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as AnyActor).addDelivery(
        input.customerId,
        input.quantity,
        input.pricePerCan,
        input.deliveryDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateDelivery() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: bigint;
      input: DeliveryInput;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as AnyActor).updateDelivery(
        id,
        input.customerId,
        input.quantity,
        input.pricePerCan,
        input.deliveryDate,
      );
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      queryClient.invalidateQueries({
        queryKey: ["delivery", vars.id.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteDelivery() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as AnyActor).deleteDelivery(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateDeliveryStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: bigint;
      status: import("../types").DeliveryStatus;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as AnyActor).updateDeliveryStatus(id, status);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      queryClient.invalidateQueries({
        queryKey: ["delivery", vars.id.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
