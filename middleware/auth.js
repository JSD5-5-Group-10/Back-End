const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // console.log(req)
  const authHeader = req.headers.authorization;
  // const authHeader = req.params.id;
  console.log(authHeader)
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: { devMessage: "Unauthorized" } });
  }

  const token = authHeader.split(" ")[1]; // Get the token part after "Bearer"

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: { message: "Invalid token." } });
  }
};

module.exports = auth;