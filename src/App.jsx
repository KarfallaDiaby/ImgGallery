import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import ImageGallery from './components/ImageGallery';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Composant pour conditionnellement afficher la NavBar
const Layout = ({ children, onSearch, onThemeSwitch, theme }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  
  return (
    <>
      {!isAuthPage && <NavBar onSearch={onSearch} onThemeSwitch={onThemeSwitch} theme={theme} />}
      <div className={!isAuthPage ? 'pt-20' : ''}>
        {children}
      </div>
    </>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleThemeSwitch = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout onSearch={handleSearch} onThemeSwitch={handleThemeSwitch} theme={theme}>
                <Routes>
                  <Route
                    path="/"
                    element={<ImageGallery searchQuery={searchQuery} page={page} setPage={setPage} />}
                  />
                  <Route path="/profile" element={<div className="text-center py-8">Page de profil (à implémenter)</div>} />
                  <Route path="/upload" element={<div className="text-center py-8">Page d'upload (à implémenter)</div>} />
                </Routes>
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}