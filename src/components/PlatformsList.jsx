 const platforms = [
    { id: 'all', name: 'Wszystkie platformy' },
    { id: '8', name: 'Netflix' },
    { id: '119', name: 'Amazon Prime' },
    { id: '337', name: 'Disney+' },
    { id: '1899', name: 'HBO Max' },
    { id: '350', name: 'Apple TV+' },
    { id: '1773', name: 'SkyShowtime' }
  ];
  export default function PlatformsList({onPlatformsSelect, activePlatform}) {
    const listPlat=platforms.map(platform => 
      <a 
      key={platform.id}
      href="#"
      onClick={(e)=>{
          e.preventDefault();
          onPlatformsSelect(platform.id);
        }}
        className={platform.id === activePlatform ? 'platformItem active' : 'platformItem'}
        >
       {platform.name}
       </a>
    );

  return (
    <div className="platformsList">{listPlat}</div>
  )
}