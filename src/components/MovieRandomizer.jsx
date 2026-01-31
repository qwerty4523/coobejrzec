import { useState } from 'react';
import { Link } from 'react-router-dom';
const API_KEY = '1d48f6b616900449f034a74a5e8de3cf';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieRandomizer({ media, platform, genre }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [providers, setProviders] = useState(null);
  
  const drawMovie = async () => {
    setLoading(true);
    setProviders(null);
    setMovie(null); // reset poprzedniego filmu
    setError(null); // reset poprzedniego bledu
    //budowanie adresu URL zapytania do bazy TMDB
    let url = `${BASE_URL}/discover/${media}?api_key=${API_KEY}&language=pl-PL&region=PL&watch_region=PL&sort_by=popularity.desc`;
    // uwzglednienie filmow/seriali ktore sa dostepne na platformach
    url += '&with_watch_monetization_types=flatrate|rent|buy';
    // gatunek
    if (genre) url += `&with_genres=${genre}`;
    
    // platforma
    if (platform !== 'all') url += `&with_watch_providers=${platform}`;
    try {
      const res = await fetch(url); // wyslanie zapytania do TMDB
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        // losowanie jednego filmu
        const randomId = Math.floor(Math.random() * data.results.length);
        const selectedMovie = data.results[randomId];
        setMovie(selectedMovie);
        // pobranie platform dla danego filmu/serialu
        const providersRes = await fetch(
        `${BASE_URL}/${media}/${selectedMovie.id}/watch/providers?api_key=${API_KEY}`
        );
        const providersData = await providersRes.json();
        const resultsPL = providersData.results?.PL;

    if (resultsPL) {
      //wyniki dla subskrypcji, wypozyczenie i zakupu
      const keys = ['flatrate', 'rent', 'buy'];
      const allProviders =keys.flatMap(key => resultsPL[key] || []);

      //usuwanie duplikatow
      const uniqueProviders = Array.from(
        new Map(allProviders.map(p => [p.provider_id, p])).values()
      );
      
      setProviders(uniqueProviders.length > 0 ? uniqueProviders : null);
    } else {
      setProviders(null);
    }
      } else {
        setError("Nie znaleźliśmy nic dla Twoich filtrów. Spróbuj zmienić gatunek lub platformę.");
      }
    } catch (error) {
      setError("Wystąpił błąd podczas pobierania danych. Sprawdź połączenie z internetem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="randomizerSection">
      <button className="randomizeBtn" 
        onClick={drawMovie} 
        disabled={loading}
      >
        {loading ? 'Losowanie...' : 'WYLOSUJ'}
      </button>
      {error && <p className="errorMessage">{error}</p>}
      {movie && (
        <div className="randomResult">
          <Link to={`/details/${media}/${movie.id}`} className="detailsLink">
          <img src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : '/src/assets/no_poster.png'} alt={movie.title || movie.name} />
          </Link>
          <div className="info">
            <Link to={`/details/${media}/${movie.id}`} className="detailsLink">
            <h3>{movie.title || movie.name}</h3>
            </Link>
            <p className="rating">⭐ {movie.vote_average.toFixed(1)}</p>

            {providers && (
              <div className="availableOn">
                <h4>Dostępne na:</h4>
                <div className="platformLogos">
                  {providers.map(p => (
                    <img 
                      key={p.provider_id}
                      src={`https://image.tmdb.org/t/p/original${p.logo_path}`} 
                      alt={p.provider_name}
                      title={p.provider_name}
                      style={{ width: '40px', borderRadius: '8px', marginRight: '10px' }}
                    />
                  ))}
                </div>
              </div>
            )}

            <p className="overview">{movie.overview || "Ten tytuł nie posiada jeszcze opisu w bazie TMDB"}</p>
          </div>
        </div>
      )}
    </div>
  );
}