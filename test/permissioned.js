contract("Permissioned", function(accounts) {

  var group_name = "admin";

  var fake_address = function(id) {
    var address = id + "";
    while (address.length < 40) {
      address = " " + address;
    }
    return "0x" + address;
  }

  it("should allow setting of values while group is empty", function(done) {
    var instance = null;
    TestPermissioned.new().then(function(i) {
      instance = i;
      return instance.value.call();
    }).then(function(value) {
      assert.equal(value, 0, "Expected starting value to be zero!");
      return instance.set_value(5);
    }).then(function(tx) {
      return instance.value.call();
    }).then(function(value) {
      assert.equal(value, 5, "Value wasn't actually set!");
    }).then(done).catch(done);
  });

  it("should allow adding a member to the group", function(done) {
    var instance = null;
    TestPermissioned.new().then(function(i) {
      instance = i;
      return instance.addGroupMember(group_name, fake_address(1));
    }).then(function(tx) {
      return instance.isGroupEmpty.call(group_name);
    }).then(function(isEmpty) {
      assert.isFalse(isEmpty, "Group should not be empty!");
      return instance.hasMemberInGroup.call(group_name, fake_address(1));
    }).then(function(isInGroup) {
      assert.isTrue(isInGroup, "Member 1 should be in group!");
      return instance.hasMemberInGroup.call(group_name, fake_address(2));
    }).then(function(isInGroup) {
      assert.isFalse(isInGroup, "Member 2 should NOT be in group!");
      return instance.addGroupMember(group_name, fake_address(3));
    }).then(function(tx) {
      return instance.hasMemberInGroup.call(group_name, fake_address(3));
    }).then(function(isInGroup) {
      assert.isFalse(isInGroup, "Member 3 is in group! They shouldn't be because the address that made the group is not in the group, and so shouldn't be able to add more members.")
    }).then(done).catch(done);
  });

  it("should allow adding multiple addresses to a group, with permissions", function(done) {
    var instance = null;
    TestPermissioned.new().then(function(i) {
      instance = i;
      return instance.addGroupMembers(group_name, [fake_address(1), fake_address(2), fake_address(3)]);
    }).then(function(tx) {
      return instance.isGroupEmpty.call(group_name);
    }).then(function(isEmpty) {
      assert.isFalse(isEmpty, "Group should not be empty!");
      return instance.getGroupSize.call(group_name);
    }).then(function(size) {
      assert.equal(size, 3, "Group size should be 3 since three addresses were added.");
      return instance.hasMemberInGroup.call(group_name, fake_address(1));
    }).then(function(isInGroup) {
      assert.isTrue(isInGroup, "Member 1 should be in group!");
      return instance.hasMemberInGroup.call(group_name, fake_address(2));
    }).then(function(isInGroup) {
      assert.isTrue(isInGroup, "Member 2 should be in group!");
      return instance.hasMemberInGroup.call(group_name, fake_address(3));
    }).then(function(isInGroup) {
      assert.isTrue(isInGroup, "Member 3 should be in group!");
    }).then(done).catch(done);
  });

});
