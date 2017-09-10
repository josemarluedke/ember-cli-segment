import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

window.analytics = {
  page: function() {},
  track: function() {},
  identify: function() {},
  alias: function() {},
  reset: function() {}
};

let sandbox = sinon.sandbox.create();

moduleFor('service:segment', 'Unit | Service | segment', {
  afterEach: function() {
    sandbox.restore();
  }
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('calls analytics.page on trackPageView', function(assert) {
  let service = this.subject();

  sandbox.spy(window.analytics, 'page');
  service.trackPageView('/neighborly');
  assert.ok(window.analytics.page.calledWith('/neighborly'));
});

test('calls analytics.track on trackEvent', function(assert) {
  let service = this.subject();

  sandbox.spy(window.analytics, 'track');
  service.trackEvent('click', 'properties', 'options', 'callback');
  assert.ok(window.analytics.track.calledWith('click', 'properties', 'options', 'callback'));
});

test('calls analytics.identify on identifyUser', function(assert) {
  let service = this.subject();

  sandbox.spy(window.analytics, 'identify');
  service.identifyUser('userId', 'traits', 'options', 'callback');
  assert.ok(window.analytics.identify.calledWith('userId', 'traits', 'options', 'callback'));
});

test('calls analytics.identify on aliasUser', function(assert) {
  let service = this.subject();

  sandbox.spy(window.analytics, 'alias');
  service.aliasUser('userId', 'previousId', 'options', 'callback');
  assert.ok(window.analytics.alias.calledWith('userId', 'previousId', 'options', 'callback'));
});

test('calls analytics.reset on reset', function(assert) {
  let service = this.subject();

  sandbox.spy(window.analytics, 'reset');
  service.reset();
  assert.ok(window.analytics.reset.calledOnce);
});
