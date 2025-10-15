
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ title: string, value: number | string, link: string, icon: React.ReactNode }> = ({ title, value, link, icon }) => (
    <Link to={link} className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow hover:shadow-lg transition-shadow flex items-center">
      <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300 mr-4">
          {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </Link>
);

const PostIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const CommentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;


const AdminDashboard: React.FC = () => {
    const { posts, currentUser } = useAppContext();
    const totalComments = posts.reduce((acc, post) => acc + post.comments.length, 0);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser?.name}!</h1>
            <p className="text-gray-500 dark:text-dark-text-secondary mb-8">Here's a snapshot of your blog's activity.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Posts" value={posts.length} link="/admin/posts" icon={<PostIcon />} />
                <StatCard title="Total Comments" value={totalComments} link="/admin/comments" icon={<CommentIcon />} />
            </div>

            <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <ul>
                {posts.slice(0, 3).map(post => (
                  <li key={post.id} className="py-3 border-b dark:border-gray-700 last:border-b-0">
                    <p>New Post Published: <Link to={`/post/${post.slug}`} className="text-primary-600 dark:text-primary-400 hover:underline font-semibold">{post.title}</Link></p>
                    <p className="text-sm text-gray-500">{new Date(post.publishedAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;
