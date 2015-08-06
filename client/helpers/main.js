// Defines helper functions which can be called from any template, 
// globally throughout the app

Template.registerHelper('urlHasProtocol', function(url) {    // Does the url include http:// or https://
  var re = /^https?:\/\//i;
  return re.test(url);
});

Template.registerHelper('currentRoute', function() {
  return Router.current().route.getName();
});