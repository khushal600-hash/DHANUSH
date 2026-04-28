import List "mo:core/List";
import CustomerTypes "../types/customers";
import DeliveryTypes "../types/deliveries";
import PaymentTypes "../types/payments";

module {
  public type DashboardStats = {
    totalCustomers : Nat;
    totalDeliveries : Nat;
    totalRevenue : Nat;
    totalOutstandingBalance : Int;
  };

  public type CustomerBalance = {
    id : CustomerTypes.CustomerView;
    balance : Int;
  };

  public func getStats(
    customers : List.List<CustomerTypes.Customer>,
    deliveries : List.List<DeliveryTypes.Delivery>,
    payments : List.List<PaymentTypes.Payment>,
  ) : DashboardStats {
    let totalRevenue = deliveries.foldLeft(0, func(acc, d) {
      acc + (d.quantity * d.pricePerCan);
    });
    let totalOutstandingBalance = customers.foldLeft<Int, CustomerTypes.Customer>(0, func(acc, c) {
      acc + c.balance;
    });
    {
      totalCustomers = customers.size();
      totalDeliveries = deliveries.size();
      totalRevenue;
      totalOutstandingBalance;
    };
  };
};
