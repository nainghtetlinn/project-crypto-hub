import React from 'react';

interface SkeletonProps {}

export const Skeleton: React.FC<SkeletonProps> = ({}) => {
  return (
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="h-14 animate-pulse rounded bg-gray-300 shadow"></div>
      <div className="h-14 animate-pulse rounded bg-gray-300 shadow"></div>
      <div className="h-14 animate-pulse rounded bg-gray-300 shadow"></div>
      <div className="h-14 animate-pulse rounded bg-gray-300 shadow"></div>
      <div className="h-14 animate-pulse rounded bg-gray-300 shadow"></div>
    </div>
  );
};
