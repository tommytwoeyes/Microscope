// Local (client-only) collection for storing UI error 
// messages for the current user's session
Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message});
};

Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

// Remove error messages after their CSS3 animation has completed,
// so they don't accumulate in the DOM, taking up space in an 
// undesirable way
Template.errors.onRendered(function() {
  var error = this.data;
  Meteor.setTimeout(function() { // Remove the .alert message from the DOM 0.2ms after it fades out
    Errors.remove(error._id);
  }, 5200);
});