import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const API_KEY = '1d48f6b616900449f034a74a5e8de3cf';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function Trending() {
  const [items, setItems] = useState([]);
  const [mediaType, setMediaType] = useState('movie');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        //najpopularnijesze filmy lub seriale dnia
        const res = await fetch(
          `${BASE_URL}/trending/${mediaType}/day?api_key=${API_KEY}&language=pl-PL`
        );
        const data = await res.json();
        setItems(data.results || []);
      } catch (error) {
        console.error("Błąd podczas pobierania filmów:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [mediaType]);

  return (
    <div className="trendingSection">
      <div className="trendingHeader">
        <h2>Na czasie</h2>
        <p>Najbardziej popularne filmy i seriale dnia</p>
        <div className="filterButtons">
          <button 
            className={mediaType === 'movie' ? 'active' : ''} 
            onClick={() => setMediaType('movie')}>
            Filmy
          </button>
          <button 
            className={mediaType === 'tv' ? 'active' : ''} 
            onClick={() => setMediaType('tv')}>
            Seriale
          </button>
        </div>
      </div>

      {loading ? (<p className="loadingText">Ładowanie filmów...</p>) : 
      (
        <div className="movieGrid">
          {items.map((item) => (
            <Link to={`/details/${mediaType}/${item.id}`} className="detailsLink" key={item.id}>
            <div key={item.id} className="movieCard">
              <div className="posterWrapper">
                <img 
                  src={item.poster_path ? `${IMG_BASE}${item.poster_path}` : '/src/assets/no_poster.png'} 
                  alt={item.title || item.name} 
                />
                <div className="cardOverlay">
                  <span className="ratingBadge">⭐ {item.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <div className="cardInfo">
                <h4>{item.title || item.name}</h4>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}