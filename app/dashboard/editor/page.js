import EditableResume from "@/app/_components/EditableResume";
import React from "react";
import { Poppins } from "next/font/google";

// Load Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Choose the weights you need
  variable: "--font-poppins" // Set a CSS variable
});

export default function Page() {
  return (
    <div className={poppins.className + " font-poppins"}>
      <EditableResume />
    </div>
  );
}
