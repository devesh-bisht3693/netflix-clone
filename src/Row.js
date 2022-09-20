import axios from './axios';
import React, { useEffect, useState } from 'react'
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row({title, fetchUrl, isLargeRow = false}) {
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
      if(trailerUrl){
        setTrailerUrl('');
      }else {
        movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
      }
    };

    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        autoplay: 1,
      },
    };

  return (
    <div className='row'>
        <h2>{title}</h2>

        <div className='row__posters'>
         {movies.map(movie => ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
            <img className={`row__poster ${isLargeRow && "row__posterLarge"}`}
             key={movie.id}
             onClick={() => handleClick(movie)}
             src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
            }`} alt={movie.name} />
         ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} 
    </div>
  )
}

export default Row