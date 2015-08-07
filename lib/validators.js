// Functions useful for validating user input data

Validators = {
  validatePost: function (post) {  // Verify that the requisite Post data has been submitted
    var errors = {};

    if ( ! post.title ) 
      errors.title = 'Please fill in a title.';

    if ( ! post.url ) 
      errors.url = 'Please fill in a URL.';
    
    if ( ! this.isValidUrl(post.url) )
      errors.url = 'The URL you\'ve provided is invalid.';

    return errors;
  },
  
  urlHasProtocol: function (url) {  // Does the url include http:// or https://
    var re = /^https?:\/\//i;
    return re.test(url);
  },
  
  isValidUrl: function (url) {
    var urlPattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    
    return urlPattern.test(url);
  },
  
  findDuplicateUrl: function (checkUrl) {  // Check that no other Post documents have this URL
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
  }
};