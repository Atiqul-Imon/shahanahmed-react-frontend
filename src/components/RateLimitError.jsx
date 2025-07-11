import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

const RateLimitError = ({ message, retryAfter, onRetry }) => {
  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else if (seconds < 3600) {
      const minutes = Math.ceil(seconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      const hours = Math.ceil(seconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Rate Limit Exceeded
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p className="mb-2">{message}</p>
            {retryAfter && (
              <div className="flex items-center text-xs text-red-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>Please try again in {formatTime(retryAfter)}</span>
              </div>
            )}
          </div>
          {onRetry && (
            <div className="mt-3">
              <button
                onClick={onRetry}
                className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateLimitError; 