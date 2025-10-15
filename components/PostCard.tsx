import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
       <a href={`/#/post/${post.slug}`} className="flex flex-col flex-grow group">
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center mb-4 text-sm text-gray-500 dark:text-dark-text-secondary">
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full mr-3" />
            <span>{post.author.name}</span>
            <span className="mx-2">&middot;</span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-4 flex-grow">{post.excerpt}</p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-700/20 mt-auto">
          <span className="font-semibold text-primary-600 dark:text-primary-400 group-hover:underline">
            Read more &rarr;
          </span>
        </div>
      </a>
    </article>
  );
};

export default PostCard;