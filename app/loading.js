import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <div className="relative w-16 h-16 border-8 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
