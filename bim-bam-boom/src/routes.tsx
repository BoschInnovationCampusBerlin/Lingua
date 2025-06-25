// routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage/UploadPage';
import ComparisonPage from './pages/ComparisonPage';
import SummaryPage from './pages/SummaryPage';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';

const AppRoutes = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/upload" element={<UploadPage/>} />
      <Route path="/comparison" element={<ComparisonPage />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;

