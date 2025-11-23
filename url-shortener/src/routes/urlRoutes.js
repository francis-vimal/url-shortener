import express from "express";
import { shortenUrl, redirectUrl, allUrls, deleteUrl, getOneUrl, healthCheck } from "../controllers/urlController.js";

const router = express.Router();

router.get("/api/links", allUrls);
router.post("/api/links", shortenUrl);
router.get("/healthz", healthCheck);
router.get("/:code", redirectUrl);
router.get("/api/links/:code", getOneUrl);
router.delete("/api/links/:code", deleteUrl);

export default router;