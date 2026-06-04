import React, { useState } from 'react';
import api from "../api/axios"

function CarForm({ onCarAdded }) {
  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', year: new Date().getFullYear(), status: 'Available'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // form validation
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }
    try {
      await api.post("/cars/create", formData);
      alert('Car added successfully!');
      if (onCarAdded) onCarAdded();
    } catch (err) {
      console.error("Failed to add car:", err);
    }

    //reset form
    setFormData({ name: '', brand: '', price: '', year: new Date().getFullYear(), status: 'Available' });
  };

  const handleAlert = () => {
    alert('This form will submit car data to inventory');
  };

  return (
    <div className="form-container">
      <h2>➕ Register New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label>Car Model *</label><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Mustang GT" /></div>
        <div className="form-group"><label>Brand *</label><input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g., Ford" /></div>
        <div className="form-group"><label>Price *</label><input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="e.g., $55,000" /></div>
        <div className="form-group"><label>Year</label><input type="number" name="year" value={formData.year} onChange={handleChange} /></div>
        <div className="form-group"><label>Status</label><select name="status" value={formData.status} onChange={handleChange}><option>Available</option><option>Sold</option></select></div>
        <div className="action-buttons" style={{ marginTop: '10px' }}>
          <button type="button" className="action-btn" onClick={handleAlert}>ℹ️ Info</button>
          <button type="reset" className="action-btn" onClick={() => setFormData({ name: '', brand: '', price: '', year: new Date().getFullYear(), status: 'Available' })}>⟳ Reset</button>
        </div>
        <button type="submit" className="submit-btn">➕ Add Car to Inventory</button>
      </form>
    </div>
  );
}

export default CarForm;