const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_KEY;

//Middlewares
function auth(req, res, next) {
  const token = req.headers.authorization;
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.id; //add the userid into req object to be used later
    console.log(`user with userid: [${decodedData.id}] is authenticated.`);
    next();
  } else {
    console.log(`User with token: [${token}] is not authenticated`);

    res.status(403).json({
      message: "User is not authenticated.",
    });
  }
}

module.exports = { auth, JWT_SECRET };
