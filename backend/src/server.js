import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
const app = express();

const __dirname = path.resolve();

app.use(express.json());
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

app.use("/api/inngest", serve({ client: inngest, functions }));

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
