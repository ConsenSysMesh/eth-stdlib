import "../Permissioned";

// This contract is used only for testing and will not
// have headers made for it.

contract TestPermissioned is Permissioned {
  uint public value;
  function set_value(uint val) onlygroup("admin") {
    value = val;
  }
}
