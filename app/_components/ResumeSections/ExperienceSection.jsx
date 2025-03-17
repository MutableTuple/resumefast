import React from 'react'
import Section from './Section'
import EditableField from './EditableField'
import { MdDelete } from 'react-icons/md'

export default function ExperienceSection({experiences, addExperience, template, isPrinting}) {
  return (
     <Section title="Professional Experience" onAdd={addExperience} buttonText="Add Experience">
             {experiences.map((exp) => (
               <div key={exp.id} className={`mb-4 ${template === 'modern' ? 'pl-2 border-l-2 border-gray-200' : ''} group relative`}>
                 <div className="flex justify-between items-start">
                   <div className="flex-1">
                     <div className={`text-lg font-semibold ${template === 'classic' ? 'text-gray-800' : ''}`}>
                       <EditableField value={exp.position} placeholder="Position" />
                     </div>
                     <div className={`flex justify-between text-sm ${template === 'minimal' ? 'text-gray-700' : ''}`}>
                       <span className="font-medium text-gray-700">
                         <EditableField value={exp.company} placeholder="Company" />
                       </span>
                       <span className="text-gray-500">
                         <EditableField value={exp.period} placeholder="Time Period" />
                       </span>
                     </div>
                     <div className="mt-1 text-sm text-gray-600">
                       <EditableTextArea value={exp.description} placeholder="Job description and achievements" />
                     </div>
                   </div>
                   {!isPrinting && (
                     <button 
                       onClick={() => removeExperience(exp.id)} 
                       className="text-red-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                     >
                       <MdDelete />
                     </button>
                   )}
                 </div>
               </div>
             ))}
           </Section>
  )
}
