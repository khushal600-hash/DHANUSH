import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import CustomerTypes "types/customers";
import DeliveryTypes "types/deliveries";
import PaymentTypes "types/payments";
import CustomersMixin "mixins/customers-api";
import DeliveriesMixin "mixins/deliveries-api";
import PaymentsMixin "mixins/payments-api";
import DashboardMixin "mixins/dashboard-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let customers = List.empty<CustomerTypes.Customer>();
  let deliveries = List.empty<DeliveryTypes.Delivery>();
  let payments = List.empty<PaymentTypes.Payment>();

  let nextCustomerId = { var value : Nat = 1 };
  let nextDeliveryId = { var value : Nat = 1 };
  let nextPaymentId = { var value : Nat = 1 };

  include CustomersMixin(accessControlState, customers, deliveries, payments, nextCustomerId);
  include DeliveriesMixin(accessControlState, customers, deliveries, nextDeliveryId);
  include PaymentsMixin(accessControlState, customers, payments, nextPaymentId);
  include DashboardMixin(accessControlState, customers, deliveries, payments);
};
