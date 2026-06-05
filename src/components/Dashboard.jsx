import React, { useEffect, useState } from 'react';
import api from "../api/axios"


function Dashboard() {
  const [ cars, setCars ] = useState([]);
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
  }, []);
  const carList = Array.isArray(cars) ? cars : [];
  const availableCars = carList.filter(car => car.status === 'Available').length;
  const totalValue = carList.reduce((acc, car) => {
      const priceString = car?.price || ""; 
      const priceNum = parseInt(priceString.replace(/[^0-9]/g, '')) || 0;
      return acc + priceNum;
    }, 0);
  const stats = [
    { title: 'Total Cars', value: carList.length, icon: '🚙', color: '#ff6b6b' },
    { title: 'Available', value: availableCars, icon: '✅', color: '#4caf50' },
    { title: 'Sold', value: carList.length - availableCars, icon: '💰', color: '#ff9800' },
    { title: 'Inventory Value', value: `$${totalValue.toLocaleString()}`, icon: '💵', color: '#2196f3' },
  ];

  const recentCars = carList.slice(-3);

  return (
    <div>
      <div className="dashboard-stats">
        {stats.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-number">{stat.value}</div>
            </div>
            <div className="stat-icon">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="recent-section">
        <h3>📋 Recently Added Vehicles</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr><th>Model</th><th>Brand</th><th>Price</th><th>Status</th></tr>
            </thead>
            <tbody>
              {recentCars.length > 0 ? (
                recentCars.map((car) => (
                  <tr key={car?.id}>
                    <td>{car.name}</td><td>{car.brand}</td><td>${parseInt(car.price).toLocaleString()}</td>
                    <td><span className={`status-badge status-${car.status === 'Available' ? 'available' : 'sold'}`}>{car.status}</span></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" style={{ textAlign: 'center' }}>No cars in inventory</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
