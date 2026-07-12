import { Routes, Route } from "react-router-dom";
import WebDev from "./pages/WebDev";
import Home from "./pages/Home";
import ML from "./pages/ML";
import Robotics from "./pages/Robotics";
import GameDev from "./pages/GameDev";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/webdev" element={<WebDev />}/>
        <Route path="/ai-ml" element={<ML />}/>
        <Route path="/robots" element={<Robotics />} />
        <Route path="/gamedev" element={<GameDev />}/>
      </Routes>
    </div>
  );
}

export default App;