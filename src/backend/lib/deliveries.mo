import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/deliveries";

module {
  public func toView(delivery : Types.Delivery) : Types.DeliveryView {
    {
      id = delivery.id;
      customerId = delivery.customerId;
      quantity = delivery.quantity;
      pricePerCan = delivery.pricePerCan;
      totalAmount = delivery.quantity * delivery.pricePerCan;
      status = delivery.status;
      deliveryDate = delivery.deliveryDate;
      createdAt = delivery.createdAt;
    };
  };

  public func listDeliveries(
    deliveries : List.List<Types.Delivery>
  ) : [Types.DeliveryView] {
    deliveries.map<Types.Delivery, Types.DeliveryView>(toView).toArray();
  };

  public func listDeliveriesForCustomer(
    deliveries : List.List<Types.Delivery>,
    customerId : Common.CustomerId,
  ) : [Types.DeliveryView] {
    deliveries
      .filter(func(d : Types.Delivery) : Bool = d.customerId == customerId)
      .map<Types.Delivery, Types.DeliveryView>(toView)
      .toArray();
  };

  public func getDelivery(
    deliveries : List.List<Types.Delivery>,
    id : Common.DeliveryId,
  ) : ?Types.DeliveryView {
    switch (deliveries.find(func(d : Types.Delivery) : Bool = d.id == id)) {
      case (?d) ?toView(d);
      case null null;
    };
  };

  public func addDelivery(
    deliveries : List.List<Types.Delivery>,
    nextId : Nat,
    input : Types.DeliveryInput,
  ) : Types.DeliveryView {
    let delivery : Types.Delivery = {
      id = nextId;
      customerId = input.customerId;
      var quantity = input.quantity;
      var pricePerCan = input.pricePerCan;
      var status = #pending;
      var deliveryDate = input.deliveryDate;
      createdAt = Time.now();
    };
    deliveries.add(delivery);
    toView(delivery);
  };

  public func updateDelivery(
    deliveries : List.List<Types.Delivery>,
    id : Common.DeliveryId,
    input : Types.DeliveryInput,
  ) : ?Types.DeliveryView {
    switch (deliveries.find(func(d : Types.Delivery) : Bool = d.id == id)) {
      case (?delivery) {
        delivery.quantity := input.quantity;
        delivery.pricePerCan := input.pricePerCan;
        delivery.deliveryDate := input.deliveryDate;
        ?toView(delivery);
      };
      case null null;
    };
  };

  public func updateDeliveryStatus(
    deliveries : List.List<Types.Delivery>,
    id : Common.DeliveryId,
    status : Types.DeliveryStatus,
  ) : ?Types.DeliveryView {
    switch (deliveries.find(func(d : Types.Delivery) : Bool = d.id == id)) {
      case (?delivery) {
        delivery.status := status;
        ?toView(delivery);
      };
      case null null;
    };
  };

  public func deleteDelivery(
    deliveries : List.List<Types.Delivery>,
    id : Common.DeliveryId,
  ) : Bool {
    let sizeBefore = deliveries.size();
    let filtered = deliveries.filter(func(d : Types.Delivery) : Bool = d.id != id);
    deliveries.clear();
    deliveries.append(filtered);
    deliveries.size() < sizeBefore;
  };

  public func totalDeliveries(deliveries : List.List<Types.Delivery>) : Nat {
    deliveries.size();
  };

  public func totalRevenue(deliveries : List.List<Types.Delivery>) : Nat {
    deliveries.foldLeft<Nat, Types.Delivery>(0, func(acc, d) {
      acc + (d.quantity * d.pricePerCan);
    });
  };
};
