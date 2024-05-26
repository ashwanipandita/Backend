import { Router } from "express";
import {
  login,
  register,
  validateToken,
  Logout,
  addToCart,
  addToWishlist
} from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", validateToken);
router.get("/logout",Logout);

router.post("/add-to-cart",addToCart);
router.post("/add-to-Wishlist",addToWishlist)

export default router;