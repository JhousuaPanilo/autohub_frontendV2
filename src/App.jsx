import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CarTable from './components/CarTable';
import CarForm from './components/CarForm';
import './App.css';
import { useEffect } from 'react';
import api from "./api/axios"

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get(`/cars/`)
        setCars(res.data.allCars)
      } catch(err) {
        console.error("Failed to fetch cars:", err)
      }
    };
    fetchCars();
  }, [refreshKey]);

  const carList = Array.isArray(cars) ? cars : [];

  const filteredCars = carList.filter(car =>
    car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="app">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="main-content">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {activeSection === 'dashboard' && <Dashboard cars={cars} />}
        {activeSection === 'inventory' && (
          <CarTable filter={filteredCars} />
        )}
        {activeSection === 'add-car' && <CarForm onCarAdded={() => setRefreshKey(k => k + 1)} />}
      </div>
    </div>
  );
}

export default App;