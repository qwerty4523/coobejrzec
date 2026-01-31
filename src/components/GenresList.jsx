const movieGenres = [
  { id: 28, name: 'Akcja' },
  { id: 16, name: 'Animacja' },
  { id: 99, name: 'Dokument' },
  { id: 18, name: 'Dramat' },
  { id: 10751, name: 'Familijny' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'Historyczny' },
  { id: 27, name: 'Horror' },
  { id: 35, name: 'Komedia' },
  { id: 80, name: 'Kryminał' },
  { id: 10402, name: 'Musicial' },
  { id: 12, name: 'Przygodowy' },
  { id: 10749, name: 'Romans' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
  { id: 37, name: 'Western' },
  { id: 10752, name: 'Wojenny' }
];
const tvGenres = [
  { id: 10759, name: 'Akcja i przygoda' },
  { id: 16, name: 'Animacja' },
  { id: 99, name: 'Dokument' },
  { id: 18, name: 'Dramat' },
  { id: 10751, name: 'Familijny' },
  { id: 35, name: 'Komedia' },
  { id: 80, name: 'Kryminał' },
  { id: 10764, name: 'Reality show' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 9648, name: 'Tajemnica' },
  { id: 37, name: 'Western' }
];
   export default function GenresList({onGenreSelect, activeGenre, media}) {
    const genres = media === 'movie' ? movieGenres : tvGenres; //wybor gatunkow na podstawie wybranego media (film/serial)
    const listGen=genres.map(genre => 
      <a 
      key={genre.id}
      href="#"
      onClick={(e)=>{
          e.preventDefault();
          onGenreSelect(genre.id);
        }}
        className={genre.id === activeGenre ? 'genreItem active' : 'genreItem'}
        >
       {genre.name}
       </a>
    );

  return (
    <div className="genresList">{listGen}</div>
  )
}