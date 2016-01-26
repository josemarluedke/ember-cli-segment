import getOwner from 'ember-getowner-polyfill';

export default function instanceInitialize(applicationInstance) {
  var owner = getOwner(applicationInstance);

  var router = owner.lookup('router:main');
  var segment = owner.lookup('service:segment');

  router.on('didTransition', function() {
    segment.trackPageView();

    var applicationRoute = owner.lookup('route:application');
    if(applicationRoute && typeof applicationRoute.identifyUser === 'function') {
      applicationRoute.identifyUser();
    }
  });
}
