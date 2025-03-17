import React from "react";
import { AiFillEdit } from "react-icons/ai";

export default function ResumeCard({ title, content }) {
  return (
    <div className="relative h-96 w-80 bg-stone-100 shadow-md border border-stone-300 p-6 rounded-xl flex flex-col gap-4">
      {/* Paper-like lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-200/50 to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 border-stone-300">
        <h1 className="font-bold text-2xl text-stone-700">{title}</h1>
        <span className="text-stone-500 hover:text-stone-700 cursor-pointer transition">
          <AiFillEdit size={22} />
        </span>
      </div>

      {/* Content */}
      <p className="text-stone-600 text-base leading-relaxed flex-1">
        {content}
      </p>

      {/* Bottom "paper-like" skeleton lines */}
      <div className="space-y-2 mt-auto">
        <div className="h-3 bg-stone-300/50 rounded w-full"></div>
        <div className="h-3 bg-stone-300/40 rounded w-3/4"></div>
      </div>
    </div>
  );
}
