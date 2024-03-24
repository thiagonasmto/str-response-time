import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Aba from './components/AbaOld';
import Vgame from './components/Viewgame';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/aba" element={<Aba visibilidadeM={true} />} />
      <Route path="/vgame" element={<Vgame />} />
    </Routes>
  );
}

export default AppRoutes;
