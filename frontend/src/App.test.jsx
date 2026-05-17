import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('muestra el título de la aplicación', async () => {
    render(<App />);
    const titulo = await screen.findByText(/Inventario Web/i);
    expect(titulo).toBeInTheDocument();
  });
});
