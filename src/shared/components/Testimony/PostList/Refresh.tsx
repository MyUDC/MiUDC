import React from 'react'

export const Refresh = () => {
  return (
    <div className="z-10 w-full flex justify-center items-center h-16 bg-green text-white">
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </span>
    </div>
  )
}
