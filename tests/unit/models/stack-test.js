import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('stack', 'Stack', {
  // Specify the other units that are required for this test.
  needs: ['model:database','model:app']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
