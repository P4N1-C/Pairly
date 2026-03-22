import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    // using clerk as we created user based on clerkID
    const token = chatClient.createToken(req.user.clerkId);
    res.status(200).json({
      token,
      userId: req.user.clerkId,
      username: req.user.name,
      image: req.user.image,
    });
  } catch (error) {
    console.error("Error is getStreamToken controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
