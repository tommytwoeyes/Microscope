Template.postItem.helpers({
  ownPost: function() {
    // Determine if the account used to created the current post
    // is the same account as the currently logged-in user
    return this.userId === Meteor.userId();
  },

  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});
