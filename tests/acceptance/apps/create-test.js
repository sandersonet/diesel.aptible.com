import Ember from 'ember';
import startApp from '../../helpers/start-app';
import { stubRequest } from '../../helpers/fake-server';

var App;
let url = '/stacks/my-stack-1/apps/new';
let appIndexUrl = '/stacks/my-stack-1/apps';
let stackId = 'my-stack-1';

module('Acceptance: App Create', {
  setup: function() {
    App = startApp();
    stubStacks({ includeApps: true });
    stubStack({
      id: 'my-stack-1',
      handle: 'my-stack-1',
      _links: {
        apps: { href: '/accounts/my-stack-1/apps' },
        organization: { href: '/organizations/1' }
      }
    });
    stubOrganization();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

function findApp(appHandle){
  return find(`.app-handle:contains(${appHandle})`);
}

test(`${url} requires authentication`, function(){
  expectRequiresAuthentication(url);
});

test(`visit ${url} shows basic info`, function(){
  expect(5);
  let stackHandle = 'my-new-stack';
  stubStack({id:stackId, handle: stackHandle});

  signInAndVisit(url);
  andThen(function(){
    equal(currentPath(), 'stack.apps.new');
    expectInput('handle');
    expectButton('Save App');
    expectButton('Cancel');
    titleUpdatedTo(`Create an App - ${stackHandle}`);
  });
});

test(`visit ${url} and cancel`, function(){
  let appHandle = 'abc-my-app-handle';
  signInAndVisit(url);

  andThen(function(){
    fillInput('handle', appHandle);
    clickButton('Cancel');
  });

  andThen(function(){
    equal(currentPath(), 'stack.apps.index');

    ok( !findApp(appHandle).length,
        'does not show app');
  });
});

test(`visit ${url} and transition away`, function(){
  let appHandle = 'abc-my-app-handle';
  signInAndVisit(url);

  andThen(function(){
    fillInput('handle', appHandle);
    visit( appIndexUrl );
  });

  andThen(function(){
    equal(currentPath(), 'stack.apps.index');

    ok( !findApp(appHandle).length,
        'does not show app');
  });
});

test(`visit ${url} and create an app`, function(){
  expect(3);
  let appHandle = 'abc-my-app-handle';

  stubRequest('post', '/accounts/my-stack-1/apps', function(request){
    var json = this.json(request);
    equal(json.handle, appHandle, 'posts app handle');

    return this.success(201, {
      id: 'my-new-app-id',
      handle: appHandle
    });
  });

  signInAndVisit(url);
  andThen(function(){
    fillInput('handle', appHandle);
    clickButton('Save App');
  });
  andThen(function(){
    equal(currentPath(), 'stack.apps.index');

    ok( findApp(appHandle).length === 1,
        'lists new app on index' );
  });
});

test(`visit ${url} when user is not verified shows "Cannot create" message`, function(){
  let userData = {verified: false};
  signInAndVisit(url, userData);
  andThen( () => {
    expectNoButton('Save App');
    expectNoButton('Cancel');
    let message = find('.panel-heading h3');
    ok(message.text().indexOf('Cannot create a new app') > -1,
       'shows cannot create app message');
  });
});