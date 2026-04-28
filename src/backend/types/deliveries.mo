import Common "common";

module {
  public type DeliveryStatus = {
    #pending;
    #delivered;
    #cancelled;
  };

  public type Delivery = {
    id : Common.DeliveryId;
    customerId : Common.CustomerId;
    var quantity : Nat;
    var pricePerCan : Nat;
    var status : DeliveryStatus;
    var deliveryDate : Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  public type DeliveryView = {
    id : Common.DeliveryId;
    customerId : Common.CustomerId;
    quantity : Nat;
    pricePerCan : Nat;
    totalAmount : Nat;
    status : DeliveryStatus;
    deliveryDate : Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  public type DeliveryInput = {
    customerId : Common.CustomerId;
    quantity : Nat;
    pricePerCan : Nat;
    deliveryDate : Common.Timestamp;
  };
};
