const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const {verifyJWT} = require('../middleware/auth')

// คูปองของผู้ใช้ที่id
router.get('/user-coupons', verifyJWT, couponController.getUserCoupons);

// อัปเดตสถานะคูปอง (สำหรับ mark ว่าใช้งานแล้ว)
router.post('/coupon-status', verifyJWT, couponController.updateCouponStatus);

// ดึงข้อมูลจากตาราง coupons
router.get('/coupon-details', couponController.getCouponDetails);

module.exports = router;