// Initialize the errorMessages object every time the postCreate
// template is rendered, so that the user will never see old error 
// messages from a previous interaction with the form
Template.postCreate.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

// These helpers generate the reactive error messages and
// error message CSS classes that (reactively) get added to
// and removed from the form as the user interacts with it
Template.postCreate.helpers({
  errorMessage: function (field) {
    return Session.get('postSubmitErrors')[field];
  },
  
  errorClass: function (field) {
    if ( Session.get('postSubmitErrors')[field] ) {
      return 'has-error';
    }
    
    return '';
  }
});

Template.postCreate.events({  
  'submit form': function(e) {
    // Prevent form from being submitted over HTTP
    e.preventDefault();
    
    var post = {
      title:    $(e.target).find('[name=title]').val(),
      url:      $(e.target).find('[name=url]').val()
    };
    
    var errors = Validators.validatePost(post);
    if ( errors.title || errors.url ) 
      return Session.set('postSubmitErrors', errors);
    
    // Ensure URL begins with HTTP or Secure HTTP protocol
    if ( ! Validators.urlHasProtocol(post.url)) {
      post.url = 'http://' + post.url;
    } 
    
    Meteor.call('postInsert', post, function(error, result) {
      // Display the error to the user and abort
      if (error)
        return throwError(error.reason);
        
      // If a Post with the submitted URL already exists, route the user
      // to the previous post instead
      if (result.postExists)
        throwError('This link has already been posted.');
      
      Router.go('postPage', {_id: result._id});  
    });
  }
});