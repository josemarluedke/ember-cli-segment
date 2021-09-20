import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  segment: service(),

  model() {
    this.segment.enableDefaultPageTrack();
    this.segment.enableDefaultIdentifyUser();
  },
});
