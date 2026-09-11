import { useParams, useNavigate } from "react-router-dom";
import MovieBox from "../components/MovieBox";
import "../App.css";
import { useState, useEffect, useMemo } from "react";
import MovieProcess from "../components/MovieProcess";
import Seat from "../images/Seat.png";
import check from "../images/check.png";
import occupiedSeat from "../images/occupiedSeat.png";


// Function to format a date into a Thai locale string (Day Month Year).
const dateformated = (date) => {
  const d = new Date(date)
  const formattedDate = d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
  return formattedDate;
}


const BookingSeats = () => {
  const { movieId, date, cinema, theaterName, time } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [currentShowtimeDetails, setCurrentShowtimeDetails] = useState(null);
  const [seatsLayout, setSeatsLayout] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

// Fetch showtime and seat data when component mounts or URL parameters change.
  useEffect(() => {
    const fetchShowtimeAndSeats = async () => {
      try {
        // Fetch main movie data if not already loaded.
        if (!movie) { 
          const movieResponse = await fetch(`http://localhost:3001/api/movies/${movieId}`);
          if (!movieResponse.ok) {
            const errorText = await movieResponse.text();
            throw new Error(`Failed to fetch movie data: ${movieResponse.statusText} - ${errorText}`);
          }
          const movieData = await movieResponse.json(); // Parses movie data from JSON.
          setMovie(movieData); // Sets the movie state.
        }

        // Prepare URL for fetching showtime details, encoding parameters to handle special characters.
        const encodedCinema = encodeURIComponent(cinema);
        const encodedTheaterName = encodeURIComponent(theaterName);
        const encodedTime = encodeURIComponent(time);

        // Constructs the URL for showtime details.
        const showtimeUrl = `http://localhost:3001/api/movies/${movieId}/showtimes_details?date=${date}&cinema=${encodedCinema}&theaterName=${encodedTheaterName}&time=${encodedTime}`;
        
        const showtimeDetailsResponse = await fetch(showtimeUrl);

         // Check response from the backend for showtime details.
        if (!showtimeDetailsResponse.ok) {
          const errorData = await showtimeDetailsResponse.json(); // Reads JSON error data.
           // Displays an alert with the error message from the backend.
          alert(`เกิดข้อผิดพลาดในการโหลดข้อมูลรอบฉาย: ${errorData.message || 'ไม่ทราบสาเหตุ'}`);
          navigate(`/movieShowtime/${movieId}`); // Redirects to the movie showtime page if an error occurs.
          return;
        }

        // Parse the response into JSON.
        // rawShowtimeData gonna be the same Object from Backend (that have date, cinema, price, seats etc.)
        const rawShowtimeData = await showtimeDetailsResponse.json(); 

        let selectedShowtime = null; 

        // Validates the structure of the received data and seat information.
        if (rawShowtimeData && 
            rawShowtimeData.date === date && 
            rawShowtimeData.cinema === decodeURIComponent(cinema) && 
            rawShowtimeData.theaterName === decodeURIComponent(theaterName) && 
            rawShowtimeData.time === decodeURIComponent(time) && 
            Array.isArray(rawShowtimeData.seats) && 
            rawShowtimeData.seats.length > 0) {
            
            selectedShowtime = rawShowtimeData; // Uses the raw data if valid.
        }

        // If no matching showtime is found or seat data is invalid.
        if (!selectedShowtime) { 
            alert("ไม่พบข้อมูลรอบฉายที่ตรงกัน หรือข้อมูลที่นั่งไม่ถูกต้อง กรุณาลองรอบฉายอื่น");
            navigate(`/movieShowtime/${movieId}`);// Redirects to the movie showtime page
            return;
        }
        
         // Prepares seat data for the frontend.
        const initialSeats = selectedShowtime.seats.map(seat => ({
            ...seat,
            isSelected: false // Each seat is initially not selected. (false)
        }));


        // Set State
        setCurrentShowtimeDetails(selectedShowtime);
        setSeatsLayout(initialSeats);
        setSelectedSeats([]);
        setTotalPrice(0);
        
      } catch (err) {
        alert(`เกิดข้อผิดพลาดในการโหลดข้อมูลที่นั่ง: ${err.message || 'ไม่ทราบสาเหตุ'} กรุณาลองใหม่อีกครั้ง`);
        navigate('/'); // Redirects to the home page.
      }
    };

    // Check if all URL params are present before fetching data.(API)
    if (movieId && date && cinema && theaterName && time) {
        fetchShowtimeAndSeats();
    } else {
        console.warn("Missing URL parameters for fetching showtime details. Redirecting.");
        navigate('/'); 
    }
  }, [movieId, date, cinema, theaterName, time, navigate, movie]); // Dependency array

// Calculate total price. (recalculate total price whenever selectedSeats or currentShowtimeDetails change.)
  useEffect(() => {
    if (currentShowtimeDetails && currentShowtimeDetails.price !== undefined && typeof currentShowtimeDetails.price === 'number') {
      setTotalPrice(selectedSeats.length * currentShowtimeDetails.price);
    } else {
      setTotalPrice(0);
    }
  }, [selectedSeats, currentShowtimeDetails]);

  const handleSeatClick = (clickedSeatId, isBooked) => {
    if (isBooked) {
      console.log("Seat is already booked. Cannot select.");
      return;
    }

    // Updates the seatsLayout state
    setSeatsLayout(prevSeatsLayout => 
      prevSeatsLayout.map(seat => 
        seat.seatId === clickedSeatId 
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );

    // Updates the selectedSeats state
    setSelectedSeats(prevSelected => {
      if (prevSelected.includes(clickedSeatId)) {  // If seat is already selected, remove it.
        const newSelected = prevSelected.filter(seatId => seatId !== clickedSeatId);
        return newSelected;
      } else { // If seat is not selected, add it.
        const newSelected = [...prevSelected, clickedSeatId];
        return newSelected;
      }
    });
  };

  // Handles the "Proceed to Payment" button click.
  const handleProceedToPayment = () => {

    if (selectedSeats.length === 0) {
      alert("กรุณาเลือกที่นั่งอย่างน้อย 1 ที่นั่ง");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนดำเนินการชำระเงิน");
      navigate("/login");
      return;
    }

    // Ensures showtime details and price are available before proceeding.
    if (!currentShowtimeDetails || currentShowtimeDetails.theaterName === undefined || currentShowtimeDetails.price === undefined) {
        alert("ไม่สามารถระบุรายละเอียดรอบฉายหรือราคาได้ กรุณาลองใหม่อีกครั้ง"); 
        return;
    }

    // Sorts selected seats
    const seatsString = selectedSeats.sort((a, b) => {
        const [rowA, numA] = [a.slice(0, 1), parseInt(a.slice(1))];
        const [rowB, numB] = [b.slice(0, 1), parseInt(b.slice(1))];

        if (rowA < rowB) return -1;
        if (rowA > rowB) return 1;
        return numA - numB;
    }).join(',');

    // Navigates to the payment
    navigate(`/bookingSeats/${movieId}/${date}/${encodeURIComponent(cinema)}/${encodeURIComponent(currentShowtimeDetails.theaterName)}/${encodeURIComponent(time)}/${encodeURIComponent(seatsString)}/${totalPrice}`);
  };
   
  // Group seats by row and sort rows
  const { seatsByRow, sortedRows } = useMemo(() => {
    // SeatsLayout is empty or not an array.
    if (!Array.isArray(seatsLayout) || seatsLayout.length === 0) {
      
      return {
        seatsByRow: {},
        sortedRows: []
      };
    }

    // Reduces the seatsLayout array into an object where keys are row characters and values are arrays of seats in that row.
    const groupedSeats = seatsLayout.reduce((acc, seat) => {
      if (!seat || typeof seat.seatId !== 'string' || seat.seatId.length === 0) {
        console.warn("Invalid seat object encountered in useMemo during grouping:", seat);
        return acc;
      }
      const rowChar = seat.seatId.charAt(0);
      if (!acc[rowChar]) {
        acc[rowChar] = [];
      }
      acc[rowChar].push(seat);
      return acc;
    }, {});

    const calculatedSortedRows = Object.keys(groupedSeats).sort(); // Sorts row characters alphabetically.

    return {
      seatsByRow: groupedSeats,
      sortedRows: calculatedSortedRows
    };
  }, [seatsLayout]);

  // Conditional rendering for loading state.
  if (!movie || !currentShowtimeDetails || currentShowtimeDetails.price === undefined || seatsLayout.length === 0 || sortedRows.length === 0) {
    return (
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"500px"}}>
        <h2 style={{ textAlign: "center", color: "#F8C631" }}>กำลังโหลดข้อมูลที่นั่ง...</h2>
      </div>
    );
  }

  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>

        {/*Black Box movie*/}
        <MovieBox movieData={movie}/>

        {/* Process bar */}
        <MovieProcess />

        {/* Movie Details */}
        <h2>เลือกที่นั่งสำหรับ: {movie.title}</h2>
        <p>โรงภาพยนตร์: {currentShowtimeDetails.cinema} (โรงฉาย: {currentShowtimeDetails.theaterName})</p>
        <p>วันที่: {dateformated(date)} เวลา: {time} | ราคาต่อที่นั่ง: {currentShowtimeDetails.price} บาท</p>

        {/* Screen */}
        <div style={{
          backgroundColor: '#333',
          color: 'white',
          padding: '10px 0',
          margin: '20px auto',
          width: '80%',
          maxWidth: '600px',
          borderRadius: '5px'
        }}>
          SCREEN
        </div>

        {/* Seat Layout */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          margin: '20px auto',
          width: 'fit-content',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }}>
          {sortedRows.map(rowChar => (
            <div key={rowChar} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '30px', textAlign: 'right', fontWeight: 'bold', color: '#F8C631' }}>{rowChar}</div>
                {seatsByRow[rowChar]
                  .sort((a, b) => parseInt(a.seatId.slice(1)) - parseInt(b.seatId.slice(1)))
                  .map(seat => {
                    let seatImageSrc;
                    let cursorStyle = 'pointer';

                    if (seat.isBooked) {
                      seatImageSrc = occupiedSeat;
                      cursorStyle = 'not-allowed';
                    } else if (seat.isSelected) {
                      seatImageSrc = check;
                    } else {
                      seatImageSrc = Seat;
                    }

                    return (
                      <div
                        key={seat.seatId}
                        onClick={() => handleSeatClick(seat.seatId, seat.isBooked)}
                        style={{
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: cursorStyle,
                            position: 'relative',
                            userSelect: 'none',
                        }}
                      >
                        <img 
                            src={seatImageSrc} 
                            alt={`Seat ${seat.seatId}`} 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'contain',
                                opacity: seat.isBooked ? 0.8 : 1
                            }} 
                        />
                      </div>
                    );
                  })}
            </div>
          ))}
        </div>

        {/* Booking summary and proceed to payment button */}
        <div style={{ marginTop: '30px' }}>
          <p>
            <strong>ที่นั่งที่เลือก: </strong>
            {selectedSeats.length > 0 ? selectedSeats.sort((a, b) => {
              // Sorts selected seats for display.
                const [rowA, numA] = [a.slice(0, 1), parseInt(a.slice(1))];
                const [rowB, numB] = [b.slice(0, 1), parseInt(b.slice(1))];
                if (rowA < rowB) return -1;
                if (rowA > rowB) return 1;
                return numA - numB;
            }).join(', ') : 'ยังไม่ได้เลือก'}
          </p>
          <p>
            <strong>ราคารวม: </strong>
            <span style={{ color: '#F8C631', fontSize: '20px', fontWeight: 'bold' }}>{totalPrice} บาท</span>
          </p>
          <button
            onClick={handleProceedToPayment}
            disabled={selectedSeats.length === 0}
            style={{
              backgroundColor: '#E54E6D',
              color: 'white',
              padding: '12px 25px',
              borderRadius: '10px',
              border: 'none',
              cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '18px',
              marginTop: '15px',
              opacity: selectedSeats.length === 0 ? 0.7 : 1
            }}
          >
            ดำเนินการชำระเงิน
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingSeats;
