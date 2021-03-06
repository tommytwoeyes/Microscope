Template.meteorErrors.helpers({
  errors: function() {
    return Errors.collection.find();
  }
});

Template.meteorError.onRendered(function () {
	var error = this.data;

  // Remove the .alert message from the DOM a few milliseconds after it fades out
  // If you don't do this, repeated errors stack up in the DOM; they're
  // not visible, but they take up an increasing amount of space, pushing
  // the rest of your content down (looks bad, BAD)
	Meteor.setTimeout(function() {
		Errors.collection.remove(error._id);
	}, 5050);
});
