# Ember CLI segment
[![Build Status](https://travis-ci.org/josemarluedke/ember-cli-segment.svg?branch=master)](https://travis-ci.org/josemarluedke/ember-cli-segment) [![Code Climate](https://codeclimate.com/github/josemarluedke/ember-cli-segment/badges/gpa.svg)](https://codeclimate.com/github/josemarluedke/ember-cli-segment)

Ember CLI addons that provides a clean and easy way to integrate your Ember application with [Segment.com](https://segment.com/) also known by [Segment.io](http://segment.io/).

## Installation

* `ember install:addon ember-cli-segment`

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

## Usage

The addon will add following elements to your CLI project:

* an initializer that will inject an `segment` object as a wrapper around Segment JS methods on `controllers`, `routes` and `router`.
* a `didTransition` method on the `router` calling `segment.trackPageView` and `applicationRoute.identifyUser` if it exists.
* a mixin that you can use where else you need.

### Tracking Page Views

Your router will automatically send a page view event to Segment using the method `page` under `window.analytics` everytime the URL changes.

If you need to call it manually for some reason, you can do it using the following method on `controllers` and `routes`.

```
this.segment.trackPageView();
```

The method `trackPageView` can receive a parameter that's the page url, if not provided it will fetch from `window.location`.

Additionally you can use the mixin in order to use this method where outside `controllers` and `routes`.

Importing the mixin is really simple:

```js
import segmentMixin from 'ember-cli-segment/mixin';
```

The mixin can be applied to any Ember object.

### Tracking Other Events

You will probabily need to track other events manually as well. We got you covered! Since we have an object called `segment` in your `controllers` and `routes`, it's really straightforward to do it.

Let's say that you need to track an event when the user submits an form in your router.


```js
// File: app/routes/posts/new.js
import Ember from 'ember'

export default Ember.Route.extend({
  actions: {
    submit: function() {
      this.segment.trackEvent('Creates a new post');
    }
  }
});

```

`trackEvent` can receive additional properties as well:

```js
this.segment.trackEvent('Creates a new post', { title: "Creating a Ember CLI application" });
```

All the parameters you can provide are: `event`, `properties`, `options`, `callback` in this order.

### Identifying the User

We will automatically call `identifyUser` method from your `application` route everytime the URL changes. Inside this method, you should call `segment.identifyUser` passing the parameters that you want to send to Segment.

```js
// File: app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  identifyUser: function() {
    this.segment.identifyUser(1, { name: 'Josemar Luedke' });
  }
});
```

You should have in mind that you should make a conditional validation to check if the user is currently logged in. For example:


```js
import Ember from 'ember';

export default Ember.Route.extend({
  identifyUser: function() {
    if{this.get('currentUser')) {
      this.segment.identifyUser(this.get('currentUser.id'), this.get('currentUser')));
    }
  }
});
```

All the parameters you can provide are: `userId`, `traits`, `options`, `callback` in this order.


#### aliasUser

Additionally we have an `aliasUser` method avaliable on `segment.aliasUser` that you can use when the user logs in in your application.

All the parameters you can provide are: `userId`, `previousId`, `options`, `callback` in this order.

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

Copyright (c) 2015 Josemar Luedke

Licensed under the [MIT license](LICENSE.md).