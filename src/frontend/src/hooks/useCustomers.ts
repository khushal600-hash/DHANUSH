import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { CustomerInput, CustomerView } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyActor = any;

export function useCustomers() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<CustomerView[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as AnyActor).listCustomers();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCustomer(id: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<CustomerView | null>({
    queryKey: ["customer", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await (actor as AnyActor).getCustomer(id);
      return result.length > 0 ? result[0] : null;
    },
    enabled: !!actor && !actorFetching && id !== undefined,
  });
}

export function useAddCustomer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CustomerInput) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as AnyActor).addCustomer(
        input.name,
        input.phone,
        input.address,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateCustomer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: CustomerInput }) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as AnyActor).updateCustomer(
        id,
        input.name,
        input.phone,
        input.address,
      );
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({
        queryKey: ["customer", vars.id.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteCustomer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return (actor as AnyActor).deleteCustomer(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
