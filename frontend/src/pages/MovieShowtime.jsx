import { useParams, Link } from "react-router-dom";
import MovieBox from "../components/MovieBox";
import MovieProcess from "../components/MovieProcess";
import { useState ,useEffect } from "react";
import logo from "../images/logo.png";
import '../App.css';

//Description dateshow for booking
const dateShow = [
    {day:"Saturday" ,date:"29" , month:"3" ,year:"2025"},
    {day:"Sunday" ,date:"30" , month:"3" ,year:"2025"},
    {day:"Monday" ,date:"31" , month:"3" ,year:"2025"},
    {day:"Tuesday" ,date:"1" , month:"4" ,year:"2025"},
    {day:"Wednesday" ,date:"2" , month:"4" ,year:"2025"},
    {day:"Thursday" ,date:"3" , month:"4" ,year:"2025"},
    {day:"Friday" ,date:"4" , month:"4" ,year:"2025"},
]

//Change month num to month name
const changeMonth = (num) =>{
    const month =["January","February","March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ]
    return month[num-1]
}

//Create date bar
const showingDay = (dateShow,dateSelected,setDateSelected) => {

    const selected = new Date(dateSelected)

    return(
        <div className="bar-date"
        style={{display:"flex",justifyContent:"center",alignContent:"center",gap:"20px"}}>
            {dateShow.map((dateInfo,dateIndex) =>(
                <div key={dateIndex} 

                //If user select date to find showtimes on that date
                onClick={() => {
                    let mm = dateInfo.month , dd = dateInfo.date

                    //Change month and date in Date format
                    if (mm.length < 2){
                        mm="0"+mm
                    }

                    if (dd.length < 2){
                        dd="0"+dd
                    }
                    //Set selected date in dateSelected
                    setDateSelected(`${dateInfo.year}-${mm}-${dd}`)}
                }
                className="date-box-butt"   
                style={{
                backgroundColor: selected.getDate()===parseInt(dateInfo.date) 
                && selected.getMonth()===parseInt(dateInfo.month)-1 
                && selected.getFullYear()===parseInt(dateInfo.year) ? "#724D90" : "", 

                color: selected.getDate()===parseInt(dateInfo.date) 
                && selected.getMonth()===parseInt(dateInfo.month)-1 
                && selected.getFullYear()===parseInt(dateInfo.year) ? "white" : "",

                cursor: selected.getDate()===parseInt(dateInfo.date) 
                && selected.getMonth()===parseInt(dateInfo.month)-1 
                && selected.getFullYear()===parseInt(dateInfo.year) ? "inherit" : ""

                }} >
                    <p style={{fontSize:"20px"}}>{dateInfo.day.slice(0, 3)}</p>
                    <h1>{dateInfo.date}</h1>
                    <p style={{fontSize:"20px"}}>{changeMonth(parseInt(dateInfo.month))} {dateInfo.year}</p>
                </div>
            ))}

        </div>

    )
}


const MovieShowtime = () => {
    const { movieId } = useParams();
    const [dateSelected, setDateSelected] = useState("2025-03-29") //date selected default
    const [movieShowtimeData, setMovieShowtimeData] = useState(null)
    const [movieData, setMoviesData] = useState(null);

    useEffect(() => { 

        //Fetch movie's information  by movieId
        const fetchMovieData = async () => {
            try{
                // Send api for get movie's information by movieId
                const response = await fetch(`/api/movies/${movieId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                }})

                //If response is ok, store in MovieData
                if(response.ok){
                    const data = await response.json()
                    setMoviesData(data)
                }else{
                    throw new Error("Error")
                }
            }catch (err){
                console.log(err)
            }
        }

        //Fetch movie's showtimes by movieId
        const fetchMovieShowtimes = async () => {
            try{
                //Send api for get movie's showtimes by movieId
                const response = await fetch(`/api/movies/${movieId}/showtime`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                }})

                //If response is ok, store data in MovieShowtimeData.
                if(response.ok){
                    const data = await response.json()
                    setMovieShowtimeData(data)
                }else{
                    throw new Error("Error")
                }
            }catch (err){
                console.log(err)
            }
        }

        fetchMovieData()
        fetchMovieShowtimes()
    }, [movieId, dateSelected]);

    //Check the selected date for show movie's showtime on that date.
    const selectedDateInfo = movieShowtimeData?.dates?.find(dateInfo => dateInfo.date === dateSelected);
  
    return (
        movieData ? (
                <div style={{ textAlign: "center", padding: "20px" }}>

                {/*Black Box movie*/}
                <MovieBox movieData={movieData}/>

                {/*Process bar*/}
                <MovieProcess />

                <h1>เลือกเวลาฉาย - {movieData.movieName}</h1>
                
                {/*Selected date bar*/}
                <div className="dateMovies">   
                    {showingDay(dateShow,dateSelected,setDateSelected)}
                </div>
            
                {/*Show movie's showtime for the selected date*/}
                {selectedDateInfo ? (
                    (<div style={{ margin: "50px", display:"grid", gap:"50px", justifyContent:"center", alignContent:"center"}}>
                        {selectedDateInfo.cinemas.map((cinemaInfo, cinemaIndex) => (
                            <div key={cinemaIndex} 
                            style={{backgroundColor:"rgb(129,101,148,0.6)", borderRadius:"15px",width:"500px", display:"flex", 
                            justifyContent:"left", alignContent:"center", padding:"50px", boxSizing:"border-box", gap:"30px"}}>
                                <div style={{display:"flex",justifyContent:"left", alignContent:"center", gap:"30px"}}>
                                    <img src={logo} alt="Logo" className="logo" />
                                </div>    
                                <div style={{textAlign:"left"}}>    
                                <p style={{fontSize:"25px", margin:"0"}}>{cinemaInfo.cinema}</p>
                                
                                {cinemaInfo.theaterDetails.map((detail, detailIndex) => (
                                    <div key={detailIndex} style={{fontSize:"20px", margin:"10px"}}>
                                        {detail.theaterName} | 🔊{detail.voice}
                                        <div style={{ display:"flex", padding: 0, gap:"10px" }}>
                                            {detail.times.map((time, timeIndex) => (
                                                <div key={timeIndex} className="round-butt">
                                                    <Link 
                                                        to={`/bookingSeats/${movieId}/${dateSelected}/${encodeURIComponent(cinemaInfo.cinema)}/${encodeURIComponent(detail.theaterName)}/${encodeURIComponent(time.time)}`} 
                                                        style={{ textDecoration: "none", color: "blue" }}
                                                    >
                                                        🎬 {time.time}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))}
                    </div>)
                ):
                <div style={{margin:"50px 0 50px 0", color:"#E4E4E4"}}>
                    <h1>ไม่พบรอบฉาย</h1>
                </div>
                }
            </div>
        ):
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"500px"}}>
                <h2 style={{ textAlign: "center", color: "red" }}>ไม่พบข้อมูลภาพยนตร์</h2>
            </div>
            
        );   
};

export default MovieShowtime;
