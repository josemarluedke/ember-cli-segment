import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  segment: service(),

  afterModel() {
    this.get('segment').trackEvent("test event");
  }
});
