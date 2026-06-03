import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';
// user auth



export const userAuth = async (req, res, next) => {
  console.log("🔥 AUTH MIDDLEWARE HIT");
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    // ✅ HANDLE BOTH CASES (IMPORTANT)
    let token;

    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader; // fallback
    }

    console.log("TOKEN:", token);

    const decode = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();

  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


/// Admin  Autorize
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (user.isAdmin !== true) {
      return res.status(403).send({
        success: false,
        message: 'unauthorized Access'
      });
    } else {
      next();
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'enter in Admin Auth',
      error
    });
  }
};


