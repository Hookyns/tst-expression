# Expression Transformer DEMO
Here is demo in this directory which shows one example usage of expression transformer. 
Use `ttsc` to transpile example from TS to JS.
Use `node src/index.js` to run example. 

## TypeORM-Linq [git](https://github.com/Hookyns/typeorm-linq)
True LINQ expressions in Typescript over TypeORM. Thanks to this wrapper, you are able to write clear TS(/JS) with typing support of IDEs, it's regular code.
```typescript
// Filter model
let filter = {
    findLastName: "Paul",
    lastNameStarts: "A.*",
    requestedNames: ["Lukas", "Leon", "Paul"]
};

let users = await new LinqSelectQueryBuilder(getConnection().manager, User)
    .where(user => (user.firstName == "Nash" || user.lastName == filter.findLastName) && user.midName != "Carl")
    .getRawMany();

// Generated query: SELECT * FROM `user` `__mainEntity` WHERE (`__mainEntity`.`firstName` = 'Nash' OR `__mainEntity`.`lastName` = ?) AND `__mainEntity`.`midName` != 'Carl' -- PARAMETERS: ["Paul"]

let users2 = await new LinqSelectQueryBuilder(getConnection().manager, User)
    .where(user => user.firstName.match(filter.lastNameStarts) && user.midName != null)
    .getRawMany();

// Generated query: SELECT * FROM `user` `__mainEntity` WHERE `__mainEntity`.`firstName` LIKE ? AND `__mainEntity`.`midName` IS NOT NULL -- PARAMETERS: ["A%"]

let users3 = await new LinqSelectQueryBuilder(getConnection().manager, User)
    .where(user => filter.requestedNames.includes(user.firstName) || user.midName.startsWith("A") || user.midName.endsWith("s"))
    .getRawMany();

// Generated query: SELECT * FROM `user` `__mainEntity` WHERE `__mainEntity`.`firstName` IN (?) OR `__mainEntity`.`midName` LIKE 'A%' OR `__mainEntity`.`midName` LIKE '%s' -- PARAMETERS: [["Lukas","Leon","Paul"]]
```

## UniMapperJS
Next example can be [UniMapperJS](https://github.com/Hookyns/unimapperjs) package which is going to be rewritten, 
changing string expression parsing by this package (not committed yet).