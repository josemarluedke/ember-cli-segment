import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
  segment: service(),

  model() {
    this.get('segment').disableDefaultPageTrack();
    this.get('segment').disableDefaultIdentifyUser();
  }
});
