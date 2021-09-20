import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Page2Route extends Route {
  @service segment;

  @action
  didTransition() {
    this.segment.trackEvent('test event');
  }
}
