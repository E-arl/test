import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import broken from './assets/broken.png';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Automatically trigger error if the pathname matches "/ErrorBoundary"
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
        <h1 className="text-4xl font-bold text-black">Something went wrong!</h1>
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

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;