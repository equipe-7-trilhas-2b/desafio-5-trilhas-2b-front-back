import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import Orientacoes from './pages/Orientacoes';
import Register from './pages/Register';
import AlertaRiscos from './pages/AlertaRiscos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/orientacoes" element={<Orientacoes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/alerta-riscos" element={<AlertaRiscos />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;


