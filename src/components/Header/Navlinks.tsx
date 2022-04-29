import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavlinksProps {}

export const Navlinks: React.FC<NavlinksProps> = ({}) => {
  const classname =
    'inline-block border-b-2 border-b-transparent py-2 text-white transition-colors duration-300 hover:border-b-white ';

  return (
    <ul className="mr-4 flex items-center space-x-4">
      <li>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            isActive ? classname + 'border-b-white' : classname
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/cryptocurrencies'}
          className={({ isActive }) =>
            isActive ? classname + 'border-b-white' : classname
          }
        >
          Cryptocurrencies
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/about'}
          className={({ isActive }) =>
            isActive ? classname + 'border-b-white' : classname
          }
        >
          About
        </NavLink>
      </li>
    </ul>
  );
};
