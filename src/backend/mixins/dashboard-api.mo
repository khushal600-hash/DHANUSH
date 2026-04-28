import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CustomerTypes "../types/customers";
import DeliveryTypes "../types/deliveries";
import PaymentTypes "../types/payments";
import DashboardLib "../lib/dashboard";
import CustomerLib "../lib/customers";

mixin (
  accessControlState : AccessControl.AccessControlState,
  customers : List.List<CustomerTypes.Customer>,
  deliveries : List.List<DeliveryTypes.Delivery>,
  payments : List.List<PaymentTypes.Payment>,
) {
  public query ({ caller }) func getDashboard() : async {
    stats : DashboardLib.DashboardStats;
    customersWithOutstandingBalance : [CustomerTypes.CustomerView];
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    {
      stats = DashboardLib.getStats(customers, deliveries, payments);
      customersWithOutstandingBalance = CustomerLib.listCustomersWithOutstandingBalance(customers);
    };
  };
};
