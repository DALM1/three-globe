import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Prehome from './pages/Prehome';
import Home from './pages/Home';

function App() {
  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Prehome />} />
    <Route path="userselect" element={<Home />} />
  </Routes>
</BrowserRouter>

  );
}

export default App;
