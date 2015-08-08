Meteor.publish('posts', function (searchString){
  check(searchString, String);
  
  return Posts.find({
    title:    {
      $regex:    searchString,
      $options:  'i'
    }
  });
});

Meteor.publish('comments', function() {
  return Comments.find();
});