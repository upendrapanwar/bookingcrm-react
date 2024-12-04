import React, { useState, useEffect } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleGlobalError = (error) => {
      console.error('Global Error:', error);
      // You can handle or log the error here
      setHasError(true);
    };

    // Add global error event listener
    window.addEventListener('error', handleGlobalError);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []); // Empty dependency array ensures that this effect runs only once

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
}

export default ErrorBoundary;