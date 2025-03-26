'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTag, FaClock, FaUser } from 'react-icons/fa';
import { supabase } from '../_lib/supabase';

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        let query = supabase
          .from('blogs')
          .select('*')
          .order('published_at', { ascending: false });

        if (selectedTag) {
          query = query.contains('tags', [selectedTag]);
        }

        const { data, error } = await query;

        if (error) throw error;
        setBlogs(data || []);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [selectedTag]);

  // Extract unique tags
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        Error loading blogs: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Our Blog
        </h1>
        <div className="flex justify-center flex-wrap gap-2 mb-6">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`
                px-3 py-1 rounded-full text-sm transition-all
                ${selectedTag === tag 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                }
              `}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.5
            }}
            className="bg-white shadow-lg rounded-xl overflow-hidden 
              transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            {blog.cover_image && (
              <div className="relative h-48 w-full">
                <img 
                  src={blog.cover_image} 
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <Link href={`/blog/${blog.slug}`}>
                <h2 className="text-xl font-bold text-gray-800 mb-2 
                  hover:text-blue-600 transition-colors">
                  {blog.title}
                </h2>
              </Link>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {blog.excerpt}
              </p>
              
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  {blog.author}
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  {new Date(blog.published_at).toLocaleDateString()}
                </div>
              </div>
{/*               
              <div className="mt-4 flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-2 py-1 
                      rounded-full text-xs flex items-center"
                  >
                    <FaTag className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div> */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}