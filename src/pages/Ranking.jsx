import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const API_KEY = '1d48f6b616900449f034a74a5e8de3cf';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function Ranking() {
  const [items, setItems] = useState([]);
  const [mediaType, setMediaType] = useState('movie');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      try {
    //najlepiej oceniane filmy lub seriale
    const res = await fetch(
      `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}` +
      `&language=pl-PL` +
      `&sort_by=vote_average.desc` + 
      `&vote_count.gte=3000` + //filmy i seriale z min. 3000 glosow
      `&page=1`
    );
    const data = await res.json();
    setItems(data.results || []);
      } catch (error) {
        console.error("Błąd pobierania rankingu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, [mediaType]);

  return (
    <div className="rankingSection">
      <div className="rankingHeader">
        <h2>Światowy Ranking</h2>
        <p>Najlepiej oceniane produkcje według społeczności TMDB</p>
        
        <div className="filterButtons">
          <button className={mediaType === 'movie' ? 'active' : ''} 
          onClick={() => setMediaType('movie')}>
          Filmy
          </button>
          <button className={mediaType === 'tv' ? 'active' : ''} 
          onClick={() => setMediaType('tv')}>
          Seriale
          </button>
        </div>
      </div>
      {loading ? (<p className="loadingText">Generowanie listy ...</p>) : 
      (
      <div className="movieGrid">
          {items.slice(0, 20).map((item, index) => (
            <Link to={`/details/${mediaType}/${item.id}`} className="detailsLink" key={item.id}>
              <div className="movieCard">
                <div className="posterWrapper">
                  <div className="rankNumber">{index + 1}</div>
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
                  <p>Głosów: {item.vote_count.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}