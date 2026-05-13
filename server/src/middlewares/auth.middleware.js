import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    //should be in format "Bearer tokenvalue"

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({message: "Unauthorized"});
    }

    const parts = authHeader.split(" ");
    //expected parts = ["Bearer", "tokenValue"];

    if(parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({message: "Invalid Authorization Format"});
    }

    const token = parts[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();

  } catch (err) {
    return res.status(401).json({message: "Invalid or Expired Token"});
  }
}

