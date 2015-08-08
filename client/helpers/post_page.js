Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },
  
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});