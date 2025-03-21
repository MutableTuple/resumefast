'use client'
import { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicy() {
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    dataCollection: true,
    whyStore: false,
    security: false,
    rights: false,
    contact: false
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center p-6">
      <Head>
        <title>Privacy Policy | ResumeFast</title>
        <meta name="description" content="Privacy policy for ResumeFast - learn how we handle your data" />
      </Head>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full bg-white p-8 rounded-lg   border-gray-200"
      >
        <Link href={'/'}>
        <div className='bg-blue-600 w-fit px-3 py-2 rounded-md text-stone-50'>&larr;Go back</div></Link>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-center mb-6 text-blue-600"
        >
          Privacy Policy
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-gray-600 mb-8 text-center"
        >
          At <span className="text-blue-600 font-semibold">ResumeFast</span>, transparency is our priority. 
          Here's how we handle your information.
        </motion.p>

        <div className="space-y-4">
          {/* Data Collection Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <motion.div 
              whileHover={{ backgroundColor: "#f3f4f6" }}
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleSection('dataCollection')}
            >
              <h2 className="text-xl font-semibold text-blue-600 flex items-center">
                <span className="mr-2">🔍</span> Data We Collect
              </h2>
              <motion.span
                animate={{ rotate: expandedSections.dataCollection ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-blue-600"
              >
                +
              </motion.span>
            </motion.div>
            
            <AnimatePresence>
              {expandedSections.dataCollection && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700">
                      We store all resume details you provide to us, including:
                    </p>
                    <ul className="list-disc pl-6 mt-2 text-gray-600">
                      <li>Personal information (name, contact details, address)</li>
                      <li>Professional details (job history, education, certifications)</li>
                      <li>Skills, achievements, and qualifications</li>
                      <li>Portfolio links and references</li>
                      <li>Any additional documents or files you upload</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Why We Store Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <motion.div 
              whileHover={{ backgroundColor: "#f3f4f6" }}
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleSection('whyStore')}
            >
              <h2 className="text-xl font-semibold text-blue-600 flex items-center">
                <span className="mr-2">🚀</span> Why We Store Your Data
              </h2>
              <motion.span
                animate={{ rotate: expandedSections.whyStore ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-blue-600"
              >
                +
              </motion.span>
            </motion.div>
            
            <AnimatePresence>
              {expandedSections.whyStore && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700">
                      Your resume details are stored to:
                    </p>
                    <ul className="list-disc pl-6 mt-2 text-gray-600">
                      <li>Provide seamless access to your documents across devices</li>
                      <li>Enable quick resume updates and modifications</li>
                      <li>Facilitate resume sharing with potential employers</li>
                      <li>Offer personalized resume improvement suggestions</li>
                      <li>Allow you to create multiple resume versions without starting from scratch</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Security Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <motion.div 
              whileHover={{ backgroundColor: "#f3f4f6" }}
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleSection('security')}
            >
              <h2 className="text-xl font-semibold text-blue-600 flex items-center">
                <span className="mr-2">🔐</span> Data Security
              </h2>
              <motion.span
                animate={{ rotate: expandedSections.security ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-blue-600"
              >
                +
              </motion.span>
            </motion.div>
            
            <AnimatePresence>
              {expandedSections.security && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700">
                      We take the security of your data seriously and implement:
                    </p>
                    <ul className="list-disc pl-6 mt-2 text-gray-600">
                      <li>Industry-standard encryption for all stored data</li>
                      <li>Regular security audits and vulnerability testing</li>
                      <li>Strict access controls for our internal team</li>
                      <li>Secure cloud infrastructure with redundant backups</li>
                      <li>Compliance with relevant data protection regulations</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Rights Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <motion.div 
              whileHover={{ backgroundColor: "#f3f4f6" }}
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleSection('rights')}
            >
              <h2 className="text-xl font-semibold text-blue-600 flex items-center">
                <span className="mr-2">⚡</span> Your Control & Rights
              </h2>
              <motion.span
                animate={{ rotate: expandedSections.rights ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-blue-600"
              >
                +
              </motion.span>
            </motion.div>
            
            <AnimatePresence>
              {expandedSections.rights && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700">
                      You maintain full control over your data and have the right to:
                    </p>
                    <ul className="list-disc pl-6 mt-2 text-gray-600">
                      <li>Access all information we hold about you</li>
                      <li>Request modifications to any stored details</li>
                      <li>Download your complete data in standard formats</li>
                      <li>Request complete deletion of your account and associated data</li>
                      <li>Opt out of certain data uses while maintaining core service functionality</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <motion.div 
              whileHover={{ backgroundColor: "#f3f4f6" }}
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleSection('contact')}
            >
              <h2 className="text-xl font-semibold text-blue-600 flex items-center">
                <span className="mr-2">📩</span> Contact Us
              </h2>
              <motion.span
                animate={{ rotate: expandedSections.contact ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-blue-600"
              >
                +
              </motion.span>
            </motion.div>
            
            <AnimatePresence>
              {expandedSections.contact && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700">
                      For questions, concerns, or requests regarding your data:
                    </p>
                    <ul className="list-disc pl-6 mt-2 text-gray-600">
                      <li>Email: <a href="mailto:support@resumefast.online" className="text-blue-600 hover:underline">support@resumefast.online</a></li>
                      <li>Response time: We aim to respond to all inquiries within 48 hours</li>
                      <li>For urgent matters, please indicate "URGENT" in your subject line</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-sm text-gray-500 mt-8 text-center"
        >
          Last updated: March 2025
        </motion.p>
      </motion.div>
    </div>
  );
}