import React from 'react'

const Error = () => {
  return (
    <div className="flex items-start justify-center h-screen bg-gray-100 pt-24">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <p className="text-2xl mt-4 text-gray-600 font-bold">Page Not Found</p>
        <p className="mt-2 text-gray-500 font-semibold">The page you are looking for doesn't exist or has been moved.</p>
        <a href="/" className="mt-6 inline-block px-6 py-2 text-sm font-semibold text-white bg-carrot/85 hover:bg-carrot rounded">
          Go to Homepage
        </a>
      </div>
    </div>
  )
}

export default Error