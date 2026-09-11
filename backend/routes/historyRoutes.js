const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const {verifyJWT} = require('../middleware/auth')

/*Get booking history by user ID with JWT verification*/
router.get('/user',verifyJWT, historyController.getBookingHistoryByUserId);

module.exports = router;
