import express from "express";
import { createMapping, getMappings } from "../controllers/mappingController.js";

const router = express.Router();

router.post("/", createMapping);
router.get("/", getMappings);

export default router;
