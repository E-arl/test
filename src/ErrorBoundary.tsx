import React, { useState, useEffect, ReactNode } from "react";
import broken from './assets/broken.png';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/ErrorBoundary") {
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img 
          src={broken} 
          alt="Unexpected Error" 
          className="mb-6 w-48 h-48 object-cover"
        />
        <h1 className="text-4xl text-center font-bold text-black">Something went wrong!</h1>
        <p className="text-lg text-neutral-800 mt-3">An unexpected error occurred.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 text-teal-900 hover:scale-110 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
