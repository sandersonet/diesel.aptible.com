# ![Aptible](http://aptible-media-assets-manual.s3.amazonaws.com/tiny-github-icon.png) diesel.aptible.com 

[![Build Status](https://travis-ci.org/aptible/diesel.aptible.com.svg?branch=master)](https://travis-ci.org/aptible/diesel.aptible.com) [![Stories in Ready](https://badge.waffle.io/aptible/diesel.aptible.com.svg?label=ready&title=Ready)](http://waffle.io/aptible/diesel.aptible.com)

Aptible's customer dashboard. It allows users to manage organizations, access controls, and ops.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit localhost:4200

By default, the api.aptible.com and auth.aptible.com servers will be used as
data sources. For use with Diesel they should be given the `.env` values of:

```
CORS_DOMAIN="http://localhost:4200"
```

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

The `master` branch of this repo is deployed to [diesel.aptible-staging.com](http://diesel.aptible-staging.com/) upon a successful build.

The `release` branch of this repo is deployed to [diesel.aptible.com](https://diesel.aptible.com/) upon a successful build.

### Deploying via CI

This repo contains a `.travis.yml` file that will deploy the application
to staging automatically. To do this, several credentials are encrypted in
the `travis-env.sh.enc` file. To create a new set of credentials, copy
`travis-env.sh.example` and add the appropriate keys, then encrypt the
credentials:

travis encrypt-file travis-env.sh --add --org -r aptible/diesel.aptible.com

The `.travis.yml` file will be updated with a new decryption example. Use
that example to replace the one at the start of the `after_success` section.

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Copyright

Copyright (c) 2015 [Aptible](https://www.aptible.com). All rights reserved.

[<img src="https://s.gravatar.com/avatar/9b58236204e844e3181e43e05ddb0809?s=60" style="border-radius: 50%;" alt="@sandersonet" />](https://github.com/sandersonet)
