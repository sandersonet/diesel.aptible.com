import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({

  model() {
    var stack = this.modelFor('stack');

    return Ember.RSVP.hash({
      stack: stack,
      logDrain: this.store.createRecord('log-drain', { drainType: 'syslog_tls_tcp' }),
      elasticsearchDbs: stack.get('databases').then((databases) => {
        return databases.filterBy('type', 'elasticsearch').filter((d) => d.get('connectionUrl'));
      })
    });
  },

  setupController(controller, model) {
    controller.set('model', model.logDrain);
    controller.set('esDatabases', model.elasticsearchDbs);
    controller.set('stack', model.stack);
  },

  renderTemplate(controller) {
    if (!this.session.get('currentUser.verified')) {
      controller.set('resourceType', 'log drain');
      this.render('unverified');
    } else {
      this._super.apply(this, arguments);
    }
  },

  actions: {
    cancel(log) {
      log.deleteRecord();
      this.transitionTo('stack.log-drains.index');
    },

    createLog(log) {
      log.set('stack', this.modelFor('stack'));

      log.save().then( () => {
        let op = this.store.createRecord('operation', {
          type: 'configure',
          logDrain: log
        });
        return op.save();
      }).then( () => {
        this.transitionTo('stack.log-drains.index');
      }).catch( (e) => {
        if (e instanceof DS.InvalidError) {
          // no-op, this will populate model.errors
        } else {
          throw e; // re-raise
        }
      });
    }
  }
});
