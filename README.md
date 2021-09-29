# Ember CLI Segment

[![Build Status](https://travis-ci.org/josemarluedke/ember-cli-segment.svg?branch=master)](https://travis-ci.org/josemarluedke/ember-cli-segment)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-segment.svg)](https://emberobserver.com/addons/ember-cli-segment)

Ember CLI Segment provides an easy way to integrate your Ember application with [Segment.com](https://segment.com/).

## Compatibility

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above
* ember-auto-import v2 or above

**For compatibility with Ember v1.13, use version 2.1.0**
**For compatibility with Ember v2.18, use version 4.4.0**

## Installation

```
ember install ember-cli-segment
```

## Configuration

Configuration options can be placed in your `config/environment.js` under the `segment` key.

### Segment key

You must provide your segment write key in order to correctly send events to segment.

```js
ENV.segment = {
  WRITE_KEY: 'your_segment_write_key'
};
```

### Segment proxy

```js
ENV.segment = {
  proxyDomain: 'https://segmentproxy.mydomain.com/'
};
```

### Logging

To get logs when events are fired to segment, you must enable it. Default value is `false`.

```js
ENV.segment = {
  LOG_EVENT_TRACKING: true
};
```

### Disable Segment Integration

You can disable segment integration with `enabled` option, however, segment scripts will still be inserted in your page. Default value is `true`.

```js
ENV.segment = {
  enabled: false
};
```

When disabled, you can call tracking methods of `segment` service but they will not call methods of
`analytics.js`. In this way you can disable segment for development builds, for example. It can be
enabled later by calling `enable()` method of `segment` service. Segment's script still will be loaded
on startup. More about the `enable()` method below.

There is an option available to disable the default page tracking on the application.didTransition event. If you do not disable this option then tracking events will _by default_ be sent to Segment.

```js
ENV.segment = {
  defaultPageTrack: false
};
```

There is an option available to disable the default identify function on the application.didTransition event. If you do not disable this option then identify events will _by default_ be sent to Segment.

```js
ENV.segment = {
  defaultIdentifyUser: false
};
```

## Usage

The addon exposes a service that you can inject in routes, components and more.

```js
// app/components/some-awesome-component.js
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  segment: service()
});
```

### Segment ready

You can wait for segment readyness:

```js
// app/components/some-awesome-component.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class MyComponent extends Component {
  @service segment;

  constructor() {
    super(...arguments);

    this.segment.ready(() => {
      console.log('segment is ready');
    });
  }
}
```

### Tracking Page Views

Your router will automatically send a page view event to Segment using the method `page` under `window.analytics` everytime the URL changes.

If you want to include page category and name or modify some properties, you can define `trackPageView` method
in application controller, like this:

```js
// File: app/routes/application.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  segment: service(),

  trackPageView: function() {
    this.get('segment').trackPageView(this.controller.currentPath);
  }
});
```

If you need to call page tracking manually for some reason, you can do it using the following method in the service.

```js
this.get('segment').trackPageView();
```

The method `trackPageView` can receive a parameter that's the page url, if not provided it will fetch from `window.location`.

### Tracking Other Events

You will probably need to track other events manually as well. We got you covered! Since we have the service, it's really straightforward to do it.

Let's say that you need to track an event when the user submits an form in your router.

```js
// File: app/routes/posts/new.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  segment: service(),

  actions: {
    submit: function() {
      this.get('segment').trackEvent('Creates a new post');
    }
  }
});
```

`trackEvent` can receive additional properties as well:

```js
this.get('segment').trackEvent('Creates a new post', {
  title: 'Creating a Ember CLI application'
});
```

All the parameters you can provide are: `event`, `properties`, `options`, `callback` in this order.

### Identifying the User

We will automatically call `identifyUser` method from your `application` route everytime the URL changes. Inside this method, you should call `this.get('segment').identifyUser` passing the parameters that you want to send to Segment.

```js
// File: app/routes/application.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  segment: service(),

  identifyUser: function() {
    this.get('segment').identifyUser(1, { name: 'Josemar Luedke' });
  }
});
```

You should have in mind that you should make a conditional validation to check if the user is currently logged in. For example:

```js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  segment: service(),

  identifyUser: function() {
    if (this.get('currentUser')) {
      this.get('segment').identifyUser(
        this.get('currentUser.id'),
        this.get('currentUser')
      );
    }
  }
});
```

All the parameters you can provide are: `userId`, `traits`, `options`, `callback` in this order.

#### aliasUser

Additionally we have an `aliasUser` method avaliable on `this.get('segment').aliasUser` that you can use when the user logs in in your application.

All the parameters you can provide are: `userId`, `previousId`, `options`, `callback` in this order.

### Group a user

You can add a user to groups manually.

```js
// File: app/routes/application.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  segment: service(),

  identifyUser: function() {
    this.get('segment').identifyUser(1, { name: 'Josemar Luedke' });
    this.get('segment').group(2, {
      name: 'Josemar Luedke Corp'
    });
  }
});
```

### Middlewares

Middlewares allow developers to extend Analytics.js with custom code which runs on every event. This code has full access to the DOM and Browser API, and helps customers enrich and transform event payloads.

Analytics.js can be extended using two functions:

```js
addSourceMiddleware(middleware)
addDestinationMiddleware(targetIntegration, [middleware1, middleware2, ...])
```

`Source Middleware` allows you to manipulate the payload and filter events on a per-source basis, while `Destination Middleware` allows this on a per destination basis. Middlewares run in the browser.

Using source middleware

```js
var SMW1 = function({ payload, next, integrations }) {
  payload.obj.pageTitle = document.title;
  next(payload);
};

this.segment.addSourceMiddleware(SMW1);
```

Using destination middleware

```js
var DMW1 = function({ payload, integration, next }) {
  delete payload.obj.pageTitle;
  next(payload);
};

analytics.addDestinationMiddleware('integrationA', [DMW1]);
```

### Disabling and enabling at runtime

You can disable/enable segment completely by calling `disable()`/`enable()`. In this case any calls to
tracking methods (like tracking events, page views, identifying users) will be ignored. These methods
have the same effect as `enabled` option in configuration. Segment script still will be loaded on
startup.

You can disable or enable default page tracking (`disableDefaultPageTrack()`/`enableDefaultPageTrack()`) and
default identify calls (`disableDefaultIdentifyUser()`/`enableDefaultIdentifyUser()`)

### FastBoot

This addon will not break fastBoot, however, it will only execute in the browser. Since we use `window.analytics` to call segment and we don't have it in fastboot land, the addon will not be executed in fastboot.

## Running Tests

- `ember test`
- `ember test --server`

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

Licensed under the [MIT license](LICENSE.md).
