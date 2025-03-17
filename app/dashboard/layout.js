import React from "react";
import Sidebar from "../_components/Sidebar";

export default function layout({ children }) {
  return (
    <div className="flex min-h-screen w-full  ">
      {/* <Sidebar /> */}
      <main className={`flex-1  ml-16`}>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
