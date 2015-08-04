Template.userMeta.helpers({
  username: function() { return Meteor.user().username; },
  userId: function() { return Meteor.userId(); }
});