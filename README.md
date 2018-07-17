# Ember CLI segment
[![Build Status](https://travis-ci.org/josemarluedke/ember-cli-segment.svg?branch=master)](https://travis-ci.org/josemarluedke/ember-cli-segment)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-segment.svg)](https://emberobserver.com/addons/ember-cli-segment)
![Ember Versions](https://embadge.io/v1/badge.svg?start=1.13.0)


Ember CLI addons that provides a clean and easy way to integrate your Ember application with [Segment.com](https://segment.com/).

## Installation

* `ember install ember-cli-segment`

**v2.1+ is compatible with Ember v1.13+**

## Configuration/Logging

Add your Segment `WRITE_KEY` to the `segment` config object for Analytics.js to be loaded and configured automatically.

There is an option available to configure the events log tracking, the default value is `false`. This option is optional, but recommended.

In your `config/environment.js`

```js
ENV['segment'] = {
  WRITE_KEY: 'your_segment_write_key',
  LOG_EVENT_TRACKING: true
};

```

You can disable segment integration:

```js
ENV['segment'] = {
  enabled: false
};
```

When disabled, you can call tracking methods of `segment` service but they will not call methods of
`analytics.js`. In this way you can disable segment for development builds, for example. It can be
enabled later by calling `enable()` method of `segment` service. Segment's script still will be loaded
on startup.

There is an option available to disable the default page tracking on the application.didTransition event. If you do not disable this option then tracking events will *by default* be sent to Segment.

```js
ENV['segment'] = {
  defaultPageTrack: false
};
```

There is an option available to disable the default identify function on the application.didTransition event. If you do not disable this option then identify events will *by default* be sent to Segment.

```js
ENV['segment'] = {
  defaultIdentifyUser: false
};
```

## Usage

The addon exposes a service that you can inject in routes, components and more.

```js
// app/components/some-awsome-component.js
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  segment: service()
});

```

### Tracking Page Views

Your router will automatically send a page view event to Segment using the method `page` under `window.analytics` everytime the URL changes.

If you want to include page category and name or modify some properties, you can define `trackPageView` method
in application controller, like this:

```js
// File: app/routes/application.js
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
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

You will probabily need to track other events manually as well. We got you covered! Since we have the service, it's really straightforward to do it.

Let's say that you need to track an event when the user submits an form in your router.


```js
// File: app/routes/posts/new.js
import Ember from 'ember'

const { inject: { service } } = Ember;

export default Ember.Route.extend({
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
this.get('segment').trackEvent('Creates a new post', { title: "Creating a Ember CLI application" });
```

All the parameters you can provide are: `event`, `properties`, `options`, `callback` in this order.

### Identifying the User

We will automatically call `identifyUser` method from your `application` route everytime the URL changes. Inside this method, you should call `this.get('segment').identifyUser` passing the parameters that you want to send to Segment.

```js
// File: app/routes/application.js
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
	segment: service(),

  identifyUser: function() {
    this.get('segment').identifyUser(1, { name: 'Josemar Luedke' });
  }
});
```

You should have in mind that you should make a conditional validation to check if the user is currently logged in. For example:


```js
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
	segment: service(),

  identifyUser: function() {
    if (this.get('currentUser')) {
      this.get('segment').identifyUser(this.get('currentUser.id'), this.get('currentUser'));
    }
  }
});
```

All the parameters you can provide are: `userId`, `traits`, `options`, `callback` in this order.


#### aliasUser

Additionally we have an `aliasUser` method avaliable on `this.get('segment').aliasUser` that you can use when the user logs in in your application.

All the parameters you can provide are: `userId`, `previousId`, `options`, `callback` in this order.

#### Disabling and enabling in runtime

You can disable/enable segment completely by calling `disable()`/`enable()`. In this case any calls to
tracking methods (like tracking events, page views, identifying users) will be ignored. These methods
have the same effect as `enabled` option in configuration. Segment script still will be loaded on
startup.

You can disable or enable default page tracking (`disableDefaultPageTrack()`/`enableDefaultPageTrack()`) and
default identify calls (`disableDefaultIdentifyUser()`/`enableDefaultIdentifyUser()`)

### FastBoot

This addon will not break fastBoot, however, it will only execute in the browser. Since we use `window.analytics` to call segment and we don't have it in fastboot land, the addon will not be executed in fastboot.

## Running Tests

* `ember test`
* `ember test --server`

## Contributing

1. [Fork it](https://github.com/josemarluedke/ember-cli-segment/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


# License

Copyright (c) 2018 Josemar Luedke

Licensed under the [MIT license](LICENSE.md).
