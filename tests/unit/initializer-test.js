import getOwner from 'ember-getowner-polyfill';
import Ember from 'ember';
import initialize from 'ember-cli-segment/initializer';

var owner, application;

module('segmentInitializer', {
  setup: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      owner = getOwner(application);
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function() {
  initialize(owner, application);

  // you would normally confirm the results of the initializer here
  ok(true);
});
