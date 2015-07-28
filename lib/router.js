// Config
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('posts', '.*'); }
});

// Root
Router.route('/', {name: 'postsList'});

// Single post view
Router.route('/post/:_id', {
  name: 'postPage',
  data: function() { return Posts.findOne(this.params._id); }
});