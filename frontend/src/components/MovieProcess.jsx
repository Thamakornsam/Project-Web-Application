import { useParams} from "react-router-dom";

//MovieProcess is Process Bar that show status for booking.
const MovieProcess = () => {
    
    //Get URL parameters
    const { movieId, date, cinema, theaterName, time, seats, price} = useParams();

    //Check the current booking step in the process
    const isMoviesShowTimes = movieId && !date && !cinema && !theaterName && !time && !seats && !price
    const isBookingSeat = movieId && date && cinema && theaterName && time && !seats && !price
    const isPaymentPage = movieId && date && cinema && theaterName && time && seats && price


    return (
            <div className="movie-process" style={{display:"flex", justifyContent:"center",
                    justifyItems:"center", margin:"30px 0 30px 0", gap:"50px"}}>      
                    <div
                    style={{borderRadius:"15px", backgroundColor: isMoviesShowTimes ? "#724D90":"#461F56", 
                    height:"80px", width:"20pc", textAlign:"center",
                    display: "flex", justifyContent: "center",alignItems: "center"}}>
                        <h3>เลือกรอบภาพยนต์</h3></div>
                    <div 
                    style={{borderRadius:"15px", backgroundColor: isBookingSeat ? "#724D90":"#461F56", 
                    height:"80px", width:"20pc", textAlign:"center",
                    display: "flex", justifyContent: "center",alignItems: "center"}}>
                        <h3>เลือกที่นั่ง</h3></div>
                    <div  
                    style={{borderRadius:"15px", backgroundColor: isPaymentPage ? "#724D90":"#461F56", 
                    height:"80px", width:"20pc", textAlign:"center",
                    display: "flex", justifyContent: "center",alignItems: "center"}}>
                        <h3>ซื้อบัตร</h3></div>
                                     
            </div>
    )

}
 export default MovieProcess;