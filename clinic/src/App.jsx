import './App.css';
import Dashboard from './pages/Dashboard.jsx';
import Employees from './pages/Employees.jsx'; // Add this import
import PatientRecords from './pages/PatientRecords.jsx';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} /> 
        <Route path="/patients" element={<PatientRecords />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;