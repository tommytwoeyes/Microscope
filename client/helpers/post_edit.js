// Initialize the errorMessages object every time the postEdit
// template is rendered, so that the user will never see old error 
// messages from a previous interaction with the form
Template.postEdit.onCreated(function() {
    Session.set('postEditErrors', {});
});

// These helpers generate the reactive error messages and
// error message CSS classes that (reactively) get added to
// and removed from the form as the user interacts with it
Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  
  errorClass: function(field) {
    if ( Session.get('postEditErrors')[field] ) {
      return 'has-error';
    }
    
    return '';
  }
});

Template.postEdit.events({
  'submit form': function(e) {
    // Prevent form from being submitted the default way, through HTTP
    e.preventDefault();

    var currentPostId = this._id;

    var post = {
      title:    $(e.target).find('[name=title]').val(),
      url:      $(e.target).find('[name=url]').val()
    };
    
    var errors = Validators.validatePost(post);
    if ( errors.title || errors.url ) 
      return Session.set('postEditErrors', errors);
    
    // Ensure URL begins with HTTP or Secure HTTP protocol
    if ( ! Validators.urlHasProtocol(post.url)) {
      post.url = 'http://' + post.url;
    } 

    Posts.update(currentPostId, {$set: post}, function(error) {
      if (error) {
        // Display error to user
        throwError(error.reason);
      } else {
        // Post updated successfully
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete': function(e) {
    // Prevent a link from being followed by default
    e.preventDefault();

    if ( confirm("Do you really want to delete this post?") ) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});
