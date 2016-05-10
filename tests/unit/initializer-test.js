import Ember from 'ember';
import { module, test } from 'qunit';
import initialize from 'ember-cli-segment/initializer';

var application;

module('segmentInitializer', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

test('it works', function(assert) {
  initialize(application);
  assert.ok(true);
});
