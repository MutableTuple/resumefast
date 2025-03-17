"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiSettings,
  FiUser,
  FiMessageSquare,
  FiFolder,
  FiDatabase,
  FiEdit,
  FiGrid,
  FiPaperclip,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const pathname = usePathname();

  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 72 },
  };

  const menuItems = [
    { icon: FiHome, text: "Dashboard", href: "/dashboard" },
    { icon: FiPaperclip, text: "My Resume", href: "/dashboard/resume" },
    { icon: FiEdit, text: "Resume Editor", href: "/dashboard/editor" },
    { icon: FiMessageSquare, text: "SQL Editor", href: "/sql" },
    { icon: FiFolder, text: "Storage", href: "/storage" },
    { icon: FiUser, text: "Authentication", href: "/auth" },
    { icon: FiSettings, text: "Settings", href: "/settings" },
  ];

  return (
    <motion.div
      className="h-screen bg-white fixed left-0 top-0 z-10 border-r border-gray-200/50 flex-shrink-0"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      initial="collapsed"
      transition={{ type: "spring", stiffness: 180, damping: 15 }}
      onMouseEnter={() => {
        if (hoverTimeout) clearTimeout(hoverTimeout); // Clear any pending timeout
        setIsExpanded(true);
      }}
      onMouseLeave={() => {
        const timeout = setTimeout(() => setIsExpanded(false), 300); // Delay collapse
        setHoverTimeout(timeout);
      }}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200/50">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded-logo"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.1 }}
              className="font-semibold text-lg text-gray-900"
            >
              Dashboard
            </motion.div>
          ) : (
            <motion.div
              key="collapsed-logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="w-9 h-9 bg-gray-600 rounded-lg flex items-center justify-center shadow-sm"
            >
              <span className="text-white text-sm font-medium">D</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="py-4 px-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={index}
              className={`flex items-center px-3 py-2 rounded-lg group relative transition-all duration-150 ${
                isActive
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-900 hover:bg-gray-300"
              }`}
            >
              <div
                className={`flex items-center w-7 h-7 ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-700 group-hover:text-gray-900"
                }`}
              >
                <item.icon className="text-[1.2rem]" />
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.1 }}
                    className="ml-3 font-medium text-sm"
                  >
                    {item.text}
                  </motion.span>
                )}
              </AnimatePresence>

              {!isExpanded && (
                <motion.div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  {item.text}
                </motion.div>
              )}

              {isActive && !isExpanded && (
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gray-600 rounded-l-md"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.1 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Sidebar;
