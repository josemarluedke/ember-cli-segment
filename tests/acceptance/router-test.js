import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import sinon from 'sinon';

window.analytics = {
  page: function() {},
  track: function() {},
  identify: function() {},
  alias: function() {},
};

let sandbox = sinon.sandbox.create();

moduleForAcceptance('Acceptance: Router', {
  afterEach() {
    sandbox.restore();
  }
});

test('should trigger page and identify when visiting /', function(assert) {
  sandbox.spy(window.analytics, 'page');
  sandbox.spy(window.analytics, 'identify');
  visit('/');

  andThen(function() {
    assert.ok(window.analytics.page.called);
    assert.ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should trigger page and identify when clicking page-1', function(assert) {
  sandbox.spy(window.analytics, 'page');
  sandbox.spy(window.analytics, 'identify');
  visit('/');
  click('.page-1');

  andThen(function() {
    assert.ok(window.analytics.page.called);
    assert.ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should trigger page and identify when clicking page-2', function(assert) {
  sandbox.spy(window.analytics, 'page');
  sandbox.spy(window.analytics, 'identify');
  visit('/');
  click('.page-2');

  andThen(function() {
    assert.ok(window.analytics.page.called);
    assert.ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should trigger page and identify when clicking index', function(assert) {
  sandbox.spy(window.analytics, 'page');
  sandbox.spy(window.analytics, 'identify');
  visit('/');
  click('.index');

  andThen(function() {
    assert.ok(window.analytics.page.called);
    assert.ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should not trigger analytics.identify when visiting /', function(assert) {
  sandbox.spy(window.analytics, 'identify');
  visit('/?TEST_NO_IDENTIFY=1');

  andThen(function() {
    assert.ok(!window.analytics.identify.called);
  });
});

test('should not trigger identify, page and track methods when clicking index, page-1 or page-2', function (assert) {
  sandbox.spy(window.analytics, 'identify');
  sandbox.spy(window.analytics, 'page');
  sandbox.spy(window.analytics, 'track');
  visit('/?TEST_DISABLE=1');
  click('.index');
  click('.page-1');
  click('.page-2');

  andThen(function () {
    assert.ok(!window.analytics.page.called);
    assert.ok(!window.analytics.identify.called);
    assert.ok(!window.analytics.track.called);
  });
});

test('should not trigger page and identify but should call track when clicking page-2', function (assert) {
  sandbox.spy(window.analytics, 'page');
  sandbox.spy(window.analytics, 'identify');
  sandbox.spy(window.analytics, 'track');
  visit('/?TEST_DISABLE_DEFAULT_TRACKING=1');
  click('.page-2');

  andThen(function () {
    assert.ok(!window.analytics.page.called);
    assert.ok(!window.analytics.identify.called);
    assert.ok(window.analytics.track.called);
  });
});

test('should trigger page and identify when clicking page-3', function (assert) {
  sandbox.spy(window.analytics, 'page');
  sandbox.spy(window.analytics, 'identify');
  visit('/?TEST_DISABLE_DEFAULT_TRACKING=1');
  click('.page-3');

  andThen(function () {
    assert.ok(window.analytics.page.called);
    assert.ok(window.analytics.identify.called);
  });
});

test('should use trackPageView of application controller for default page tracking', function (assert) {
  sandbox.spy(window.analytics, 'page');
  visit('/?TEST_CUSTOM_TRACK_PAGE=1');
  click('.page-3');

  andThen(function () {
    assert.ok(window.analytics.page.calledWith('page3'));
  });
});

test('should use trackPageView of segment service for default page tracking', function (assert) {
  sandbox.spy(window.analytics, 'page');
  visit('/');
  click('.page-3');

  andThen(function () {
    assert.ok(window.analytics.page.neverCalledWith('page3'));
  });
});
