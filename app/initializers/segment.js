import config from '../config/environment';

export function initialize() {
  const application = arguments[1] || arguments[0];

  const { segment = {} } = config;
  const { environment = 'development' } = config;
  const segmentConfig = { segment, environment };

  let segmentDomain = config.segment.proxyDomain || 'https://cdn.segment.com/';
  if (!/\/$/.test(segmentDomain)) {
    segmentDomain += '/';
  }

  window['__ember-cli-segment__'] = {};
  window['__ember-cli-segment__'].WRITE_KEY = config.segment.WRITE_KEY;
  window['__ember-cli-segment__'].host = segmentDomain;

  application.register('config:segment', segmentConfig, { instantiate: false });
  application.inject('service:segment', 'config', 'config:segment');
}

export default {
  name: 'segment',
  initialize: initialize
};
