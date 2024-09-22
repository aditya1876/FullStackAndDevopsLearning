# TODO App with MongoDB

## SETUP

- `npm init -y`
- `npm install express mongoose jsonwebtoken`
- `npm install dotenv --save`
- 'mongoose' is the npm library that helps inconnecting to the Mongo DB.

- Create index.js and add the code for the express server
- Create `db.js` and add db related code in it.
- Create `auth.js` and add authentication related code in it.
- Export modules from db.js, auth.js and import them in index.js
- Create a `.env` file and add secrets to it.
  - Add the .env file to .gitignore
  - Create a copy of .envfile with dummy data `.env_example` which can be pushed to github
  - Run command - `npm --env-file .env index.js`

```javascript
//.env file contents
API_KEY = "YOUR_API_KEY";
JWT_SECRET = "YOUR JWT SECRET";

//index.js contents to use the data from env file.
const key = process.env.API_KEY;
const secret = process.env.JWT_SECRET;
```
