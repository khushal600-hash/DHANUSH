import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CustomerTypes "../types/customers";
import PaymentTypes "../types/payments";
import CustomerLib "../lib/customers";
import PaymentLib "../lib/payments";

mixin (
  accessControlState : AccessControl.AccessControlState,
  customers : List.List<CustomerTypes.Customer>,
  payments : List.List<PaymentTypes.Payment>,
  nextPaymentId : { var value : Nat },
) {
  public query ({ caller }) func listPayments() : async [PaymentTypes.Payment] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PaymentLib.listPayments(payments);
  };

  public query ({ caller }) func getPayment(id : Common.PaymentId) : async ?PaymentTypes.Payment {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PaymentLib.getPayment(payments, id);
  };

  public query ({ caller }) func listPaymentsForCustomer(customerId : Common.CustomerId) : async [PaymentTypes.Payment] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PaymentLib.listPaymentsForCustomer(payments, customerId);
  };

  public shared ({ caller }) func addPayment(input : PaymentTypes.PaymentInput) : async PaymentTypes.Payment {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    // Verify customer exists
    switch (CustomerLib.getCustomer(customers, input.customerId)) {
      case null Runtime.trap("Customer not found");
      case (?_) {};
    };
    let id = nextPaymentId.value;
    nextPaymentId.value += 1;
    let payment = PaymentLib.addPayment(payments, id, input);
    // Decrease customer balance by the payment amount
    CustomerLib.adjustBalance(customers, input.customerId, -(input.amount.toInt()));
    payment;
  };

  public shared ({ caller }) func updatePayment(id : Common.PaymentId, input : PaymentTypes.PaymentInput) : async ?PaymentTypes.Payment {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    // Adjust balance: reverse old amount, apply new amount
    switch (PaymentLib.getPayment(payments, id)) {
      case (?old) {
        let balanceDelta = old.amount.toInt() - input.amount.toInt();
        let result = PaymentLib.updatePayment(payments, id, input);
        CustomerLib.adjustBalance(customers, old.customerId, balanceDelta);
        result;
      };
      case null null;
    };
  };

  public shared ({ caller }) func deletePayment(id : Common.PaymentId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete payments");
    };
    // Reverse balance impact
    switch (PaymentLib.getPayment(payments, id)) {
      case (?payment) {
        let _ = PaymentLib.deletePayment(payments, id);
        CustomerLib.adjustBalance(customers, payment.customerId, payment.amount.toInt());
        true;
      };
      case null false;
    };
  };
};
