Template.postSubmit.events({
  'submit form': function(e) {
    // Prevent form from being submitted over HTTP
    e.preventDefault();
    
    var post = {
      title:    $(e.target).find('[name=title]').val(),
      url:      $(e.target).find('[name=url]').val()
    };
    
    // Ensure URL begins with HTTP or Secure HTTP protocol
    if ( ! urlHasProtocol(post.url)) {
      post.url = 'http://' + post.url;
    }  
    
    Meteor.call('postInsert', post, function(error, result){
      // Display the error to the user and abort
      if (error)
        return alert(error.reason);
      
      // If a Post with the submitted URL already exists, route the user
      // to the previous post instead
      if (result.postExists)
        alert('This link has already been posted.');
      
      Router.go('postPage', {_id: result._id});
    });
    
    post._id = Posts.insert(post);
    Router.go('postPage', post);
  }
});

function urlHasProtocol(url) {
  var re = /^https?:\/\//i;
  return re.test(url);
}