# Full Stack And DevOps Learning

Notes about Full Stack development and DevOps

## Project Setup

- Create project folder
- Install packages inside folder: `npm install <package name>`
- Make sure `node_modules` folder is added to `.gitignore`.
- Setup `.env` inside folder(required if using any secrets):

  - `npm install dotenv`
  - create `.env` file (add it to `.gitignore` !)
  - Add secrets/ keys/ environment variables in following format. (No need to add "" around values)

  ```text
  API_KEY=12345
  USERNAME=test12345
  PASSWORD=34%$76
  ```

  - To use the variables in projects like below:

  ```javascript
  //dotenv packages loads the data in .env file into the process.evn object(available by default in js)

  //import the dotenv into the file
  require("dotenv").config();

  //use the variables
  console.log(process.env.USERNAME);
  ```
