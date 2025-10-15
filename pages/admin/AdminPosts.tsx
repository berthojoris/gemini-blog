
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { Post, PostStatus } from '../../types';

const AdminPosts: React.FC = () => {
  const { posts, setPosts } = useAppContext();

  const deletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };
  
  const getStatusClass = (status: PostStatus) => {
    switch (status) {
        case PostStatus.PUBLISHED: return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        case PostStatus.DRAFT: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        case PostStatus.ARCHIVED: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        default: return '';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Posts</h1>
        <Link to="/admin/posts/new" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          New Post
        </Link>
      </div>
      <div className="bg-white dark:bg-dark-surface shadow rounded-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Author</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {posts.map(post => (
              <tr key={post.id}>
                <td className="p-4">{post.title}</td>
                <td className="p-4">{post.author.name}</td>
                <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(post.status)}`}>
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                </td>
                <td className="p-4 text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</td>
                <td className="p-4 space-x-2">
                  <Link to={`/admin/posts/edit/${post.slug}`} className="text-primary-600 hover:underline">Edit</Link>
                  <button onClick={() => deletePost(post.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPosts;
