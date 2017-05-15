export function initialize(appInstance) {
  // Support Ember 1.13+
  const owner = appInstance.lookup ? appInstance : appInstance.container;

  const router = owner.lookup('router:main');
  const segment = owner.lookup('service:segment');

  if (segment && segment.pageTrackEnabled()) {
    router.on('didTransition', function() {
      segment.trackPageView();
    });
  }

  if (segment && segment.identifyUserEnabled()) {
    router.on('didTransition', function() {
      const applicationRoute = owner.lookup('route:application');

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
