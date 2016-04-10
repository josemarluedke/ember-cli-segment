import Ember from 'ember';
import segmentMixin from './mixin';

export default function initialize() {
  // 1.13 and 2.x support
  let application = arguments[1] || arguments[0];
  var segment = Ember.Object.extend(segmentMixin);
  application.register('service:segment', segment, { singleton: true });
  application.inject('route', 'segment', 'service:segment');
  application.inject('router', 'segment', 'service:segment');
  application.inject('controller', 'segment', 'service:segment');
  application.inject('component', 'segment', 'service:segment');
}
