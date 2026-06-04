import React from 'react';

function Sidebar({ activeSection, setActiveSection, isOpen, onToggle }) {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'inventory', icon: '🚗', label: 'Car Inventory' },
    { id: 'add-car', icon: '➕', label: 'Add New Car' },
  ];

  return (
    <>
      <button className="menu-toggle" onClick={onToggle}>
        {isOpen ? '✕' : '☰'}
      </button>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onToggle} />
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo">
          <h2>Auto<span>Hub</span></h2>
          <small>Premium Motors</small>
        </div>
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => { setActiveSection(item.id); onToggle(); }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Sidebar;