Template.postsList.helpers({
  posts: function() {
    return Posts.find();
  }
});

Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});