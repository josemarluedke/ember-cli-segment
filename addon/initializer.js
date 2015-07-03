import Ember from 'ember';
import segmentMixin from './mixin';

function initialize(registry, application) {
  var segment = Ember.Object.extend(segmentMixin);
  application.register('service:segment', segment, { singleton: true });
  application.inject('route', 'segment', 'service:segment');
  application.inject('router', 'segment', 'service:segment');
  application.inject('controller', 'segment', 'service:segment');
}

function instanceInitialize(container) {
  var config = container.lookupFactory('config:environment');
  var router = container.lookup('router:main');
  var segment = container.lookup('service:segment');

  segment.set('config', config);

  router.on('didTransition', function() {
    segment.trackPageView();

    var applicationRoute = container.lookup('route:application');
    if(applicationRoute && typeof applicationRoute.identifyUser === 'function') {
      applicationRoute.identifyUser();
    }
  });
}

export { initialize, instanceInitialize };
