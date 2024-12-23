import React from 'react'
import sad from './assets/sad.png'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      <img 
          src={sad} 
          alt="404 not found" 
          className="mb-6 w-48 h-48 object-cover"
        />
        <h1 className="text-4xl font-bold mb-4 text-black">404 - Page Not Found</h1>
        <p className="text-lg text-neutral-700">
          Sorry, the page you are looking for does not exist.</p>
          <button 
        className="px-6 py-3 text-teal-900 hover:scale-110 underline"
        onClick={() => window.location.href = '/'}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage