import Ember from 'ember';

export default Ember.Mixin.create({
  init: function() {
    this._super();
    if(!this.hasAnalytics()) {
      Ember.Logger.warn('Segment.io is not loaded yet (window.analytics)');
    }
  },
  hasAnalytics: function() {
    return !!(window.analytics && typeof window.analytics === "object");
  },

  log: function() {
    if(this.config && this.config.segment && this.config.segment.LOG_EVENT_TRACKING) {
      Ember.Logger.info('[Segment.io] ', arguments);
    }
  },

  trackPageView: function(page) {
    if(this.hasAnalytics()) {
      if(!page) {
        var loc = window.location;
        page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
      }
      window.analytics.page(page);

      this.log('trackPageView', page);
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

  aliasUser: function(userId, previousId, options, callback) {
    if(this.hasAnalytics()) {
      window.analytics.alias(userId, previousId, options, callback);
      this.log('aliasUser', previousId, options);
    }
  }
});
