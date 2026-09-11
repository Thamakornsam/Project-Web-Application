import React, { useState, useEffect } from 'react';
import thearter from "../images/coupon.jpg";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/coupons/coupon-details"); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCoupons(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Failed to fetch coupons:", err);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>กำลังโหลดคูปอง...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>เกิดข้อผิดพลาดในการโหลดคูปอง: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>รายการคูปอง</h1>

      {coupons.map(coupon => (
        <div
          key={coupon.couponId}
          style={{
            backgroundColor: '#333333',
            borderRadius: '20px',
            margin: '20px',
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            width: '60%',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'grey';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#333333';
          }}
        >
          <img
            src={thearter}
            alt="Coupon"
            style={{ width: '30%', marginRight: '20px'}}
          />
          <div>
            <p style={{ fontSize: "18px", color: 'white' }}>
              <strong>ส่วนลด {coupon.discount} บาท: </strong>{coupon.couponName}
            </p>
            <p style={{ color: 'white' }}>{coupon.description}</p>
          </div>
        </div>
      ))}

      {coupons.length === 0 && !loading && <p>ไม่มีคูปองในขณะนี้</p>}
    </div>
  );
};

export default Coupon;