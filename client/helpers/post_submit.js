// Initialize the errorMessages object every time the postCreate
// template is rendered, so that the user will never see old error 
// messages from a previous interaction with the form
Template.postCreate.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.postCreate.helpers({
  /**
   * Template helper
   * Injects form validation error message into the post
   * submit form
   *
   * @param   {Boolean} field The field to get error message for
   * @returns {String} Error message
   */
  errorMessage: function (field) {
    return Session.get('postSubmitErrors')[field];
  },

  /**
   * Template helper
   * Checks Session for post form errors
   * and injects appropriate CSS class name in HTML tags.
   *
   * If the field has errors, it uses Bootstrap's [ .has-errors ] class
   * If the field input is ok, it uses Bootstrap's [ .has-success ] class
   *
   * @param   {String} field The field name to check for errors
   * @returns {String}   The error class to inject
   */
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
        return Errors.throw(error.reason);
        
      // If a Post with the submitted URL already exists, route the user
      // to the previous post instead
      if (result.postExists)
        Errors.throw('This link has already been posted.');
      
      Router.go('postPage', {_id: result._id});  
    });
  }
});