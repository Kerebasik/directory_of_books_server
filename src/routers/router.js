const express = require("express");
const BookController = require("../controllers/BookController.js").BookController;

const router = express.Router();

router.get('/books', BookController.findAll);
router.get('/books/search', BookController.findName);
router.get('/books/:id', BookController.findOne);
router.post('/books', BookController.create);
router.delete('/book/:id', BookController.delete);
router.put('/books', BookController.update);

module.exports = router;
