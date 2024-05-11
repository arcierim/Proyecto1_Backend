const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Acceso denegado. Token no proporcionado." });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
  }
};
