# Getting Started with Angular Material

* goal
  * build your first project -- with -- Angular Material

* requirements
  * install [Angular CLI](https://angular.dev/tools/cli/setup-local#install-the-angular-cli)

## Install Angular Material | your application

* `ng add @angular/material`
  * install
    * Material
    * [Component Dev Kit (CDK)](https://material.angular.io/cdk/categories)
    * [Angular Animations](https://angular.dev/guide/animations)
  * add the Roboto font | your `index.html`
  * add the Material Design icon font | your `index.html`
  * add a few global CSS styles to
      * remove margins | `body`
      * `height: 100%` | `html` & `body`
      * Roboto == default application font
  * prompt questions / -- determine the -- features to include
    1. choose a PREBUILT theme name, or "custom" / custom theme ?
       * choose from [prebuilt material design themes](theming.md) or
       * set up an extensible [custom theme](theming.md)
    2. set up GLOBAL Angular Material typography styles ?
       * see [typography](theming.md#typography)
    3. set up browser animations | Angular Material ?
       * import the [`BrowserAnimationsModule`](https://angular.dev/api/platform-browser/animations/BrowserAnimationsModule) | your application
         * Reason: 🧠enable Angular's [animation system](https://angular.dev/guide/animations) 🧠
       * if you decline it -> disable MOST of Angular Material's animations

* _Example:_ [here](examples/gettingStarted)
