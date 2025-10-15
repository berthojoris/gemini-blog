
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { ThemeToggle } from './ThemeToggle';

const Header: React.FC = () => {
  const { themeSettings, currentUser, logout } = useAppContext();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (currentUser) {
      if(currentUser.role === 'admin') {
        navigate('/admin');
      } else {
        logout();
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {themeSettings.title}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6 text-sm font-medium">
              <Link to="/" className="text-gray-600 hover:text-primary-600 dark:text-dark-text-secondary dark:hover:text-primary-400">Home</Link>
              <a href="#" className="text-gray-600 hover:text-primary-600 dark:text-dark-text-secondary dark:hover:text-primary-400">About</a>
              <a href="#" className="text-gray-600 hover:text-primary-600 dark:text-dark-text-secondary dark:hover:text-primary-400">Contact</a>
            </nav>
            <ThemeToggle />
            <button
              onClick={handleAuthAction}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {currentUser ? (currentUser.role === 'admin' ? 'Dashboard' : 'Logout') : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
