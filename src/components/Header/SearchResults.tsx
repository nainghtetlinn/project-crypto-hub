import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../store/store';

interface SearchResultsProps {
  suggestionIndex: number;
  handleClick: (a: React.MouseEventHandler | any, b: number | string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  suggestionIndex,
  handleClick,
}) => {
  const { result } = useSelector((state: RootState) => state.search);

  return (
    <div className="container mx-auto bg-gray-100 md:rounded md:shadow-md md:shadow-gray-600">
      <ul>
        {result?.map((coin: any, index) => (
          <li
            key={coin?.uuid}
            onClick={e => handleClick(e, coin?.uuid)}
            className={`flex cursor-pointer items-center py-2 px-4 hover:bg-blue-400 hover:text-white ${
              index + 1 === suggestionIndex ? 'bg-blue-400' : ''
            }`}
          >
            <img src={coin?.iconUrl} alt={coin?.name} className="mr-4 w-10" />
            <h5>{coin?.name}</h5>
          </li>
        ))}
      </ul>
    </div>
  );
};
