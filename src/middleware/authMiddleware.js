const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // Extract the token from cookies
  const token = req.cookies.token; // Access the token from cookies

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key from .env
    req.userId = decoded.id; // Attach the user ID to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;