import { useState } from 'react'
import '/src/App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MediaList from '/src/components/MediaList.jsx';
import GenresList from '/src/components/GenresList.jsx';
import PlatformsList from '/src/components/PlatformsList.jsx';
import MovieRandomizer from '/src/components/MovieRandomizer.jsx';
import Sidebar from '/src/components/Sidebar.jsx';
import Home from '/src/pages/home.jsx';
import Trending from '/src/pages/trending.jsx';
import Cinema from '/src/pages/Cinema.jsx';
import Ranking from '/src/pages/Ranking.jsx';
import Details from '/src/pages/Details.jsx';
function App() {

  return (
    <>
   <div className="layout">
      <Sidebar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/trending" element={<Trending />} />
          <Route path="/pages/cinema" element={<Cinema />} />
          <Route path="/pages/ranking" element={<Ranking />} />
          <Route path="/details/:type/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App