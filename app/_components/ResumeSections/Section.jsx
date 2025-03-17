import React from 'react'
import { MdAdd } from 'react-icons/md'

export default function Section ({ title, children, onAdd, buttonText,template ,isPrinting}) {
  return (
    <div className="mt-6">
    <div className="flex justify-between items-center mb-2">
      <h3 className={`text-xl font-bold text-gray-800 ${template === 'modern' ? 'border-b-2 border-blue-500' : ''} inline-block`}>{title}</h3>
      {onAdd && !isPrinting && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors print:hidden"
        >
          <MdAdd /> {buttonText || "Add"}
        </button>
      )}
    </div>
    {children}
  </div>
  )
}
