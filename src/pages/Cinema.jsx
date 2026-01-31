import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const API_KEY = '1d48f6b616900449f034a74a5e8de3cf';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function Cinema() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCinemaMovies = async () => {
      try {
        //filmy aktualnie grane w kinach pl
        const res = await fetch(
          `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pl-PL&region=PL&page=1`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Błąd pobierania filmów z kin:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCinemaMovies();
  }, []);

  return (
    <div className="cinemaSection"> 
      <div className="cinemaHeader">
        <h2> Aktualnie w kinach</h2>
      </div>

      {loading ? (
        <p>Ładowanie premier...</p>
      ) : (
        <div className="movieGrid">
          {movies.map((movie) => (
            <Link to={`/details/movie/${movie.id}`} className="detailsLink" key={movie.id}>
            <div key={movie.id} className="movieCard">
              <div className="posterWrapper">
                <img 
                  src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : '/src/assets/no_poster.png'} 
                  alt={movie.title} 
                />
                <div className="cardOverlay">
                   <span className="ratingBadge">⭐ {movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <div className="cardInfo">
                <h4>{movie.title}</h4>
                <p>Premiera: {movie.release_date}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}