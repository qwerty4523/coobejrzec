import { useState } from 'react'
import '/src/App.css';
import MediaList from '/src/components/MediaList.jsx';
import GenresList from '/src/components/GenresList.jsx';
import PlatformsList from '/src/components/PlatformsList.jsx';
import MovieRandomizer from '/src/components/MovieRandomizer.jsx';
const API_KEY = '1d48f6b616900449f034a74a5e8de3cf';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
function App() {
  const [count, setCount] = useState(0)
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);


const [selectedMedia, setSelectedMedia] = useState('movie');

  const handleMediaChange = (id) => {
    setSelectedMedia(id);
  };

const [selectedPlatforms, setSelectedPlatforms] = useState('all');

  const handlePlatformsChange = (id) => {
    setSelectedPlatforms(id);
  };

  const [selectedGenres, setSelectedGenres] = useState(28);

  const handleGenresChange = (id) => {
    setSelectedGenres(id);
  };
  return (
    <>
      <div className="container">
      <h1>Co obejrzeć?</h1>
      <h2>Wybierz rodzaj:</h2>
      <MediaList onMediaSelect={handleMediaChange} 
      activeMedia={selectedMedia}/>
      <h2>Wybierz platformę:</h2>
       <PlatformsList onPlatformsSelect={handlePlatformsChange} 
      activePlatform={selectedPlatforms}/>
      <h2>Wybierz gatunek:</h2>
       <GenresList onGenreSelect={handleGenresChange} 
      activeGenre={selectedGenres}
      media={selectedMedia}
      />
    <MovieRandomizer 
      media={selectedMedia} 
      platform={selectedPlatforms} 
      genre={selectedGenres} />
      </div>
    </>
  )
}

export default App
