import React from 'react'
import ResumeCard from './ResumeCard'

export default function AllResume() {
  return (
      <div className="flex gap-6">
        <ResumeCard title={'Google Resume 1'} content={"Google resume 1"} />
        <ResumeCard title={'Google Resume final'} content={"Google resume final"} />
        <ResumeCard title={'Google Resume final final'} content={"Google resume final final"} />
      </div>
  )
}
