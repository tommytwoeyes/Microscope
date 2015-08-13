// Fixture data
if ( Posts.find().count() === 0 ) {
  var now = new Date().getTime();
  
  // Create a two new users
  var tomId = Meteor.users.insert({
    profile: {name: 'Tom Coleman'}
  });
  var tom = Meteor.users.findOne(tomId);
  
  var sachaId = Meteor.users.insert({
    profile: {name: 'Sacha Greif'}
  });
  var sacha = Meteor.users.findOne(sachaId);
  
  // First fake post
  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: sacha._id,
    author: sacha.profile.name,
    url: 'http://sachagreif.com/introducing-telescope',
    submitted: new Date(now - 7 * 3600 * 1000) // 7 hours ago
  });
  
  // First fake post's comments
    Comments.insert({
      postId: telescopeId,
      userId: tom._id,
      author: tom.profile.name,
      submitted: new Date(now - 5 * 3600 * 1000), // 5 hours ago
      body: 'Interesting project, Sacha! Can I get involved?'
    });
  
    Comments.insert({
      postId: telescopeId,
      userId: sacha._id,
      author: sacha.profile.name,
      submitted: new Date(now - 3 * 3600 * 1000), // 3 hours ago
      body: 'Get outta here, Tom'
    });
  
  // Second fake post
  var meteorId = Posts.insert({
    title: 'Meteor',
    userId: tom._id,
    author: tom.profile.name,
    url: 'http://meteor.com',
    submitted: new Date(now - 4 + 24 * 3600 * 1000), // ?
  });
  
  // Second fake post's comments
    Comments.insert({
      postId: meteorId,
      userId: sacha._id,
      author: sacha.profile.name,
      submitted: new Date(now - 3 + 24 * 3600 * 1000), // ?
      body: "Wow, that's some crazy good shit, Tom! Where did you hear about Meteor? How can I get started with it?"
    });
  
    Comments.insert({
      postId: meteorId,
      userId: tom._id,
      author: tom.profile.name,
      submitted: new Date(now - 1 + 24 * 3600 * 1000),
      body: "I know, man. It's a really awesome framework. It's going to completely change how web development is done. Try this book: Discover Meteor"
    });
  
  Posts.insert({
    userId: tom._id,
    author: tom.profile.name,
    title: 'Discover Meteor : the Meteor Book',
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000)
  });
  
  
}