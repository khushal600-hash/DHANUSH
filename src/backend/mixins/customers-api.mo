import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CustomerTypes "../types/customers";
import DeliveryTypes "../types/deliveries";
import PaymentTypes "../types/payments";
import CustomerLib "../lib/customers";
import DeliveryLib "../lib/deliveries";
import PaymentLib "../lib/payments";

mixin (
  accessControlState : AccessControl.AccessControlState,
  customers : List.List<CustomerTypes.Customer>,
  deliveries : List.List<DeliveryTypes.Delivery>,
  payments : List.List<PaymentTypes.Payment>,
  nextCustomerId : { var value : Nat },
) {
  public query ({ caller }) func listCustomers() : async [CustomerTypes.CustomerView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CustomerLib.listCustomers(customers);
  };

  public query ({ caller }) func getCustomer(id : Common.CustomerId) : async ?CustomerTypes.CustomerView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CustomerLib.getCustomer(customers, id);
  };

  public shared ({ caller }) func addCustomer(input : CustomerTypes.CustomerInput) : async CustomerTypes.CustomerView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextCustomerId.value;
    nextCustomerId.value += 1;
    CustomerLib.addCustomer(customers, id, input);
  };

  public shared ({ caller }) func updateCustomer(id : Common.CustomerId, input : CustomerTypes.CustomerInput) : async ?CustomerTypes.CustomerView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CustomerLib.updateCustomer(customers, id, input);
  };

  public shared ({ caller }) func deleteCustomer(id : Common.CustomerId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete customers");
    };
    CustomerLib.deleteCustomer(customers, id);
  };

  public query ({ caller }) func listCustomersWithOutstandingBalance() : async [CustomerTypes.CustomerView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    CustomerLib.listCustomersWithOutstandingBalance(customers);
  };

  public query ({ caller }) func getCustomerHistory(customerId : Common.CustomerId) : async {
    deliveries : [DeliveryTypes.DeliveryView];
    payments : [PaymentTypes.Payment];
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    {
      deliveries = DeliveryLib.listDeliveriesForCustomer(deliveries, customerId);
      payments = PaymentLib.listPaymentsForCustomer(payments, customerId);
    };
  };
};
