// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Aqui você adicionará outras rotas no futuro, como /login, /denuncia, etc. */}
      </Routes>
    </Router>
  );
}

export default App;