Package.describe({
  name: 'thebionicman:errors',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'A pattern for displaying application errors to users',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

// Tell Meteor how to use the Errors package's API
Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
  api.addFiles([
		'./client/collections/errors.js',
		'./client/templates/errors_list.html',
		'./client/helpers/errors_list.js'
	], 'client');
  
  if (api.export)
    api.export('Errors');
});

// Tell Meteor how to run the package tests
Package.onTest(function(api) {
  api.use('thebionicman:errors', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');
  api.addFiles('./tests/errors_tests.js', 'client');
});
