
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { useAppContext } from '../hooks/useAppContext';
import { Post, PostStatus } from '../types';

const HomePage: React.FC = () => {
  const { posts, themeSettings } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const publishedPosts = posts.filter(p => p.status === PostStatus.PUBLISHED);

  const filteredPosts = useMemo(() => {
    return publishedPosts
      .filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(post =>
        selectedCategory ? post.categories.includes(selectedCategory) : true
      );
  }, [publishedPosts, searchTerm, selectedCategory]);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    publishedPosts.forEach(post => {
      post.categories.forEach(cat => categories.add(cat));
    });
    return Array.from(categories);
  }, [publishedPosts]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              {themeSettings.title}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-dark-text-secondary sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              {themeSettings.description}
            </p>
          </div>
          
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <select
              value={selectedCategory || ''}
              onChange={e => setSelectedCategory(e.target.value || null)}
              className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              {allCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {filteredPosts.length > 0 ? (
            <div className={`grid gap-8 ${themeSettings.homepageLayout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold">No posts found</h2>
              <p className="text-gray-500 dark:text-dark-text-secondary mt-2">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
