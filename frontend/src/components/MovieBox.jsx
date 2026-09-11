import { Link, useLocation } from "react-router-dom";
import '../App.css';

//MovieBox is Black Box movie that shows movie' preview information by movieData.
const MovieBox = ({movieData}) => {
    
    const location = useLocation(); 
    const currentPath = location.pathname;
    const isOnDescriptionPage = currentPath.startsWith(`/MovieShowtime/${movieData.movie_id}/description`);
    
    return (
        <div style={{  textAlign: "center", paddingLeft: "100px" , 
                        backgroundColor:"black", height:"auto", 
                        display:"flex", justifyContent: "center",alignItems: "center"}}>
            <div style={{ marginRight:"80px"}}>
                <img 
                    src={`${movieData.movie_poster}`} 
                    alt={movieData.movie_name} 
                    style={{ width: "250px", borderRadius: "10px", margin: "15px 0 15px 0" }} 
                />
            </div>
            <div className="description-intro"
                style={{textAlign: "left",width:"700px"}}
            >
                <div>
                    <div>
                        <h1 style={{margin:"0"}}><strong>{movieData.movie_name}</strong> </h1>
                        <div style={{margin:"20px 0 40px 0"}}>
                        <p style={{margin:"0"}}>🕗︎ &nbsp; {movieData.movie_duration}</p>
                        <p style={{margin:"0"}}><strong>หมวดหมู่:</strong> {movieData.movie_category}</p>
                        <p style={{margin:"0"}}><strong>นักแสดง:</strong> {movieData.movie_actors}</p>
                        <p style={{margin:"0"}}><strong>ผู้กำกับ:</strong> {movieData.movies_director}</p>
                        </div>
                    </div>
                    
                    <div  className="butt-descrip">
                            <Link to={isOnDescriptionPage ? `/MovieShowtime/${movieData.movie_id}`: `/MovieShowtime/${movieData.movie_id}/description`}
                            className="lnk-butt"
                            >{isOnDescriptionPage ? "รอบหนัง" : "รายละเอียด" }</Link>
                    </div>
                </div>
            </div>
        </div>
    )
    
};

export default MovieBox;