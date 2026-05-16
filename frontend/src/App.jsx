import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000/api/productos';

function App() {
  const [productos, setProductos] = useState([]);
  const [sku, setSku] = useState('');
  const [nombre, setNombre] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => setProductos(json.data ?? []))
      .catch((err) => console.error('Error cargando productos', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevo = { sku, nombre, stock: Number(stock) || 0 };

    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo)
    });

    if (resp.ok) {
      const json = await resp.json();
      setProductos((prev) => [...prev, json.data]);
      setSku('');
      setNombre('');
      setStock('');
    } else {
      alert('Error al crear producto');
    }
  };

  return (
    <div className="app">
      <div className="header">
        <div>
          <h1>Inventario Web</h1>
          <p>Sistema de gestión de productos — Demo CI/CD</p>
        </div>
      </div>

      <div className="card">
        <h2>Nuevo producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>SKU</label>
              <input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="A-001"
                required
              />
            </div>
            <div className="form-group">
              <label>Nombre</label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Cable HDMI"
                required
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Stock inicial</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <button type="submit" className="btn-submit">Agregar producto</button>
        </form>
      </div>

      <div className="card">
        <div className="productos-header">
          <h2>Productos</h2>
          <span className="badge">{productos.length} items</span>
        </div>

        {productos.length === 0 ? (
          <p className="empty">No hay productos aún. Agrega uno arriba.</p>
        ) : (
          productos.map((p) => (
            <div className="producto-item" key={p.id}>
              <div className="producto-info">
                <span className="producto-sku">{p.sku}</span>
                <span className="producto-nombre">{p.nombre}</span>
              </div>
              <span className="producto-stock">Stock: {p.stock}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
