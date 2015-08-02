// Config
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts', '.*'); }
});

/*--> Static Routes <--*/
  // About
  Router.route('/about');

/*-- Dynamic Routes <--*/
  // Posts list
  Router.route('/', {name: 'postsList'});

  // Single post view
  Router.route('/post/:_id', {
    name: 'postPage',
    data: function() { return Posts.findOne(this.params._id); }
  });

  // Submit new post
  Router.route('/posts/new', {name: 'postSubmit'});

/*--> Hooks <--*/
  Router.onBeforeAction('dataNotFound', {only: 'postPage'});