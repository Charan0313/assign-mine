const express = require('express');
const { addAlert } = require('../controllers/alertController');
const router = express.Router();

router.post('/addAlert', addAlert);

module.exports = router;
