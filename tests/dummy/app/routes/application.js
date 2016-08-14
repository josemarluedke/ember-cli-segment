import Ember from 'ember';
const { inject: { service } } = Ember;

export default Ember.Route.extend({
  segment: service(),

  identifyUser: function() {
    this.get('segment').identifyUser(1, { name: 'Josemar Luedke' });
  }
});
