
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';

const Footer: React.FC = () => {
  const { themeSettings } = useAppContext();
  return (
    <footer className="bg-gray-100 dark:bg-dark-surface border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-dark-text-secondary">
        <p>{themeSettings.footerContent}</p>
      </div>
    </footer>
  );
};

export default Footer;
