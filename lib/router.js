// Config
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts', '.*'); }
});

/***> Static Routes <***/
  // Root
  Router.route('/', {name: 'postsList'});

  // About
  Router.route('/about');

/***> Dynamic Routes <***/
  // Single post view
  Router.route('/post/:_id', {
    name: 'postPage',
    data: function() { return Posts.findOne(this.params._id); }
  });