// Log the current total # of Posts to the browser console
// each time Meteor starts up
Meteor.startup(function() {
  Tracker.autorun(function() {
    console.debug('There are ' + Posts.find().count() + ' posts, currently.');
  });
});