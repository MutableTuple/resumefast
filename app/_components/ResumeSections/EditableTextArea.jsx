import React from 'react'

export default function EditableTextArea({ value, className, placeholder ,handleBlur , handleChange,isEditing ,setIsEditing}) {
  return isEditing ? (
    <textarea
      autoFocus
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={`border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all p-2 w-full min-h-20 ${className}`}
    />
  ) : (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer px-1 hover:bg-gray-200 rounded-md transition min-h-8"
    >
      {text || <span className="text-gray-400 italic">{placeholder || "Click to edit"}</span>}
    </div>
  );
};
