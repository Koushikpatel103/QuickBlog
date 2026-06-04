import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // optional: store user data
    next();
    
  } catch (error) {
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default auth;
