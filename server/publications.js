Meteor.publish('posts', function (searchString){
  check(searchString, String);
  
  return Posts.find({
    title:    {
      $regex:    searchString,
      $options:  'i'
    }
  });
});