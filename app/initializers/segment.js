import config from '../config/environment';

export function initialize() {
  const application = arguments[1] || arguments[0];

  const { segment = {} } = config;
  const { environment = 'development' } = config;
  const segmentConfig = { segment, environment };

  application.register('config:segment', segmentConfig, { instantiate: false });
  application.inject('service:segment', 'config', 'config:segment');
}

export default {
  name: 'segment',
  initialize: initialize
};
