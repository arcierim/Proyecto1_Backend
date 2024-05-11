const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.put("/:id", orderController.updateOrderStatus);
router.delete("/:id", orderController.softDeleteOrder);

module.exports = router;
