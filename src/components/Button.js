import { CircularProgress } from '@mui/material'
import React from 'react'

const Button = ({ type = 'button', className, loading, ...props }) => {
  return (
    <div className="flex items-center gap-4">
      <button
        type={type}
        disabled={loading}
        className={`${className} inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
        {...props}
      />
      {loading && <CircularProgress size={24} />}
    </div>
  )
}

export default Button
