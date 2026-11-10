import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Payment from "./pages/Payment";
import Favourites from "./pages/Favourites";
import Reservations from "./pages/Reservations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Payment />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/reservations" element={<Reservations />} />
    </Routes>
  )
}

export default App;