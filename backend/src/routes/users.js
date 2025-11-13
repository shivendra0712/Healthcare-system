import express from "express";
import { getAllUsers, deleteUser } from "../controllers/user.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, authorize("Admin"), getAllUsers);

router.delete("/:id", protect, authorize("Admin"), deleteUser);

export default router;

