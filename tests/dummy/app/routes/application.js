import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

function identifyUser() {
  this.segment.identifyUser(1, { name: 'Josemar Luedke' });
}

function trackPageView() {
  this.segment.trackPageView(this.router.currentRouteName);
}

export default Route.extend({
  segment: service(),
  router: service(),
  identifyUser: null,

  model(params, transition) {
    // Ember v3.6+ has public "to" and "from" route info properties
    const queryParams = transition.to
      ? transition.to.queryParams
      : transition.queryParams;

    if (queryParams.TEST_NO_IDENTIFY) {
      this.set('identifyUser', null);
    } else {
      this.set('identifyUser', identifyUser);
    }

    if (queryParams.TEST_DISABLE) {
      this.segment.disable();
    }

    if (queryParams.TEST_DISABLE_DEFAULT_TRACKING) {
      this.segment.disableDefaultPageTrack();
      this.segment.disableDefaultIdentifyUser();
    }

    if (queryParams.TEST_CUSTOM_TRACK_PAGE) {
      this.set('trackPageView', trackPageView);
    } else {
      this.set('trackPageView', null);
    }
  },
});
