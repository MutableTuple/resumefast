'use client';

import React, { useState, useEffect } from 'react';
import { FaCode, FaBug, FaRocket, FaInfoCircle } from 'react-icons/fa';

import { supabase } from '../_lib/supabase';
import Link from 'next/link';
// Supabase client setup


// Icon mapping for different change types
const typeIcons = {
  feature: FaRocket,
  bugfix: FaBug,
  improvement: FaCode,
  note: FaInfoCircle
};

export default function ChangelogPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChangelog() {
      try {
        const { data, error } = await supabase
          .from('changelog')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setEntries(data || []);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchChangelog();
  }, []);

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
        Error loading changelog: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
               <Link href={'/'}>
               <div className='bg-blue-600 w-fit px-3 py-2 rounded-md text-stone-50'>&larr;Go back</div></Link>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Changelog
      </h1>
      
      <div className="space-y-6">
        {entries.map((entry) => {
          const Icon = typeIcons[entry.type];
          
          return (
            <div 
              key={entry.id} 
              className="bg-white border-b border-b-stone-100 p-6 border-l-4 transition-shadow duration-300"
              style={{
                borderLeftColor: {
                  feature: '#10B981',
                  bugfix: '#EF4444',
                  improvement: '#3B82F6',
                  note: '#6366F1'
                }[entry.type]
              }}
            >
              <div className="flex items-center mb-3">
                {/* <Icon 
                  className={`mr-3 text-xl ${
                    {
                      feature: 'text-green-500',
                      bugfix: 'text-red-500', 
                      improvement: 'text-blue-500',
                      note: 'text-indigo-500'
                    }[entry.type]
                  }`} 
                /> */}
                <h2 className="text-xl font-semibold text-gray-800">
                  {entry.version}
                </h2>
                <span className="ml-auto text-sm text-gray-500">
                  {new Date(entry.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <p className="text-gray-600">
                {entry.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}