import Ember from 'ember';

export default Ember.Route.extend({
  identifyUser: function() {
    this.segment.identifyUser(1, { name: 'Josemar Luedke' });
  }
});
