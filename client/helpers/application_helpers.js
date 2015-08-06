// Defines helper functions which can be called from any template, 
// globally throughout the app

Template.registerHelper('currentRoute', function() {
  return Router.current().route.getName();
});

Template.registerHelper('urlHasProtocol', function(url) {
  var re = /^https?:\/\//i;
  return re.test(url);
});