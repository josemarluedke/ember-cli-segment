/* globals FastBoot */
import Ember from 'ember';

export default Ember.Service.extend({
  init: function() {
    this._super();

    const isFastBoot = typeof FastBoot !== 'undefined';

    if (!this.hasAnalytics() && (this.config && this.config.environment !== 'test') && !isFastBoot) {
      Ember.Logger.warn('Segment.io is not loaded yet (window.analytics)');
    }
  },

  hasAnalytics: function() {
    return !!(window.analytics && typeof window.analytics === "object");
  },

  // Default true unless user explicitly sets defaultPageTrack to false
  pageTrackEnabled: function() {
    return !this.pageTrackDisabled();
  },

  pageTrackDisabled: function() {
    const hasSegmentConfig = (this.config && this.config.segment);
    return (hasSegmentConfig && this.config.segment.defaultPageTrack === false);
  },

  // Default true unless user explicitly sets defaultIdentifyUser to false
  identifyUserEnabled: function() {
    return !this.identifyUserDisabled();
  },

  identifyUserDisabled: function() {
    const hasSegmentConfig = (this.config && this.config.segment);
    return (hasSegmentConfig && this.config.segment.defaultIdentifyUser === false);
  },

  log: function() {
    if(this.config && this.config.segment && this.config.segment.LOG_EVENT_TRACKING) {
      Ember.Logger.info('[Segment.io] ', arguments);
    }
  },

  trackPageView: function() {
    if(this.hasAnalytics()) {
      window.analytics.page.apply(this, arguments);

      this.log('trackPageView', arguments);
    }
  },

  trackEvent: function(event, properties, options, callback) {
    if(this.hasAnalytics()) {
      window.analytics.track(event, properties, options, callback);
      this.log(event, properties, options);
    }
  },

  identifyUser: function(userId, traits, options, callback) {
    if(this.hasAnalytics()) {
      window.analytics.identify(userId, traits, options, callback);
      this.log('identifyUser', traits, options);
    }
  },

  // reset group, user traits and id's
  reset: function() {
    if(this.hasAnalytics()) {
      window.analytics.reset();
      this.log("reset");
    }
  },

  group: function(groupId, traits, options, callback) {
    if(this.hasAnalytics()) {
      window.analytics.group(groupId, traits, options, callback);
      this.log('group', traits, options);
    }
  },

  aliasUser: function(userId, previousId, options, callback) {
    if(this.hasAnalytics()) {
      window.analytics.alias(userId, previousId, options, callback);
      this.log('aliasUser', previousId, options);
    }
  }
});
