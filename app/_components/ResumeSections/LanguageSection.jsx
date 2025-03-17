'use client'
import React from 'react'
import SectionHeader from './SectionHeader'
import { FaLanguage, FaTrash } from 'react-icons/fa'
import EditableField from './EditableField'

export default function LanguageSection({resume,isEditing,removeItem}) {
  return (
        <section className="mb-8">
             <SectionHeader icon={<FaLanguage />} title="Languages" path="languages" onAdd={isEditing} />
             <div className="grid grid-cols-2 gap-4">
               {resume.languages.map((lang, index) => (
                 <div key={index} className="relative group space-y-1">
                   {isEditing && (
                     <button
                       onClick={() => removeItem('languages', index)}
                       className="absolute -right-6 top-0 text-red-500 hover:text-red-600"
                     >
                       <FaTrash />
                     </button>
                   )}
                   <EditableField
                     value={lang.language}
                     onChange={(v) => handleArrayUpdate('languages', index, { ...lang, language: v })}
                     className="font-medium"
                     placeholder="Language"
                   />
                   <EditableField
                     value={lang.proficiency}
                     onChange={(v) => handleArrayUpdate('languages', index, { ...lang, proficiency: v })}
                     className="text-sm text-gray-600"
                     placeholder="Proficiency level"
                   />
                 </div>
               ))}
             </div>
           </section>
  )
}
