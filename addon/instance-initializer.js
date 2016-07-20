
export default function instanceInitialize(applicationInstance) {
  var router = applicationInstance.lookup('router:main');
  var segment = applicationInstance.lookup('service:segment');

  if(segment.pageTrackEnabled()) {
    router.on('didTransition', function() {
      segment.trackPageView();
    });
  }

  if(segment.identifyUserEnabled()) {
    router.on('didTransition', function() {
      var applicationRoute = applicationInstance.lookup('route:application');
      if(applicationRoute && typeof applicationRoute.identifyUser === 'function') {
        applicationRoute.identifyUser();
      }
    });
  }
}
