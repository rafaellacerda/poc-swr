import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BalanceList from './pages/BalanceList';
import BalanceDetails from './pages/BalanceDetails';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BalanceList />} />
        <Route path="/balance/:id" element={<BalanceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}