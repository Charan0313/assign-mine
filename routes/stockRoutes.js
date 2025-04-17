const express = require('express');
const { addStock, updatePrice } = require('../controllers/stockController');
const router = express.Router();

router.post('/addStock', addStock);
router.post('/updatePrice', updatePrice);

module.exports = router;
