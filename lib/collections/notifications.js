Notifications = new Mongo.Collection('notifications');

Notifications.allow({
	/**
	 * UPDATE RULE
	 * Validates updates to a Notification document
	 * 
	 * @param   {String}  userId     The id of the user attempting to update the Notification document
	 * @param   {Object}  document   The document to be updated
	 * @param   {Array}   fieldNames The fieldnames to be updated in the document
	 * @returns {Boolean} Whether or not the operation will be allowed 
	 */
	update: function(userId, document, fieldNames) {
		// Ensure the user's id matches the document's userId field 
		var userOwnsDocument = ownsDocument(userId, document);
		
		// Ensure user is only attempting to modify a single field
		var userUpdatingSingleField = (fieldNames.length === 1);
		
		// Ensure the field the user is attempting to modify is the 
		// Notification's "has been read" status
		var userUpdatingReadField = (fieldNames[0] === 'read');
		
		return userOwnsDocument && userUpdatingSingleField && userUpdatingReadField;
	}
});

createCommentNotification = function createCommentNotification(comment) {
	var post = Posts.findOne(comment.postId);
	
	if (comment.userId !== post.userId) { // No notification if user is commenting on own post
		Notifications.insert({
			userId: post.userId,
			postId: post._id,
			commentId: comment._id,
			commenterName: comment.author,
			read: false
		});
	}
};