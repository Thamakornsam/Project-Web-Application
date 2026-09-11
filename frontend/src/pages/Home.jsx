import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Home = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() =>  {

        //Fetch all movies
        const fetchAllMovies = async() => {
            try{

                // Send api for get all movies's information 
                const response = await fetch('/api/movies', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                //If response is ok, store in Movies    
                if(response.ok){
                    const data = await response.json()
                    setMovies(data)
                }else{
                    throw new Error("Error")
                }
            }catch(e){
                console.log(e)
            }
        }
        fetchAllMovies()

    },[])

    return (
        <div>
            <div style={{margin:"30px 0 30px 0"}}>
                <h1>กำลังฉาย</h1>
            </div>
            <div style={{ 
                display: "grid", 
                gridTemplateColumns:"auto auto auto auto", 
                justifyContent:"center", 
                alignItems:"center", 
                gap: "20px" }}>
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.movie_id} style={{ width: "250px", textAlign: "center", padding:"30px"}} className="movieSelected">
                        <Link to={`/MovieShowtime/${movie.movie_id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <img 
                            src= {`${movie.movie_poster}`}
                            alt={movie.movie_name} 
                            style={{ width: "240px", height:"300px", objectFit:"cover", borderRadius: "10px", cursor: "pointer" }} 
                            />
                            <h3>{movie.movie_name}</h3>
                        </Link>
                        </div>
                    ))
                    ) : 
                    (
                        <div>ไม่มีรายการภาพยนตร์</div>
                    )
                }
            </div>
        </div>
    );
};

export default Home;
