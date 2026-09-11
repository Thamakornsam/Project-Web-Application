const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'movie_booking';

exports.getUserCoupons = async (req, res) => {
  // ดึง userId จาก req.user ที่ verifyJWT สร้างไว้
  const userId = req.user.user_id;
  try {
    const client = new MongoClient(uri);
    await client.connect();

    // ดึงข้อมูลจาก coupon_status เพื่อดูว่า user_id นี้เคยใช้ coupon_id อะไรไปบ้าง
    const usedCouponStatuses = await client.db(dbName).collection('coupon_status').find({ user_id: userId, coupon_status: true }).toArray();
    console.log(`User ID: ${userId} เคยใช้คูปอง (จาก coupon_status):`, usedCouponStatuses.map(item => item.coupon_id));

    const couponsResult = await client.db(dbName).collection('coupon_status').aggregate([
      { $match: { user_id: userId } },
      {
        $lookup: {
          from: 'coupons',
          localField: 'coupon_id',
          foreignField: 'coupon_id',
          as: 'coupon'
        }
      },
      { $unwind: '$coupon' }
    ]).toArray();
    await client.close();
    const formattedCoupons = couponsResult.map(item => ({
      ...item.coupon,
      couponStatusId: item.couponStatus_id,
      usageStatus: item.coupon_status
    }));

    console.log('ข้อมูลคูปองของผู้ใช้:', formattedCoupons);

    res.json(formattedCoupons.map(item => ({ couponId: item.coupon_id, couponName: item.coupon_name, discount: item.coupon_discount, description: item.decription, usageStatus: item.usageStatus })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCouponStatus = async (req, res) => {
  const { coupon_id } = req.body;
  // ดึง userId จาก req.user ที่ verifyJWT สร้างไว้
  const userId = req.user.user_id;

  if (!coupon_id) {
    return res.status(400).json({ error: 'Missing coupon_id in the request body.' });
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const couponStatusCollection = client.db(dbName).collection('coupon_status');

    // --- Check if the coupon has already been used by the user ---
    const existingUsage = await couponStatusCollection.findOne({
      user_id: userId,
      coupon_id: parseInt(coupon_id),
      coupon_status: true // เช็คว่าเคยถูกใช้งานไปแล้ว
    });

    if (existingUsage) {
      await client.close();
      return res.status(409).json({ error: 'This coupon has already been used by this user.' });
    }

    // --- Generate next couponStatus_id ---
    const latestCouponStatus = await couponStatusCollection.find().sort({ couponStatus_id: -1 }).limit(1).toArray();
    const nextCouponStatusId = latestCouponStatus.length > 0 ? latestCouponStatus[0].couponStatus_id + 1 : 1;
    console.log('Next couponStatus_id generated:', nextCouponStatusId);

    const newCouponStatus = {
      couponStatus_id: nextCouponStatusId,
      user_id: userId,
      coupon_id: parseInt(coupon_id),
      coupon_status: true,
    };

    const result = await couponStatusCollection.insertOne(newCouponStatus);
    await client.close();

    if (result.acknowledged) {
      res.status(201).json({ message: 'Coupon status updated successfully.', insertedId: result.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to update coupon status.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCouponDetails = async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const coupons = await client.db(dbName).collection('coupons').find().toArray();
    await client.close();
    res.json(coupons.map(coupon => ({
      couponId: coupon.coupon_id,
      couponName: coupon.coupon_name,
      discount: coupon.discount,
      description: coupon.coupon_description
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};