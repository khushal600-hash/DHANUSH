import Common "common";

module {
  public type Customer = {
    id : Common.CustomerId;
    var name : Text;
    var phone : Text;
    var address : Text;
    var balance : Int;
    createdAt : Common.Timestamp;
  };

  public type CustomerView = {
    id : Common.CustomerId;
    name : Text;
    phone : Text;
    address : Text;
    balance : Int;
    createdAt : Common.Timestamp;
  };

  public type CustomerInput = {
    name : Text;
    phone : Text;
    address : Text;
  };
};
