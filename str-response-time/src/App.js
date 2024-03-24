import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes'; // Importe as rotas definidas
import Aba from './components/AbaOld'; // Importe o componente Aba

function App() {
  return (
    <Router>
      <div>
        <Aba visibilidadeM={true} /> {/* Renderize o componente Aba diretamente */}
        <Routes /> {/* Renderize as outras rotas */}
      </div>
    </Router>
  );
}

export default App;
