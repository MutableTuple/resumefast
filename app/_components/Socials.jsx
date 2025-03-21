import Link from 'next/link';
import React from 'react'
import { FaLinkedin } from "react-icons/fa";
export default function Socials() {
  return (
    <>
    <p className="mt-4  text-xs text-stone-500">Follow us on our socials</p>
    <div className='flex items-center gap-3 mt-3'>
        <Link href={'https://www.linkedin.com/company/resumefastonline/about/'} target='_blank'>
        <FaLinkedin size={24} color='#0A66C2'/>
        </Link>
    </div>
    </>
  )
}
