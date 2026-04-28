import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CustomerTypes "../types/customers";
import DeliveryTypes "../types/deliveries";
import CustomerLib "../lib/customers";
import DeliveryLib "../lib/deliveries";

mixin (
  accessControlState : AccessControl.AccessControlState,
  customers : List.List<CustomerTypes.Customer>,
  deliveries : List.List<DeliveryTypes.Delivery>,
  nextDeliveryId : { var value : Nat },
) {
  public query ({ caller }) func listDeliveries() : async [DeliveryTypes.DeliveryView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DeliveryLib.listDeliveries(deliveries);
  };

  public query ({ caller }) func getDelivery(id : Common.DeliveryId) : async ?DeliveryTypes.DeliveryView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DeliveryLib.getDelivery(deliveries, id);
  };

  public query ({ caller }) func listDeliveriesForCustomer(customerId : Common.CustomerId) : async [DeliveryTypes.DeliveryView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DeliveryLib.listDeliveriesForCustomer(deliveries, customerId);
  };

  public shared ({ caller }) func addDelivery(input : DeliveryTypes.DeliveryInput) : async DeliveryTypes.DeliveryView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    // Verify customer exists
    switch (CustomerLib.getCustomer(customers, input.customerId)) {
      case null Runtime.trap("Customer not found");
      case (?_) {};
    };
    let id = nextDeliveryId.value;
    nextDeliveryId.value += 1;
    let view = DeliveryLib.addDelivery(deliveries, id, input);
    // Increase customer balance by the delivery total
    let delta = input.quantity * input.pricePerCan;
    CustomerLib.adjustBalance(customers, input.customerId, delta.toInt());
    view;
  };

  public shared ({ caller }) func updateDelivery(id : Common.DeliveryId, input : DeliveryTypes.DeliveryInput) : async ?DeliveryTypes.DeliveryView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    // Adjust balance: subtract old total, add new total
    switch (DeliveryLib.getDelivery(deliveries, id)) {
      case (?old) {
        let oldTotal = old.totalAmount;
        let newTotal = input.quantity * input.pricePerCan;
        let result = DeliveryLib.updateDelivery(deliveries, id, input);
        let balanceDelta = newTotal.toInt() - oldTotal.toInt();
        CustomerLib.adjustBalance(customers, old.customerId, balanceDelta);
        result;
      };
      case null null;
    };
  };

  public shared ({ caller }) func deleteDelivery(id : Common.DeliveryId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete deliveries");
    };
    // Reverse balance impact
    switch (DeliveryLib.getDelivery(deliveries, id)) {
      case (?view) {
        let _ = DeliveryLib.deleteDelivery(deliveries, id);
        CustomerLib.adjustBalance(customers, view.customerId, -(view.totalAmount.toInt()));
        true;
      };
      case null false;
    };
  };

  public shared ({ caller }) func updateDeliveryStatus(id : Common.DeliveryId, status : DeliveryTypes.DeliveryStatus) : async ?DeliveryTypes.DeliveryView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DeliveryLib.updateDeliveryStatus(deliveries, id, status);
  };
};
