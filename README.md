# lebowski-haiku

Haiku generator using phrases from The Big Lebowski. Demonstrates using react-router and async data loading.

http://lebowski-haiku.herokuapp.com/

## Get Started

Use the handy button to create a site:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

or run the code yourself:

```
  git clone https://github.com/unbracketed/lebowski-haiku.git
  cd lebowski-haiku
  npm install
  npm start

  # open browser to http://localhost:10000
```

## About

Uses a [Frigate](https://github.com/lincolnloop/generator-frigate) project. Purpose is to demonstrate clean React.js code written in a ES6 style. Provides an example of components loading data asynchronously in response to router change events

## Why all the dependencies?

Many of the dependencies are related to the gulp build tools and would normally be considered `devDependencies`. However, they are needed to run the Sass and Browserify compiling steps that generate the final static files. When deploying on Heroku, production mode is set and dependencies listed in `devDependencies` won't get installed, which means we can't run `gulp` to get our compiled `.js` and `.css` files within the Heroku app environment.

Empty lines have been left in the `dependencies` section. Dependencies listed below the empty lines would normally go in `devDependencies`
