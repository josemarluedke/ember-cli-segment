
export default function instanceInitialize(applicationInstance) {
  var router = applicationInstance.lookup('router:main');
  var segment = applicationInstance.lookup('service:segment');

  router.on('didTransition', function() {
    segment.trackPageView();

    var applicationRoute = applicationInstance.lookup('route:application');
    if(applicationRoute && typeof applicationRoute.identifyUser === 'function') {
      applicationRoute.identifyUser();
    }
  });
}
