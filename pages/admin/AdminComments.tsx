
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Comment, Post } from '../../types';

const AdminComments: React.FC = () => {
  const { posts, setPosts } = useAppContext();

  const allComments = posts.flatMap(post =>
    post.comments.map(comment => ({ ...comment, postTitle: post.title, postId: post.id }))
  );

  const updateCommentStatus = (postId: string, commentId: string, status: 'approved' | 'rejected') => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment =>
            comment.id === commentId ? { ...comment, status } : comment
          ),
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  
  const deleteComment = (postId: string, commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
        const updatedPosts = posts.map(post => {
        if (post.id === postId) {
            return {
            ...post,
            comments: post.comments.filter(comment => comment.id !== commentId),
            };
        }
        return post;
        });
        setPosts(updatedPosts);
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
        case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
        default: return '';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Comments</h1>
      <div className="bg-white dark:bg-dark-surface shadow rounded-lg">
        <div className="divide-y dark:divide-gray-700">
          {allComments.map(comment => (
            <div key={comment.id} className="p-4 flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                    <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full mr-3" />
                    <div>
                        <p className="font-semibold">{comment.author.name}</p>
                        <p className="text-xs text-gray-500">on "{comment.postTitle}"</p>
                    </div>
                </div>
                <p className="text-gray-700 dark:text-dark-text-secondary">{comment.content}</p>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                 <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(comment.status)}`}>
                    {comment.status}
                </span>
                {comment.status !== 'approved' && <button onClick={() => updateCommentStatus(comment.postId, comment.id, 'approved')} className="text-green-600 hover:underline text-sm">Approve</button>}
                {comment.status !== 'rejected' && <button onClick={() => updateCommentStatus(comment.postId, comment.id, 'rejected')} className="text-yellow-600 hover:underline text-sm">Reject</button>}
                <button onClick={() => deleteComment(comment.postId, comment.id)} className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminComments;
