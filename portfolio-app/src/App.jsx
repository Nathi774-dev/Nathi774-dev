import { Routes, Route } from "react-router-dom";
import WebDev from "./pages/WebDev";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/webdev" element={<WebDev />}/>
      </Routes>
    </div>
  );
}

export default App;
