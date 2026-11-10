import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FavouritesProvider } from './context/FavouriteContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ReservationProvider } from './context/ReservationContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <FavouritesProvider>
        <CartProvider>
          <ReservationProvider>
            <App />
          </ReservationProvider>
        </CartProvider>
      </FavouritesProvider>
    </StrictMode>,
  </BrowserRouter>
)
