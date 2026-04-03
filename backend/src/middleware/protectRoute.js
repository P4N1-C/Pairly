import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId)
        return res.status(401).json({
          message: "Unauthorized User",
        });

      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      req.user = user;

      next();
    } catch (err) {
      console.error("Error Authenticating User", err);
      return res.status(401).json({
        message: "Server Error",
      });
    }
  },
];
