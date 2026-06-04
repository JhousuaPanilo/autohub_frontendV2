import React, { useState, useEffect } from 'react';

function EditCarModal({ car, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: car.name,
    brand: car.brand,
    price: car.price,
    year: car.year,
    status: car.status,
  });

  useEffect(() => {
    setFormData({
      name: car.name,
      brand: car.brand,
      price: car.price,
      year: car.year,
      status: car.status,
    });
  }, [car]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }
    onSave({ ...car, ...formData });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>✏️ Edit Car</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Car Model *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Mustang GT" />
          </div>
          <div className="form-group">
            <label>Brand *</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g., Ford" />
          </div>
          <div className="form-group">
            <label>Price *</label>
            <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="e.g., $55,000" />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Available</option>
              <option>Sold</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="action-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn" style={{ width: 'auto', marginTop: 0 }}>💾 Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCarModal;
