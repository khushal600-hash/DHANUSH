import { e as useQueryClient } from "./index-Kf6cq2Mp.js";
import { u as useActor, a as useQuery, e as useMutation, c as createActor } from "./types-CD4imbHJ.js";
function usePayments() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPayments();
    },
    enabled: !!actor && !actorFetching
  });
}
function useAddPayment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addPayment(
        input.customerId,
        input.amount,
        input.method,
        input.note
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    }
  });
}
function useUpdatePayment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePayment(
        id,
        input.customerId,
        input.amount,
        input.method,
        input.note
      );
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({
        queryKey: ["payment", vars.id.toString()]
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });
}
function useDeletePayment() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePayment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });
}
export {
  useDeletePayment as a,
  useAddPayment as b,
  useUpdatePayment as c,
  usePayments as u
};
