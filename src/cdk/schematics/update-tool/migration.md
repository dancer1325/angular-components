* `Migration`
  * `visitNode(node: ts.Node): void {}`
    * == method / 
      * -- will be -- called / EACH source file's node
      * 0NLY retrieve TypeScript nodes / -- need to be -- casted MANUALLY
      * allows
        * walk the program source files ONLY 1! / program
          * != /migration rule 
          * -> performance boost
  * `visitTemplate(template: ResolvedResource): void {}`
    * == method that/
      * -- will be -- called / EACH program's Angular template
  * `visitStylesheet(stylesheet: ResolvedResource): void {}`
    * == method that/
      * -- will be -- called / EACH program's stylesheet
