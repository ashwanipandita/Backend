import { Router } from "express";
import {
  login,
  register,
  validateToken,
  Logout,
  addToCart,
  addToWishlist
} from "../controllers/user.controllers.js";

// Import the new controller
import { getCartProducts } from "../controllers/user.controllers.js";


// Import the checkout controller
import { checkout } from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", validateToken);
router.get("/logout",Logout);

router.post("/add-to-cart",addToCart);
router.post("/add-to-Wishlist",addToWishlist);



// Add a new route for fetching cart products
router.get("/cart/:userId", getCartProducts);


// Add the checkout route
router.post("/checkout", checkout);


export default router;