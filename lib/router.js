// Config
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('posts', 'calculus'); }
});

// Root
Router.route('/', {name: 'postsList'});