
import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';

const AdminLayout: React.FC = () => {
  const { currentUser, logout } = useAppContext();

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-primary-600 text-white'
        : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark-bg">
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-dark-surface border-r dark:border-gray-700">
        <div className="flex flex-col h-full">
            <div className="h-16 flex items-center justify-center px-4 border-b dark:border-gray-700">
                <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">Admin Panel</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <NavLink to="/admin" end className={navLinkClasses}>Dashboard</NavLink>
                <NavLink to="/admin/posts" className={navLinkClasses}>Posts</NavLink>
                <NavLink to="/admin/comments" className={navLinkClasses}>Comments</NavLink>
                <NavLink to="/admin/theme" className={navLinkClasses}>Theme</NavLink>
            </nav>
            <div className="p-4 border-t dark:border-gray-700">
                 <div className="flex items-center space-x-3 mb-4">
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold text-sm">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                 </div>
                <button onClick={logout} className="w-full text-left text-sm px-4 py-2 rounded-lg text-gray-600 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700">
                    Logout
                </button>
            </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
