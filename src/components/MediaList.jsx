const media = [
    { id: 'movie', name: 'Film' },
    { id: 'tv', name: 'Serial' }
  ];
  export default function MediaList({onMediaSelect, activeMedia}) {
    const listMed=media.map(medium => 
      <a 
      key={medium.id}
      href="#"
      onClick={(e)=>{
          e.preventDefault();
          onMediaSelect(medium.id);
        }}
        className={medium.id === activeMedia ? 'mediaItem active' : 'mediaItem'}
        >
       {medium.name}
       </a>
    );

  return (
    <div className="mediaList">{listMed}</div>
  );
}