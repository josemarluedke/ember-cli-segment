import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import sinon from 'sinon';

window.analytics = {
  page: function() {},
  track: function() {},
  identify: function() {},
  alias: function() {},
};

moduleForAcceptance('Acceptance: Router', {
  afterEach() {
    sinon.restore(window.analytics);
  }
});

test('should trigger page and identify when visiting /', function(assert) {
  sinon.spy(window.analytics, 'page');
  sinon.spy(window.analytics, 'identify');
  visit('/');

  andThen(function() {
    assert.ok(window.analytics.page.called);
    assert.ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should trigger page and identify when clicking page-1', function(assert) {
  sinon.spy(window.analytics, 'page');
  sinon.spy(window.analytics, 'identify');
  visit('/');
  click('.page-1');

  andThen(function() {
    assert.ok(window.analytics.page.called);
    assert.ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should trigger page and identify when clicking page-2', function(assert) {
  sinon.spy(window.analytics, 'page');
  sinon.spy(window.analytics, 'identify');
  visit('/');
  click('.page-2');

  andThen(function() {
    assert.ok(window.analytics.page.called);
    assert.ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should trigger page and identify when clicking index', function(assert) {
  sinon.spy(window.analytics, 'page');
  sinon.spy(window.analytics, 'identify');
  visit('/');
  click('.index');

  andThen(function() {
    assert.ok(window.analytics.page.called);
    assert.ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should not trigger analytics.identify when visiting /', function(assert) {
  sinon.spy(window.analytics, 'identify');
  visit('/?TEST_NO_IDENTIFY=1');

  andThen(function() {
    assert.ok(!window.analytics.identify.called);
  });
});
