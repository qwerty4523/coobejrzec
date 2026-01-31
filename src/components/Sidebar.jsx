
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from '/src/pages/home.jsx';
export default function Sidebar() {

  return (
    <>
    <div className="sidebar">
        <h2>Coobejrzeć.pl</h2>
        <img src="/src/assets/iconwhite.png" alt="Logo"/>
        <nav className="sidebarNav">
        <Link to="/">Losuj</Link>
        <Link to="/pages/trending">Na czasie</Link>
        <Link to="/pages/cinema">W kinach</Link>
        <Link to="/pages/ranking">Ranking</Link>
        </nav>
    </div>
    </>
  );
}