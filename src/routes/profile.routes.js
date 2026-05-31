import { Router } from "express";

import {
  analyzeProfile,
  getProfiles,
  getSingleProfile,
} from "../controllers/profile.controller.js";

const router = Router();

router.post("/analyze/:username", analyzeProfile);
router.get("/analyze/:username", analyzeProfile);
router.get("/", getProfiles);
router.get("/:username", getSingleProfile);

export default router;