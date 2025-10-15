import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { Post, PostStatus } from '../../types';
import ReactMarkdown from 'react-markdown';

const GeminiAI = lazy(() => import('../../components/GeminiAI'));

const AdminPostEditor: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { posts, setPosts, currentUser } = useAppContext();

  const [post, setPost] = useState<Partial<Post>>({
    title: '',
    content: '',
    slug: '',
    status: PostStatus.DRAFT,
    categories: [],
    tags: [],
  });
  
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const isNewPost = !slug;

  useEffect(() => {
    if (slug) {
      const existingPost = posts.find(p => p.slug === slug);
      if (existingPost) {
        setPost(existingPost);
      }
    }
  }, [slug, posts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };
  
  const handleListChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'tags' | 'categories') => {
      setPost(prev => ({...prev, [field]: e.target.value.split(',').map(item => item.trim())}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewPost) {
      const newPost: Post = {
        id: `p${Date.now()}`,
        ...post,
        author: currentUser!,
        publishedAt: new Date().toISOString(),
        comments: [],
      } as Post;
      setPosts([newPost, ...posts]);
    } else {
      setPosts(posts.map(p => (p.slug === slug ? (post as Post) : p)));
    }
    navigate('/admin/posts');
  };

  const handleInsertContent = (content: string) => {
    setPost(prev => ({ ...prev, content: (prev.content || '') + '\n\n' + content }));
    setIsAiModalOpen(false);
  };

  const formInputClass = "w-full mt-1 block px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700";
  const formSelectClass = "w-full mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-gray-50 dark:bg-gray-700";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{isNewPost ? 'Create New Post' : 'Edit Post'}</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow">
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <input type="text" name="title" id="title" value={post.title} onChange={handleChange} required className={formInputClass} />
          </div>
          <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="content" className="block text-sm font-medium">Content (Markdown)</label>
                 <button
                  type="button"
                  onClick={() => setIsAiModalOpen(true)}
                  className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Generate with AI
                </button>
              </div>
              <textarea name="content" id="content" value={post.content} onChange={handleChange} rows={15} required className={`${formInputClass} font-mono`}></textarea>
          </div>
          <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
              <div className="prose dark:prose-invert max-w-none p-4 border dark:border-gray-700 rounded-md">
                <ReactMarkdown>{post.content || 'Start typing to see a preview...'}</ReactMarkdown>
              </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="slug" className="block text-sm font-medium mb-1">URL Slug</label>
                <input type="text" name="slug" id="slug" value={post.slug} onChange={handleChange} required className={formInputClass} />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                <select name="status" id="status" value={post.status} onChange={handleChange} className={formSelectClass}>
                    <option value={PostStatus.DRAFT}>Draft</option>
                    <option value={PostStatus.PUBLISHED}>Published</option>
                    <option value={PostStatus.ARCHIVED}>Archived</option>
                </select>
              </div>
               <div>
                <label htmlFor="categories" className="block text-sm font-medium mb-1">Categories (comma-separated)</label>
                <input type="text" name="categories" id="categories" value={post.categories?.join(', ')} onChange={(e) => handleListChange(e, 'categories')} className={formInputClass} />
              </div>
               <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                <input type="text" name="tags" id="tags" value={post.tags?.join(', ')} onChange={(e) => handleListChange(e, 'tags')} className={formInputClass} />
              </div>
            </div>
          </div>
           <button type="submit" className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-lg font-semibold">
              {isNewPost ? 'Create Post' : 'Update Post'}
           </button>
        </div>
      </form>
      <Suspense fallback={null}>
        {isAiModalOpen && <GeminiAI onInsertContent={handleInsertContent} onClose={() => setIsAiModalOpen(false)} />}
      </Suspense>
    </div>
  );
};

export default AdminPostEditor;