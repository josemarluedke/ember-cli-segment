import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  segment: service(),

  actions: {
    didTransition() {
      this.get('segment').trackEvent('test event');
    }
  }
});
