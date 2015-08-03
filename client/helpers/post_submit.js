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
    
    post._id = Posts.insert(post);
    Router.go('postPage', post);
  }
});

function urlHasProtocol(url) {
  var re = /^https?:\/\//i;
  return re.test(url);
}