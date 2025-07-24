import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.post("/:id", getCategoryById);
router.post("/:id", updateCategory);
router.post("/:id", deleteCategory);

export default router;
