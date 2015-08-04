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
  }
});

Meteor.methods({
  
  // Validation method to be called before creating/inserting posts
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });
    
    // Check that the URL submitted with this Post is unique;
    // If it isn't, reject it and return the ID of the Post containing the URL
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }
    
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    
    var postId = Posts.insert(post);
    
    return {_id: postId};
  }
});