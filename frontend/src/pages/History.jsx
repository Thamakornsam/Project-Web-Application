import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

/*Convert date to Thai format (Day Month Year)*/
const dateformated = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
};

const History = () => {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

   
    useEffect(() => { 
        /*Check if user is logged in*/
        if (!sessionStorage.getItem("token")) {
            /*if not, redirect to login page */
            navigate("/login");
            return;
        }

        /*Async function to get booking history from API using stored token*/
        const fetchHistory = async () => {
            try {
                const response = await fetch('/api/history/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token' : sessionStorage.getItem("token")
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setHistory(data);
                } else {
                    setError("ไม่สามารถโหลดประวัติการจองได้ในขณะนี้"); 
                }
            } catch (err) {
                setError("เกิดข้อผิดพลาดในการโหลดข้อมูล"); 
            }
        };

        fetchHistory();
    }, [navigate]);

    return (
        <div className={history.length === 0 ? "empty-history" : "history-container"}>
            <h1 style={{ textAlign: "left", marginLeft: "50px", color: "white" }}>ประวัติการจอง</h1>

            {error && <p style={{ color: "red", marginLeft: "30px" }}>{error}</p>}

            {history.length === 0 && !error ? (
                <p style={{ color: "white", marginLeft: "30px" }}>ไม่พบประวัติการจอง</p>
            ) : (
                history.map((item, index) => (
                    <div key={index} style={{
                        background: "linear-gradient(to right, rgba(255, 255, 255, 0.4))",
                        borderRadius: "15px",
                        padding: "20px",
                        margin: "20px",
                        color: "white",
                        fontFamily: "sans-serif",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <div style={{
                            fontFamily: "Kanit, sans-serif",
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                            <span><h2>{item.movie_name} | {item.cinema_name}</h2></span>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontFamily: "Kanit, sans-serif",
                            lineHeight: "1.3"
                        }}>
                            <div style={{ textAlign: "left", fontSize: "20px" }}>
                                <div style={{ display: "flex" }}>
                                    <p style={{ margin: 0 }}>{item.theater_name}</p>
                                    <p style={{ margin: 0, marginLeft: "240px" }}>
                                        วันที่ <span style={{ color: "#f8c631" }}>{dateformated(item.date)} </span>
                                        รอบ <span style={{ color: "#f8c631" }}>{item.time}</span> น.
                                    </p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ margin: 0 }}>
                                        จำนวนที่นั่ง: <span style={{ color: "#f8c631" }}>{item.seat_number.length}</span>
                                    </p>
                                    <p style={{ margin: 0, marginLeft: "218px" }}>
                                        ที่นั่ง: <span style={{ color: "#f8c631" }}>{item.seat_number.join(", ")}</span>
                                    </p>
                                </div>
                                <p style={{ margin: 0 }}>
                                    ช่องทางชำระเงิน: <span style={{ color: "#f8c631" }}>{item.type_payment}</span>
                                </p>
                            </div>
                            <div style={{
                                textAlign: "right",
                                fontSize: "20px",
                                marginRight: "30px",
                            }}>
                                <p style={{ margin: 0 }}>ราคาสุทธิ :</p>
                                <p style={{
                                    fontSize: "20px",
                                    color: "#f8c631",
                                    fontWeight: "bold",
                                    margin: 0
                                }}>
                                    {item.total_price} THB
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default History;


