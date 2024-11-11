import express from "express";
const router = express.Router();

import CartController from "../controllers/cart.controller.js";
const cartController = new CartController();

router.post("/", cartController.create);

router.get("/:cid", cartController.getCart);

router.post("/:cid/product/:pid", cartController.addProductToCart);

router.put("/:cid/product/:pid", cartController.updateProductCart);

router.put("/:cid", cartController.deleteProductsCart);

router.delete("/:cid", cartController.deleteCart);

router.post("/:cid/purchase", cartController.purchaseCart);

export default router;
