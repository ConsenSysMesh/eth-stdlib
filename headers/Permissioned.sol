contract Permissioned { 
  function groups(bytes32, uint256) returns (address); 
  function hasMemberInGroup(bytes32 group_name, address addr) returns (bool); 
  function getGroupSize(bytes32 group_name) returns (uint256); 
  function addGroupMembers(bytes32 group_name, address[] addresses); 
  function isGroupEmpty(bytes32 group_name) returns (bool); 
  function addGroupMember(bytes32 group_name, address addr); 
} 
