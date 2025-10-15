
import { Post, User, Comment, PostStatus, ThemeSettings } from './types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://picsum.photos/id/1011/100/100', role: 'admin' },
  { id: 'u2', name: 'Bob Williams', email: 'bob@example.com', avatar: 'https://picsum.photos/id/1012/100/100', role: 'user' },
  { id: 'u3', name: 'Charlie Brown', email: 'charlie@example.com', avatar: 'https://picsum.photos/id/1013/100/100', role: 'user' },
];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    author: mockUsers[1],
    content: 'This is an amazing article! Really insightful.',
    createdAt: '2023-10-26T10:00:00Z',
    status: 'approved',
    replies: [
      { id: 'c3', author: mockUsers[0], content: 'Glad you liked it, Bob!', createdAt: '2023-10-26T11:00:00Z', status: 'approved' },
    ],
  },
  { id: 'c2', author: mockUsers[2], content: 'I have a question about the second paragraph...', createdAt: '2023-10-26T12:30:00Z', status: 'pending' },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    slug: 'getting-started-with-react-hooks',
    title: 'Getting Started with React Hooks',
    excerpt: 'A comprehensive guide to understanding and using React Hooks for state management and side effects in your functional components.',
    content: `
# Getting Started with React Hooks

React Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

## The Motivation

Hooks solve a wide variety of seemingly unconnected problems in React that we’ve encountered over five years of writing and maintaining tens of thousands of components. Whether you’re learning React, use it daily, or even prefer a different library with a similar component model, you might recognize some of these problems.

### useState

\`\`\`jsx
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

This is the most basic hook and is the one you'll use most often. It's a way to add state to your functional components.
    `,
    author: mockUsers[0],
    publishedAt: '2023-10-26T09:00:00Z',
    categories: ['React', 'JavaScript'],
    tags: ['hooks', 'state', 'tutorial'],
    comments: mockComments,
    status: PostStatus.PUBLISHED,
  },
  {
    id: 'p2',
    slug: 'a-deep-dive-into-tailwind-css',
    title: 'A Deep Dive into Tailwind CSS',
    excerpt: 'Explore the utility-first CSS framework that’s taking the web development world by storm. Learn how to build beautiful, custom designs without leaving your HTML.',
    content: `
# A Deep Dive into Tailwind CSS

Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.

## Core Concepts

The main idea behind Tailwind is that instead of writing custom CSS to style your components, you use a set of pre-defined utility classes directly in your markup.

- **Responsive Design**: Use variants like \`md:\` and \`lg:\` to build responsive layouts.
- **Dark Mode**: Tailwind has built-in support for dark mode.
- **Extensibility**: Customize everything from colors to spacing.
    `,
    author: mockUsers[0],
    publishedAt: '2023-10-24T14:00:00Z',
    categories: ['CSS', 'Web Development'],
    tags: ['tailwindcss', 'design', 'frontend'],
    comments: [],
    status: PostStatus.PUBLISHED,
  },
  {
    id: 'p3',
    slug: 'mastering-typescript-for-large-scale-apps',
    title: 'Mastering TypeScript for Large-Scale Apps',
    excerpt: 'TypeScript can bring order to chaos in large JavaScript projects. This post covers advanced patterns and best practices for maintainable and scalable code.',
    content: `
# Mastering TypeScript

TypeScript enhances JavaScript by adding types. For large applications, this is a game-changer.
    `,
    author: mockUsers[1],
    publishedAt: '2023-10-20T11:00:00Z',
    categories: ['TypeScript', 'JavaScript'],
    tags: ['types', 'scalability', 'best-practices'],
    comments: [],
    status: PostStatus.DRAFT,
  },
];

export const mockThemeSettings: ThemeSettings = {
  title: "Gemini's Thoughts",
  description: "A blog about modern web development, AI, and everything in between.",
  logo: "/logo.svg",
  lightColors: { primary: "#3b82f6", background: "#f9fafb", text: "#111827" },
  darkColors: { primary: "#60a5fa", background: "#1a1a1a", text: "#f0f0f0" },
  homepageLayout: 'grid',
  footerContent: "© 2024 Gemini's Thoughts. All rights reserved."
}
