"use client";
import React, { useEffect, useRef } from "react";

const EditableField = ({ 
  value = "", 
  onChange, 
  isEditing, 
  className = "", 
  placeholder = "Click to edit...", 
  multiline = false 
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleChange = (e) => onChange(e.target.value);

  return isEditing ? (
    multiline ? (
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleChange}
        className={`border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${className}`}
        placeholder={placeholder}
        rows={2}
        aria-label={placeholder}
      />
    ) : (
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        className={`border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    )
  ) : (
    <span 
      className={`inline-block px-2 py-1 rounded-md cursor-text text-gray-600 hover:bg-gray-100 transition ${value ? "text-black" : "italic text-gray-400"}`} 
      role="textbox" 
      aria-live="polite"
    >
      {value || placeholder}
    </span>
  );
};

export default EditableField;
