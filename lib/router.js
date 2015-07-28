// Config
Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

// Root
Router.route('/', {name: 'postsList'});