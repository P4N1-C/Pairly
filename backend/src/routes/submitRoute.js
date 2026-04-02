import express from "express";
import { codeSubmit } from "../controllers/codeSubmit.js";

const router = express.Router();

router.post("/run-code", codeSubmit);

export default router;
