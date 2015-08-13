Template.commentList.helpers({
  comments: function() {
    return Comments.find({postId: this.postId});
  },

	currentCount: function() {
		return Posts.findOne(this.postId).commentsCount;
	}
});
