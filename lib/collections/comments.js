Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });

    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);

    if ( ! post )
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');

    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

		// Increment the commentsCount attribute on the Post document associated to this comment
		Posts.update(commentAttributes.postId, {$inc: {commentsCount: 1}});
		
		// Create the comment, saving its id to use to create a user notification
		comment._id = Comments.insert(comment);
		
		// Create a notification message to inform the Post's creator that someone has commented on it
		createCommentNotification(comment);

    return comment._id;
  }
});
