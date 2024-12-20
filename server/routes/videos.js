import express, { Router } from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  randomVideo,
  viewVideo,
  trend,
  sub,
  getByTags,
  search,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = Router();

// create a video
router.post("/", verifyToken, addVideo);

// update video
router.put("/:id", verifyToken, updateVideo);

// delete video
router.delete("/:id", verifyToken, deleteVideo);

// get video
router.get("/find/:id", getVideo);

// view video
router.put("/view/:id", verifyToken, viewVideo);

// get trending video
router.get("/trend", trend);

// get random video
router.get("/random", randomVideo);

// get videos by subscription
router.get("/sub", verifyToken, sub);

// get videos by tags
router.get("/tags", getByTags);

// search video
router.get("/search", search);

export default router;
