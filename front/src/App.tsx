import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Orientacoes from './pages/Orientacoes';
import AlertaRiscos from './pages/AlertaRiscos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orientacoes" element={<Orientacoes />} />
        <Route path="/alerta-riscos" element={<AlertaRiscos />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;


