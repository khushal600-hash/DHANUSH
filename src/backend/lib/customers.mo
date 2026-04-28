import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/customers";

module {
  public func toView(customer : Types.Customer) : Types.CustomerView {
    {
      id = customer.id;
      name = customer.name;
      phone = customer.phone;
      address = customer.address;
      balance = customer.balance;
      createdAt = customer.createdAt;
    };
  };

  public func listCustomers(
    customers : List.List<Types.Customer>
  ) : [Types.CustomerView] {
    customers.map<Types.Customer, Types.CustomerView>(toView).toArray();
  };

  public func getCustomer(
    customers : List.List<Types.Customer>,
    id : Common.CustomerId,
  ) : ?Types.CustomerView {
    switch (customers.find(func(c : Types.Customer) : Bool = c.id == id)) {
      case (?c) ?toView(c);
      case null null;
    };
  };

  public func addCustomer(
    customers : List.List<Types.Customer>,
    nextId : Nat,
    input : Types.CustomerInput,
  ) : Types.CustomerView {
    let customer : Types.Customer = {
      id = nextId;
      var name = input.name;
      var phone = input.phone;
      var address = input.address;
      var balance = 0;
      createdAt = Time.now();
    };
    customers.add(customer);
    toView(customer);
  };

  public func updateCustomer(
    customers : List.List<Types.Customer>,
    id : Common.CustomerId,
    input : Types.CustomerInput,
  ) : ?Types.CustomerView {
    switch (customers.find(func(c : Types.Customer) : Bool = c.id == id)) {
      case (?customer) {
        customer.name := input.name;
        customer.phone := input.phone;
        customer.address := input.address;
        ?toView(customer);
      };
      case null null;
    };
  };

  public func deleteCustomer(
    customers : List.List<Types.Customer>,
    id : Common.CustomerId,
  ) : Bool {
    let sizeBefore = customers.size();
    let filtered = customers.filter(func(c : Types.Customer) : Bool = c.id != id);
    customers.clear();
    customers.append(filtered);
    customers.size() < sizeBefore;
  };

  public func listCustomersWithOutstandingBalance(
    customers : List.List<Types.Customer>
  ) : [Types.CustomerView] {
    customers
      .filter(func(c : Types.Customer) : Bool = c.balance > 0)
      .map<Types.Customer, Types.CustomerView>(toView)
      .toArray();
  };

  public func adjustBalance(
    customers : List.List<Types.Customer>,
    customerId : Common.CustomerId,
    delta : Int,
  ) {
    switch (customers.find(func(c : Types.Customer) : Bool = c.id == customerId)) {
      case (?customer) {
        customer.balance := customer.balance + delta;
      };
      case null {
        Runtime.trap("Customer not found: " # debug_show(customerId));
      };
    };
  };
};
