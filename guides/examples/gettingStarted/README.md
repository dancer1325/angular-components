# GettingStarted

* goal
  * use a Material slide toggle component | your app

## How has it been created?

* | root path,
  * `ng new gettingStarted --directory=guides/examples/gettingStarted`
    * This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.
* | this folder
  * `ng add @angular/material`
    * prompt questions selected
      * "Choose a prebuilt theme name, or "custom" for a custom theme: Azure/Blue"
      * "Set up global Angular Material typography styles? Yes"
      * "Include the Angular animations module? Include and enable animations"


## How to run local development server?

* `ng serve`
* | browser,
  * open `http://localhost:4200/`

## How to build?

* `ng build`
  * compile your project
  * | `dist/`, store build artifacts

## Running unit tests

* -- via -- [Karma](https://karma-runner.github.io) test runner
* `ng test`

## Running end-to-end tests

* `ng e2e`
