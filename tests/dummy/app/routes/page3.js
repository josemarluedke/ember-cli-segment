import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class Page3Route extends Route {
  @service segment;

  model() {
    this.segment.enableDefaultPageTrack();
    this.segment.enableDefaultIdentifyUser();
  }
}
