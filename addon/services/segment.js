/* globals FastBoot */
import Service from '@ember/service';
import { warn } from '@ember/debug';

export default Service.extend({
  _disabled: false,
  _defaultPageTrackDisabled: false,
  _defaultIdentifyUserDisabled: false,

  _calledPageTrack: false,

  init() {
    this._super();

    const isFastBoot = typeof FastBoot !== 'undefined';

    if (
      !this.hasAnalytics() &&
      (this.config && this.config.environment !== 'test') &&
      !isFastBoot
    ) {
      warn('Segment is not loaded yet (window.analytics)', false, {
        id: 'ember-cli-segment.analytics-not-loaded'
      });
    }

    if (this.config && this.config.segment) {
      const {
        defaultPageTrack,
        defaultIdentifyUser,
        enabled
      } = this.config.segment;
      this.set('_defaultPageTrackDisabled', defaultPageTrack === false);
      this.set('_defaultIdentifyUserDisabled', defaultIdentifyUser === false);
      this.set('_disabled', enabled === false);
    }
  },

  hasAnalytics() {
    return !!(window.analytics && typeof window.analytics === 'object');
  },

  isEnabled() {
    return !this.isDisabled();
  },

  isDisabled() {
    return this.get('_disabled');
  },

  enable() {
    this.set('_disabled', false);
  },

  disable() {
    this.set('_disabled', true);
  },

  pageTrackEnabled() {
    return !this.pageTrackDisabled();
  },

  pageTrackDisabled() {
    return this.get('_defaultPageTrackDisabled');
  },

  enableDefaultPageTrack() {
    this.set('_defaultPageTrackDisabled', false);
  },

  disableDefaultPageTrack() {
    this.set('_defaultPageTrackDisabled', true);
  },

  identifyUserEnabled() {
    return !this.identifyUserDisabled();
  },

  identifyUserDisabled() {
    return this.get('_defaultIdentifyUserDisabled');
  },

  enableDefaultIdentifyUser() {
    this.set('_defaultIdentifyUserDisabled', false);
  },

  disableDefaultIdentifyUser() {
    this.set('_defaultIdentifyUserDisabled', true);
  },

  log() {
    if (
      this.config &&
      this.config.segment &&
      this.config.segment.LOG_EVENT_TRACKING
    ) {
      console.info('[Segment.io] ', arguments); // eslint-disable-line no-console
    }
  },

  trackPageView() {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.page.apply(this, arguments);
      this.set('_calledPageTrack', true);

      this.log('trackPageView', arguments);
    }
  },

  trackEvent(event, properties, options, callback) {
    if (this.isEnabled() && this.hasAnalytics()) {
      this.checkPageTrackCalled();
      window.analytics.track(event, properties, options, callback);

      this.log(event, properties, options);
    }
  },

  identifyUser(userId, traits, options, callback) {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.identify(userId, traits, options, callback);

      this.log('identifyUser', traits, options);
    }
  },

  // reset group, user traits and id's
  reset() {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.reset();

      this.log('reset');
    }
  },

  group(groupId, traits, options, callback) {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.group(groupId, traits, options, callback);

      this.log('group', traits, options);
    }
  },

  aliasUser(userId, previousId, options, callback) {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.alias(userId, previousId, options, callback);

      this.log('aliasUser', userId, previousId, options);
    }
  },

  /**
   * Logs warning into console if trackPageView method wasn't called before tracking event
   *
   * @see https://segment.com/docs/sources/website/analytics.js/#page
   */
  checkPageTrackCalled() {
    warn(
      '[ember-cli-segment] You should call trackPageView at least once ' +
        'before tracking events: ' +
        'https://segment.com/docs/sources/website/analytics.js/#page',
      this.get('_calledPageTrack'),
      {
        id: 'ember-cli-segment.must-call-page'
      }
    );
  }
});
