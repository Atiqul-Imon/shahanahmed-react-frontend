import React from "react";

const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        
        {/* Animated ring */}
        <div className={`${sizeClasses[size]} border-4 border-transparent border-t-primary-500 rounded-full animate-spin`}></div>
        
        {/* Inner dot */}
        <div className="absolute inset-2 bg-primary-500 rounded-full animate-pulse"></div>
      </div>
      
      {text && (
        <p className="mt-4 text-gray-600 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

