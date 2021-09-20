/* globals FastBoot */
import Service from '@ember/service';
import { warn } from '@ember/debug';
import { deprecate } from '@ember/application/deprecations';

export default class SegmentService extends Service {
  _disabled = false;
  _defaultPageTrackDisabled = false;
  _defaultIdentifyUserDisabled = false;

  _calledPageTrack = false;

  constructor() {
    super(...arguments);

    const isFastBoot = typeof FastBoot !== 'undefined';

    if (
      !this.hasAnalytics() &&
      this.config &&
      this.config.environment !== 'test' &&
      !isFastBoot
    ) {
      warn('Segment is not loaded yet (window.analytics)', false, {
        id: 'ember-cli-segment.analytics-not-loaded',
      });
    }

    if (this.config && this.config.segment) {
      const { defaultPageTrack, defaultIdentifyUser, enabled } =
        this.config.segment;
      this._defaultPageTrackDisabled = defaultPageTrack === false;
      this._defaultIdentifyUserDisabled = defaultIdentifyUser === false;
      this._disabled = enabled === false;
    }
  }

  hasAnalytics() {
    return !!(window.analytics && typeof window.analytics === 'object');
  }

  isEnabled() {
    return !this._disabled;
  }

  enable() {
    this._disabled = false;
  }

  disable() {
    this._disabled = true;
  }

  isPageTrackEnabled() {
    return !this._defaultPageTrackDisabled;
  }

  enableDefaultPageTrack() {
    this._defaultPageTrackDisabled = false;
  }

  disableDefaultPageTrack() {
    this._defaultPageTrackDisabled = true;
  }

  isIdentifyUserEnabled() {
    return !this._defaultIdentifyUserDisabled;
  }

  enableDefaultIdentifyUser() {
    this._defaultIdentifyUserDisabled = false;
  }

  disableDefaultIdentifyUser() {
    this._defaultIdentifyUserDisabled = true;
  }

  log() {
    if (
      this.config &&
      this.config.segment &&
      this.config.segment.LOG_EVENT_TRACKING
    ) {
      console.info('[Segment] ', arguments); // eslint-disable-line no-console
    }
  }

  getTraits() {
    if (this.isEnabled() && this.hasAnalytics()) {
      this.log('getTraits');
      return window.analytics.user().traits();
    }
  }

  trackPageView() {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.page.apply(this, arguments);
      this._calledPageTrack = true;

      this.log('trackPageView', arguments);
    }
  }

  trackEvent(event, properties, options, callback) {
    if (this.isEnabled() && this.hasAnalytics()) {
      this.checkPageTrackCalled();
      window.analytics.track(event, properties, options, callback);

      this.log(event, properties, options);
    }
  }

  identifyUser(userId, traits, options, callback) {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.identify(userId, traits, options, callback);

      this.log('identifyUser', traits, options);
    }
  }

  identifyGroup() {
    deprecate(
      'Usage of `identifyGroup` is deprecated, use `group` instead.',
      false,
      {
        id: 'ember-cli-segment.deprecate-identifyGroup',
        until: '5.0.0',
      }
    );
    return this.group(...arguments);
  }

  addSourceMiddleware() {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.addSourceMiddleware(...arguments);
    }
  }

  addDestinationMiddleware() {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.addDestinationMiddleware(...arguments);
    }
  }

  // reset group, user traits and id's
  reset() {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.reset();

      this.log('reset');
    }
  }

  group(groupId, traits, options, callback) {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.group(groupId, traits, options, callback);

      this.log('group', traits, options);
    }
  }

  aliasUser(userId, previousId, options, callback) {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.alias(userId, previousId, options, callback);

      this.log('aliasUser', userId, previousId, options);
    }
  }

  ready() {
    if (this.isEnabled() && this.hasAnalytics()) {
      window.analytics.ready(...arguments);
    }
  }

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
      this._calledPageTrack,
      {
        id: 'ember-cli-segment.must-call-page',
      }
    );
  }
}
