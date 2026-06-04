import React from 'react';

function Header({ searchTerm, setSearchTerm }) {
  return (
    <div className="header">
      <h1>CarDeal Dashboard</h1>
      <div className="search-bar">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search cars by name or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Header;