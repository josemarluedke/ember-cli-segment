'use strict';

module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: {}
    },
    {
      name: 'ember-1.11',
      dependencies: {
        'ember': '1.11.4'
      }
    },
    {
      name: 'ember-1.13',
      dependencies: {
        'ember': '1.13.13'
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'beta'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        'ember': 'canary'
      }
    }
  ]
};
