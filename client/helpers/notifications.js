Template.notifications.helpers({
	notifications: function() {
		var notificationList = Notifications.find({
			userId: Meteor.userId(),
			read: false
		});
		var notificationCount = notificationList.count();
		
		return {
			count: (notificationCount < 0) ? null : notificationCount,
			list: notificationList
		}
	}
});

Template.notificationItem.helpers({
	notificationPostPath: function() {
		return Router.routes.postPage.path({_id: this.postId});
	}
});

Template.notificationItem.events({
	'click .notification-item a': function(e) {
		console.log('Setting the read flag on the Notification object with _id: ' + this._id);
		Notifications.update(this._id, {
			$set: {read: true}
		});
	}
});