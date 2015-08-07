/**
 * --> Test that the Errors collection is empty on initialization
 * --> Test that we can insert an error and verify its existence in the Errors collection
 */
Tinytest.add('Errors --> Collection', function (test) {
  test.equal(Errors.collection.find({}).count(), 0);
  
  Errors.throw('A test error!');
  test.equal(Errors.collection.find({}).count(), 1);
  
  Errors.collection.remove({});
});

/**
 * --> Test that we can find an error message we've just added
 * --> Test that UI error message template is removed from the DOM reactively after an appropriate amount of time
 */
TinyTest.addAsync('Errors --> Template', function(test, done) {
  Errors.throw('A new error!');
  test.equal(Errors.collection.find({}).count(), 1);
  
  // Render the template
  UI.insert( UI.render(Template.meteorErrors, document.body) );
  
  Meteor.setTimeout(function() {
    test.equal(Errors.collection.find({}).count(), 0);
    done();
  }, 3500);
});