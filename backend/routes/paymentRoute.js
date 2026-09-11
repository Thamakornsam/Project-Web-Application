const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const {verifyJWT} = require('../middleware/auth')

router.post('/process-payment', verifyJWT, paymentController.processPayment);


module.exports = router;