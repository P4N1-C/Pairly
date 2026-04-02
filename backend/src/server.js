import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoute from "./routes/chatRoute.js";
import sessionRoute from "./routes/sessionRoute.js";
import submitRoute from "./routes/submitRoute.js";
const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(clerkMiddleware()); // adds auth field to request object: req.auth()
// credentials : true lets server allows a browser to include cookies on requrest
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    msg: "Api is up and running",
  });
});

app.get("/books", (req, res) => {
  res.status(200).json({
    msg: "books endpoint",
  });
});

// passing an array in middleware will flatten it and executes them sequentially, 1 by 1
app.get("/video", protectRoute, (req, res) => {
  const user = req.user;
  res.status(200).json({
    msg: "video endpoint",
    user,
  });
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoute);
app.use("/api/sessions", sessionRoute);
app.use("/api/run", submitRoute);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("Server is running on Port:", ENV.PORT);
    });
  } catch (error) {
    console.log("Error stating server", error);
  }
};

startServer();
