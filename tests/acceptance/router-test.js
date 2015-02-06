import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;
var sinon = window.sinon;
window.analytics = {
  page: function() {},
  track: function() {},
  identify: function() {},
  alias: function() {},
};

module('Acceptance: Router', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
    sinon.restore(window.analytics);
  }
});

test('should trigger page and identify when visiting /', function() {
  sinon.spy(window.analytics, 'page');
  sinon.spy(window.analytics, 'identify');
  visit('/');

  andThen(function() {
    ok(window.analytics.page.calledWith('/'));
    ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should trigger page and identify when clicking page-1', function() {
  sinon.spy(window.analytics, 'page');
  sinon.spy(window.analytics, 'identify');
  visit('/');
  click('.page-1');

  andThen(function() {
    ok(window.analytics.page.calledWith('/page1'));
    ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should trigger page and identify when clicking page-2', function() {
  sinon.spy(window.analytics, 'page');
  sinon.spy(window.analytics, 'identify');
  visit('/');
  click('.page-2');

  andThen(function() {
    ok(window.analytics.page.calledWith('/page2'));
    ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should trigger page and identify when clicking index', function() {
  sinon.spy(window.analytics, 'page');
  sinon.spy(window.analytics, 'identify');
  visit('/');
  click('.index');

  andThen(function() {
    ok(window.analytics.page.calledWith('/'));
    ok(window.analytics.identify.calledWith(1, { name: 'Josemar Luedke' }));
  });
});

test('should not trigger analytics.identify when visiting /', function() {
  application.__container__.lookup('route:application').set('identifyUser', null);
  sinon.spy(window.analytics, 'identify');
  visit('/');

  andThen(function() {
    ok(!window.analytics.identify.called);
  });
});

