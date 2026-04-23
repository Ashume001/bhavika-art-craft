const jwt = require("jsonwebtoken");

exports.protectAdmin = (req, resp, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return resp.status(401).json({ message: "Not authorized" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = decoded.id;
    next()
  } catch (error) {
    resp.status(401).json({ message: "Invalid token" })
  }
}
