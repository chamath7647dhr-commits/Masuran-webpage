import { useState } from 'react';
import './index.css';

export default function SpiceStore() {
  const currencyFormatter = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
  });

  const [spices] = useState([
    { id: 1, name: 'Masuran Jaffna Roasted Curry Powder', origin: 'Jaffna, Sri Lanka', price: 280.0, stock: 'In Stock' },
    { id: 2, name: 'Masuran Jaffna Curry Powder', origin: 'Jaffna, Sri Lanka', price: 240.0, stock: 'Low Stock' },
    { id: 3, name: 'Masuran Turmeric Powder', origin: 'Sri Lanka', price: 320.0, stock: 'In Stock' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    spice: 'Masuran Jaffna Roasted Curry Powder',
    quantity: 1,
    address: '',
  });

  const getStockStatusClass = (stockLabel) => {
    if (stockLabel.toLowerCase().includes('low stock')) return 'lowStock';
    if (stockLabel.toLowerCase().includes('out of stock')) return 'outOfStock';
    return 'inStock';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your order, ${formData.name}! We've received your request.`);
  };

  return (
    <div className="mainContainer">
      <header>
        <h1 style={{ color: 'var(--primary)', textAlign: 'center' }}>Masuran Products</h1>
        <p style={{ textAlign: 'center', color: 'var(--gray-text)' }}>Home made premium spices for household use and commercial use</p>
      </header>

      <section className="stockContainer">
        <h2 className="sectionTitle">Current Available Stock</h2>
        <div className="stockGrid">
          {spices.map((spice) => (
            <div key={spice.id} className="spiceCard">
              <h3 className="spiceName">{spice.name}</h3>
              <p className="spiceOrigin">Origin: {spice.origin}</p>
              <p className="spicePrice">{currencyFormatter.format(spice.price)} / 100g</p>
              <span className={`stockStatus ${getStockStatusClass(spice.stock)}`}>
                {spice.stock}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="orderContainer">
        <h2 className="sectionTitle">Place Your Order</h2>
        <form onSubmit={handleSubmit} className="orderForm">
          <div className="formRow">
            <div className="formGroup">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="formRow">
            <div className="formGroup">
              <label htmlFor="spice">Select Spice</label>
              <select id="spice" name="spice" value={formData.spice} onChange={handleChange}>
                {spices.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} - {currencyFormatter.format(s.price)}
                  </option>
                ))}
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="quantity">Quantity (packs)</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="formGroup">
            <label htmlFor="address">Shipping Address</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              placeholder="Enter delivery address..."
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btnSubmit">
            Submit Order
          </button>
        </form>
      </section>
    </div>
  );
}