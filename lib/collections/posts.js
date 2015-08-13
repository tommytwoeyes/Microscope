// Create the posts collection for storing post data
Posts = new Mongo.Collection('posts');

// Business logic governing when users can modify or delete posts
Posts.allow({
  // Allow: update own post
  update: function(userId, post) { return ownsDocument(userId, post); },  
  
  // Allow: delete own post
  remove: function(userId, post) { return ownsDocument(userId, post); },  
});
Posts.deny({
  update: function(userId, post, fieldNames) {
    // Deny: any attempts to modify fields other than url, title
    return ( _.without(fieldNames, 'url', 'title').length > 0 );          
  },
  update: function(userId, post, fieldNames, modifier) {
    var errors = Validators.validatePost(modifier.$set);
    
    // Returns true if there is an error with the title or with the url attribute,
    // which is what I want, since the Post update will be *denied* when this function
    // returns true.
    return errors.title || errors.url;
  }
});


Meteor.methods({
  
  // Validation method to be called before creating/inserting posts
  postInsert: function(post) {
    check(post, {
      title: String,
      url: String
    });
    
    var errors = Validators.validatePost(post);
    if ( errors.title || errors.url )
      throw new Meteor.Error('invalid-post', "You must provide both a title and a URL for your post.");
    
    // Check that the URL submitted with this Post is unique;
    // If it isn't, reject it and return the ID of the Post containing the URL
    var dup = Validators.findDuplicateUrl(post.url);
    if (dup.postExists) {
      return {
        postExists: true,
        _id: dup._id
      };
    }
    
    var user = Meteor.user();
    var modifiedPost = _.extend(post, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
			commentsCount: 0
    });
    
    var postId = Posts.insert(modifiedPost);
    
    return {_id: postId};
  }
});