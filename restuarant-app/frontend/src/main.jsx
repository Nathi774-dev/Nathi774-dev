import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FavouritesProvider } from './context/FavouriteContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ReservationProvider } from './context/ReservationContext.jsx'
import { MenuProvider } from './context/MenuContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
    <AuthProvider>
      <FavouritesProvider>
        <CartProvider>
          <ReservationProvider>
            <MenuProvider>
              <App />
            </MenuProvider>
          </ReservationProvider>
        </CartProvider>
      </FavouritesProvider>
    </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
