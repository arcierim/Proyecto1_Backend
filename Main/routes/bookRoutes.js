const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookcontroller");

router.get("/", bookController.getAllBooks);
router.post("/", bookController.createBook);
router.get("/:id", bookController.getBookById);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.softDeleteBook);

module.exports = router;
