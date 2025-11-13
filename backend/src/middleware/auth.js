import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Verify JWT and attach user
export const protect = async (req, res, next) => {
  let token = req.cookies.token;

  // Check Authorization header if no cookie token
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user (exclude password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// ✅ Role-based Access Middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }
    next();
  };
};
