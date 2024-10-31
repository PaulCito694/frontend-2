import LoginLinks from '@/app/LoginLinks'
import React from 'react'

export const metadata = {
  title: 'Qhalifarma',
}

const Home = () => {
  return (
    <>
      <LoginLinks />
      <div className="py-12">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">Holi</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
