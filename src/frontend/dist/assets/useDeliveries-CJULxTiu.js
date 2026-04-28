import { e as useQueryClient } from "./index-Kf6cq2Mp.js";
import { u as useActor, a as useQuery, e as useMutation, c as createActor } from "./types-CD4imbHJ.js";
function useDeliveries() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["deliveries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDeliveries();
    },
    enabled: !!actor && !actorFetching
  });
}
function useAddDelivery() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addDelivery(
        input.customerId,
        input.quantity,
        input.pricePerCan,
        input.deliveryDate
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });
}
function useUpdateDelivery() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateDelivery(
        id,
        input.customerId,
        input.quantity,
        input.pricePerCan,
        input.deliveryDate
      );
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      queryClient.invalidateQueries({
        queryKey: ["delivery", vars.id.toString()]
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });
}
function useDeleteDelivery() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteDelivery(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });
}
function useUpdateDeliveryStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateDeliveryStatus(id, status);
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
      queryClient.invalidateQueries({
        queryKey: ["delivery", vars.id.toString()]
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });
}
export {
  useAddDelivery as a,
  useUpdateDelivery as b,
  useDeleteDelivery as c,
  useUpdateDeliveryStatus as d,
  useDeliveries as u
};
