# Installation and Code Generation

* Angular Material
  * 👀-- comes packaged with -- Angular CLI schematics 👀
    * == Angular Material is added -- via a -- command `ng add @angular/material`
  * 👀comes with [SEVERAL OTHER schematics](https://material.angular.io/guide/schematics) 👀
    * allows
      * easily generate pre-built components | YOUR application
        * == AVAILABLE -- through the -- Angular CLI

## Install Schematics

* Schematics
  * -- included with -- `@angular/cdk` & `@angular/material`

* `ng add @angular/material`
  * install | your project
    * Angular Material,
    * [Component Dev Kit](https://material.angular.io/cdk) (CDK),
    * [Angular Animations](https://angular.dev/guide/animations) 

* `ng add @angular/cdk`
  * install | your project
    * `@angular/cdk`

* Angular Material `ng add` schematic
  * allows
    * set up an Angular CLI project / uses Material
  * what does it make under the hood?
    * see [here](getting-started.md#install-angular-material--your-application)

## Component schematics

* Angular Material schematics 
  * allows
    * 👀easily generate Material Design components 👀


| Name           | Description                                                                                               | How to use? |
|----------------|-----------------------------------------------------------------------------------------------------------|-------------|
| `address-form` | == component / includes Material Design's form fields +  's radio controls + 's buttons                   | `ng generate @angular/material:address-form <component-name>`            |
| `navigation`   | TODO:Creates a component with a responsive Material Design sidenav and a toolbar for showing the app name |             |
| `dashboard`    | Component with multiple Material Design cards and menus which are aligned in a grid layout                |             |
| `table`        | Generates a component with a Material Design data table that supports sorting and pagination              |             |
| `tree`         | Component that interactively visualizes a nested folder structure by using the `<mat-tree>` component     |             |


* Angular CDK schematics


| Name           | Description                                                                                                | How to use? |
|----------------|------------------------------------------------------------------------------------------------------------|-------------|
| `drag-drop`    | == create a component / includes `@angular/cdk/drag-drop` directives == interactive to-do list | `ng generate @angular/cdk:drag-drop <component-name>`           |


### Navigation schematic

The `navigation` schematic will create a new component that includes
a toolbar with the app name, and a responsive side nav based on Material
breakpoints.

```
ng generate @angular/material:navigation <component-name>
```

### Table schematic

The table schematic will create a component that renders an Angular Material `<table>` which has
been pre-configured with a datasource for sorting and pagination.

```
ng generate @angular/material:table <component-name>
```

### Dashboard schematic

The `dashboard` schematic will create a new component that contains
a dynamic grid list of Material Design cards.

```
ng generate @angular/material:dashboard <component-name>
```

### Tree schematic

The `tree` schematic can be used to quickly generate an Angular component that uses the Angular
Material `<mat-tree>` component to visualize a nested folder structure.

```
ng generate @angular/material:tree <component-name>
```

### Material 3 Theme schematic

The `theme-color` schematic will generate a file with Material 3 palettes from the specified colors
that can be used in a theme file. It also generates high contrast color override mixins if
specified.

```
ng generate @angular/material:theme-color
```

Learn more about this schematic in its [documentation](https://github.com/angular/components/blob/main/src/material/schematics/ng-generate/theme-color/README.md).
