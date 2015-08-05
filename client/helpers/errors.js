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