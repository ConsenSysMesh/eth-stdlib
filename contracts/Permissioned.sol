contract Permissioned {
  mapping (bytes32 => address[]) public groups;

  modifier onlygroup(bytes32 group_name) {
    if(isGroupEmpty(group_name) || hasMemberInGroup(group_name, msg.sender) || hasMemberInGroup(group_name, tx.origin)) _
  }

  function addGroupMember(bytes32 group_name, address addr) onlygroup("admin") {
    addMember(group_name, addr);
  }

  function addGroupMembers(bytes32 group_name, address[] addresses) onlygroup("admin") external {
    for (var i = 0; i < addresses.length; i++) {
      address addr = addresses[i]; 
      addMember(group_name, addr);
    }
  }

  function isGroupEmpty(bytes32 group_name) returns (bool) {
    return groups[group_name].length == 0x0;
  }

  function getGroupSize(bytes32 group_name) returns (uint) {
    return groups[group_name].length;
  }

  function hasMemberInGroup(bytes32 group_name, address addr) returns (bool) {
    address[] group = groups[group_name];
    for (uint i = 0x0; i < group.length; i++) {
      if (addr == group[i]) {
        return true;
      }
    }
    return false;
  }

  function addMember(bytes32 group_name, address addr) private {
    address[] group = groups[group_name];
    group.length += 1;
    group[group.length - 1] = addr;
  }
}