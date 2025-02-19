import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src="../zafira.png" alt="Cargando" className="w-36 h-36 mb-4" />
      <p className="text-lg text-gray-700">Cargando productos...</p>
    </div>
  )
}

export default Loading
