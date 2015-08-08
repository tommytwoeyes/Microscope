// Router : custom methods
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

// Config
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  
  // The second argument to subscribe() is a search pattern, which
  // is not necessary here, since I'm retrieving all posts anyway
  // I left it in as a reminder that this will make a good way to 
  // display posts by category in different views.
  waitOn: function() { return [
    Meteor.subscribe('posts', '.*'), 
    Meteor.subscribe('comments')
  ]; }
});

/*--> Static Routes <--*/
  // About
  Router.route('/about', {name: 'about'});

/*-- Dynamic Routes <--*/
  // Posts list
  Router.route('/', {name: 'postsList'});

  // Single post view
  Router.route('/posts/:_id', {
    name: 'postPage',
    data: function() { return Posts.findOne(this.params._id); }
  });

  // Submit new post
  Router.route('/post/new', {name: 'postCreate'});

  // Edit single post
  Router.route('posts/:_id/edit', {
    name: 'postEdit',
    data: function() { return Posts.findOne(this.params._id); }
  });

/*--> Hooks <--*/
  Router.onBeforeAction('dataNotFound', {only: 'postPage'});
  Router.onBeforeAction(requireLogin, {only: 'postCreate'});