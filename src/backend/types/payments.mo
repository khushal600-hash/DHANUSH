import Common "common";

module {
  public type PaymentMethod = {
    #cash;
    #online;
  };

  public type Payment = {
    id : Common.PaymentId;
    customerId : Common.CustomerId;
    amount : Nat;
    method : PaymentMethod;
    paymentDate : Common.Timestamp;
    note : Text;
    createdAt : Common.Timestamp;
  };

  public type PaymentInput = {
    customerId : Common.CustomerId;
    amount : Nat;
    method : PaymentMethod;
    paymentDate : Common.Timestamp;
    note : Text;
  };
};
