import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';

import useDebounce from '../../utils/useDebounce';
import { Navlinks } from './Navlinks';
import { Sidemenu } from './Sidemenu';
import { SearchField } from './SearchField';
import { SearchResults } from './SearchResults';
import { RootState } from '../../store/store';
import { updateQuery, updateResult } from '../../store/searchReducer';
import { searchCharacters } from '../../utils/searchCharacters';

const Header: React.FC = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { query, result } = useSelector((state: RootState) => state.search);

  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isDesktopSearch, setIsDesktopSearch] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  const debouncedSearchTerm: string = useDebounce<string>(query, 500);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    dispatch(updateQuery(e.target.value.toLowerCase()));
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsDesktopSearch(false);
    }, 200);
  };

  const handleClick = (e: React.MouseEventHandler, uuid: number | string) => {
    navigate(`/cryptocurrencies/${uuid}`);

    setIsSearch(false);
    setIsDesktopSearch(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex === result.length) {
        setSuggestionIndex(1);
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      if (suggestionIndex === 0) {
        return;
      }
      let selected: any = result[suggestionIndex - 1];

      navigate(`/cryptocurrencies/${selected.uuid}`);

      setSuggestionIndex(0);
      setIsSearch(false);
      setIsDesktopSearch(false);
    }
  };

  useEffect(() => {
    if (isOpen || isSearch) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen, isSearch]);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        searchCharacters(debouncedSearchTerm).then(results => {
          dispatch(updateResult([...results?.data?.coins]));
        });
      } else {
        dispatch(updateResult([]));
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <>
      <Sidemenu isOpen={isOpen} close={() => setIsOpen(false)} />
      {isSearch ? (
        <SearchField
          suggestionIndex={suggestionIndex}
          handleClick={handleClick}
          handleKeyDown={handleKeyDown}
          closeSearch={() => setIsSearch(false)}
        />
      ) : (
        <header className="relative bg-blue-900">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setIsOpen(true)}
                  className="m-2 p-2 text-xl text-white md:hidden"
                >
                  <AiOutlineMenu />
                </button>
                <Link to="/">
                  <h3 className="text-white md:m-2 md:p-2">CryptoHub</h3>
                </Link>
              </div>
              <button
                onClick={() => setIsSearch(true)}
                className="m-2 p-2 text-xl text-white md:hidden"
              >
                <AiOutlineSearch />
              </button>
              <div className="hidden items-center md:flex">
                <div className="relative mr-4 flex items-center rounded bg-white ring-blue-300 focus-within:ring-4">
                  <span className="p-2 text-xl">
                    <AiOutlineSearch />
                  </span>
                  <input
                    type="text"
                    value={query}
                    onClick={() => setIsDesktopSearch(true)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                    className="bg-transparent focus:outline-none"
                  />
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full">
                    {isDesktopSearch && (
                      <SearchResults
                        handleClick={handleClick}
                        suggestionIndex={suggestionIndex}
                      />
                    )}
                  </div>
                </div>
                <Navlinks />
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
