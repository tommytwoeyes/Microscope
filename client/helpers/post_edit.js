Template.postEdit.events({
  'submit form': function(e) {
    // Prevent form from being submitted the default way, through HTTP
    e.preventDefault();

    var currentPostId = this._id;

    var postAttributes = {
      title:    $(e.target).find('[name=title]').val(),
      url:      $(e.target).find('[name=url]').val()
    };
    
    // Ensure URL has protocol (i.e. http:// or https://)
    if ( ! urlHasProtocol(postAttributes.url)) {
      postAttributes.url = 'http://' + postAttributes.url;
    }

    Posts.update(currentPostId, {$set: postAttributes}, function(error) {
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
