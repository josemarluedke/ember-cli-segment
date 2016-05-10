import Ember from 'ember';
import { module, test } from 'qunit';
import segmentMixin from 'ember-cli-segment/mixin';
import sinon from 'sinon';

var instance;

window.analytics = {
  page: function() {},
  track: function() {},
  identify: function() {},
  alias: function() {},
};

module('segmentMixin', {
  beforeEach: function() {
    var segmentObject = Ember.Object.extend(segmentMixin);
    instance = segmentObject.create();
  },
  afterEach: function() {
    sinon.restore(window.analytics);
  }
});

test('it works', function(assert) {
  assert.ok(instance);
});

test('calls analytics.page on trackPageView', function(assert) {
  sinon.spy(window.analytics, 'page');
  instance.trackPageView('/neighborly');
  assert.ok(window.analytics.page.calledWith('/neighborly'));
});

test('calls analytics.track on trackEvent', function(assert) {
  sinon.spy(window.analytics, 'track');
  instance.trackEvent('click', 'properties', 'options', 'callback');
  assert.ok(window.analytics.track.calledWith('click', 'properties', 'options', 'callback'));
});

test('calls analytics.identify on identifyUser', function(assert) {
  sinon.spy(window.analytics, 'identify');
  instance.identifyUser('userId', 'traits', 'options', 'callback');
  assert.ok(window.analytics.identify.calledWith('userId', 'traits', 'options', 'callback'));
});

test('calls analytics.identify on aliasUser', function(assert) {
  sinon.spy(window.analytics, 'alias');
  instance.aliasUser('userId', 'previousId', 'options', 'callback');
  assert.ok(window.analytics.alias.calledWith('userId', 'previousId', 'options', 'callback'));
});
