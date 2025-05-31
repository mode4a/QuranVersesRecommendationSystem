import React from 'react';

interface LoadingIndicatorProps {
  size: 'small' | 'large';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    large: 'w-12 h-12 border-4'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full border-t-emerald-500 border-r-emerald-500 border-b-emerald-200 border-l-emerald-200 animate-spin`}></div>
  );
};

export default LoadingIndicator;