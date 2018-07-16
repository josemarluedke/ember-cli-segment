import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import sinon from 'sinon';

window.analytics = {
  page: function() {},
  track: function() {},
  identify: function() {},
  alias: function() {}
};

let sandbox = sinon.sandbox.create();

module('Acceptance: Router', function(hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('should trigger page and identify when visiting /', async function(assert) {
    sandbox.spy(window.analytics, 'page');
    sandbox.spy(window.analytics, 'identify');
    await visit('/');

    assert.ok(window.analytics.page.called);
    assert.ok(
      window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' })
    );
  });

  test('should trigger page and identify when clicking page-1', async function(assert) {
    sandbox.spy(window.analytics, 'page');
    sandbox.spy(window.analytics, 'identify');
    await visit('/');
    await click('.page-1');

    assert.ok(window.analytics.page.called);
    assert.ok(
      window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' })
    );
  });

  test('should trigger page and identify when clicking page-2', async function(assert) {
    sandbox.spy(window.analytics, 'page');
    sandbox.spy(window.analytics, 'identify');
    await visit('/');
    await click('.page-2');

    assert.ok(window.analytics.page.called);
    assert.ok(
      window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' })
    );
  });

  test('should trigger page and identify when clicking index', async function(assert) {
    sandbox.spy(window.analytics, 'page');
    sandbox.spy(window.analytics, 'identify');
    await visit('/');
    await click('.index');

    assert.ok(window.analytics.page.called);
    assert.ok(
      window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' })
    );
  });

  test('should not trigger analytics.identify when visiting /', async function(assert) {
    sandbox.spy(window.analytics, 'identify');
    await visit('/?TEST_NO_IDENTIFY=1');

    assert.ok(!window.analytics.identify.called);
  });

  test('should not trigger page and identify when visiting page3', async function(assert) {
    sandbox.spy(window.analytics, 'page');
    sandbox.spy(window.analytics, 'identify');
    await visit('/page3');

    assert.ok(!window.analytics.page.called);
    assert.ok(!window.analytics.identify.called);
  });

  test('should not trigger page and identify when visiting page4', async function(assert) {
    sandbox.spy(window.analytics, 'page');
    sandbox.spy(window.analytics, 'identify');
    await visit('/page4');

    assert.ok(window.analytics.page.called);
    assert.ok(window.analytics.identify.called);
  });

  test('should not trigger analytics identify, page, track methods', async function(assert) {
    sandbox.spy(window.analytics, 'identify');
    await visit('/?TEST_DISABLE=1');
    await click('.index');
    await click('.page-1');
    await click('.page-2');

    assert.ok(!window.analytics.page.called);
    assert.ok(!window.analytics.identify.called);
    assert.ok(!window.analytics.track.called);
  });
});
