import Ember from 'ember';
const { inject: { service } } = Ember;

function identifyUser() {
  this.get('segment').identifyUser(1, { name: 'Josemar Luedke' });
}

export default Ember.Route.extend({
  segment: service(),
  identifyUser: null,

  model(params, transition) {
    if (transition.queryParams.TEST_NO_IDENTIFY) {
      this.set('identifyUser', null);
    } else {
      this.set('identifyUser', identifyUser);
    }
  }
});
