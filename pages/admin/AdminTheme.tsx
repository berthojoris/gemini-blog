
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { ThemeSettings } from '../../types';

const AdminTheme: React.FC = () => {
  const { themeSettings, setThemeSettings } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setThemeSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a backend.
    // For this mock, the state is already updated on change.
    alert('Theme settings updated!');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Theme Customization</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Blog Title</label>
              <input type="text" name="title" id="title" value={themeSettings.title} onChange={handleChange} className="w-full form-input" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Blog Description</label>
              <input type="text" name="description" id="description" value={themeSettings.description} onChange={handleChange} className="w-full form-input" />
            </div>
            <div>
                <label htmlFor="homepageLayout" className="block text-sm font-medium mb-1">Homepage Layout</label>
                <select name="homepageLayout" id="homepageLayout" value={themeSettings.homepageLayout} onChange={handleChange} className="w-full form-input">
                    <option value="grid">Grid</option>
                    <option value="list">List</option>
                </select>
            </div>
             <div>
              <label htmlFor="footerContent" className="block text-sm font-medium mb-1">Footer Content</label>
              <input type="text" name="footerContent" id="footerContent" value={themeSettings.footerContent} onChange={handleChange} className="w-full form-input" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTheme;
