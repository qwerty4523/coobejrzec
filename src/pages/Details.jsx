import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '1d48f6b616900449f034a74a5e8de3cf';
const IMG_BASE = 'https://image.tmdb.org/t/p/original';
const BASE_URL = 'https://api.themoviedb.org/3';
export default function MovieDetails() {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=pl-PL&append_to_response=credits`)
      .then(res => res.json())
      .then(resData => setData(resData));
    fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(resData => {
      const resultsPL = resData.results?.PL;
      if (resultsPL) {
        const keys = ['flatrate', 'rent', 'buy'];
        const allProviders =keys.flatMap(key => resultsPL[key] || []);

        const uniqueProviders = Array.from(
          new Map(allProviders.map(p => [p.provider_id, p])).values()
        );
        setProviders(uniqueProviders.length > 0 ? uniqueProviders : null);
      } else {
        setProviders(null);
      }
    });
      
  }, [type, id]);
  
  if (!data) return <p>Ładowanie...</p>;
  const title = data.title || data.name; //tytul film/serial
  const date = data.release_date || data.first_air_date; // data premiery film/serial
  const duration = data.runtime // czas trwania filmu lub czas trwania odcinka serialu
    ? `${data.runtime} min` 
    : data.episode_run_time && data.episode_run_time[0] 
      ? `${data.episode_run_time[0]} min` 
      : "Brak danych";
  return (
      <div className="detailsContent">
        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={title} className="detailsPoster" />
        <div className="detailsInfo">
          <h1>{title}</h1>
          <p className="tagline">{data.tagline}</p>
          <div className="stats">
            <span>⭐ {data.vote_average.toFixed(1)}</span>
            <span>📅 {date}</span>
            <span>⏱️ {duration}</span>
          </div>
          {!providers && (
           <div className="providersSection">
           <p style={{ color: '#888', fontStyle: 'italic' }}>Tytuł obecnie niedostępny online w Polsce.</p>
            </div>
          )}
          {providers && (
            <div className="providersSection">
              <h3>Dostępne na:</h3>
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
          <p className="overview">{data.overview}</p>
          <h3>Obsada:</h3>
          <p>{data.credits.cast.slice(0, 5).map(c => c.name).join(', ')}</p>
        </div>
      </div>
  );
}