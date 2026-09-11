import { useParams } from "react-router-dom";
import MovieBox from "../components/MovieBox";
import { useState, useEffect } from "react";

const MovieShowDescription = () => {
    const { movieId } = useParams();
    const [movieData, setMoviesData] = useState(null);

     useEffect(() => {

        //Fetch movie's information by movieId.
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
        
        fetchMovieData()

    },[movieId])
    
    return ( 
        !movieData ?(
            <h2 style={{ textAlign: "center", color: "red" }}>ไม่พบข้อมูลภาพยนตร์</h2>
        ):
        (    <div style={{ textAlign: "center", padding: "20px" }}>

                {/*Black Box movie*/}
                <MovieBox  movieData={movieData}/>

                {/*Show description movie*/}
                <div className="descript-movie"
                style={{ textAlign: "left", padding: "50px",backgroundColor:"rgb(129,101,148,0.6)",
                    borderRadius:"10px", margin:"20px"}}
                
                >
                    <h2>เรื่องย่อ</h2>
                    <p>{movieData.movie_description} </p>
                </div>
                <div className="trailer">
                    <iframe width="1120" height="630" src={movieData.movie_trailer} 
                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        )
    )
    
};

export default MovieShowDescription;
