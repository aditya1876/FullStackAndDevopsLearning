# MY NOTES

## GENERIC

- Taking arguement as env variable in a javascript

```bash
MYNUMBER=100 node index.js
#  Now read the env variable in the script as: console.log(process.env.MYNUMBER)
```

## Async Functions

- Examples - IO Operations(read/ writing to files), timeout/ wait/ timing operations, HTTP Requests
- Architecture for Async Functions
  - Call Stack
    - Data structure to keep track of function calls in the program.
    - It operates in 'Last In First Out' manner. When a function is called, it gets added to call stack and once it completes it is moved out of the stack.
  - Web APIs
    - Provided by Web browser or Node.js runtime.
    - Allows to do activities outside of java-script scope like making network calls, setting timers, or handling DOM events.
  - Callback Queue
    - It is a list of tasks (callbacks) that are waiting to be picked up by Call Stack.
    - These are added by Web APIs
  - Event Loop
    - Constantly checks if Call Stack is empty, if it is, it pushes first call from Callback Queue for execution in Call Stack

## Promises

- Example:
  - Promisified version - setTimeoutPromisified(3000).then(functionToCallback) ;
  - Callback version - setTimeout(fuctionToCallback, 3000);
- A promisified version of an async function does the same thing as the async function itself, it just has better syntax and readability.

```javascript
//Promises

//setTimeout(fuctionToCallback, 3000);

function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function functionToCallback() {
  console.log("Wait completed");
}

setTimeoutPromisified(3000).then(functionToCallback);

//Following happens on execution
//1. setTimeoutPromisified function is called.
//2. This inturn creates and returns a Promise Object
//3. The Promise object does the following:
//    - It executes the async operation (wating, IO operation , network call etc.) with the provide wait time as arguement.
//    - once the waiting is completed, it calls a 'resolve' object/function. This 'resolve' will actually be the function that is passed in the 'then()'
```

## DOM Manipulation

- DOM = Document Object Model
- Represents the structure of the webpage as a 'tree of objects'
- This was used to create dynamic website before React is included.
- DOM allows manipulation of structure and content of the webpages dynamically.

![Dom_Structure](./images/DOM_01.png);

## NODEJS

- It is an open-source JS runtime that allows to execute js code outside of a browser (or in a server).
- Build on Chrome's V8 engine
- Browser engines to run js:
  - chrome - V8
  - firefox - spidermonkey
  - safari - javascriptCore
- BUN
  - Alternate to Node.js (it is also a js runtime.)
  - Completely built from ground up.

### Intializing a project in Node.js

- create project folder
- navigate inside folder
- run - `npm init -y` (you should see some message for package.json)
  - Package.json:
    - name - name of the project
    - version - versioning
      - Format - MAJOR.MINOR.PATCH
        - MAJOR: major version changes or breaking changes from previous version.
        - MINOR: New feature addition or improvements in backward compatible manner.
        - PATCH: Backward compatible bug fixes or improvements.
      - The `^` sign in-front: it means npm will install any version compatible with this version (eg - "^5.3.1" means it can install any version from 5.3.1 to 5.9.9999 but not 6.0.0 because it will be a breaking change)
    - main - which file should be the entry point for the code.
    - scripts - developer specified scripts.
      - Example- Add `"start": "node index.js",` to scripts section. Now you can run `npm run start` in terminal to execute node index.js.
    - keywords - Metadata
    - author - Metadata
    - license - Metadata
    - description - Metadata
    - dependencies - Lists the packages required for the project to run. As the project user installs new packages, it gets added to this section
  - package.json-lock: even though, package.json provides a compatible version to install, sometimes minor version change between 2 developer machines/ local and server may arise due to package updates. This may cause code failures for our project. Hence, lock will automatically, lock to a single version of packages for whoever installs the project locally.
- open the folder in code editor
- create `index.js` in this folder
- Installing external package - `npm install <package name>`
  - This adds a folder `node_modules` in the project folder. node_modules contains the code and dependencies of the package itself.
- Setup project - `npm install`

## HTTP / HTTPS SERVERS

- whenever we use https, port is set to 443 by default
- whenever we use http, port is set to 80 by default
- whenever we use ssh, port is set to 22 by default
