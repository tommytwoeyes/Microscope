// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'tk.thecalculus.microscope',
  name: 'Microscope',
  description: "See what's really going on with Microscope",
  author: 'Recursi0n Development Group',
  email: 'getsome@recursi0n.io',
  website: 'http://recursi0n.io'
});

// Set up resources such as icons and launch screens.
App.icons({
  'iphone': 'public/img/microscope_64px.png',
  'iphone_2x': 'public/img/microscope_256px.png',
  // ... more screen sizes and platforms ...
});

App.launchScreens({
  'iphone': '',
  'iphone_2x': '',
  // ... more screen sizes and platforms ...
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0x2e2e2eff');
App.setPreference('HideKeyboardFormAccessoryBar', true);

// Pass preferences for a particular PhoneGap/Cordova plugin
/*
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '1234567890',
  API_KEY: 'supersecretapikey'
});
*/