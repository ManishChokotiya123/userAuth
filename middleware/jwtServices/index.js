const jwt = require("jsonwebtoken");

async function generateToken(userdata) {
  const data = await jwt.sign({ data: userdata }, "this is my secret key ", {
    expiresIn: "1d",
  });
  return data;
}

async function verifyToken(token) {
  const verifyToken = await jwt.verify(token, "this is my secret key ");
  return verifyToken;
}

module.exports = { generateToken, verifyToken };
