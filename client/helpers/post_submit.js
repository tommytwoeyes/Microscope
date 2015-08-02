Template.postSubmit.events({
  'submit form': function(e) {
    // Prevent form from being submitted over HTTP
    e.preventDefault();
    
    var post = {
      title:    $(e.target).find('[name=title]').val(),
      url:      $(e.target).find('[name=url]').val()
    };
    
    post._id = Posts.insert(post);
    Router.go('postPage', post);
  }
});