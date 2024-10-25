# Setting up porjects properly

## Eslint and Prettier

- eslint does both static code analysis and code formatting.
- Prettier only does code formatting

## Eslint

- Mordern/Latest package installation

  - `npm init @eslint/config@latest`
  - select values in the questions (select `yarn` to the package manager question. Install yarn - `npm i -g yarn`)
  - Creates a file `eslint.config.mjs`
  - using this method does not allow to bring some configs at the moment(so install the older process of installation)

- old way of installing eslint

  - Create react project using vite `npm create vite@latest` and complete project creation
  - creates a file `.eslintrc.cjs` file

- run eslint - `eslint .` or `yarn eslint_lint` (lint is added to package.json)
- it will throw errors for you to work through and fix.
- to make eslint ignore some error, add following comment above the line that throws error

```javascript
//eslint-disable-next-line @typescript-eslint/no-unused-vars
let x = 1;
```

- Adding custom rules to eslint

  - add rules in `eslint.config.mjs` file like below

  ```text
  ...
  ...

  export default [
    {
      languageOptions: {globals: globals.node},
      rules:[
        "indent":["error",2], //error if not indented with 2 spaces
        "space-in-params" : ["error", "never"] //error if space added inside paranthesis end ( 1 + 2 ) should be (1 + 2)
      ]
    },
    ...,
    ...,
    ...
  ]
  ```

- Adding eslint configs from companies to your codebase

  - to use airbnb config,

    - `yarn add eslint-config-airbnb` and add further dependencies as requried
    - update `.eslintrc.cjs` with following

    ```text
    module.exports = {
      ...,
      ...,
      extends: [
        ...,
        ...,
        "airbnb",
        "airbnb/hooks",
        ...,
      ],
      ...,
      ...,
      ,,,
    }
    ```

- add ESlint VD code extension to your project. To check eslint output, in terminal >ouput tab > dropdown select Eslint

  - create `.vscode/settings.json` file and add following in it

  ```json
  {
    "editor.codeActionsOnSave": {
      "source.fixall.eslint": "explicit"
    },
    "eslint.validate": ["javascript", "typescript"]
  }
  ```

- if react project is created using vite, it will automatically install eslint. you can just run `yarn lint` to run eslint. There are other scripts added in the package.json file as well.

## Prettier

- `https://prettier.io/`
- only code formatting.
- opinionated.
- install - `yarn add --dev --exact prettier`
- create `<projectRoot>/.prettierrc` (can keep it empty as prettier provides good defaults).

```text
{
  "tabwidth": 2,
}
```

- create `<projectRoot>/.prettierignore` and add folders like node_modules, dist, coverage, build that do not need to be formatted.

```text
dist
build
coverage
```

- If eslint is also being used in the project, add prettier as the dependency for eslint so that prettier configurations override eslint configuration rules. Otherwise, there will be conflicting errors between eslint and prettier.

  - `npm install --save-dev eslint-config-prettier`
  - add following to `.eslintconfigrc.json`

  ```text
  {
    "extends":[
      ...,
      ...,
      ...,
      "prettier"
    ],
    ...:[...],
    ...:[...]
  }
  ```

## Adding scripts to `package.json` for linting

- add following scripts to run linting and code analysis for devs to use in the `package.json` file.

```json
{
  "...":...,
  "scripts":{
    ...: ...,
    "eslint_lint": "eslint .",
    "lint" : "next lint",
    "prettier": "npx prettier . --write",
    "...": ...
  }
}
```

- run script using `npm run eslint_lint` to run the corresponding command

## Pre-commit Hooks

- Cannot expect devs to run lint and code analysis commands before every commit that they make.
- Hence pre-commit hooks are required.
- These are actions that need to be performed on the codebase before any commit.
- Exmaple - Formatting using eslint, prettier, running any test, code analysis etc.
- Use `Husky`
- `npm install --save-dev husky` or `yarn add --dev husky`
- `npx husky init` --> creates `.husky/` and inside creates a `pre-commit` file.
- update the `pre-commit` file with below

```text
npm run prettier
npm run format:fix
npm run lint:fix

git add .
```

- now whenever dev runs `git commit -m "something"` the precommit hook is called , runs the commands in the pre-commit file, and then runs the git commit command.
