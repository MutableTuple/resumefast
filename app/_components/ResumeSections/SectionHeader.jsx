import React from "react";
import { FaPlus } from "react-icons/fa";

export default function SectionHeader({ icon, title, onAdd, path, isEditing }) {
  return (
    <h3 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-4 flex items-center">
      {icon} <span className="ml-2">{title}</span>
      {isEditing && onAdd && (
        <button
          onClick={() => onAdd(path)}
          className="ml-auto text-green-500 hover:text-green-600"
        >
          <FaPlus />
        </button>
      )}
    </h3>
  );
}
