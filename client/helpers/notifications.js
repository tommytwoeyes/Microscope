Template.notifications.helpers({
	notifications: function() {
		var notificationList = Notifications.find({
			userId: Meteor.userId(),
			read: false
		});
		var notificationCount = notificationList.count();
		
		return {
			count: notificationCount,
			list: notificationList
		}
	}
});