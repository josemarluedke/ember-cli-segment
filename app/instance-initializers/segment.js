// import getOwner from 'ember-getowner-polyfill';

export function initialize(appInstance) {
  const router = appInstance.lookup('router:main');
  const segment = appInstance.lookup('service:segment');

  if (segment && segment.pageTrackEnabled()) {
    router.on('didTransition', function() {
      segment.trackPageView();
    });
  }

  if (segment && segment.identifyUserEnabled()) {
    router.on('didTransition', function() {
      const applicationRoute = appInstance.lookup('route:application');

      if (applicationRoute && typeof applicationRoute.identifyUser === 'function') {
        applicationRoute.identifyUser();
      }
    });
  }
}

export default {
  name: 'segment',
  initialize
};
