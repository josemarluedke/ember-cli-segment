import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

function identifyUser() {
  this.get('segment').identifyUser(1, { name: 'Josemar Luedke' });
}

export default Route.extend({
  segment: service(),
  identifyUser: null,

  model(params, transition) {
    if (transition.queryParams.TEST_NO_IDENTIFY) {
      this.set('identifyUser', null);
    } else {
      this.set('identifyUser', identifyUser);
    }

    if (transition.queryParams.TEST_DISABLE) {
      this.get('segment').disable();
    }
  }
});
