import Ember from 'ember';
import segmentMixin from 'ember-cli-segment/mixin';

var instance;
var sinon = window.sinon;
window.analytics = {
  page: function() {},
  track: function() {},
  identify: function() {},
  alias: function() {},
};

module('segmentMixin', {
  setup: function() {
    var segmentObject = Ember.Object.extend(segmentMixin);
    instance = segmentObject.create();
  },
  teardown: function() {
    sinon.restore(window.analytics);
  }
});

test('it works', function() {
  ok(instance);
});

test('calls analytics.page on trackPageView', function() {
  sinon.spy(window.analytics, 'page');
  instance.trackPageView('/neighborly');
  ok(window.analytics.page.calledWith('/neighborly'));
});

test('calls analytics.track on trackEvent', function() {
  sinon.spy(window.analytics, 'track');
  instance.trackEvent('click', 'properties', 'options', 'callback');
  ok(window.analytics.track.calledWith('click', 'properties', 'options', 'callback'));
});

test('calls analytics.identify on identifyUser', function() {
  sinon.spy(window.analytics, 'identify');
  instance.identifyUser('userId', 'traits', 'options', 'callback');
  ok(window.analytics.identify.calledWith('userId', 'traits', 'options', 'callback'));
});

test('calls analytics.identify on aliasUser', function() {
  sinon.spy(window.analytics, 'alias');
  instance.aliasUser('userId', 'previousId', 'options', 'callback');
  ok(window.analytics.alias.calledWith('userId', 'previousId', 'options', 'callback'));
});
