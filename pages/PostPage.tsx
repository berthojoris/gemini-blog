
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAppContext } from '../hooks/useAppContext';
import { Post, Comment, User } from '../types';
import ReactMarkdown from 'react-markdown';

const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
    return (
        <div className="flex items-start space-x-4 py-4">
            <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <p className="font-semibold">{comment.author.name}</p>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
                <p className="mt-1 text-gray-700 dark:text-dark-text">{comment.content}</p>
                 {comment.replies && comment.replies.map(reply => (
                    <div key={reply.id} className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                         <CommentComponent comment={reply} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, setPosts, currentUser } = useAppContext();
  const [comment, setComment] = useState('');

  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" />;
  }
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !currentUser) return;
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: currentUser,
      content: comment,
      createdAt: new Date().toISOString(),
      status: 'approved', // Mock: auto-approved
    };

    const updatedPosts = posts.map(p => 
      p.id === post.id ? { ...p, comments: [...p.comments, newComment] } : p
    );
    setPosts(updatedPosts);
    setComment('');
  };

  const approvedComments = post.comments.filter(c => c.status === 'approved');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{post.title}</h1>
              <div className="flex items-center text-sm text-gray-500 dark:text-dark-text-secondary">
                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
                <span>By {post.author.name}</span>
                <span className="mx-2">&middot;</span>
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </header>
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </article>

          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2 dark:border-gray-700">Comments ({approvedComments.length})</h2>
            <div className="space-y-4 divide-y dark:divide-gray-700">
              {approvedComments.map(c => <CommentComponent key={c.id} comment={c} />)}
            </div>

            {currentUser ? (
              <form onSubmit={handleCommentSubmit} className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Add a comment</h3>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-primary-500"
                ></textarea>
                <button type="submit" className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  Post Comment
                </button>
              </form>
            ) : (
              <p className="mt-8 text-center bg-gray-100 dark:bg-dark-surface p-4 rounded-md">
                You must be logged in to post a comment.
              </p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostPage;
