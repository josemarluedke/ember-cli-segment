import getOwner from 'ember-getowner-polyfill';
import initialize from 'ember-cli-segment/instance-initializer';
import config from '../config/environment';

export default {
  name: 'segment',
  initialize: function(applicationInstance) {
    var owner = getOwner(applicationInstance);
    var segment = owner.lookup('service:segment');

    segment.set('config', config);
    initialize(...arguments);
  }
};
