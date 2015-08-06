// Functions useful for validating user input data

function urlHasProtocol(url) {    // Does the url include http:// or https://
  var re = /^https?:\/\//i;
  return re.test(url);
}