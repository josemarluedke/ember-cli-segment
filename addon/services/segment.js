/* globals FastBoot */
import Service from '@ember/service';
import {warn} from '@ember/debug';

export default Service.extend({
  _disabled: false,
  _defaultPageTrackDisabled: false,
  _defaultIdentifyUserDisabled: false,

  _calledPageTrack: false,

  init: function () {
    this._super();

    const isFastBoot = typeof FastBoot !== 'undefined';

    if (!this.hasAnalytics() && (this.config && this.config.environment !== 'test') && !isFastBoot) {
      warn('Segment.io is not loaded yet (window.analytics)', false, {
        id: 'ember-cli-segment.analytics-not-loaded'
      });
    }

    const hasSegmentConfig = (this.config && this.config.segment);
    this.set('_defaultPageTrackDisabled', hasSegmentConfig && this.config.segment.defaultPageTrack === false);
    this.set('_defaultIdentifyUserDisabled', hasSegmentConfig && this.config.segment.defaultIdentifyUser === false)
    this.set('_disabled', hasSegmentConfig && this.config.segment.enabled === false)
  },

  hasAnalytics: function () {
    return !!(window.analytics && typeof window.analytics === "object");
  },

  isEnabled: function () {
    return !this.isDisabled();
  },

  isDisabled: function () {
    return this.get('_disabled');
  },

  enable: function () {
    this.set('_disabled', false);
  },

  disable: function () {
    this.set('_disabled', true);
  },

  pageTrackEnabled: function () {
    return !this.pageTrackDisabled();
  },

  pageTrackDisabled: function () {
    return this.get('_defaultPageTrackDisabled');
  },

  enableDefaultPageTrack: function () {
    this.set('_defaultPageTrackDisabled', false);
  },

  disableDefaultPageTrack: function () {
    this.set('_defaultPageTrackDisabled', true);
  },

  identifyUserEnabled: function () {
    return !this.identifyUserDisabled();
  },

  identifyUserDisabled: function () {
    return this.get('_defaultIdentifyUserDisabled');
  },

  enableDefaultIdentifyUser: function () {
    this.set('_defaultIdentifyUserDisabled', false);
  },

  disableDefaultIdentifyUser: function () {
    this.set('_defaultIdentifyUserDisabled', true);
  },

  log: function () {
    if (this.config && this.config.segment && this.config.segment.LOG_EVENT_TRACKING) {
      console.info('[Segment.io] ', arguments);// eslint-disable-line no-console
    }
  },

  trackPageView: function () {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.page.apply(this, arguments);
      this.set('_calledPageTrack', true);

      this.log('trackPageView', arguments);
    }
  },

  trackEvent: function (event, properties, options, callback) {
    if (this.isEnabled() && this.hasAnalytics()) {
      this.checkPageTrackCalled();
      window.analytics.track(event, properties, options, callback);

      this.log(event, properties, options);
    }
  },

  identifyUser: function (userId, traits, options, callback) {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.identify(userId, traits, options, callback);

      this.log('identifyUser', traits, options);
    }
  },

  // reset group, user traits and id's
  reset: function () {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.reset();

      this.log("reset");
    }
  },

  group: function (groupId, traits, options, callback) {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.group(groupId, traits, options, callback);

      this.log('group', traits, options);
    }
  },

  aliasUser: function (userId, previousId, options, callback) {
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
  checkPageTrackCalled: function () {
    warn('You should call trackPageView at least once: https://segment.com/docs/sources/website/analytics.js/#page', this.get('_calledPageTrack'), {
      id: 'ember-cli-segment.must-call-page'
    });
  }
});
