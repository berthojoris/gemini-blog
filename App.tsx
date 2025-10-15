
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminPostEditor from './pages/admin/AdminPostEditor';
import AdminComments from './pages/admin/AdminComments';
import AdminTheme from './pages/admin/AdminTheme';
import { useAppContext } from './hooks/useAppContext';

const App: React.FC = () => {
  const { theme } = useAppContext();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen text-gray-800 bg-gray-50 dark:bg-dark-bg dark:text-dark-text transition-colors duration-300">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/new" element={<AdminPostEditor />} />
          <Route path="posts/edit/:slug" element={<AdminPostEditor />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="theme" element={<AdminTheme />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
