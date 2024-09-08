const express = require("express");
const app = express();

//Application logic

//ROUTES
app.get("/add", function (req, res) {
  const a = req.query.a;
  const b = req.query.b;

  res.status(200).send(`Sum of ${a} and ${b} is ${parseInt(a) + parseInt(b)}`);
});

app.get("/substract", function (req, res) {
  const a = req.query.a;
  const b = req.query.b;

  res
    .status(200)
    .send(`Difference of ${a} and ${b} is ${parseInt(a) - parseInt(b)}`);
});

app.get("/multiply", function (req, res) {
  const a = req.query.a;
  const b = req.query.b;

  res
    .status(200)
    .send(`Multiplication of ${a} and ${b} is ${parseInt(a) * parseInt(b)}.`);
});

app.get("/divide", function (req, res) {
  const a = req.query.a;
  const b = req.query.b;

  res
    .status(200)
    .send(`Division of ${a} and ${b} is ${parseInt(a) / parseInt(b)}`);
});

//LISTEN ON PORT
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
