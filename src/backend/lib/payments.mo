import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/payments";

module {
  public func listPayments(
    payments : List.List<Types.Payment>
  ) : [Types.Payment] {
    payments.toArray();
  };

  public func listPaymentsForCustomer(
    payments : List.List<Types.Payment>,
    customerId : Common.CustomerId,
  ) : [Types.Payment] {
    payments.filter(func(p : Types.Payment) : Bool = p.customerId == customerId).toArray();
  };

  public func getPayment(
    payments : List.List<Types.Payment>,
    id : Common.PaymentId,
  ) : ?Types.Payment {
    payments.find(func(p : Types.Payment) : Bool = p.id == id);
  };

  public func addPayment(
    payments : List.List<Types.Payment>,
    nextId : Nat,
    input : Types.PaymentInput,
  ) : Types.Payment {
    let payment : Types.Payment = {
      id = nextId;
      customerId = input.customerId;
      amount = input.amount;
      method = input.method;
      paymentDate = input.paymentDate;
      note = input.note;
      createdAt = Time.now();
    };
    payments.add(payment);
    payment;
  };

  public func updatePayment(
    payments : List.List<Types.Payment>,
    id : Common.PaymentId,
    input : Types.PaymentInput,
  ) : ?Types.Payment {
    switch (payments.findIndex(func(p : Types.Payment) : Bool = p.id == id)) {
      case (?idx) {
        let existing = payments.at(idx);
        let updated : Types.Payment = {
          id = existing.id;
          customerId = existing.customerId;
          amount = input.amount;
          method = input.method;
          paymentDate = input.paymentDate;
          note = input.note;
          createdAt = existing.createdAt;
        };
        payments.put(idx, updated);
        ?updated;
      };
      case null null;
    };
  };

  public func deletePayment(
    payments : List.List<Types.Payment>,
    id : Common.PaymentId,
  ) : Bool {
    let sizeBefore = payments.size();
    let filtered = payments.filter(func(p : Types.Payment) : Bool = p.id != id);
    payments.clear();
    payments.append(filtered);
    payments.size() < sizeBefore;
  };

  public func totalRevenue(payments : List.List<Types.Payment>) : Nat {
    payments.foldLeft<Nat, Types.Payment>(0, func(acc, p) { acc + p.amount });
  };
};
