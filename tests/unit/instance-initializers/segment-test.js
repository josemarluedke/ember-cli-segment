import Application from '@ember/application';
import { run } from '@ember/runloop';
import { initialize } from 'dummy/instance-initializers/segment';
import { module, test } from 'qunit';

module('Unit | Instance Initializer | segment', function(hooks) {
  hooks.beforeEach(function() {
    run(() => {
      this.application = Application.create();
      this.appInstance = this.application.buildInstance();
    });
  });

  hooks.afterEach(function() {
    run(this.appInstance, 'destroy');
    run(this.application, 'destroy');
  });

  // Replace this with your real tests.
  test('it works', function(assert) {
    initialize(this.appInstance);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
