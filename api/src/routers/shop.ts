import express from "express";
import {
  createShop,
  getShops,
  deleteShop,
  updateShop,
  getShop,
} from "../controllers/shop";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", getShops);
router.get("/:id", getShop);
router.post("/", createShop);
router.put("/", auth, updateShop);
router.delete("/:id", auth, deleteShop);

export default router;
