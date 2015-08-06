// Functions useful for validating user input data

urlHasProtocol = function (url) {    // Does the url include http:// or https://
  var re = /^https?:\/\//i;
  return re.test(url);
};

findDuplicateUrl = function (checkUrl) {    
    var duplicate = Posts.findOne({url: checkUrl});
    
    if (duplicate) {
      return {
        postExists: true,
        _id: duplicate._id
      };
    }
    
    return {
      postExists: false,
      _id: null
    }
};