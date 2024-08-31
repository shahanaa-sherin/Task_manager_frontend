import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogout = () => {
    setIsAuthenticated(false);
    // Additional logout logic (e.g., clearing tokens)
  };
  return (
    <Router>
       <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
