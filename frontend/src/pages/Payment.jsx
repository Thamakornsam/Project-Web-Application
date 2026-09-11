import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MovieProcess from "../components/MovieProcess";
import promptpay from "../images/promptpay.jpg";
import success from "../images/success.png";

// Helper function to format date in Thai style
const dateformated = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Payment = () => {
  const { movieId, date, cinema, theaterName, time, seats, price } =
    useParams();
  const qrCodeRef = useRef(null);
  const payButtonRef = useRef(null);

  // States
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [coupons, setCoupons] = useState([]); // State to hold fetched coupons
  const [selectedCouponId, setSelectedCouponId] = useState("");
  const [netPrice, setNetPrice] = useState(parseFloat(price));
  const [usedCouponIds, setUsedCouponIds] = useState([]);
  const [moviePoster, setMoviePoster] = useState(null);
  const [movieName, setMovieName] = useState(null);
  const [isPromptPayClicked, setIsPromptPayClicked] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("PromptPay");
  const [showQRCode, setShowQRCode] = useState(false);

  // Effects

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch coupons from the API
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("/api/coupons/coupon-details");
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          return;
        }
        const couponsData = await response.json();
        setCoupons(couponsData);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  // Fetch used coupons
  useEffect(() => {
    const fetchUsedCoupons = async () => {
      try {
        // ใช้ user_id หา
        const response = await fetch("/api/coupons/user-coupons", {
          headers: {
            "x-access-token": sessionStorage.getItem("token"), // user_id
          },
        });
        if (response.ok) {
          const usedCouponsData = await response.json();
          const usedIds = usedCouponsData
            .filter((couponInfo) => couponInfo.usageStatus) // filter used coupon
            .map((couponInfo) => couponInfo.couponId); // map
          setUsedCouponIds(usedIds);
        } else {
          console.error("Failed to fetch used coupons");
        }
      } catch (error) {
        console.error("Error fetching used coupons:", error);
      }
    };

    fetchUsedCoupons();
  }, []);

  // Fetch movie data
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/movies/${movieId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const movieData = await response.json();

        // ดึงภาพโปสเตอร์หนังตาม movie_id
        setMoviePoster(`http://localhost:3000${movieData.movie_poster}`);
        setMovieName(movieData.movie_name);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    fetchMovieData();
  }, [movieId]);

  // Function to format time in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleCouponChange = (event) => {
    const couponId = event.target.value;
    setSelectedCouponId(couponId);

    const selectedCoupon = coupons.find(
      (coupon) => coupon.couponId === parseInt(couponId)
    );

    // If a coupon is selected, calculate the net price by subtracting the discount
    if (selectedCoupon) {
      setNetPrice(parseFloat(price) - selectedCoupon.discount);
    } else {
      setNetPrice(parseFloat(price)); // If no coupon is selected, the net price is the original price
    }
  };

  // Handler for when the selected payment method changes
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handlePromptPayClick = async () => {
    if (selectedPaymentMethod === "PromptPay") {
      setIsPromptPayClicked(true);
      setShowQRCode(true);

      // Smoothly scroll to the QR code section
      setTimeout(() => {
        qrCodeRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      // Simulate payment processing and booking
      setTimeout(async () => {
        setShowQRCode(false); // Hide QR Code after a delay

        try {
          const seatsArray = seats.split(",");
          // บันทึกข้อมูลการจองตั๋วลงตาราง bookings
          const saveBookingResponse = await fetch(
            "http://localhost:3001/api/payments/process-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": sessionStorage.getItem("token"), // user_id
              },
              body: JSON.stringify({
                showing_movie_id: parseInt(movieId),
                date: date,
                cinema: decodeURIComponent(cinema),
                theaterName: decodeURIComponent(theaterName),
                seats: seatsArray,
                time: decodeURIComponent(time),
                totalAmount: netPrice,
                paymentMethod: selectedPaymentMethod,
                coupon_id: selectedCouponId || null,
              }),
            }
          );

          if (!saveBookingResponse.ok) {
            const errorData = await saveBookingResponse.json();
            console.error("Failed to save booking:", errorData);
            alert(
              `เกิดข้อผิดพลาดในการบันทึกการจอง: ${
                errorData.message || "กรุณาลองใหม่อีกครั้ง"
              }`
            );
          } else {
            // const savedBooking = await saveBookingResponse.json();
            // console.log("Booking saved:", savedBooking);
            setIsPaymentComplete(true);

            // Update coupon status if a coupon was used
            if (selectedCouponId) {
              try {
                // บันทึกลงตาราง coupon_status
                const saveCouponStatusResponse = await fetch(
                  "/api/coupons/coupon-status",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-access-token": sessionStorage.getItem("token"), // user_id
                    },
                    body: JSON.stringify({
                      coupon_id: selectedCouponId, // coupon_id เก็บไว้ว่า user_id นี้เคยใช้ coupon_id นี้ไปแล้ว
                    }),
                  }
                );

                if (saveCouponStatusResponse.ok) {
                  const couponStatusResult =
                    await saveCouponStatusResponse.json();
                  console.log("Coupon status updated:", couponStatusResult);
                } else {
                  const couponStatusError =
                    await saveCouponStatusResponse.json();
                  console.error(
                    "Failed to update coupon status:",
                    couponStatusError
                  );
                }
              } catch (error) {
                console.error(
                  "Error during coupon status update:",
                  error
                );
                alert("เกิดข้อผิดพลาดในการบันทึกสถานะคูปอง");
              }
            }
          }
        } catch (error) {
          console.error("Error during payment/booking:", error);
          alert(
            `เกิดข้อผิดพลาดในการชำระเงินและจอง: ${error.message}. กรุณาลองใหม่อีกครั้ง`
          );
        }
      }, 10000); // Simulate payment processing time (10 sec)
    }
  };

  return (
    <>
      {!isPaymentComplete ? (
        <>
          {/* Process bar */}
          <MovieProcess />

          {/* Countdown timer */}
          <div style={{ marginRight: "50px", textAlign: "right" }}>
            นับถอยหลัง:{" "}
            <span style={{ color: "red" }}>{formatTime(timeLeft)}</span>
          </div>

          {/* Booking details */}
          <div style={{ textAlign: "center", padding: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {moviePoster && (
                <img
                  src={moviePoster}
                  alt="Movie Poster"
                  style={{ maxWidth: "300px", marginRight: "50px" }}
                />
              )}

              <div style={{ textAlign: "left" }}>
                {movieName ? (
                  <h2>
                    <strong>{movieName}</strong>
                  </h2>
                ) : (
                  <h2>
                    <strong>รหัสภาพยนตร์:</strong> {movieId}
                  </h2>
                )}
                <p>
                  <strong>โรงภาพยนตร์:</strong> {decodeURIComponent(cinema)}
                </p>
                <p>
                  <strong>วันที่:</strong> {dateformated(date)}
                </p>
                <p>
                  <strong>โรงฉาย:</strong> {decodeURIComponent(theaterName)}
                </p>
                <p>
                  <strong>เวลา:</strong> {decodeURIComponent(time)}
                </p>
                <p>
                  <strong>ที่นั่ง:</strong> {seats}
                </p>
                <p>
                  <strong>ราคาทั้งหมด:</strong> {price} บาท
                </p>

                {/* Coupon selection */}
                <p>
                  <strong>คูปองส่วนลด: </strong>
                  <select
                    value={selectedCouponId}
                    onChange={handleCouponChange} // never used coupon only
                  >
                    <option value="">เลือกคูปอง</option>
                    {coupons
                      .filter(
                        (coupon) =>
                          !usedCouponIds.includes(coupon.couponId)
                      )
                      .map((coupon) => (
                        <option
                          key={coupon.couponId}
                          value={coupon.couponId}
                        >
                          {coupon.couponName}
                        </option>
                      ))}
                  </select>
                </p>

                {/* Payment method selection */}
                <p>
                  <strong>ช่องทางการชำระเงิน: </strong>
                </p>
                <div>
                  <label
                    style={{
                      color:
                        selectedPaymentMethod === "PromptPay"
                          ? "#F8C631"
                          : "inherit",
                      marginRight: "15px",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PromptPay"
                      checked={selectedPaymentMethod === "PromptPay"}
                      onChange={handlePaymentMethodChange}
                    />
                    PromptPay
                  </label>
                  <label
                    style={{
                      color:
                        selectedPaymentMethod === "Credit Card"
                          ? "#F8C631"
                          : "inherit",
                      marginRight: "15px",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit Card"
                      checked={selectedPaymentMethod === "Credit Card"}
                      onChange={handlePaymentMethodChange}
                    />
                    Credit Card
                  </label>
                  <label
                    style={{
                      color:
                        selectedPaymentMethod === "True Money"
                          ? "#F8C631"
                          : "inherit",
                      marginRight: "15px",
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="True Money"
                      checked={selectedPaymentMethod === "True Money"}
                      onChange={handlePaymentMethodChange}
                    />
                    True Money
                  </label>
                </div>

                {/* Net price display */}
                <p>
                  <strong>ราคาสุทธิ: </strong>
                  <span style={{ color: "#F8C631" }}>{netPrice} บาท</span>
                </p>

                {/* Payment button */}
                <div style={{ textAlign: "right" }}>
                  <button
                    ref={payButtonRef}
                    style={{
                      backgroundColor: "#E54E6D",
                      color: "white",
                      padding: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition:
                        "background-color 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={() => {
                      if (payButtonRef.current) {
                        payButtonRef.current.style.backgroundColor = "#C83754";
                        payButtonRef.current.style.boxShadow =
                          "0 0 10px rgba(0, 0, 0, 0.3)";
                      }
                    }}
                    onMouseLeave={() => {
                      if (payButtonRef.current) {
                        payButtonRef.current.style.backgroundColor = "#E54E6D";
                        payButtonRef.current.style.boxShadow = "none";
                      }
                    }}
                    onClick={handlePromptPayClick}
                    disabled={!selectedPaymentMethod || timeLeft === 0}
                  >
                    ชำระเงิน
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PromptPay QR code */}
          {isPromptPayClicked && showQRCode && (
            <div
              ref={qrCodeRef}
              style={{
                alignItems: "center",
                marginTop: "20px",
                backgroundColor: "rgba(129, 101, 148, 0.6)",
                width: "600px",
                borderRadius: "20px",
                margin: "auto",
                textAlign: "center",
                padding: "16px",
              }}
            >
              <h3>ชำระด้วย PromptPay</h3>
              <img
                src={promptpay} // รูป QR Code
                alt="PromptPay QR Code"
                style={{ maxWidth: "300px" }}
              />
              <p>กรุณาสแกน QR Code เพื่อชำระเงิน</p>
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "20px",
            width: "600px",
            margin: "100px auto",
          }}
        >
          <img
            src={success}
            alt="Payment successful"
            style={{ maxWidth: "250px", marginTop: "32px" }}
          />
          <p style={{ fontSize: "32px" }}>ชำระเงินเสร็จสิ้น</p>
        </div>
      )}
    </>
  );
};

export default Payment;