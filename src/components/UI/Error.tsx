import React from 'react';

interface ErrorProps {
  errorMsg: any;
}

export const Error: React.FC<ErrorProps> = ({ errorMsg }) => {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-bold">{errorMsg?.message}</h1>
      <h2>{errorMsg?.response?.data?.message}</h2>
    </div>
  );
};
