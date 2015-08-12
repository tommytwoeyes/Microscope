Template.commentSubmit.onCreated(function () {
	// Empty the comment form errors from the Session
	// on initialization, to ensure the user doesn't
	// see any stale error messages from a previous
	// interaction with the form
  Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
  /**
   * Template helper
   * Injects form validation error message into the comment
   * submit form
   *
   * @param   {Boolean} field The field to get error message for
   * @returns {String} Error message
   */
  errorMessage: function(field) {
    return Session.get('commentSubmitErrors')[field];
  },

  /**
   * Template helper
   * Checks Session for comment form errors
   * and injects appropriate CSS class name in HTML tags.
   *
   * If the field has errors, it uses Bootstrap's [ .has-errors ] class
   * If the field input is ok, it uses Bootstrap's [ .has-success ] class
   *
   * @param   {String} field The field name to check for errors
   * @returns {String}   The error class to inject
   */
  errorClass: function (field) {
    if ( Session.get('commentSubmitErrors')[field] ) {
      return 'has-warning';
    }

    return '';
  }
});

Template.commentSubmit.events({
  'submit form': function(e, template){
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      postId: template.data._id
    };

    var errors = {};
    if( ! comment.body ) {
      errors.body = 'Please write a comment';
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', comment, function(error, commentId) {
      if (error) {
        throw(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});
