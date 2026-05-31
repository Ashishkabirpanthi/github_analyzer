import express from "express";
import cors from "cors";

import profileRoutes from "./routes/profile.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "GitHub Profile Analyzer & Repository Insights API",
    version: "1.0.0",
    endpoints: {
      check: "/",
      analyze: "/api/profiles/analyze/:username",
      getAllProfiles: "/api/profiles",
      getSingleProfile: "/api/profiles/:username",
    },
  });
});

app.use("/api/profiles", profileRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;