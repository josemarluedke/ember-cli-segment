'use strict';

module.exports = {
  name: require('./package').name,

  contentFor: function(type, config) {
    if (type === 'body-footer') {
      if (!config.segment || !config.segment.WRITE_KEY) {
        return '';
      }

      let nonceAttr = '';

      if (config.segment.cspNonce) {
        nonceAttr = `nonce="${config.segment.cspNonce}" `;
      }

      const proxyDomain = config.segment.proxyDomain;
      let segmentDomain = proxyDomain || 'https://cdn.segment.com/';

      if (!/\/$/.test(segmentDomain)) {
        segmentDomain += '/';
      }

      return (
        '<script ' +
        nonceAttr +
        'type="text/javascript">' +
        '!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","user","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="' +
        segmentDomain +
        'analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";' +
        'analytics.load("' +
        config.segment.WRITE_KEY +
        '");' +
        '}}();' +
        '</script>'
      );
    }
  }
};
