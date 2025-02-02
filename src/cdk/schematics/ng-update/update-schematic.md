# ng-update schematic

* CDK ng-update schematic
  * 👀== foundation for the Angular Material update schematic 👀
    * Thanks to: 💡CDK ng-update code is reusable 💡

* `ng-update` schematic
  * == MULTIPLE migration entry-points /
    * EACH entry-point -- targets a -- specific Angular CDK or Angular Material version
        
        | Target Version | Description                              |
        |----------------|------------------------------------------|
        | V6 | Upgrade from any version -- to -- v6.0.0 |
        | V7 | Upgrade from any version -- to -- v7.0.0 |
        | V8 | Upgrade from any version -- to -- v8.0.0 |
        | V9 | Upgrade from any version -- to -- v9.0.0 |

    * 👀if multiple versions are implicitly targeted -> run _in order_ 👀  
      * _Example:_ if an application uses Angular Material v7.0.0 & you run `ng update` -> Angular CLI ONLY -- running migrations V8, V9 -- installs ONLY V9
      * ⚠️keep ALL migrations | code base ⚠️

## Update concept

* TODO:
The goal of the update schematic is to automatically migrate code that is affected by breaking
changes of the target version. Most of the time we can apply such automatic migrations, but
there are also a few breaking changes that cannot be migrated automatically.

In that case, our goal should be to notify the developer about the breaking change that needs
attention.

## Transforming TypeScript files

* `update-tool`
  * := small framework /
    * source files are
      * analyzed
      * updated
        * 👀-- via -- TypeScript Compiler API 👀
          * -> enable parse and work -- with the -- project source files' AST
  * goal
    * being extremely
      * fast
      * flexible 
  * 💡== ALTERNATIVE TO `tslint` 💡
    * 👀ORIGINAL `ng update` implementation / used `tslint` -> issues 👀
      * -- NO support for -- HTML templates and stylesheets
      * | upgrade files, 
        * reruns ALL upgrade lint rules -> TSLint -- recursively visits the -- nodes -> performance issue
        * recreates the TypeScript program -> memory pressure
      * TSLint NOT guaranteed to be installed | CLI projects
        * see [here](https://github.com/angular/angular-cli/issues/14555)
      * NO *global analysis* phase
        * Reason: 🧠 lint rules -- ONLY able to visit -- source files 🧠
      * No flexibility ==
          * NO ensure source files -- are ONLY analyzed -- 1! time
          * NO way to implement a progress bar
    * 👀CURRENT `ng update` / use `update-tool` 👀
      * abstraction of file system & run migrations programmatically
        * == migrations -- can run -- 
          * | CLI & google3
          * standalone / -- outside -- `ng update`
      * -- integrated support for -- HTML templates and stylesheets
      * migrations -- ONLY run -- 1 / source file (EVEN if source file | MULTIPLE TypeScript projects)
      * program created 1 / TypeScript project
      * migration failures do NOT retain `ts.Node` instances (AVOID the tslint memory leak)
      * replacements -- are performed -- | virtual file system
      * FULL flexibility
      * global analysis phase

* concepts for transforming TypeScript source files

|Description | Evaluation                                                                                                                                                                                                                                                              |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Regular Expressions | TODO: Too brittle. No type checking possible. Regular Expression _can_ be used in combination with some real AST walking                                                                                                                                                |
| TypeScript transforms (no emit) | This would be a good solution but there is no API to serialize the transformed AST into source code without using the `ts.Printer`. The printer can be used to serialize the AST but it breaks formatting, code style and more. This is not acceptable for a migration. |

### Upgrade data for target versions

The upgrade data for migrations is separated based on the target version. This is necessary in
order to allow migrations run sequentially. For example:

* In V6: `onChange` has been renamed to `changed`
* In V7: `changed` has been renamed to `onValueChange`

If we would not run the migrations in order, or don't separate the upgrade data, we would not be
able to properly handle the migrations for each target version. e.g. someone is on
5.0.0 and *only* wants to upgrade to 6.0.0. In that case he would end up with `onValueChange`
because the non-separated upgrade data would just include: _`onChange` => `onValueChange`_

Also besides separating the upgrade data based on the target version, we split the upgrade data
based on the type of code that is affected by these migrations:

* See here: [src/material/schematics/update/material/data](https://github.com/angular/components/tree/main/src/material/schematics/update/material/data)

### Adding upgrade data

Adding upgrade data is now a **mandatory** step before breaking changes should be merged
into `upstream`.  For simple and common breaking changes, there should be already an upgrade
data file that just needs the new change inserted.

In case there is no upgrade data for a breaking change, we need to evaluate if there should be
a single `misc` migration that is tied to that specific breaking change, or if we should
create a new migration that accepts upgrade data (as other configurable migrations).

---

**Example**: Adding upgrade data for a property rename
**Scenario**: In Angular Material V7.0.0, we rename `MatRipple#color` to `MatRipple#newColor`.

First, look for an existing upgrade data file that covers similar breaking changes. In that case
an existing upgrade data file for `property-names` already exists. Insert the new breaking change
within the proper `VersionTarget`.

_src/material/schematics/ng-update/material/data/property-names.ts_
```ts
export const propertyNames: VersionChanges<MaterialPropertyNameData> = {
  [TargetVersion.V7]: [
    {
      pr: '{PULL_REQUEST_LINK_FOR_BREAKING_CHANGE}',
      changes: [
        {
          replace: 'color',
          replaceWith: 'newColor',
          limitedTo: {
            classes: ['MatRipple']
          }
        }
      ]
    }
  ],
   ...
};
```
Once the data is inserted into the upgrade data file, the update schematic will properly migrate
`MatRipple#color` to `MatRipple#newColor` if someone upgrades to Angular Material V7.0.0.

But that's not all. It's encouraged to add a test-case for the new migration data. In this case,
a test case already exists for the type of migration and we just need to add our breaking change
to it. Read more about adding a test case in the next section.

### Adding a breaking change to a test case

Considering we added a breaking change to the update schematic, it's encouraged to add a proper
test case for the new change that has been added.

In the scenario where a property from `MatRipple` has been renamed in V7, we don't need to create
a new test-case file because there is already a test case for the `property-names` upgrade data.
In that case, we just need to add the breaking change to the existing test case.

_src/material/schematics/ng-update/test-cases/v7/property-names_input.ts_
```ts
...

/**
 * Mock definitions. This test case does not have access to @angular/material.
 */
class MatRipple {
  color: string;
}

/*
 * Actual test cases using the previously defined definitions.
 */
class A implements OnInit {
  constructor(private a: MatRipple) {}

  ngOnInit() {
    this.a.color = 'primary';
  }
}
```

_src/material/schematics/ng-update/test-cases/v7/property-names_expected_output.ts_
```ts
...

/**
 * Mock definitions. This test case does not have access to @angular/material.
 */
class MatRipple {
  color: string;
}

/*
 * Actual test cases using the previously defined definitions.
 */
class A implements OnInit {
  constructor(private a: MatRipple) {}

  ngOnInit() {
    this.a.newColor = 'primary';
  }
}
```

**Note**: The `_input.ts` file will be just transformed by the V7 migrations and compared to
the `_expected_output.ts` file. This means that it's necessary to also include the no longer
valid mock declarations to the expected output file.
