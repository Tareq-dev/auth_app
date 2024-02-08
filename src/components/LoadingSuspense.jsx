import React from 'react'

const LoadingSuspense = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-sky-900 border-sky-400'></div>
    </div>
  )
}

export default LoadingSuspense
