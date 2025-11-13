import express from "express";
import {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getSinglePost);

router.post("/", protect, authorize("Editor"), createPost);

router.put("/:id", protect, authorize("Editor"), updatePost);

router.delete("/:id", protect, authorize("Editor"), deletePost);

export default router;
