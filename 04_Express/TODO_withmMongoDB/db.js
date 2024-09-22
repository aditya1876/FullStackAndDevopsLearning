/**
 * STEPS:
 * - import mongoose module
 * - import Schema object from mongoose
 * - MongoDb has its own unique key to identify individual records called ObjectId. we need to import that.
 * - Create schemas for each collections tobe used
 * - Connect the schma and the collection it should belong to.
 * - Export the models so that they can be imported in index.js
 * - Import the models in index.js using `const {UserCollection, TodoCollection} = require("./db");`
 * - In `index.js` file:
 *   - Add connection with mongodb database
 *    - `mongoose.connect("mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_STRING>/<DB NAME>");
 *   - convert the functions interacting with DB into async-await format
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//create schema for all collections
const UserSchema = new Schema({
  email: { type: String, unique: true }, //email will be unique
  password: String,
  username: String,
});

const TodoSchema = new Schema({
  title: String,
  isCompleted: Boolean,
  userId: ObjectId,
});

//Connect the schema and the collection(table) it should belong to
const UserCollection = mongoose.model("users_table", UserSchema);
const TodoCollection = mongoose.model("todos_table", TodoSchema);

//Export the models so that they can be imported in index.js
module.exports = {
  UserCollection: UserCollection,
  TodoCollection: TodoCollection,
};
