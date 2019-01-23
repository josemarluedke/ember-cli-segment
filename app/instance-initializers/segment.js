import { VERSION } from '@ember/version';

// Taken from ember-test-helpers
function hasEmberVersion(major, minor) {
  const numbers = VERSION.split('-')[0].split('.');
  const actualMajor = parseInt(numbers[0], 10);
  const actualMinor = parseInt(numbers[1], 10);
  return actualMajor > major || (actualMajor === major && actualMinor >= minor);
}

export function initialize(appInstance) {
  // Support Ember 1.13+
  const owner = appInstance.lookup ? appInstance : appInstance.container;

  const routerServicePresent = hasEmberVersion(3, 6);

  const router = owner.lookup(
    routerServicePresent ? 'service:router' : 'router:main'
  );
  const segment = owner.lookup('service:segment');

  // Since Ember v3.6 didTransition is deprecated in favour of routeDidChange
  const eventName = routerServicePresent ? 'routeDidChange' : 'didTransition';

  router.on(eventName, function() {
    const applicationRoute = owner.lookup('route:application');

    if (segment && segment.isPageTrackEnabled()) {
      if (typeof applicationRoute.trackPageView === 'function') {
        applicationRoute.trackPageView();
      } else {
        segment.trackPageView();
      }
    }

    if (segment && segment.isIdentifyUserEnabled()) {
      if (
        applicationRoute &&
        typeof applicationRoute.identifyUser === 'function'
      ) {
        applicationRoute.identifyUser();
      }
    }
  });
}

export default {
  name: 'segment',
  initialize
};
