import React from 'react';

interface StatsProps {
  title: string;
  value: number | string;
  icon: any;
}

export const Stats: React.FC<StatsProps> = ({ title, value, icon }) => {
  return (
    <div className="rounded bg-gray-100 p-2 shadow">
      <div className="flex items-center">
        <span className="mr-4 text-xl md:text-3xl">{icon}</span>
        <div className="flex w-full items-center justify-between">
          <h5 className="text-gray-700">{title}</h5>
          <h5 className="font-medium">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h5>
        </div>
      </div>
    </div>
  );
};
