import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { SearchResults } from './SearchResults';
import { RootState } from '../../store/store';
import { updateQuery } from '../../store/searchReducer';

interface SearchFieldProps {
  closeSearch?: () => void;
  handleClick: (a: React.MouseEventHandler | any, b: number | string) => void;
  handleKeyDown: React.KeyboardEventHandler;
  suggestionIndex: number;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  closeSearch,
  handleClick,
  handleKeyDown,
  suggestionIndex,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const { query } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    dispatch(updateQuery(e.target.value.toLowerCase()));
  };

  return (
    <>
      <div className="h-[100vh]">
        <div className="flex items-center justify-between bg-blue-900">
          <button onClick={closeSearch} className="m-2 p-2 text-xl text-white">
            <AiOutlineArrowLeft />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="mr-4 inline-block w-full bg-transparent py-2 text-white focus:outline-none"
          />
        </div>
        <div className="h-full bg-slate-900">
          <SearchResults
            handleClick={handleClick}
            suggestionIndex={suggestionIndex}
          />
        </div>
      </div>
    </>
  );
};
