import initialize from 'ember-cli-segment/instance-initializer';
import config from '../config/environment';

export default {
  name: 'segment',
  initialize: function(applicationInstance) {
    var segment = applicationInstance.lookup('service:segment');

    segment.set('config', config);
    initialize(...arguments);
  }
};
